"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LogoKatanaProps = {
  className?: string;
  delay?: number;
};

const LogoKatana = ({ className, delay }: LogoKatanaProps) => {
  const [hovered, setHovered] = useState(false);
  const katanaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!katanaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        katanaRef.current,
        {
          opacity: 0,
          x: -120,
          y: 20,
          filter: "blur(8px",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay,
          ease: "power3.out",
        },
      );
    }, katanaRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      className={`absolute ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={katanaRef}
    >
      <div className="relative w-full h-full cursor-pointer">
        <Image
          src="/zenzakan/logo/katana-o.webp"
          alt="Katana gezogen"
          fill
          className={`object-contain transition-transform duration-2000 ease-out ${
            hovered ? "-translate-y-[9%] translate-x-[17%]" : "translate-y-[1.8%] translate-x-[11%]"
          }`}
          style={{ filter: "drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.8))" }}
        />
        <Image
          src="/zenzakan/logo/katana-u.webp"
          alt="Katana Scheide"
          fill
          priority
          className="object-contain"
          style={{ filter: "drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.8))" }}
        />
      </div>
    </div>
  );
};

export default LogoKatana;
