import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Zenzakan...");

  // ===========================================================================
  // LOCATION
  // ===========================================================================
  const zenzakan = await prisma.location.upsert({
    where: { slug: "zenzakan" },
    update: {
      name: "Zenzakan",
      street: "Taunusanlage 15",
      city: "Frankfurt am Main",
      zip: "60325",
      country: "Deutschland",
      email: "info@zenzakan.de",
      phone: "+49 69 97086908",
      openingHours: {
        de: [
          { days: "Mo – Fr", hours: "12:00 – 15:00 & 18:00 – 00:00" },
          { days: "Sa – So", hours: "12:00 – 00:00" },
        ],
        en: [
          { days: "Mon – Fri", hours: "12:00 – 3:00 pm & 6:00 pm – midnight" },
          { days: "Sat – Sun", hours: "12:00 – midnight" },
        ],
      },
      socialLinks: {
        instagram: "https://www.instagram.com/zenzakan_frankfurt/",
        facebook: "https://www.facebook.com/zenzakan/",
      },
    },
    create: {
      name: "Zenzakan",
      street: "Taunusanlage 15",
      city: "Frankfurt am Main",
      zip: "60325",
      country: "Deutschland",
      email: "info@zenzakan.de",
      phone: "+49 69 97086908",
      slug: "zenzakan",
      sortOrder: 1,
      openingHours: {
        de: [
          { days: "Mo – Fr", hours: "12:00 – 15:00 & 18:00 – 00:00" },
          { days: "Sa – So", hours: "12:00 – 00:00" },
        ],
        en: [
          { days: "Mon – Fri", hours: "12:00 – 3:00 pm & 6:00 pm – midnight" },
          { days: "Sat – Sun", hours: "12:00 – midnight" },
        ],
      },
      socialLinks: {
        instagram: "https://www.instagram.com/zenzakan_frankfurt/",
        facebook: "https://www.facebook.com/zenzakan/",
      },
    },
  });

  console.log("✓ Location:", zenzakan.name);

  // ===========================================================================
  // CATEGORIES
  // ===========================================================================
  await prisma.menuItem.deleteMany({
    where: { category: { locationId: zenzakan.id } },
  });
  await prisma.category.deleteMany({
    where: { locationId: zenzakan.id },
  });

  const [sushiTiradito, sashimiCaviar, smallDishes, meat, robataGrill, seafood, sidesNibbles] =
    await Promise.all([
      prisma.category.create({
        data: {
          locationId: zenzakan.id,
          name_de: "Sushi & Tiradito",
          name_en: "Sushi & Tiradito",
          sortOrder: 1,
        },
      }),
      prisma.category.create({
        data: {
          locationId: zenzakan.id,
          name_de: "Sashimi & Caviar",
          name_en: "Sashimi & Caviar",
          sortOrder: 2,
        },
      }),
      prisma.category.create({
        data: {
          locationId: zenzakan.id,
          name_de: "Small Dishes",
          name_en: "Small Dishes",
          sortOrder: 3,
        },
      }),
      prisma.category.create({
        data: { locationId: zenzakan.id, name_de: "Meat", name_en: "Meat", sortOrder: 4 },
      }),
      prisma.category.create({
        data: {
          locationId: zenzakan.id,
          name_de: "From the Robata Grill",
          name_en: "From the Robata Grill",
          sortOrder: 5,
        },
      }),
      prisma.category.create({
        data: { locationId: zenzakan.id, name_de: "Seafood", name_en: "Seafood", sortOrder: 6 },
      }),
      prisma.category.create({
        data: {
          locationId: zenzakan.id,
          name_de: "Sides & Nibbles",
          name_en: "Sides & Nibbles",
          sortOrder: 7,
        },
      }),
    ]);

  console.log("✓ Kategorien erstellt");

  // ===========================================================================
  // MENU ITEMS — Sushi & Tiradito
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: sushiTiradito.id,
        sortOrder: 1,
        name: "Spicy Beef Tatar Roll",
        description_de: "Beef-Tatar, Gurke, Schnittlauch, Sesam, Jalapeno & Wafu-Dressing",
        description_en: "Beef tartare, cucumber, chives, sesame, jalapeño & wafu dressing",
        price: 19.99,
        spiceLevel: 2,
        allergens: ["GLUTEN", "SOY", "SESAME", "EGGS"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 2,
        name: "Sexy Freak Wave Sake Roll",
        description_de: "Lachs, Gurke, Avocado & Frischkäse im Knuspermantel",
        description_en: "Salmon, cucumber, avocado & cream cheese in a crispy coating",
        price: 14.99,
        allergens: ["FISH", "GLUTEN", "MILK", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 3,
        name: "Papaya Burrata Roll",
        description_de: "Papaya, Burrata, Koriander-Pesto, Chili",
        description_en: "Papaya, burrata, coriander pesto, chili",
        price: 11.99,
        spiceLevel: 1,
        allergens: ["MILK", "NUTS"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 4,
        name: "Toro Nigiri Imperial (2 pcs.)",
        description_de: "Premium Stück vom Thunfischbauch mit Imperial Kaviar",
        description_en: "Premium cut of tuna belly with Imperial caviar",
        price: 19.99,
        allergens: ["FISH", "GLUTEN", "SOY"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 5,
        name: "Kobe Beef Aburi Nigiri (2 pcs.)",
        description_de: "Japanisches Wagyu-Beef-Nigiri, Shiso-Blüte & Shoyu-Sauce",
        description_en: "Japanese wagyu beef nigiri, shiso blossom & shoyu sauce",
        price: 22.99,
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 6,
        name: "Spicy Tuna Roll",
        description_de: "Spicy Tuna-Tartar, Lauch, Avocado, Teriyaki-Sauce, Spicy Mayo",
        description_en: "Spicy tuna tartare, leek, avocado, teriyaki sauce, spicy mayo",
        price: 26.99,
        spiceLevel: 2,
        allergens: ["FISH", "GLUTEN", "SOY", "EGGS", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 7,
        name: "Spicy Salmon Crispy Rice",
        description_de: "Krosse Reis-Nigiris mit Creamy-Lachs-Tatar",
        description_en: "Crispy rice nigiris with creamy salmon tartare",
        price: 3.99,
        spiceLevel: 2,
        servingInfo: "mind. 4 Stk., pro Stk.",
        allergens: ["FISH", "GLUTEN", "SOY", "EGGS", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 8,
        name: "Truffle Yakitori Roll",
        description_de: "Trüffel-Tamago-Mantel, Teriyaki-Hähnchen, Trüffel-Mayo, Sesam",
        description_en: "Truffle tamago wrap, teriyaki chicken, truffle mayo, sesame",
        price: 26.99,
        allergens: ["GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 9,
        name: "Fresh Wasabi",
        description_de: "Frischer Wasabi auf der Haifischhaut gerieben",
        description_en: "Fresh wasabi grated on sharkskin",
        price: 6.99,
        allergens: [],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 10,
        name: "Spicy Spider Roll",
        description_de: "Softshell Crab, Spicy Mayo, Shichimi Togarashi",
        description_en: "Softshell crab, spicy mayo, shichimi togarashi",
        price: 24.99,
        spiceLevel: 2,
        allergens: ["CRUSTACEANS", "GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 11,
        name: "Ebi & Unagi Roll",
        description_de: "Tempura Garnele, Tuna-Tartar, Robata Aal, Unagi Glaze & Mayo",
        description_en: "Tempura prawn, tuna tartare, robata eel, unagi glaze & mayo",
        price: 34.99,
        allergens: ["CRUSTACEANS", "FISH", "GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 12,
        name: "Truffle Lobster Beef Roll",
        description_de: "Lobster-Tempura, US-Filet, Trüffel-Ponzu-Schaum",
        description_en: "Lobster tempura, US fillet, truffle ponzu foam",
        price: 34.99,
        allergens: ["CRUSTACEANS", "FISH", "GLUTEN", "EGGS", "SOY"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 13,
        name: "Rainbow Roll 2.0",
        description_de: "Tuna, Lachs, Tempura-Garnele, Avocado, Tobiko-Sour-Cream",
        description_en: "Tuna, salmon, tempura prawn, avocado, tobiko sour cream",
        price: 26.99,
        allergens: ["FISH", "CRUSTACEANS", "GLUTEN", "EGGS", "SOY", "SESAME", "MILK"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 14,
        name: "Crunchy Salmon Roll",
        description_de: "Lachs, Tempura-Spargel, Mayo, Teriyaki Sauce, Tenkasu",
        description_en: "Salmon, tempura asparagus, mayo, teriyaki sauce, tenkasu",
        price: 13.99,
        allergens: ["FISH", "GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 15,
        name: "Salmon Nigiri Trinity",
        description_de: "Lachs-Nigiri auf drei verschiedene Arten",
        description_en: "Salmon nigiri prepared in three different ways",
        price: 13.99,
        allergens: ["FISH", "GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 16,
        name: "Crunchy Tempura Shrimp Roll",
        description_de: "Tempura-Shrimps, Avocado-Mantel, Tobiko & Wasabi Mayonnaise",
        description_en: "Tempura shrimps, avocado wrap, tobiko & wasabi mayonnaise",
        price: 26.99,
        allergens: ["CRUSTACEANS", "GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 17,
        name: "Crunchy & Spicy Tuna Pizza",
        description_de: "Thunfisch-Tataki auf knusprigem Filoteig mit Spicy-Mayo",
        description_en: "Tuna tataki on crispy filo pastry with spicy mayo",
        price: 17.99,
        spiceLevel: 2,
        allergens: ["FISH", "GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 18,
        name: "Pimp with Shrimp",
        description_de: "Tunen Sie Ihr Sushi mit krossen Shrimps",
        description_en: "Upgrade your sushi with crispy shrimps",
        price: 5.99,
        servingInfo: "mind. 4 Stk., pro Stk.",
        allergens: ["CRUSTACEANS", "GLUTEN", "EGGS"],
      },
    ],
  });

  console.log("✓ Sushi & Tiradito Items erstellt");

  // ===========================================================================
  // MENU ITEMS — Sashimi & Caviar
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 1,
        name: "Zenzakan Chef Choice Sushi Selektion",
        description_de: "Spektakuläre Sushi Variation",
        description_en: "Spectacular sushi variation",
        price: 59.99,
        servingInfo: "pro Pers.",
        allergens: ["FISH", "CRUSTACEANS", "GLUTEN", "SOY", "SESAME", "EGGS"],
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 2,
        name: "Premium Hangiri Sashimi Selection",
        description_de: "Spektakuläre Sashimi-Variationen",
        description_en: "Spectacular sashimi variations",
        price: 69.99,
        allergens: ["FISH", "GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 3,
        name: "Royal Hangiri Sashimi Selection & Imperial Caviar",
        description_de: "Sashimi-Variationen & 30g Imperial Caviar im Hangiri serviert",
        description_en: "Sashimi variations & 30g Imperial Caviar served in a hangiri",
        price: 139.99,
        allergens: ["FISH", "GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 4,
        name: "Supreme Salmon Sashimi",
        description_de: "Label-Rouge-Lachs mit Sesam, Jalapeños Mayo & Ponzu",
        description_en: "Label Rouge salmon with sesame, jalapeño mayo & ponzu",
        price: 24.99,
        allergens: ["FISH", "GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 5,
        name: "Tuna Avocado Tiradito",
        description_de: "Tuna-Avocado-Sashimi mit spicy Soja-Limetten-Vinaigrette",
        description_en: "Tuna avocado sashimi with spicy soy lime vinaigrette",
        price: 24.99,
        spiceLevel: 1,
        allergens: ["FISH", "GLUTEN", "SOY", "SESAME"],
      },
    ],
  });

  console.log("✓ Sashimi & Caviar Items erstellt");

  // ===========================================================================
  // MENU ITEMS — Small Dishes
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: smallDishes.id,
        sortOrder: 1,
        name: "Tom Yam Gung Soup",
        description_de:
          "Thailändische Garnelen-Suppe mit Zitronengras, Kokos-Milch, Koriander, Limettenblättern, Champignons und Tomate",
        description_en:
          "Thai prawn soup with lemongrass, coconut milk, coriander, kaffir lime leaves, mushrooms and tomato",
        price: 18.99,
        spiceLevel: 2,
        allergens: ["CRUSTACEANS", "GLUTEN", "SOY", "CELERY"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 2,
        name: 'Wan Tan "Park Chinois Style"',
        description_de: "Black Angus Filet-Tartar, Imperial Kaviar, Crème Fraîche, Wan-Tan-Cracker",
        description_en:
          "Black Angus fillet tartare, Imperial caviar, crème fraîche, wonton crackers",
        price: 8.99,
        servingInfo: "mind. 3 Stk., pro Stk.",
        allergens: ["FISH", "GLUTEN", "EGGS", "MILK", "SOY"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 3,
        name: "Spinach Salad with Truffle-Goma Dressing",
        description_de: "Babyspinatsalat mit Trüffel-Sesam-Dressing",
        description_en: "Baby spinach salad with truffle sesame dressing",
        price: 13.99,
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 4,
        name: "Crispy Duck Salad",
        description_de: "Enten-Salat, Sesam, Zwiebeln, Minze und Honig-Hoi-Sin-Dressing",
        description_en: "Duck salad, sesame, onions, mint and honey hoisin dressing",
        price: 26.99,
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 5,
        name: "Salt 'n' Pepper Squid",
        description_de: "Kross gebackene Tintenfische",
        description_en: "Crispy fried squid",
        price: 22.99,
        allergens: ["MOLLUSCS", "GLUTEN", "EGGS"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 6,
        name: "Chinese Truffled Beef Shumai Dumplings",
        description_de: "Getrüffelte Rindfleisch Dim Sums im Bambuskörbchen",
        description_en: "Truffled beef dim sum in a bamboo steamer",
        price: 24.99,
        allergens: ["GLUTEN", "EGGS", "SOY"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 7,
        name: "Teriyaki Truffle Beef Carpaccio with Crunchy Tenkasu",
        description_de: "Rinder-Carpaccio, Teriyaki-Sauce, Trüffelmayo & Tempura-Crunch",
        description_en: "Beef carpaccio, teriyaki sauce, truffle mayo & tempura crunch",
        price: 24.99,
        allergens: ["GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 8,
        name: "Pork Bao Bun",
        description_de:
          "Krosser Schweinebauch vom Biohof May, Bao Burger, Hoisin, Gurke & Lauchzwiebel",
        description_en:
          "Crispy pork belly from Biohof May, bao bun, hoisin, cucumber & spring onion",
        price: 9.99,
        servingInfo: "mind. 2 Stk., pro Stk.",
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 9,
        name: "Chicken Yakitori Skewer",
        description_de: "Kikok-Hähnchenspieße vom Konro-Grill & Teriyaki-Soße",
        description_en: "Kikok chicken skewers from the konro grill & teriyaki sauce",
        price: 6.99,
        servingInfo: "mind. 3 Stk., pro Stk.",
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 10,
        name: "Dynamite Shrimps",
        description_de: "Knusprige Garnelen mit spicy Mayo",
        description_en: "Crispy prawns with spicy mayo",
        price: 26.99,
        spiceLevel: 2,
        allergens: ["CRUSTACEANS", "GLUTEN", "EGGS", "SOY"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 11,
        name: "Tuna Tatar Zenzakan Style",
        description_de: "Thunfisch-Tatar mit Wasabi-Guacamole & Tenkasu-Crunch",
        description_en: "Tuna tartare with wasabi guacamole & tenkasu crunch",
        price: 26.99,
        allergens: ["FISH", "GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 12,
        name: "Veggi Tempura Basket",
        description_de: "Knusprig gebackenes Gemüse",
        description_en: "Crispy fried vegetables",
        price: 19.99,
        allergens: ["GLUTEN", "EGGS", "SOY"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 13,
        name: "Wagyu Wan-Tans & Chili-Garlic-Crunch",
        description_de: "Gedämpfte Wagyu-Teigtaschen mit Chili-Knoblauch-Knusper-Topping",
        description_en: "Steamed wagyu dumplings with chili garlic crispy topping",
        price: 18.99,
        spiceLevel: 1,
        allergens: ["GLUTEN", "EGGS", "SOY"],
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 14,
        name: "Spicy Sticky Sticks",
        description_de:
          "Gebackene Auberginen-Pommes mit Korean-BBQ-Glaze, geröstetem Sesam und Miso",
        description_en: "Baked aubergine fries with Korean BBQ glaze, toasted sesame and miso",
        price: 18.99,
        spiceLevel: 2,
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
    ],
  });

  console.log("✓ Small Dishes Items erstellt");

  // ===========================================================================
  // MENU ITEMS — Meat
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: meat.id,
        sortOrder: 1,
        name: "The Classic Pippa Duck",
        description_de: "Quintessenz der Peking-Ente mit Pancakes, Hoisin-Sauce",
        description_en: "Quintessential Peking duck with pancakes and hoisin sauce",
        price: 99.99,
        servingInfo: "For Two",
        upgrades: [{ name: "30g Imperial Caviar", price: 69.99 }],
        allergens: ["GLUTEN", "SOY", "SESAME", "EGGS"],
      },
      {
        categoryId: meat.id,
        sortOrder: 2,
        name: "Velveted Brokkoli Beef",
        description_de:
          "Black Angus Rinderfiletwürfel, Brokkoli, Soja Sauce, Ingwer, Knoblauch, Sesam & Austernsauce",
        description_en:
          "Black Angus beef fillet cubes, broccoli, soy sauce, ginger, garlic, sesame & oyster sauce",
        price: 39.99,
        allergens: ["GLUTEN", "SOY", "SESAME", "MOLLUSCS"],
      },
      {
        categoryId: meat.id,
        sortOrder: 3,
        name: "Wagyu Yakisoba Bolognese",
        description_de: "Eiernudeln mit japanischer Miyazaki-Wagyu-Beef-Bolognese und Bio-Ei",
        description_en: "Egg noodles with Japanese Miyazaki wagyu beef bolognese and organic egg",
        price: 33.99,
        allergens: ["GLUTEN", "EGGS", "SOY"],
      },
      {
        categoryId: meat.id,
        sortOrder: 4,
        name: "Tempura Chicken",
        description_de: "Gebackenes Tempura-Freilandhähnchen & Ingwer-Pak Choi",
        description_en: "Baked tempura free-range chicken & ginger pak choi",
        price: 33.99,
        allergens: ["GLUTEN", "EGGS", "SOY", "SESAME"],
      },
      {
        categoryId: meat.id,
        sortOrder: 5,
        name: "A5 Miyazaki Wagyu Katsu Sando",
        description_de: "Japanisches Miyazaki Wagyu Sandwich",
        description_en: "Japanese Miyazaki wagyu sandwich",
        price: 99.99,
        upgrades: [{ name: "30g Imperial Caviar", price: 69.99 }],
        allergens: ["GLUTEN", "EGGS", "MILK", "SOY", "SESAME"],
      },
      {
        categoryId: meat.id,
        sortOrder: 6,
        name: "Velveted Black Pepper Beef",
        description_de:
          "Black Angus Rinderfiletwürfel, Ingwer, Austernsauce, Shaoxing-Wein, Knoblauch, Zwiebeln, Bohnen & Paprika",
        description_en:
          "Black Angus beef fillet cubes, ginger, oyster sauce, Shaoxing wine, garlic, onions, beans & peppers",
        price: 39.99,
        spiceLevel: 1,
        allergens: ["GLUTEN", "SOY", "MOLLUSCS", "SULPHITES"],
      },
      {
        categoryId: meat.id,
        sortOrder: 7,
        name: "Char Siu Chicken",
        description_de:
          "Saftig gegrilltes Freilandhähnchen in chinesischem Honig-BBQ-Lack mit Reis",
        description_en: "Juicy grilled free-range chicken in Chinese honey BBQ glaze with rice",
        price: 33.99,
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: meat.id,
        sortOrder: 8,
        name: "Organic Crispy Pork Belly",
        description_de: "Krosser Schweinebauch vom Biohof May, Reis & Hoisin Sauce",
        description_en: "Crispy pork belly from Biohof May, rice & hoisin sauce",
        price: 33.99,
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
    ],
  });

  console.log("✓ Meat Items erstellt");

  // ===========================================================================
  // MENU ITEMS — From the Robata Grill
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: robataGrill.id,
        sortOrder: 1,
        name: "Robata Gyu-Kushi",
        description_de: "Flaky Rib-Eye-Steak-Spieß vom Robata Holzkohle-Grill",
        description_en: "Flaky rib-eye steak skewer from the robata charcoal grill",
        price: 39.99,
        allergens: ["GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 2,
        name: "Braised US Beef Short Ribs",
        description_de: "US-Prime-Ochsenrippe mit pikanter Jus",
        description_en: "US prime beef short rib with a spicy jus",
        price: 59.99,
        allergens: ["GLUTEN", "SOY", "CELERY", "SULPHITES"],
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 3,
        name: "Original Miyazaki A5 Grade Fullblood Wagyu Rib Eye Steak",
        description_de: "Original Japanisches Miyazaki A5 Fullblood Wagyu Rib-Eye-Steak (400g)",
        description_en: "Original Japanese Miyazaki A5 fullblood wagyu rib-eye steak (400g)",
        price: 399.99,
        allergens: ["SOY", "GLUTEN"],
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 4,
        name: "Terrific Tomahawks Lamb Chops",
        description_de: "Lamb Chops vom Robata-Holzkohle-Grill",
        description_en: "Lamb chops from the robata charcoal grill",
        price: 49.99,
        allergens: ["GLUTEN", "SOY"],
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 5,
        name: "Robata Mix-Grill-Extravaganza Deluxe",
        description_de:
          "US-Prime-Short Rib, Lamb Chops und Flaky Rib-Eye-Steak-Spieß vom Robata-Holzkohle-Grill",
        description_en:
          "US prime short rib, lamb chops and flaky rib-eye steak skewer from the robata charcoal grill",
        price: 139.99,
        servingInfo: "For Two",
        upgrades: [
          { name: "Lobster Tail", price: 33.99 },
          { name: "Crispy Pork Belly", price: 22.99 },
        ],
        allergens: ["GLUTEN", "SOY", "CELERY", "CRUSTACEANS"],
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 6,
        name: "Robata Mix-Grill-Extravaganza Royal",
        description_de:
          "US-Prime-Short Rib, Lamb Chops & Echtes Japanisches Miyazaki A5 Fullblood Wagyu Sirloin-Steak",
        description_en:
          "US prime short rib, lamb chops & authentic Japanese Miyazaki A5 fullblood wagyu sirloin steak",
        price: 199.99,
        servingInfo: "For Two",
        upgrades: [
          { name: "Lobster Tail", price: 33.99 },
          { name: "Crispy Pork Belly", price: 22.99 },
        ],
        allergens: ["GLUTEN", "SOY", "CELERY", "CRUSTACEANS"],
      },
    ],
  });

  console.log("✓ Robata Grill Items erstellt");

  // ===========================================================================
  // MENU ITEMS — Seafood
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: seafood.id,
        sortOrder: 1,
        name: "Sesame Tuna Tataki",
        description_de: "Thunfisch-Tataki mit Sesam-Ingwer-Pak-Choi",
        description_en: "Tuna tataki with sesame ginger pak choi",
        price: 49.99,
        allergens: ["FISH", "GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: seafood.id,
        sortOrder: 2,
        name: "Royal Red Lobster Curry",
        description_de: "Rotes Thai-Curry mit ganzem Hummerschwanz und Reis",
        description_en: "Red Thai curry with a whole lobster tail and rice",
        price: 49.99,
        spiceLevel: 2,
        allergens: ["CRUSTACEANS", "GLUTEN", "SOY", "CELERY"],
      },
      {
        categoryId: seafood.id,
        sortOrder: 3,
        name: "Miso Black Cod",
        description_de: "Miso marinierter Kohlenfisch",
        description_en: "Miso marinated black cod",
        price: 69.99,
        allergens: ["FISH", "GLUTEN", "SOY"],
      },
      {
        categoryId: seafood.id,
        sortOrder: 4,
        name: "Teriyaki King-Ora Salmon",
        description_de: "King-Ora-Lachs, Teriyaki-Sauce & Ingwer-Pak-Choi",
        description_en: "King Ora salmon, teriyaki sauce & ginger pak choi",
        price: 39.99,
        allergens: ["FISH", "GLUTEN", "SOY", "SESAME"],
      },
      {
        categoryId: seafood.id,
        sortOrder: 5,
        name: "Grilled Lobster Tail",
        description_de: "Miso-Lobstertail (130g) vom Konro-Grill",
        description_en: "Miso lobster tail (130g) from the konro grill",
        price: 33.99,
        servingInfo: "pro Stück",
        allergens: ["CRUSTACEANS", "GLUTEN", "SOY"],
      },
    ],
  });

  console.log("✓ Seafood Items erstellt");

  // ===========================================================================
  // MENU ITEMS — Sides & Nibbles
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      { categoryId: sidesNibbles.id, sortOrder: 1, name: "Egg Rice", price: 8.99, allergens: ["EGGS", "SOY"] },
      { categoryId: sidesNibbles.id, sortOrder: 2, name: "Wasabi Fries", price: 8.99, allergens: ["GLUTEN", "MUSTARD"] },
      { categoryId: sidesNibbles.id, sortOrder: 3, name: "Spinach Salad", price: 8.99, allergens: ["SOY", "SESAME"] },
      { categoryId: sidesNibbles.id, sortOrder: 4, name: "Ginger Pak Choi", price: 8.99, allergens: ["SOY", "GLUTEN"] },
      { categoryId: sidesNibbles.id, sortOrder: 5, name: "Onion Garlic Rice", price: 8.99, allergens: ["SOY"] },
      { categoryId: sidesNibbles.id, sortOrder: 6, name: "Noble Mushrooms", price: 8.99, allergens: ["SOY", "GLUTEN"] },
      { categoryId: sidesNibbles.id, sortOrder: 7, name: "Mixed Greens", price: 8.99, allergens: ["SOY"] },
      { categoryId: sidesNibbles.id, sortOrder: 8, name: "Edamame", price: 8.99, allergens: ["SOY"] },
      { categoryId: sidesNibbles.id, sortOrder: 9, name: "Grilled Scallion", price: 8.99, allergens: ["SOY"] },
      { categoryId: sidesNibbles.id, sortOrder: 10, name: "Sesame Broccoli", price: 8.99, allergens: ["SOY", "SESAME"] },
      {
        categoryId: sidesNibbles.id,
        sortOrder: 11,
        name: "Szechuan Garlic Beans",
        price: 8.99,
        spiceLevel: 1,
        allergens: ["SOY", "GLUTEN"],
      },
    ],
  });

  console.log("✓ Sides & Nibbles Items erstellt");
  console.log("\n🎉 Seeding abgeschlossen!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
