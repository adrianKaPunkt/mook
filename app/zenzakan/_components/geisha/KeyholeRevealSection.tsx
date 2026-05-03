"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  description: string;
}

export function KeyholeRevealSection({ description }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // t: 0→1 während Eingang, 1 während Stay, 1→0 während Ausgang
  // Dadurch laufen die Original-Commit-Werte auf t und kehren sich beim Ausgang automatisch um
  const t = useTransform(scrollYProgress, [0, 0.4, 0.6, 1.0], [0, 1, 1, 0]);

  const scale = useTransform(t, [0, 1], [0.65, 120]);
  const redOpacity = useTransform(t, [0.05, 0.15], [1, 0]);
  const maskOpacity = useTransform(t, [0.44, 0.78], [1, 0]);
  const roomOpacity = useTransform(t, [0.15, 0.7], [0, 1]);
  const textOpacity = useTransform(t, [0.93, 0.99], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[600vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Geisha Room – blendet ein wenn Maske verschwindet */}
        <motion.div className="absolute inset-0 z-0 opacity-0" style={{ opacity: roomOpacity }}>
          <Image src="/zenzakan/images/geisha-room.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Rotes Licht hinter dem Schloss */}
        <motion.div style={{ scale, opacity: maskOpacity }} className="absolute z-10 h-130 w-130">
          <motion.div
            className="absolute left-1/2 top-1/2 h-45 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-t-full bg-red-900/50"
            style={{ opacity: redOpacity }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,50,50,0.2),rgba(60,0,0,0.3)_75%)]" />
          </motion.div>
        </motion.div>

        {/* Schloss PNG */}
        <motion.div style={{ scale, opacity: maskOpacity }} className="relative z-20">
          <Image
            src="/zenzakan/images/keyhole.png"
            alt="Golden Keyhole"
            width={300}
            height={300}
            priority
            className="pointer-events-none select-none"
          />
        </motion.div>

        {/* Text – erscheint nachdem das Bild sichtbar ist */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-20 pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center max-w-xl px-8">
            <p className="text-accent tracking-[0.4em] text-xs uppercase mb-4">Private Dining</p>
            <h2 className="text-white text-4xl md:text-5xl font-normal mb-6 leading-tight">
              Geisha Room
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-24 bg-accent opacity-50" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <div className="h-px w-24 bg-accent opacity-50" />
            </div>
            <p className="text-white/70 text-lg leading-9">{description}</p>
            <button className="cursor-pointer mt-8 px-8 py-3 border border-accent text-accent text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-black transition-all duration-500 pointer-events-auto">
              Reservierung anfragen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
