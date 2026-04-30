import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MenuTabs from "../_components/menu/MenuTabs";
import { getDictionary, hasLocale } from "../dictionaries";
import DishShowcase from "../_components/menu/DishShowcase";
import Title from "../_components/Title";
import { MenueCategory } from "@/types";

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

  const categories = (menu.categories as MenueCategory[]).map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({
      ...item,
      price: Number(item.price),
      newUntil: item.newUntil,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
    createdAt: cat.createdAt.toISOString(),
    updatedAt: cat.updatedAt.toISOString(),
  }));

  return (
    <section id="menu" className="min-h-screen bg-zinc-950 pb-16">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none bg-primary opacity-20"
          style={{
            WebkitMaskImage: "url(/zenzakan/images/background-menu.svg)",
            maskImage: "url(/zenzakan/images/background-menu.svg)",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            maskSize: "cover",
          }}
        />

        <Title title={dict.menu.title} symbol="menu" />

        <div className="relative z-10">
          <DishShowcase />
        </div>
      </div>
      <MenuTabs categories={categories} lang={locale} />
    </section>
  );
}
