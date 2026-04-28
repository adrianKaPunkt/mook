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
    update: { name: "Zenzakan" },
    create: { name: "Zenzakan", slug: "zenzakan", sortOrder: 1 },
  });

  console.log("✓ Location:", zenzakan.name);

  // ===========================================================================
  // CATEGORIES
  // Bestehende Kategorien dieser Location löschen und neu erstellen
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
        price: 19.99,
        spiceLevel: 2,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 2,
        name: "Sexy Freak Wave Sake Roll",
        description_de: "Lachs, Gurke, Avocado & Frischkäse im Knuspermantel",
        price: 14.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 3,
        name: "Papaya Burrata Roll",
        description_de: "Papaya, Burrata, Koriander-Pesto, Chili",
        price: 11.99,
        spiceLevel: 1,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 4,
        name: "Toro Nigiri Imperial (2 pcs.)",
        description_de: "Premium Stück vom Thunfischbauch mit Imperial Kaviar",
        price: 19.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 5,
        name: "Kobe Beef Aburi Nigiri (2 pcs.)",
        description_de: "Japanisches Wagyu-Beef-Nigiri, Shiso-Blüte & Shoyu-Sauce",
        price: 22.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 6,
        name: "Spicy Tuna Roll",
        description_de: "Spicy Tuna-Tartar, Lauch, Avocado, Teriyaki-Sauce, Spicy Mayo",
        price: 26.99,
        spiceLevel: 2,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 7,
        name: "Spicy Salmon Crispy Rice",
        description_de: "Krosse Reis-Nigiris mit Creamy-Lachs-Tatar",
        price: 3.99,
        spiceLevel: 2,
        servingInfo: "mind. 4 Stk., pro Stk.",
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 8,
        name: "Truffle Yakitori Roll",
        description_de: "Trüffel-Tamago-Mantel, Teriyaki-Hähnchen, Trüffel-Mayo, Sesam",
        price: 26.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 9,
        name: "Fresh Wasabi",
        description_de: "Frischer Wasabi auf der Haifischhaut gerieben",
        price: 6.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 10,
        name: "Spicy Spider Roll",
        description_de: "Softshell Crab, Spicy Mayo, Shichimi Togarashi",
        price: 24.99,
        spiceLevel: 2,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 11,
        name: "Ebi & Unagi Roll",
        description_de: "Tempura Garnele, Tuna-Tartar, Robata Aal, Unagi Glaze & Mayo",
        price: 34.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 12,
        name: "Truffle Lobster Beef Roll",
        description_de: "Lobster-Tempura, US-Filet, Trüffel-Ponzu-Schaum",
        price: 34.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 13,
        name: "Rainbow Roll 2.0",
        description_de: "Tuna, Lachs, Tempura-Garnele, Avocado, Tobiko-Sour-Cream",
        price: 26.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 14,
        name: "Crunchy Salmon Roll",
        description_de: "Lachs, Tempura-Spargel, Mayo, Teriyaki Sauce, Tenkasu",
        price: 13.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 15,
        name: "Salmon Nigiri Trinity",
        description_de: "Lachs-Nigiri auf drei verschiedene Arten",
        price: 13.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 16,
        name: "Crunchy Tempura Shrimp Roll",
        description_de: "Tempura-Shrimps, Avocado-Mantel, Tobiko & Wasabi Mayonnaise",
        price: 26.99,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 17,
        name: "Crunchy & Spicy Tuna Pizza",
        description_de: "Thunfisch-Tataki auf knusprigem Filoteig mit Spicy-Mayo",
        price: 17.99,
        spiceLevel: 2,
      },
      {
        categoryId: sushiTiradito.id,
        sortOrder: 18,
        name: "Pimp with Shrimp",
        description_de: "Tunen Sie Ihr Sushi mit krossen Shrimps",
        price: 5.99,
        servingInfo: "mind. 4 Stk., pro Stk.",
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
        price: 59.99,
        servingInfo: "pro Pers.",
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 2,
        name: "Premium Hangiri Sashimi Selection",
        description_de: "Spektakuläre Sashimi-Variationen",
        price: 69.99,
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 3,
        name: "Royal Hangiri Sashimi Selection & Imperial Caviar",
        description_de: "Sashimi-Variationen & 30g Imperial Caviar im Hangiri serviert",
        price: 139.99,
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 4,
        name: "Supreme Salmon Sashimi",
        description_de: "Label-Rouge-Lachs mit Sesam, Jalapeños Mayo & Ponzu",
        price: 24.99,
      },
      {
        categoryId: sashimiCaviar.id,
        sortOrder: 5,
        name: "Tuna Avocado Tiradito",
        description_de: "Tuna-Avocado-Sashimi mit spicy Soja-Limetten-Vinaigrette",
        price: 24.99,
        spiceLevel: 1,
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
        price: 18.99,
        spiceLevel: 2,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 2,
        name: 'Wan Tan "Park Chinois Style"',
        description_de: "Black Angus Filet-Tartar, Imperial Kaviar, Crème Fraîche, Wan-Tan-Cracker",
        price: 8.99,
        servingInfo: "mind. 3 Stk., pro Stk.",
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 3,
        name: "Spinach Salad with Truffle-Goma Dressing",
        description_de: "Babyspinatsalat mit Trüffel-Sesam-Dressing",
        price: 13.99,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 4,
        name: "Crispy Duck Salad",
        description_de: "Enten-Salat, Sesam, Zwiebeln, Minze und Honig-Hoi-Sin-Dressing",
        price: 26.99,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 5,
        name: "Salt 'n' Pepper Squid",
        description_de: "Kross gebackene Tintenfische",
        price: 22.9,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 6,
        name: "Chinese Truffled Beef Shumai Dumplings",
        description_de: "Getrüffelte Rindfleisch Dim Sums im Bambuskörbchen",
        price: 24.99,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 7,
        name: "Teriyaki Truffle Beef Carpaccio with Crunchy Tenkasu",
        description_de: "Rinder-Carpaccio, Teriyaki-Sauce, Trüffelmayo & Tempura-Crunch",
        price: 24.99,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 8,
        name: "Pork Bao Bun",
        description_de:
          "Krosser Schweinebauch vom Biohof May, Bao Burger, Hoisin, Gurke & Lauchzwiebel",
        price: 9.99,
        servingInfo: "mind. 2 Stk., pro Stk.",
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 9,
        name: "Chicken Yakitori Skewer",
        description_de: "Kikok-Hähnchenspieße vom Konro-Grill & Teriyaki-Soße",
        price: 6.99,
        servingInfo: "mind. 3 Stk., pro Stk.",
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 10,
        name: "Dynamite Shrimps",
        description_de: "Knusprige Garnelen mit spicy Mayo",
        price: 26.99,
        spiceLevel: 2,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 11,
        name: "Tuna Tatar Zenzakan Style",
        description_de: "Thunfisch-Tatar mit Wasabi-Guacamole & Tenkasu-Crunch",
        price: 26.99,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 12,
        name: "Veggi Tempura Basket",
        description_de: "Knusprig gebackenes Gemüse",
        price: 19.99,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 13,
        name: "Wagyu Wan-Tans & Chili-Garlic-Crunch",
        description_de: "Gedämpfte Wagyu-Teigtaschen mit Chili-Knoblauch-Knusper-Topping",
        price: 18.99,
        spiceLevel: 1,
      },
      {
        categoryId: smallDishes.id,
        sortOrder: 14,
        name: "Spicy Sticky Sticks",
        description_de:
          "Gebackene Auberginen-Pommes mit Korean-BBQ-Glaze, geröstetem Sesam und Miso",
        price: 18.99,
        spiceLevel: 2,
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
        price: 99.99,
        servingInfo: "For Two",
        upgrades: [{ name: "30g Imperial Caviar", price: 69.99 }],
      },
      {
        categoryId: meat.id,
        sortOrder: 2,
        name: "Velveted Brokkoli Beef",
        description_de:
          "Black Angus Rinderfiletwürfel, Brokkoli, Soja Sauce, Ingwer, Knoblauch, Sesam & Austernsauce",
        price: 39.99,
      },
      {
        categoryId: meat.id,
        sortOrder: 3,
        name: "Wagyu Yakisoba Bolognese",
        description_de: "Eiernudeln mit japanischer Miyazaki-Wagyu-Beef-Bolognese und Bio-Ei",
        price: 33.99,
      },
      {
        categoryId: meat.id,
        sortOrder: 4,
        name: "Tempura Chicken",
        description_de: "Gebackenes Tempura-Freilandhähnchen & Ingwer-Pak Choi",
        price: 33.99,
      },
      {
        categoryId: meat.id,
        sortOrder: 5,
        name: "A5 Miyazaki Wagyu Katsu Sando",
        description_de: "Japanisches Miyazaki Wagyu Sandwich",
        price: 99.99,
        upgrades: [{ name: "30g Imperial Caviar", price: 69.99 }],
      },
      {
        categoryId: meat.id,
        sortOrder: 6,
        name: "Velveted Black Pepper Beef",
        description_de:
          "Black Angus Rinderfiletwürfel, Ingwer, Austernsauce, Shaoxing-Wein, Knoblauch, Zwiebeln, Bohnen & Paprika",
        price: 39.99,
        spiceLevel: 1,
      },
      {
        categoryId: meat.id,
        sortOrder: 7,
        name: "Char Siu Chicken",
        description_de:
          "Saftig gegrilltes Freilandhähnchen in chinesischem Honig-BBQ-Lack mit Reis",
        price: 33.99,
      },
      {
        categoryId: meat.id,
        sortOrder: 8,
        name: "Organic Crispy Pork Belly",
        description_de: "Krosser Schweinebauch vom Biohof May, Reis & Hoisin Sauce",
        price: 33.99,
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
        price: 39.99,
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 2,
        name: "Braised US Beef Short Ribs",
        description_de: "US-Prime-Ochsenrippe mit pikanter Jus",
        price: 59.99,
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 3,
        name: "Original Miyazaki A5 Grade Fullblood Wagyu Rib Eye Steak",
        description_de: "Original Japanisches Miyazaki A5 Fullblood Wagyu Rib-Eye-Steak (400g)",
        price: 399.99,
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 4,
        name: "Terrific Tomahawks Lamb Chops",
        description_de: "Lamb Chops vom Robata-Holzkohle-Grill",
        price: 49.99,
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 5,
        name: "Robata Mix-Grill-Extravaganza Deluxe",
        description_de:
          "US-Prime-Short Rib, Lamb Chops und Flaky Rib-Eye-Steak-Spieß vom Robata-Holzkohle-Grill",
        price: 139.99,
        servingInfo: "For Two",
        upgrades: [
          { name: "Lobster Tail", price: 33.99 },
          { name: "Crispy Pork Belly", price: 22.99 },
        ],
      },
      {
        categoryId: robataGrill.id,
        sortOrder: 6,
        name: "Robata Mix-Grill-Extravaganza Royal",
        description_de:
          "US-Prime-Short Rib, Lamb Chops & Echtes Japanisches Miyazaki A5 Fullblood Wagyu Sirloin-Steak",
        price: 199.99,
        servingInfo: "For Two",
        upgrades: [
          { name: "Lobster Tail", price: 33.99 },
          { name: "Crispy Pork Belly", price: 22.99 },
        ],
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
        price: 49.99,
      },
      {
        categoryId: seafood.id,
        sortOrder: 2,
        name: "Royal Red Lobster Curry",
        description_de: "Rotes Thai-Curry mit ganzem Hummerschwanz und Reis",
        price: 49.99,
        spiceLevel: 2,
      },
      {
        categoryId: seafood.id,
        sortOrder: 3,
        name: "Miso Black Cod",
        description_de: "Miso marinierter Kohlenfisch",
        price: 69.99,
      },
      {
        categoryId: seafood.id,
        sortOrder: 4,
        name: "Teriyaki King-Ora Salmon",
        description_de: "King-Ora-Lachs, Teriyaki-Sauce & Ingwer-Pak-Choi",
        price: 39.99,
      },
      {
        categoryId: seafood.id,
        sortOrder: 5,
        name: "Grilled Lobster Tail",
        description_de: "Miso-Lobstertail (130g) vom Konro-Grill",
        price: 33.99,
        servingInfo: "pro Stück",
      },
    ],
  });

  console.log("✓ Seafood Items erstellt");

  // ===========================================================================
  // MENU ITEMS — Sides & Nibbles
  // ===========================================================================
  await prisma.menuItem.createMany({
    data: [
      { categoryId: sidesNibbles.id, sortOrder: 1, name: "Egg Rice", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 2, name: "Wasabi Fries", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 3, name: "Spinach Salad", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 4, name: "Ginger Pak Choi", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 5, name: "Onion Garlic Rice", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 6, name: "Noble Mushrooms", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 7, name: "Mixed Greens", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 8, name: "Edamame", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 9, name: "Grilled Scallion", price: 8.99 },
      { categoryId: sidesNibbles.id, sortOrder: 10, name: "Sesame Broccoli", price: 8.99 },
      {
        categoryId: sidesNibbles.id,
        sortOrder: 11,
        name: "Szechuan Garlic Beans",
        price: 8.99,
        spiceLevel: 1,
      },
    ],
  });

  console.log("✓ Sides & Nibbles Items erstellt");
  console.log("\n🎉 Seeding abgeschlossen!");
  console.log("🌱 Updating english descriptions...");

  const updates: { name: string; description_en: string }[] = [
    // ===========================================================================
    // Sushi & Tiradito
    // ===========================================================================
    {
      name: "Spicy Beef Tatar Roll",
      description_en: "Beef tartare, cucumber, chives, sesame, jalapeño & wafu dressing",
    },
    {
      name: "Sexy Freak Wave Sake Roll",
      description_en: "Salmon, cucumber, avocado & cream cheese in a crispy coating",
    },
    { name: "Papaya Burrata Roll", description_en: "Papaya, burrata, coriander pesto, chili" },
    {
      name: "Toro Nigiri Imperial (2 pcs.)",
      description_en: "Premium cut of tuna belly with Imperial caviar",
    },
    {
      name: "Kobe Beef Aburi Nigiri (2 pcs.)",
      description_en: "Japanese wagyu beef nigiri, shiso blossom & shoyu sauce",
    },
    {
      name: "Spicy Tuna Roll",
      description_en: "Spicy tuna tartare, leek, avocado, teriyaki sauce, spicy mayo",
    },
    {
      name: "Spicy Salmon Crispy Rice",
      description_en: "Crispy rice nigiris with creamy salmon tartare",
    },
    {
      name: "Truffle Yakitori Roll",
      description_en: "Truffle tamago wrap, teriyaki chicken, truffle mayo, sesame",
    },
    { name: "Fresh Wasabi", description_en: "Fresh wasabi grated on sharkskin" },
    { name: "Spicy Spider Roll", description_en: "Softshell crab, spicy mayo, shichimi togarashi" },
    {
      name: "Ebi & Unagi Roll",
      description_en: "Tempura prawn, tuna tartare, robata eel, unagi glaze & mayo",
    },
    {
      name: "Truffle Lobster Beef Roll",
      description_en: "Lobster tempura, US fillet, truffle ponzu foam",
    },
    {
      name: "Rainbow Roll 2.0",
      description_en: "Tuna, salmon, tempura prawn, avocado, tobiko sour cream",
    },
    {
      name: "Crunchy Salmon Roll",
      description_en: "Salmon, tempura asparagus, mayo, teriyaki sauce, tenkasu",
    },
    {
      name: "Salmon Nigiri Trinity",
      description_en: "Salmon nigiri prepared in three different ways",
    },
    {
      name: "Crunchy Tempura Shrimp Roll",
      description_en: "Tempura shrimps, avocado wrap, tobiko & wasabi mayonnaise",
    },
    {
      name: "Crunchy & Spicy Tuna Pizza",
      description_en: "Tuna tataki on crispy filo pastry with spicy mayo",
    },
    { name: "Pimp with Shrimp", description_en: "Upgrade your sushi with crispy shrimps" },

    // ===========================================================================
    // Sashimi & Caviar
    // ===========================================================================
    { name: "Zenzakan Chef Choice Sushi Selektion", description_en: "Spectacular sushi variation" },
    { name: "Premium Hangiri Sashimi Selection", description_en: "Spectacular sashimi variations" },
    {
      name: "Royal Hangiri Sashimi Selection & Imperial Caviar",
      description_en: "Sashimi variations & 30g Imperial Caviar served in a hangiri",
    },
    {
      name: "Supreme Salmon Sashimi",
      description_en: "Label Rouge salmon with sesame, jalapeño mayo & ponzu",
    },
    {
      name: "Tuna Avocado Tiradito",
      description_en: "Tuna avocado sashimi with spicy soy lime vinaigrette",
    },

    // ===========================================================================
    // Small Dishes
    // ===========================================================================
    {
      name: "Tom Yam Gung Soup",
      description_en:
        "Thai prawn soup with lemongrass, coconut milk, coriander, kaffir lime leaves, mushrooms and tomato",
    },
    {
      name: 'Wan Tan "Park Chinois Style"',
      description_en: "Black Angus fillet tartare, Imperial caviar, crème fraîche, wonton crackers",
    },
    {
      name: "Spinach Salad with Truffle-Goma Dressing",
      description_en: "Baby spinach salad with truffle sesame dressing",
    },
    {
      name: "Crispy Duck Salad",
      description_en: "Duck salad, sesame, onions, mint and honey hoisin dressing",
    },
    { name: "Salt 'n' Pepper Squid", description_en: "Crispy fried squid" },
    {
      name: "Chinese Truffled Beef Shumai Dumplings",
      description_en: "Truffled beef dim sum in a bamboo steamer",
    },
    {
      name: "Teriyaki Truffle Beef Carpaccio with Crunchy Tenkasu",
      description_en: "Beef carpaccio, teriyaki sauce, truffle mayo & tempura crunch",
    },
    {
      name: "Pork Bao Bun",
      description_en: "Crispy pork belly from Biohof May, bao bun, hoisin, cucumber & spring onion",
    },
    {
      name: "Chicken Yakitori Skewer",
      description_en: "Kikok chicken skewers from the konro grill & teriyaki sauce",
    },
    { name: "Dynamite Shrimps", description_en: "Crispy prawns with spicy mayo" },
    {
      name: "Tuna Tatar Zenzakan Style",
      description_en: "Tuna tartare with wasabi guacamole & tenkasu crunch",
    },
    { name: "Veggi Tempura Basket", description_en: "Crispy fried vegetables" },
    {
      name: "Wagyu Wan-Tans & Chili-Garlic-Crunch",
      description_en: "Steamed wagyu dumplings with chili garlic crispy topping",
    },
    {
      name: "Spicy Sticky Sticks",
      description_en: "Baked aubergine fries with Korean BBQ glaze, toasted sesame and miso",
    },

    // ===========================================================================
    // Meat
    // ===========================================================================
    {
      name: "The Classic Pippa Duck",
      description_en: "Quintessential Peking duck with pancakes and hoisin sauce",
    },
    {
      name: "Velveted Brokkoli Beef",
      description_en:
        "Black Angus beef fillet cubes, broccoli, soy sauce, ginger, garlic, sesame & oyster sauce",
    },
    {
      name: "Wagyu Yakisoba Bolognese",
      description_en: "Egg noodles with Japanese Miyazaki wagyu beef bolognese and organic egg",
    },
    {
      name: "Tempura Chicken",
      description_en: "Baked tempura free-range chicken & ginger pak choi",
    },
    { name: "A5 Miyazaki Wagyu Katsu Sando", description_en: "Japanese Miyazaki wagyu sandwich" },
    {
      name: "Velveted Black Pepper Beef",
      description_en:
        "Black Angus beef fillet cubes, ginger, oyster sauce, Shaoxing wine, garlic, onions, beans & peppers",
    },
    {
      name: "Char Siu Chicken",
      description_en: "Juicy grilled free-range chicken in Chinese honey BBQ glaze with rice",
    },
    {
      name: "Organic Crispy Pork Belly",
      description_en: "Crispy pork belly from Biohof May, rice & hoisin sauce",
    },

    // ===========================================================================
    // From the Robata Grill
    // ===========================================================================
    {
      name: "Robata Gyu-Kushi",
      description_en: "Flaky rib-eye steak skewer from the robata charcoal grill",
    },
    {
      name: "Braised US Beef Short Ribs",
      description_en: "US prime beef short rib with a spicy jus",
    },
    {
      name: "Original Miyazaki A5 Grade Fullblood Wagyu Rib Eye Steak",
      description_en: "Original Japanese Miyazaki A5 fullblood wagyu rib-eye steak (400g)",
    },
    {
      name: "Terrific Tomahawks Lamb Chops",
      description_en: "Lamb chops from the robata charcoal grill",
    },
    {
      name: "Robata Mix-Grill-Extravaganza Deluxe",
      description_en:
        "US prime short rib, lamb chops and flaky rib-eye steak skewer from the robata charcoal grill",
    },
    {
      name: "Robata Mix-Grill-Extravaganza Royal",
      description_en:
        "US prime short rib, lamb chops & authentic Japanese Miyazaki A5 fullblood wagyu sirloin steak",
    },

    // ===========================================================================
    // Seafood
    // ===========================================================================
    { name: "Sesame Tuna Tataki", description_en: "Tuna tataki with sesame ginger pak choi" },
    {
      name: "Royal Red Lobster Curry",
      description_en: "Red Thai curry with a whole lobster tail and rice",
    },
    { name: "Miso Black Cod", description_en: "Miso marinated black cod" },
    {
      name: "Teriyaki King-Ora Salmon",
      description_en: "King Ora salmon, teriyaki sauce & ginger pak choi",
    },
    {
      name: "Grilled Lobster Tail",
      description_en: "Miso lobster tail (130g) from the konro grill",
    },
  ];

  for (const item of updates) {
    await prisma.menuItem.updateMany({
      where: { name: item.name },
      data: { description_en: item.description_en },
    });
  }

  console.log(`✓ ${updates.length} englische Beschreibungen aktualisiert`);
  console.log("\n🎉 Fertig!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
