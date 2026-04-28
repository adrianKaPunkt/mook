import { Open_Sans, Manrope } from "next/font/google";
import "./zenzakan.css";
import Navbar from "./_components/Navbar";
import { cookies } from "next/headers";

const heading = Open_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export default async function ZenzakanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ?? "de";

  return (
    <div className={`${heading.variable} ${body.variable}`} data-theme="zenzakan">
      <Navbar lang={lang} />
      {children}
    </div>
  );
}
