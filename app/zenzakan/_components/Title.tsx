"use client";

import { useEffect, useRef } from "react";
import type { ComponentType, SVGProps } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSymbol from "@/public/zenzakan/title/about.svg";
import GeishaSymbol from "@/public/zenzakan/title/geisha.svg";
import MenuSymbol from "@/public/zenzakan/title/menu.svg";

gsap.registerPlugin(ScrollTrigger);

const titleSymbols: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  about: AboutSymbol,
  geisha: GeishaSymbol,
  menu: MenuSymbol,
};

type TitleProps = {
  symbol?: string;
  title: string;
};

const Title = ({ symbol, title }: TitleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const Symbol = symbol ? titleSymbols[symbol] : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enter = gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 0.6,
        scale: 1,
        delay: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onComplete: () => {
          gsap.to(el, {
            filter: "drop-shadow(0 0 88px rgba(255,0,0,0.8))",
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      },
    );

    return () => {
      enter.kill();
      gsap.killTweensOf(el);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative z-10 py-24 flex justify-center text-center overflow-visible">
      <span className="absolute inset-0 top-30 flex items-center justify-center select-none pointer-events-none">
        <span
          ref={ref}
          style={{ opacity: 0, filter: "drop-shadow(0 0 0px rgba(255,0,0,0.1))" }}
          className="flex h-90 w-90 items-center justify-center text-[16rem] leading-none text-primary/80"
        >
          {Symbol ? (
            <Symbol aria-hidden="true" className="h-full w-full text-primary opacity-70" />
          ) : (
            symbol
          )}
        </span>
      </span>
      <h1 className="relative uppercase text-white font-heading text-5xl md:text-7xl tracking-tight">
        {title}
      </h1>
    </div>
  );
};

export default Title;
