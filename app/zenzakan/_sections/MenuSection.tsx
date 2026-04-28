import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MenuTabs from "../_components/menu/MenuTabs";
import { getDictionary, hasLocale } from "../dictionaries";
import DishShowcase from "../_components/menu/DishShowcase";

export default async function MenuSection({ lang }: { lang: string }) {
  const locale = hasLocale(lang) ? lang : "de";
  const slug = "zenzakan";
  const dict = await getDictionary(locale);

  const menu = await prisma.location.findUnique({
    where: { slug },
    include: {
      categories: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: {
          items: {
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      },
    },
  });

  if (!menu || !menu.isActive) notFound();

  const categories = menu.categories.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({
      ...item,
      price: Number(item.price),
      newUntil: item.newUntil?.toISOString() ?? null,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })),
    createdAt: cat.createdAt.toISOString(),
    updatedAt: cat.updatedAt.toISOString(),
  }));

  return (
    <section className="min-h-screen bg-background pt-10">
      {/* Header */}
      <div className="relative py-24 text-center border-b overflow-visible">
        {/* Decorative kanji watermark */}
        <span className="absolute inset-0 flex items-center justify-center text-[20rem] leading-none text-primary/50 select-none pointer-events-none">
          食
        </span>
        <h1 className="relative text-white font-heading text-5xl md:text-7xl tracking-tight">
          {dict.menu.title}
        </h1>
      </div>
      <DishShowcase />

      {/* Menu */}
      <MenuTabs categories={categories} lang={locale} />
    </section>
  );
}
