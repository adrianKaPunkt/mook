"use client";

import { useRef, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import type { MenuItem } from "@/types";
import AllergenPicker from "./AllergenPicker";
import { allergens } from "@/data/allergen";

type CategoryWithItems = {
  id: string;
  name_de: string;
  name_en: string;
  items: MenuItem[];
};

export default function MenuTabs({
  categories,
  lang,
}: {
  categories: CategoryWithItems[];
  lang: string;
}) {
  const locale = lang === "en" ? "en" : "de";

  const [activeTab, setActiveTab] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(
    allergens.map((allergen) => allergen.key),
  );
  const tabsSectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const activeCategory = categories.find((c) => c.id === activeTab);
  const filteredItems =
    activeCategory?.items.filter((item) =>
      item.allergens.every((allergenKey) => selectedAllergens.includes(allergenKey)),
    ) ?? [];

  const toggleAllergen = (allergenKey: string) => {
    setSelectedAllergens((current) =>
      current.includes(allergenKey)
        ? current.filter((selectedAllergen) => selectedAllergen !== allergenKey)
        : [...current, allergenKey],
    );
  };

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

  const selectTab = (categoryId: string) => {
    if (hasMoved.current) return;

    setActiveTab((prev) => (prev === categoryId ? "" : categoryId));
    requestAnimationFrame(() => {
      const tabTop = tabsSectionRef.current?.getBoundingClientRect().top ?? 0;
      // Only scroll back when the user has already scrolled past the tabs section.
      // While DishShowcase is visible the tabs are below the viewport (tabTop > 0).
      if (tabTop < 0) {
        tabsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <div ref={tabsSectionRef} className="mg-container scroll-mt-24">
      <div className="sticky top-16 bg-zinc-950 z-10 pb-4 relative pt-10 mb-4 lg:mb-8">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="flex gap-2 w-fit lg:mx-auto lg:px-8">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectTab(cat.id)}
                  className={`group relative whitespace-nowrap px-5 py-2.5 text-xl tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer rounded-full border ${
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
      {activeTab && (
        <AllergenPicker
          className="mb-8 flex justify-center w-full overflow-x-auto items-center opacity-70"
          lang={locale}
          selectedAllergens={selectedAllergens}
          onToggleAllergen={toggleAllergen}
        />
      )}

      {/* Items Grid */}
      {activeCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
