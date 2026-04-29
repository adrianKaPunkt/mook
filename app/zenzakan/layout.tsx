import { Open_Sans, Manrope } from "next/font/google";
import "./zenzakan.css";
import Navbar from "./_components/Navbar";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import type { Location } from "@/types";

const heading = Open_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export default async function ZenzakanLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ?? "de";

  const location = await prisma.location.findUnique({
    where: { slug: "zenzakan" },
  });

  console.log("Location data in layout:", location);

  return (
    <div className={`${heading.variable} ${body.variable}`} data-theme="zenzakan">
      <Navbar lang={lang} />
      {children}
      <Footer location={(location as unknown as Location) ?? undefined} />
    </div>
  );
}
