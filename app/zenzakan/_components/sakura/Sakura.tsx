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

const items = Array.from({ length: 55 }).map((_, i) => ({
  src: petals[i % petals.length],
  top: `${(i * 9) % 100}%`,
  right: `${-8 - (i % 6) * 4}%`,
  size: 12 + (i % 5) * 5,
  delay: i * 0.9,
  duration: 16 + (i % 7) * 3,
  opacity: 0.1 + (i % 4) * 0.07,
}));

export default function Sakura() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: item.top,
            right: item.right,
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: ["0vw", "-18vw", "-36vw", "-54vw", "-72vw", "-100vw"],
            y: [0, -10, 18, -6, 24, 10],
            rotate: [0, 22, -18, 10, -8, 0],
            opacity: [0, item.opacity, item.opacity, item.opacity, item.opacity * 0.6, 0],
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
            className="select-none"
          />
        </motion.div>
      ))}
    </div>
  );
}
