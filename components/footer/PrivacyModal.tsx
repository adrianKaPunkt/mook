"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { GlobalDict } from "@/dictionaries";

type Props = {
  dict: GlobalDict["privacyModal"];
  triggerLabel: string;
};

const PrivacyModal = ({ dict, triggerLabel }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 footerNav block w-full text-center md:text-left cursor-pointer"
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={dict.title}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-950 border border-border shadow-2xl scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-border px-6 py-4 bg-zinc-950 z-10">
              <span className="text-sm uppercase tracking-[0.25em] text-foreground/80">
                {dict.title}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer inline-flex size-9 items-center justify-center rounded-full border border-foreground/30 text-foreground/80 transition hover:border-accent hover:text-accent"
                aria-label={dict.close}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-8 space-y-6 text-foreground/80 text-sm leading-relaxed">
              {/* Inhalt folgt */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyModal;
