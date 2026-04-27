import "./zenzakan.css";
import { Manrope, Inter } from "next/font/google";

const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function ZenzakanLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${heading.variable} ${body.variable}`}>{children}</div>;
}
