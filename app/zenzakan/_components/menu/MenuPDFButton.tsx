"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import dynamic from "next/dynamic";

const MenuPDFModal = dynamic(() => import("./MenuPDFModal"), { ssr: false });

type Props = {
  locale: "de" | "en";
  menuPdfUrl: string;
};

export default function MenuPDFButton({ locale, menuPdfUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex cursor-pointer items-center gap-2 text-sm uppercase tracking-[0.25em] text-foreground/80 transition-all duration-300 hover:border-accent hover:text-accent"
      >
        <FileText className="size-3" aria-hidden="true" />
        PDF
      </button>

      {isOpen && (
        <MenuPDFModal locale={locale} menuPdfUrl={menuPdfUrl} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
