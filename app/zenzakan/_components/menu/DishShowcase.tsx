"use client";

import { useEffect, useRef } from "react";

type Dish = {
  name: string;
  imageUrl: string;
  scale?: number;
};

const dishes: Dish[] = [
  {
    name: "",
    imageUrl: "/zenzakan/images/menu1.webp",
    scale: 0.95,
  },
  {
    name: "",
    imageUrl: "/zenzakan/images/menu2.webp",
    scale: 1,
  },
  {
    name: "",
    imageUrl: "/zenzakan/images/menu3.webp",
    scale: 0.95,
  },
  {
    name: "",
    imageUrl: "/zenzakan/images/menu4.webp",
    scale: 1,
  },
  {
    name: "",
    imageUrl: "/zenzakan/images/menu5.webp",
    scale: 0.85,
  },
];

export default function DishShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Bilder laden
    const images: (HTMLImageElement | null)[] = dishes.map(() => null);
    dishes.forEach((dish, i) => {
      const img = new Image();
      img.src = dish.imageUrl;
      img.onload = () => {
        images[i] = img;
      };
    });

    let travel = 0;
    let animId: number;
    let lastTime = performance.now();
    let isDragging = false;
    let lastPointerX = 0;

    function clamp(min: number, value: number, max: number) {
      return Math.min(Math.max(value, min), max);
    }

    function getMetrics() {
      const width = W();
      const trackWidth = Math.max(1, width * 0.84);
      const isWide = width >= 1200;
      const gap = clamp(240, width * (isWide ? 0.22 : 0.3), isWide ? 430 : 380);
      const spacing = clamp(isWide ? 0.24 : 0.34, gap / trackWidth, 0.7);
      const visible = Math.ceil(1 / spacing) + 2;
      const pixelsPerSecond = clamp(14, width * 0.022, isWide ? 38 : 28);

      return {
        isWide,
        spacing,
        visible,
        speed: pixelsPerSecond / trackWidth,
      };
    }

    function getPos(t: number) {
      const width = W();
      const x = W() * 0.08 + t * W() * 0.84;
      const yTop = H() * (width >= 1200 ? -0.18 : -0.08);
      const yBot = H() * 0.42;
      const y = yTop + (yBot - yTop) * 4 * t * (1 - t);
      const prox = 1 - Math.abs(t - 0.5) * 2;
      const isWide = width >= 1200;
      const isMobile = width < 768;
      const baseScale = isWide ? 0.22 : isMobile ? 0.1 : 0.16;
      const peakScale = isWide ? 2.6 : isMobile ? 1.85 : 2.45;
      const scale = baseScale + Math.pow(Math.max(0, prox), 3) * peakScale;
      const fadeInStart = isWide ? 0.12 : 0.27;
      const fadeInEnd = isWide ? 0.22 : 0.35;
      const fadeOutStart = isWide ? 0.78 : 0.65;
      const fadeOutEnd = isWide ? 0.88 : 0.73;
      const opacity =
        t < fadeInStart
          ? 0
          : t < fadeInEnd
            ? (t - fadeInStart) / (fadeInEnd - fadeInStart)
            : t > fadeOutStart
              ? Math.max(0, (fadeOutEnd - t) / (fadeOutEnd - fadeOutStart))
              : 1;
      return { x, y, scale, opacity };
    }

    function draw(time: number) {
      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const { spacing, visible, speed } = getMetrics();
      const localOffset = ((travel % spacing) + spacing) % spacing;
      const startIndex = Math.floor(travel / spacing);

      context.clearRect(0, 0, W(), H());
      if (!isDragging) {
        travel += speed * deltaSeconds;
      }

      const items = [];
      for (let i = -1; i < visible; i++) {
        const t = i * spacing - localOffset;
        if (t < -0.1 || t > 1.1) continue;
        const pos = getPos(t);
        const idx = (((startIndex + i) % dishes.length) + dishes.length) % dishes.length;
        items.push({ ...pos, img: images[idx], dishScale: dishes[idx].scale ?? 1 });
      }

      items.sort((a, b) => a.scale - b.scale);

      items.forEach(({ x, y, scale, opacity, img, dishScale }) => {
        if (opacity <= 0.01 || !img) return;

        const w = 210 * scale * dishScale;
        const h = 280 * scale * dishScale;

        context.save();
        context.globalAlpha = opacity;
        context.translate(x, y);

        const imgRatio = img.width / img.height;
        const boxRatio = w / h;
        let sw = w,
          sh = h,
          sx = -w / 2,
          sy = -h / 2;
        if (imgRatio > boxRatio) {
          sw = h * imgRatio;
          sx = -sw / 2;
        } else {
          sh = w / imgRatio;
          sy = -sh / 2;
        }
        context.drawImage(img, sx, sy, sw, sh);

        context.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true;
      lastPointerX = event.clientX;
      canvas.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - lastPointerX;
      lastPointerX = event.clientX;
      const trackWidth = Math.max(1, W() * 0.84);
      travel -= deltaX / trackWidth;
    };

    const handlePointerUp = (event: PointerEvent) => {
      isDragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  return (
    <section className="relative h-[540px] w-full overflow-visible -mt-16 sm:h-[680px] sm:-mt-20 lg:h-[820px] lg:-mt-26">
      {/* Masken */}
      <div className="absolute inset-0 pointer-events-none z-20" />
      <div className="absolute inset-0 pointer-events-none z-20" />
      <div className="absolute inset-0 pointer-events-none z-20" />
      <div className="absolute inset-0 pointer-events-none z-20" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 h-full w-full cursor-grab touch-none active:cursor-grabbing"
      />
    </section>
  );
}
