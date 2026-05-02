"use client";

import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { getDictionary } from "../../dictionaries";

type HeroTextProps = {
  dict: Awaited<ReturnType<typeof getDictionary>>["hero"];
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 2,
      delayChildren: 5,
      delay: 5,
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

const HeroText = ({ dict }: HeroTextProps) => {
  return (
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
        {dict.title}
      </motion.h1>

      <motion.div
        variants={item}
        className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
      >
        <a
          href="https://www.sevenrooms.com/explore/zenzakan/reservations/create/search?venues=franziska%2Civoryclub%2Cmonamiemaxi%2Cmsteakhouse%2Czenzakan"
          className="rounded-md font-body inline-flex items-center justify-center border border-primary bg-primary px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-[#c1121f] hover:bg-[#c1121f]"
        >
          {dict.reserve}
        </a>

        <a
          href="#menu"
          onClick={scrollToSection}
          className="rounded-md font-body inline-flex items-center justify-center border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-accent hover:text-accent"
        >
          {dict.menu}
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroText;
