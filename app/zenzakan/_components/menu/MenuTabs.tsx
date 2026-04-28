"use client";

import { useState } from "react";
import type { Category as PrismaCategory } from "@prisma/client";
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

type CategoryWithItems = Pick<PrismaCategory, "id" | "name_de" | "name_en"> & {
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

  const activeCategory = categories.find((c) => c.id === activeTab);

  return (
    <div className="zen-container py-10">
      {/* Sticky category tabs */}
      <div className="sticky top-0 z-10 pb-4 flex justify-center">
        <div className="flex gap-2 pb-1">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group relative whitespace-nowrap px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer rounded-full border ${
                  isActive
                    ? "bg-primary border-primary text-foreground font-semibold"
                    : "border-foreground/80 text-foreground/80 hover:border-primary/80 hover:text-primary/80"
                }`}
              >
                {locale === "de" ? cat.name_de : cat.name_en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category title */}
      {activeCategory && (
        <div className="mt-10 mb-10 text-center">
          <h2 className="text-white/80 text-2xl md:text-3xl tracking-wide">
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
