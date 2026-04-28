"use client";

import { useEffect, useRef } from "react";

type Dish = {
  name: string;
  imageUrl: string;
};

const dishes: Dish[] = [
  {
    name: "Sushi Platter",
    imageUrl: "/zenzakan/images/menu1.webp",
  },
  {
    name: "Tempura Basket",
    imageUrl: "/zenzakan/images/menu2.webp",
  },
  {
    name: "Miso Soup",
    imageUrl: "/zenzakan/images/menu3.webp",
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
      const pixelsPerSecond = clamp(18, width * 0.03, isWide ? 52 : 38);

      return {
        isWide,
        spacing,
        visible,
        speed: pixelsPerSecond / trackWidth,
      };
    }

    function getPos(t: number) {
      const x = W() * 0.08 + t * W() * 0.84;
      const yTop = H() * (W() >= 1200 ? -0.18 : -0.08);
      const yBot = H() * 0.5;
      const y = yTop + (yBot - yTop) * 4 * t * (1 - t);
      const prox = 1 - Math.abs(t - 0.5) * 2;
      const isWide = W() >= 1200;
      const scale =
        (isWide ? 0.22 : 0.16) + Math.pow(Math.max(0, prox), 3.4) * (isWide ? 3.2 : 3.65);
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
      const localOffset = travel % spacing;
      const startIndex = Math.floor(travel / spacing);

      context.clearRect(0, 0, W(), H());
      travel += speed * deltaSeconds;

      const items = [];
      for (let i = -1; i < visible; i++) {
        const t = i * spacing - localOffset;
        if (t < -0.1 || t > 1.1) continue;
        const pos = getPos(t);
        const idx = (((startIndex + i) % dishes.length) + dishes.length) % dishes.length;
        items.push({ ...pos, img: images[idx] });
      }

      items.sort((a, b) => a.scale - b.scale);

      items.forEach(({ x, y, scale, opacity, img }) => {
        if (opacity <= 0.01 || !img) return;

        const w = 210 * scale;
        const h = 280 * scale;

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

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative w-full overflow-visible -mt-40" style={{ height: "580px" }}>
      {/* Masken */}
      <div className="absolute inset-0 pointer-events-none z-20" />
      <div className="absolute inset-0 pointer-events-none z-20" />
      <div className="absolute inset-0 pointer-events-none z-20" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </section>
  );
}
