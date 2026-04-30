import Image from "next/image";
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
  return (
    <div className={className}>
      <div className="flex w-max gap-5 overflow-x-auto scrollbar opacity-35 hover:opacity-100">
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
              onClick={() => onToggleAllergen(allergen.key)}
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
                className={`size-16 transition-all duration-300 ${
                  isSelected ? "invert hover:invert-0" : "invert"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AllergenPicker;
