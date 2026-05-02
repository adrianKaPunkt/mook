"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import MapSvg from "./map.svg";
import "./map.css";

const mapInfo = {
  sbahn: {
    title: "S-Bahn Taunusanlage",
    text: "Schnelle Verbindung zur Innenstadt und Hauptwache.",
  },
  ubahn: {
    title: "U-Bahn Alte Oper",
    text: "Zentrale Lage direkt an der Alten Oper.",
  },
  alteOper: {
    title: "Alte Oper",
    text: "Eines der wichtigsten Wahrzeichen in direkter Umgebung.",
  },
  deutscheBank: {
    title: "Deutsche Bank Türme",
    text: "Markanter Orientierungspunkt der Frankfurter Skyline.",
  },
  opernplatz: {
    title: "Opernplatz",
    text: "",
  },
  goethestr: {
    title: "Goethestraße",
    text: "",
  },
  fressgasse: {
    title: "Fressgasse",
    text: "",
  },
  kettenhofweg: {
    title: "Kettenhofweg",
    text: "",
  },
  guiollettstr: {
    title: "Guiollettstraße",
    text: "Eingang Ivory Club - Valet Parking und Nebeneingang zum Zenzakan.",
  },
  junghofstr: {
    title: "Junghofstraße",
    text: "",
  },
  niedenau: {
    title: "Niedenau",
    text: "",
  },
  oberlindau: {
    title: "Oberlindau",
    text: "",
  },
  kleineHochstr: {
    title: "Kleine Hochstraße",
    text: "",
  },
  klueberstr: {
    title: "Klüberstraße",
    text: "",
  },
  kaiserhofstr: {
    title: "Kaiserhofstraße",
    text: "",
  },
  leerbachstr: {
    title: "Leerbachstraße",
    text: "",
  },
  grosseBockenheimer: {
    title: "Große Bockenheimer Straße",
    text: "",
  },
  bockenheimerLandstr: {
    title: "Bockenheimer Landstraße",
    text: "",
  },
  neueMainzer: {
    title: "Neue Mainzer Straße",
    text: "",
  },
  bockenheimerAnlage: {
    title: "Bockenheimer Anlage",
    text: "",
  },
  taunusanlage: {
    title: "Taunusanlage",
    text: "",
  },
};

type MapKey = keyof typeof mapInfo;

function normalizeSvgId(id: string): MapKey | null {
  if (id.endsWith("sbahn")) return "sbahn";
  if (id.endsWith("alteOper")) return "alteOper";
  if (id.endsWith("deutscheBank")) return "deutscheBank";
  if (id.endsWith("opernplatz")) return "opernplatz";
  if (id.endsWith("goethestr")) return "goethestr";
  if (id.endsWith("fressgasse")) return "fressgasse";
  if (id.endsWith("kettenhofweg")) return "kettenhofweg";
  if (id.endsWith("guiollettstr")) return "guiollettstr";
  if (id.endsWith("junghofstr")) return "junghofstr";
  if (id.endsWith("niedenau")) return "niedenau";
  if (id.endsWith("oberlindau")) return "oberlindau";
  if (id.endsWith("kleineHochstr")) return "kleineHochstr";
  if (id.endsWith("klueberstr")) return "klueberstr";
  if (id.endsWith("leerbachstr")) return "leerbachstr";
  if (id.endsWith("kaiserhofstr")) return "kaiserhofstr";
  if (id.endsWith("grosseBockenheimer")) return "grosseBockenheimer";
  if (id.endsWith("bockenheimerLandstr")) return "bockenheimerLandstr";
  if (id.endsWith("neueMainzer")) return "neueMainzer";
  if (id.endsWith("bockenheimerAnlage")) return "bockenheimerAnlage";
  if (id.endsWith("taunusanlage")) return "taunusanlage";

  return null;
}

export function MapCard() {
  const [active, setActive] = useState<MapKey | null>(null);
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
      <div
        className="relative block aspect-[4/3] overflow-hidden"
        onPointerMove={(event) => {
          const target = event.target as Element;
          const hovered = target.closest("[data-map-item]");
          const key = hovered?.getAttribute("data-map-item") as MapKey | null;
          setActive(key);
        }}
        onPointerLeave={() => setActive(null)}
      >
        <MapSvg
          className={`${inView ? "map-svg" : ""} h-full w-full scale-[1.55] translate-x-6 -translate-y-4`}
        />

        {active && (
          <div className="pointer-events-none absolute right-5 top-5 max-w-[240px] rounded-2xl border border-[#d4af37]/20 bg-black/75 p-4 text-[#d4af37] backdrop-blur-md">
            <p className="text-sm font-medium">{mapInfo[active].title}</p>
            <p className="mt-1 text-xs text-white/70">{mapInfo[active].text}</p>
          </div>
        )}

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
