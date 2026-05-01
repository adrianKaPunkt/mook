"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { GlobalDict } from "@/dictionaries";

type Props = {
  dict: GlobalDict["imprintModal"];
  triggerLabel: string;
};

const ImprintModal = ({ dict, triggerLabel }: Props) => {
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
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.anliegen}
                </h2>
                <p>Mook Group Family Office & Beteiligungs GmbH</p>
                <p>Berliner Str. 48</p>
                <p>63065 Offenbach am Main</p>
                <p>{dict.registergericht}: Amtsgericht Offenbach am Main</p>
                <p>{dict.registernummer}: HRB 52607</p>
                <p>{dict.ustId}: DE 305383542</p>
                <p>{dict.geschaeftsfuehrer}: Christian Mook</p>
                <p>E-Mail: info@mook-group.de</p>
              </section>

              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.monAmie}
                </h2>
                <p>CM Hospitality GmbH</p>
                <p>Berliner Str. 48</p>
                <p>63065 Offenbach am Main</p>
                <p>{dict.registergericht}: Amtsgericht Offenbach am Main</p>
                <p>{dict.registernummer}: HRB 91837</p>
                <p>{dict.ustId}: DE 279033283</p>
                <p>{dict.geschaeftsfuehrer}: Christian Mook</p>
              </section>

              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.zenzakan}
                </h2>
                <p>American Food Corporation Deutschland GmbH</p>
                <p>Berliner Str. 48</p>
                <p>63065 Offenbach am Main</p>
                <p>{dict.registergericht}: Amtsgericht Offenbach am Main</p>
                <p>{dict.registernummer}: HRB 52648</p>
                <p>{dict.ustId}: DE 196703610</p>
                <p>{dict.geschaeftsfuehrer}: Christian Mook</p>
              </section>

              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.franziska}
                </h2>
                <p>CM Towers Hospitality GmbH</p>
                <p>Berliner Str. 48</p>
                <p>63065 Offenbach am Main</p>
                <p>{dict.registergericht}: Amtsgericht Offenbach am Main</p>
                <p>{dict.registernummer}: HRB 52591</p>
                <p>{dict.ustId}: DE 302428418</p>
                <p>{dict.geschaeftsfuehrer}: Christian Mook</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImprintModal;
