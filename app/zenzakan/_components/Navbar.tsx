"use client";

import { useEffect, useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import { scrollToSection } from "@/lib/utils";

export default function Navbar({ lang }: { lang: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about", label: lang === "en" ? "About" : "Über uns" },
    { id: "menu", label: lang === "en" ? "Menu" : "Speisekarte" },
    { id: "private-dining", label: lang === "en" ? "Private Dining" : "Private Dining" },
    { id: "geisha-room", label: lang === "en" ? "Geisha Room" : "Geisha Room" },
    { id: "contact", label: lang === "en" ? "Contact" : "Kontakt" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : ""}`}
    >
      <div className="mg-container flex items-center justify-between py-5">
        <a
          href="/zenzakan"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-heading text-foreground text-lg tracking-widest uppercase"
        >
          Zenzakan
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollToSection}
              className="font-body text-white/60 hover:text-foreground text-md tracking-[0.15em] uppercase transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LocaleSwitcher lang={lang} />
          <a
            href="#reservation"
            onClick={scrollToSection}
            className="font-body inline-flex items-center border border-primary bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition hover:border-[#c1121f] hover:bg-[#c1121f]"
          >
            {lang === "en" ? "Reserve" : "Reservieren"}
          </a>
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          aria-label="Menü öffnen"
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
