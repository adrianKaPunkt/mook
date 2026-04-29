"use client";

import { useRef, useState } from "react";
import MenuItemCard from "./MenuItemCard";

type ItemProps = {
  id: string;
  name: string;
  description_de: string | null;
  description_en: string | null;
  price: number;
  imageUrl: string | null;
  allergens: string[];
  spiceLevel: number | null;
  upgrades: unknown;
  newUntil: string | null;
  servingInfo: string | null;
};

type CategoryWithItems = {
  id: string;
  name_de: string;
  name_en: string;
  items: ItemProps[];
};

export default function MenuTabs({
  categories,
  lang,
}: {
  categories: CategoryWithItems[];
  lang: string;
}) {
  const locale = lang === "en" ? "en" : "de";

  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const activeCategory = categories.find((c) => c.id === activeTab);

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
    <div className="zen-container">
      <div className="sticky top-0 z-10 pb-4 relative border-t border-foreground/10 pt-10">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="flex gap-2 w-fit mx-auto px-8">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (!hasMoved.current) setActiveTab(cat.id);
                  }}
                  className={`group relative whitespace-nowrap px-5 py-2.5 text-lg tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer rounded-full border ${
                    isActive
                      ? "bg-primary border-primary text-foreground font-semibold"
                      : "border-foreground/80 text-foreground/80 hover:border-accent hover:text-accent"
                  }`}
                >
                  {locale === "de" ? cat.name_de : cat.name_en}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category title */}
      {activeCategory && (
        <div className="mt-5 mb-10 text-center">
          <h2 className="text-white/80 text-2xl md:text-4xl uppercase tracking-wide">
            {locale === "de" ? activeCategory.name_de : activeCategory.name_en}
          </h2>
        </div>
      )}

      {/* Items Grid */}
      {activeCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeCategory.items.map((item) => (
            <MenuItemCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
