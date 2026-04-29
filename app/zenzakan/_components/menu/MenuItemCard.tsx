import Image from "next/image";
import type { CSSProperties } from "react";
import { MenuItem, MenuUpgrade } from "@/types";
import { allergenByKey } from "../../../../data/allergen";

type ShadowStyle = CSSProperties & {
  "--menu-shadow-duration": string;
  "--menu-shadow-delay": string;
  "--menu-shadow-blur-start": string;
  "--menu-shadow-blur-end": string;
  "--menu-shadow-alpha-start": string;
  "--menu-shadow-alpha-end": string;
};

function seededValue(seed: string, salt: number) {
  let hash = 2166136261 + salt;

  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967295;
}

export default function MenuItemCard({ item, locale }: { item: MenuItem; locale: "de" | "en" }) {
  const description = locale === "de" ? item.description_de : item.description_en;
  const isNew = item.newUntil ? new Date(item.newUntil) > new Date() : false;
  const upgrades = item.upgrades as MenuUpgrade[] | null;
  const animationSeed = `${item.id}-${item.name}`;
  const shadowStyle: ShadowStyle = {
    "--menu-shadow-duration": `${14 + seededValue(animationSeed, 1) * 10}s`,
    "--menu-shadow-delay": `${seededValue(animationSeed, 2) * -18}s`,
    "--menu-shadow-blur-start": `${14 + seededValue(animationSeed, 3) * 8}px`,
    "--menu-shadow-blur-end": `${30 + seededValue(animationSeed, 4) * 18}px`,
    "--menu-shadow-alpha-start": `${0.12 + seededValue(animationSeed, 5) * 0.08}`,
    "--menu-shadow-alpha-end": `${0.24 + seededValue(animationSeed, 6) * 0.12}`,
  };

  return (
    <div
      className="zen-menu-item-card group relative border border-primary/50 rounded-2xl p-6 transition-all duration-300 hover:border-accent/50"
      style={shadowStyle}
    >
      {/* New Badge */}
      {isNew && (
        <span className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase bg-[#b8960c] text-black px-2.5 py-1 rounded-full font-semibold">
          Neu
        </span>
      )}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="flex gap-4 text-white/90 font-light uppercase font-heading text-2xl lg:text-3xl leading-snug mb-1 group-hover:text-white transition-colors duration-300">
            {item.name}
            {item.spiceLevel !== null && item.spiceLevel > 0 && (
              <span className="flex gap-0.5 mt-2">
                {Array.from({ length: item.spiceLevel }).map((_, i) => (
                  <span key={i} className="text-base grayscale">
                    🌶️
                  </span>
                ))}
              </span>
            )}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-accent text-md tracking-wide lg:text-lg leading-relaxed group-hover:saturate-150 transition-colors duration-300">
              {description}
            </p>
          )}

          {/* Upgrades */}
          {upgrades && upgrades.length > 0 && (
            <div className="mt-4 pt-4">
              <div className="flex flex-col gap-1">
                {upgrades.map((upgrade, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-accent/80 tracking-wide text-base">+ {upgrade.name}</span>
                    <span className="text-accent/80 tracking-wide text-base tabular-nums">
                      {Number(upgrade.price).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Allergene */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.allergens.map((allergenKey) => {
                const allergenData = allergenByKey[allergenKey];
                const name =
                  allergenData && locale === "de" ? allergenData.name_de : allergenData?.name_en;
                const description =
                  allergenData && locale === "de"
                    ? allergenData.description_de
                    : allergenData?.description_en;

                return (
                  <span
                    key={allergenKey}
                    title={description ?? allergenKey}
                    className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-base text-foreground/85"
                  >
                    {allergenData?.imageUrl && (
                      <Image
                        src={allergenData.imageUrl}
                        alt=""
                        width={16}
                        height={16}
                        className="size-10 shrink-0 invert"
                      />
                    )}
                    <span className="truncate uppercase">{name ?? allergenKey}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="text-right shrink-0 pt-0.5">
          <div className="text-foreground font-light text-xl tabular-nums leading-none">
            {Number(item.price).toFixed(2)}
          </div>
          <div className="text-[#333] text-xs mt-0.5">EUR</div>
        </div>
      </div>
    </div>
  );
}
