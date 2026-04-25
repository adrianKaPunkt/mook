"use client";

import Image from "next/image";
import { useState } from "react";

type LogoKatanaProps = {
  className?: string;
};

const LogoKatana = ({ className }: LogoKatanaProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`absolute ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full cursor-pointer">
        <Image
          src="/zenzakan/logo/katana-o.webp"
          alt="Katana gezogen"
          fill
          className={`object-contain transition-transform duration-500 ease-out ${
            hovered
              ? "-translate-y-[8%] translate-x-[1.5%]"
              : "translate-y-[1.8%] -translate-x-[2.1%]"
          }`}
        />
        <Image
          src="/zenzakan/logo/katana-u.webp"
          alt="Katana Scheide"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LogoKatana;
