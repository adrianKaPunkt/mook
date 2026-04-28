"use client";

import { setLocale } from "../actions";

export default function LocaleSwitcher({ lang }: { lang: string }) {
  return (
    <div className="flex items-center gap-1 bg-[#111] border border-[#222] rounded-full p-1">
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-5 py-3 rounded-full text-[10px] tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer ${
            lang === l ? "bg-primary text-foreground font-semibold" : "text-foreground/80"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
