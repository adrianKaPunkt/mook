import { Allergens } from "@/types";

export const allergens: Allergens[] = [
  {
    key: "GLUTEN",
    name_de: "Gluten",
    name_en: "Gluten",
    description_en: "Cereals containing gluten",
    description_de: "Glutenhaltiges Getreide",
    imageUrl: "/allergens/gluten.svg",
  },
  {
    key: "MILK",
    name_de: "Milch",
    name_en: "Milk",
    description_en: "Milk and products thereof (including lactose)",
    description_de: "Milch und daraus hergestellte Erzeugnisse (einschließlich Laktose)",
    imageUrl: "/allergens/milk.svg",
  },
  {
    key: "EGGS",
    name_de: "Eier",
    name_en: "Eggs",
    description_en: "Eggs and products thereof",
    description_de: "Eier und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/eggs.svg",
  },
  {
    key: "FISH",
    name_de: "Fisch",
    name_en: "Fish",
    description_en: "Fish and products thereof",
    description_de: "Fisch und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/fish.svg",
  },
  {
    key: "CRUSTACEANS",
    name_de: "Krebstiere",
    name_en: "Crustaceans",
    description_en: "Crustaceans and products thereof",
    description_de: "Krebstiere und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/crustaceans.svg",
  },
  {
    key: "PEANUTS",
    name_de: "Erdnüsse",
    name_en: "Peanuts",
    description_en: "Peanuts and products thereof",
    description_de: "Erdnüsse und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/peanuts.svg",
  },
  {
    key: "SOY",
    name_de: "Soja",
    name_en: "Soy",
    description_en: "Soybeans and products thereof",
    description_de: "Sojabohnen und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/soy.svg",
  },
  {
    key: "NUTS",
    name_de: "Schalenfrüchte",
    name_en: "Nuts",
    description_en:
      "Nuts, namely almonds, hazelnuts, walnuts, cashews, pecan nuts, Brazil nuts, pistachio nuts, macadamia or Queensland nuts and products thereof",
    description_de:
      "Schalenfrüchte, nämlich Mandeln, Haselnüsse, Walnüsse, Cashewnüsse, Pekannüsse, Paranüsse, Pistazien, Macadamianüsse oder Queenslandnüsse und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/nuts.svg",
  },
  {
    key: "CELERY",
    name_de: "Sellerie",
    name_en: "Celery",
    description_en: "Celery and products thereof",
    description_de: "Sellerie und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/celery.svg",
  },
  {
    key: "MUSTARD",
    name_de: "Senf",
    name_en: "Mustard",
    description_en: "Mustard and products thereof",
    description_de: "Senf und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/mustard.svg",
  },
  {
    key: "SESAME",
    name_de: "Sesam",
    name_en: "Sesame",
    description_en: "Sesame seeds and products thereof",
    description_de: "Sesamsamen und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/sesame.svg",
  },
  {
    key: "SULPHITES",
    name_de: "Sulfite",
    name_en: "sulphites",
    description_en:
      "Sulphur dioxide and sulphites at concentrations of more than 10 mg/kg or 10 mg/litre in terms of the total SO2 which are to be calculated for products as proposed ready for consumption or as reconstituted according to the instructions of the manufacturers",
    description_de:
      "Schwefeldioxid und Sulfite in Konzentrationen von mehr als 10 mg/kg oder 10 mg/liter in Bezug auf den gesamten SO2, die für Produkte zu berechnen sind, die zum Verzehr vorgeschlagen oder gemäß den Anweisungen der Hersteller rekonstituiert werden",
    imageUrl: "/allergens/sulphites.svg",
  },
  {
    key: "LUPINE",
    name_de: "Lupine",
    name_en: "Lupin",
    description_en: "Lupin and products thereof",
    description_de: "Lupine und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/lupine.svg",
  },
  {
    key: "MOLLUSCS",
    name_de: "Weichtiere",
    name_en: "Molluscs",
    description_en: "Molluscs and products thereof",
    description_de: "Weichtiere und daraus hergestellte Erzeugnisse",
    imageUrl: "/allergens/molluscs.svg",
  },
];

export const allergenByKey = allergens.reduce<Record<string, Allergens>>((lookup, allergen) => {
  lookup[allergen.key] = allergen;
  return lookup;
}, {});

allergenByKey.DAIRY = allergenByKey.MILK;
