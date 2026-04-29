type Item = {
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

type Upgrade = {
  name: string;
  price: number;
};

export default function MenuItemCard({ item, locale }: { item: Item; locale: "de" | "en" }) {
  const description = locale === "de" ? item.description_de : item.description_en;
  const isNew = item.newUntil ? new Date(item.newUntil) > new Date() : false;
  const upgrades = item.upgrades as Upgrade[] | null;

  return (
    <div className="group relative bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6 transition-all duration-300 hover:border-[#b8960c]/30 hover:bg-[#111] hover:shadow-[0_0_30px_-8px_rgba(184,150,12,0.15)]">
      {/* New Badge */}
      {isNew && (
        <span className="absolute top-4 right-4 text-[9px] tracking-[0.2em] uppercase bg-[#b8960c] text-black px-2.5 py-1 rounded-full font-semibold">
          Neu
        </span>
      )}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="text-white/90 uppercase font-heading text-xl leading-snug mb-1 pr-16 group-hover:text-white transition-colors duration-300">
            {item.name}
          </h3>

          {/* Serving Info */}
          {item.servingInfo && (
            <p className="text-primary/70 text-xs tracking-wider mb-2">{item.servingInfo}</p>
          )}

          {/* Description */}
          {description && (
            <p className="text-[#4a4a4a] text-sm leading-relaxed group-hover:text-[#555] transition-colors duration-300">
              {description}
            </p>
          )}

          {/* Spice Level */}
          {item.spiceLevel !== null && item.spiceLevel > 0 && (
            <div className="flex gap-0.5 mt-3">
              {Array.from({ length: item.spiceLevel }).map((_, i) => (
                <span key={i} className="text-xs">
                  🌶️
                </span>
              ))}
            </div>
          )}

          {/* Upgrades */}
          {upgrades && upgrades.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
              <p className="text-[#333] text-[9px] tracking-[0.2em] uppercase mb-2.5">Upgrades</p>
              <div className="flex flex-col gap-1">
                {upgrades.map((upgrade, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#444] text-xs">+ {upgrade.name}</span>
                    <span className="text-primary/80 text-xs tabular-nums">
                      {Number(upgrade.price).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
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
