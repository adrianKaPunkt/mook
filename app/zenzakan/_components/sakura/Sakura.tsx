"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const petals = [
  "/zenzakan/sakura/sakura-1.svg",
  "/zenzakan/sakura/sakura-2.svg",
  "/zenzakan/sakura/sakura-3.svg",
  "/zenzakan/sakura/sakura-4.svg",
  "/zenzakan/sakura/sakura-5.svg",
];

// Deterministic pseudo-random — avoids SSR/CSR hydration mismatch
function rnd(seed: number, offset = 0): number {
  const x = Math.sin(seed * 127.1 + offset * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const items = Array.from({ length: 33 }).map((_, i) => {
  const r = (o: number) => rnd(i, o);

  // Group petals into wind gusts (5 per gust) so they arrive in bursts
  const gustGroup = Math.floor(i / 5);
  const gustOffset = (i % 5) * 0.55;
  const delay = gustGroup * 4.2 + gustOffset + r(0) * 1.2;
  const repeatDelay = r(24) * 1.5;

  const duration = 20 + r(1) * 14;
  const size = 10 + Math.round(r(2) * 20);
  const top = `${(r(3) * 90).toFixed(2)}%`;
  const right = `${(-3 - r(4) * 12).toFixed(2)}%`;

  // Organic vertical drift with varied amplitude
  const ya = 12 + r(5) * 28;
  const yValues = [
    0,
    -(r(6) * ya),
    r(7) * ya * 0.9,
    -(r(8) * ya * 0.6),
    r(9) * ya * 1.1,
    -(r(10) * ya * 0.7),
    r(11) * ya * 0.4,
    0,
  ];

  // 1–3 full spins with random direction
  const spins = 1 + Math.floor(r(12) * 2.5);
  const dir = r(13) > 0.5 ? 1 : -1;
  const rotValues = [
    0,
    dir * (r(14) * 80 + 20),
    dir * (r(15) * 160 + 80),
    dir * spins * 160,
    dir * spins * 240,
    dir * spins * 320,
    dir * (spins * 360 - r(16) * 30),
    dir * spins * 360,
  ];

  // Non-uniform X spacing — simulates gusts and lulls
  const xValues = [
    "0vw",
    `-${(10 + r(17) * 8).toFixed(1)}vw`,
    `-${(22 + r(18) * 8).toFixed(1)}vw`,
    `-${(36 + r(19) * 8).toFixed(1)}vw`,
    `-${(52 + r(20) * 8).toFixed(1)}vw`,
    `-${(66 + r(21) * 8).toFixed(1)}vw`,
    `-${(82 + r(22) * 6).toFixed(1)}vw`,
    "-106vw",
  ];

  // Per-petal timing rhythm — strictly increasing, non-overlapping ranges
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

  const opacity = 0.18 + r(23) * 0.32;

  return {
    src: petals[i % petals.length],
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

export default function Sakura() {
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
              item.opacity * 0.8,
              item.opacity * 0.4,
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
            className="select-none"
          />
        </motion.div>
      ))}
    </div>
  );
}
