"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import MapSvg from "./map.svg";
import "./map.css";
import { type MapKey, mapInfo } from "./mapinfo";

export function MapCard() {
  const [active, setActive] = useState<MapKey | null>(null);
  const [locked, setLocked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 0.8, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-[#d4af37]/10"
    >
      <div className="text-white text-center p-8 h-30">
        {active && (
          <>
            <p className="text-lg font-medium">{mapInfo[active].title}</p>
            <p className="mt-1 text-base text-white/70">{mapInfo[active].text}</p>
          </>
        )}
      </div>
      <div
        data-active={locked ? active : undefined}
        className="relative block aspect-[4/3] overflow-hidden"
        onPointerMove={(event) => {
          if (locked) return;
          const target = event.target as Element;
          const hovered = target.closest("[data-map-item]");
          const key = hovered?.getAttribute("data-map-item") as MapKey | null;
          setActive(key);
        }}
        onPointerLeave={() => {
          if (!locked) setActive(null);
        }}
        onClick={(event) => {
          const target = event.target as Element;
          const clicked = target.closest("[data-map-item]");
          const key = clicked?.getAttribute("data-map-item") as MapKey | null;
          if (key) {
            if (locked && active === key) {
              setLocked(false);
              setActive(null);
            } else {
              setActive(key);
              setLocked(true);
            }
          } else {
            setLocked(false);
            setActive(null);
          }
        }}
      >
        <MapSvg
          className={`${inView ? "map-svg" : ""} h-full w-full scale-[1.55] translate-x-6 -translate-y-4`}
        />

        <Link
          href="https://www.google.com/maps/search/?api=1&query=Zenzakan+Frankfurt"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 left-5 rounded-full border border-[#d4af37]/30 bg-black/70 px-4 py-2 text-sm tracking-wide text-[#d4af37] backdrop-blur-md transition group-hover:bg-[#d4af37] group-hover:text-black"
        >
          Route öffnen
        </Link>
      </div>
    </motion.div>
  );
}
