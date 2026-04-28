"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type LogoRingProps = {
  className?: string;
};

const LogoRing = ({ className }: LogoRingProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGImageElement>(null);

  useEffect(() => {
    if (!pathRef.current || !ringRef.current) return;

    const length = pathRef.current.getTotalLength();

    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: length, strokeDashoffset: length, strokeWidth: 190 },
      {
        strokeDashoffset: 0,
        strokeWidth: 240,
        duration: 2.4,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      ringRef.current,
      {
        filter: "drop-shadow(0px 0px 0px rgba(255, 0, 0, 0.22))",
      },
      {
        filter: "drop-shadow(0px 0px 66px rgba(255, 0, 0, 0.55))",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
    );
  }, []);

  return (
    <div className={cn("overflow-visible", className)}>
      <svg viewBox="0 0 894 900" className="w-full h-full overflow-visible">
        <defs>
          <filter id="brushEdge" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>

          <mask id="ringRevealMask">
            <path
              ref={pathRef}
              d="M369,590l41,149s-170,31-236-77-94-186-86-261,49-184,92-218,140-96,194-103,104-25,194,20,151,83,185,149,73.11,198.44,55.11,273.44-78.11,172.56-108.11,217.56-131.07,145.92-131.07,145.92"
              fill="none"
              stroke="white"
              strokeWidth="210"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#brushEdge)"
              transform="translate(447,450) scale(1.15) translate(-447,-450)"
            />
          </mask>
        </defs>

        <image
          ref={ringRef}
          href="/zenzakan/logo/ring.webp"
          x="0"
          y="0"
          width="894"
          height="900"
          preserveAspectRatio="xMidYMid meet"
          mask="url(#ringRevealMask)"
          className="visible"
          style={{
            filter: "drop-shadow(0px 0px 66px rgba(255, 0, 0, 0.55))",
          }}
        />
      </svg>
    </div>
  );
};

export default LogoRing;
