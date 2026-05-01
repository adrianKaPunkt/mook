"use client";

import Image from "next/image";
import { useRef } from "react";
import { allergens } from "@/data/allergen";

type AllergenPickerProps = {
  className?: string;
  lang: string;
  selectedAllergens: string[];
  onToggleAllergen: (allergenKey: string) => void;
};

const AllergenPicker: React.FC<AllergenPickerProps> = ({
  className,
  lang,
  selectedAllergens,
  onToggleAllergen,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.clientX;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 6) hasMoved.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - delta;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar cursor-grab active:cursor-grabbing select-none opacity-35 hover:opacity-100 transition-opacity"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex w-max gap-5 px-2">
          {allergens.map((allergen) => {
            const isSelected = selectedAllergens.includes(allergen.key);
            const name = lang === "de" ? allergen.name_de : allergen.name_en;

            return (
              <button
                key={allergen.key}
                type="button"
                aria-pressed={isSelected}
                aria-label={name}
                title={name}
                onClick={() => {
                  if (hasMoved.current) return;
                  onToggleAllergen(allergen.key);
                }}
                className={`shrink-0 rounded-full p-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-primary hover:bg-accent"
                    : "bg-transparent ring-1 ring-primary/40 opacity-35 hover:opacity-70"
                }`}
              >
                <Image
                  src={allergen.imageUrl}
                  alt=""
                  width={30}
                  height={30}
                  className={`size-10 lg:size-16 transition-all duration-300 ${
                    isSelected ? "invert hover:invert-0" : "invert"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllergenPicker;
