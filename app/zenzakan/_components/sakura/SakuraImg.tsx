"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const webpPetals = [
  "/zenzakan/sakura/gold1.webp",
  "/zenzakan/sakura/gold2.webp",
  "/zenzakan/sakura/red1.webp",
  "/zenzakan/sakura/red2.webp",
];

const items = Array.from({ length: 7 }).map((_, i) => ({
  src: webpPetals[i % webpPetals.length],
  top: `${10 + ((i * 14) % 78)}%`,
  right: `${-10 - (i % 4) * 6}%`,
  size: 42 + (i % 4) * 14,
  delay: i * 2.8,
  duration: 28 + (i % 5) * 5,
  opacity: 0.16 + (i % 3) * 0.06,
}));

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
            x: ["0vw", "-20vw", "-42vw", "-68vw", "-105vw"],
            y: [0, -14, 22, -8, 18],
            rotate: [0, 8, -12, 6, -4],
            opacity: [0, item.opacity, item.opacity, item.opacity * 0.7, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
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
