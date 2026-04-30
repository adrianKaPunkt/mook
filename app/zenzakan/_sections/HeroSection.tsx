"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import ZenzakanLogo from "../_components/logo/ZenzakanLogo";
import Sakura from "../_components/sakura/Sakura";
import SakuraImg from "../_components/sakura/SakuraImg";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <Image
        src="/zenzakan/images/hero.jpg"
        alt="Zenzakan Interior"
        fill
        priority
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center px-6 text-center sm:px-12 lg:col-span-2 lg:px-20 z-30">
          <div className="flex w-full justify-center">
            <div className="-my-16 w-full max-w-[860px]">
              <ZenzakanLogo />
            </div>
          </div>

          <motion.div
            className="mt-12 lg:mt-0 flex flex-col items-center"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={item}
              className="font-heading text-foreground/80 mb-12 max-w-2xl text-3xl leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl"
            >
              Erleben Sie die Kunst der asiatischen Küche.
            </motion.h1>

            <motion.div
              variants={item}
              className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
            >
              <a
                href="#reservation"
                onClick={scrollToSection}
                className="rounded-md font-body inline-flex items-center justify-center border border-primary bg-primary px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-[#c1121f] hover:bg-[#c1121f]"
              >
                Tisch reservieren
              </a>

              <a
                href="#menu"
                onClick={scrollToSection}
                className="rounded-md font-body inline-flex items-center justify-center border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-accent hover:text-accent"
              >
                Speisekarte
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative hidden lg:block">
          <Sakura />
          <SakuraImg />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
