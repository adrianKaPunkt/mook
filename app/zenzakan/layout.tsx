import type { Metadata } from "next";
import { Open_Sans, Manrope } from "next/font/google";
import "./zenzakan.css";
import Navbar from "./_components/Navbar";
import { cookies } from "next/headers";
import Footer from "@/components/footer/Footer";
import { prisma } from "@/lib/prisma";
import type { Location } from "@/types";
import { getGlobalDictionary } from "@/dictionaries";

const heading = Open_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Zenzakan",
};

export default async function ZenzakanLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ?? "de";

  const [location, globalDict] = await Promise.all([
    prisma.location.findUnique({ where: { slug: "zenzakan" } }),
    getGlobalDictionary(lang),
  ]);

  return (
    <div className={`${heading.variable} ${body.variable}`} data-theme="zenzakan">
      <Navbar lang={lang} />
      {children}
      <Footer location={(location as unknown as Location) ?? undefined} dict={globalDict} lang={lang} />
    </div>
  );
}
