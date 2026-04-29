"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Shoku = () => {
  const ref = useRef<HTMLSpanElement>(null);

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
            duration: 1,
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
    <span
      ref={ref}
      style={{ opacity: 0, filter: "drop-shadow(0 0 0px rgba(255,0,0,0.1))" }}
      className="absolute top-32 inset-0 flex items-center justify-center text-[20rem] leading-none text-primary/50 select-none pointer-events-none"
    >
      食
    </span>
  );
};

export default Shoku;
