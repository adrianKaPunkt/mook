"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Geisha() {
  return (
    <div className="relative mx-auto flex min-h-[760px] w-full max-w-4xl items-end justify-center overflow-hidden">
      {/* Geisha */}
      <motion.div
        className="relative z-10 w-[min(78vw,350px)]"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 0.8, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/zenzakan/images/geisha.png"
          alt="Monochrome Geisha"
          width={450}
          height={700}
          priority
          className="h-[30%] w-full object-contain opacity-90 "
        />
      </motion.div>
    </div>
  );
}
