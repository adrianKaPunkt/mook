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
            <div className="px-6 py-8 space-y-6 text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.one.title}
                </h2>
                <p className="mt-2">{dict.one.content1}</p>
                <p className="mt-2">{dict.one.content2}</p>
                <p className="mt-2">{dict.one.content3}</p>
              </section>
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.two.title}
                </h2>
                <p className="mt-2">{dict.two.content1}</p>
                <p className="mt-2 pl-3">{dict.two.content2}</p>
                <p className="mt-2 pl-3">{dict.two.content3}</p>
                <p className="mt-2 pl-3">{dict.two.content4}</p>
                <p className="mt-2 pl-3">{dict.two.content5}</p>
                <p className="mt-2 pl-3">{dict.two.content6}</p>
                <p className="mt-2 pl-3">{dict.two.content7}</p>
                <p className="mt-2">{dict.two.content8}</p>
                <p className="mt-2 pl-3">{dict.two.content9}</p>
                <p className="mt-2 pl-3">{dict.two.content10}</p>
                <p className="mt-2">{dict.two.content11}</p>
                <p className="mt-2 pl-3">{dict.two.content12}</p>
                <p className="mt-2 pl-3">{dict.two.content13}</p>
                <p className="mt-2 pl-3">{dict.two.content14}</p>
              </section>
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.three.title}
                </h2>
                <p className="mt-2">{dict.three.content1}</p>
                <p className="mt-2">{dict.three.content2}</p>
                <p className="mt-2">{dict.three.content3}</p>
              </section>
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.four.title}
                </h2>
                <p className="mt-2">{dict.four.content1}</p>
                <p className="mt-2">{dict.four.content2}</p>
                <p>{dict.four.content3}</p>
                <p>{dict.four.content4}</p>
                <p>{dict.four.content5}</p>
                <p>{dict.four.content6}</p>
                <p>{dict.four.content7}</p>
                <p>{dict.four.content8}</p>
                <p>{dict.four.content9}</p>
              </section>
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.five.title}
                </h2>
                <p className="mt-2">{dict.five.content1}</p>
                <p className="mt-2">{dict.five.content2}</p>
              </section>
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.six.title}
                </h2>
                <p className="mt-2">{dict.six.content1}</p>
                <p className="mt-2">{dict.six.content2}</p>
              </section>
              <section>
                <h2 className="font-heading uppercase tracking-widest text-foreground mb-2">
                  {dict.seven.title}
                </h2>
                <p className="mt-2">{dict.seven.content1}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyModal;
