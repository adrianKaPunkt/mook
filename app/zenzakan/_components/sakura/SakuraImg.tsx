"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const webpPetals = [
  "/zenzakan/sakura/gold1.webp",
  "/zenzakan/sakura/gold2.webp",
  "/zenzakan/sakura/red1.webp",
  "/zenzakan/sakura/red2.webp",
];

function rnd(seed: number, offset = 0): number {
  const x = Math.sin(seed * 127.1 + offset * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const items = Array.from({ length: 10 }).map((_, i) => {
  // Offset seed from Sakura.tsx so the two layers don't move in sync
  const r = (o: number) => rnd(i + 100, o);

  const delay = i * 3.2 + r(0) * 2.5;
  const repeatDelay = r(24) * 2;

  const duration = 28 + r(1) * 18;
  const size = 38 + Math.round(r(2) * 28);
  const top = `${(8 + r(3) * 78).toFixed(2)}%`;
  const right = `${(-5 - r(4) * 10).toFixed(2)}%`;

  const ya = 20 + r(5) * 35;
  const yValues = [
    0,
    -(r(6) * ya * 0.7),
    r(7) * ya,
    -(r(8) * ya * 0.5),
    r(9) * ya * 0.8,
    -(r(10) * ya * 0.4),
    r(11) * ya * 0.3,
    0,
  ];

  const spins = r(12) > 0.55 ? 2 : 1;
  const dir = r(13) > 0.5 ? 1 : -1;
  const rotValues = [
    0,
    dir * (r(14) * 60 + 10),
    dir * (r(15) * 120 + 60),
    dir * spins * 140,
    dir * spins * 220,
    dir * spins * 300,
    dir * (spins * 360 - r(16) * 20),
    dir * spins * 360,
  ];

  const xValues = [
    "0vw",
    `-${(12 + r(17) * 6).toFixed(1)}vw`,
    `-${(24 + r(18) * 8).toFixed(1)}vw`,
    `-${(40 + r(19) * 7).toFixed(1)}vw`,
    `-${(56 + r(20) * 8).toFixed(1)}vw`,
    `-${(72 + r(21) * 7).toFixed(1)}vw`,
    `-${(86 + r(22) * 6).toFixed(1)}vw`,
    "-108vw",
  ];

  const times = [
    0,
    0.05 + r(25) * 0.04,
    0.18 + r(26) * 0.07,
    0.38 + r(27) * 0.07,
    0.55 + r(28) * 0.09,
    0.73 + r(29) * 0.07,
    0.88 + r(30) * 0.05,
    1,
  ];

  const opacity = 1 + r(23) * 0.2;

  return {
    src: webpPetals[i % webpPetals.length],
    top,
    right,
    size,
    delay,
    repeatDelay,
    duration,
    opacity,
    yValues,
    rotValues,
    xValues,
    times,
  };
});

export default function SakuraImg() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ top: item.top, right: item.right }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
          animate={{
            x: item.xValues,
            y: item.yValues,
            rotate: item.rotValues,
            opacity: [
              0,
              item.opacity,
              item.opacity,
              item.opacity,
              item.opacity,
              item.opacity * 0.75,
              item.opacity * 0.35,
              0,
            ],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeatDelay: item.repeatDelay,
            repeat: Infinity,
            ease: "easeInOut",
            times: item.times,
          }}
        >
          <Image
            src={item.src}
            alt=""
            width={item.size}
            height={item.size}
            className="select-none drop-shadow-[0_0_20px_rgba(200,162,74,0.18)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
