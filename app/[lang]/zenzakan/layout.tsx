import localFont from "next/font/local";
import { Open_Sans, Manrope, Inter } from "next/font/google";
import "./zenzakan.css";

const heading = Open_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function ZenzakanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${heading.variable} ${body.variable}`} data-theme="zenzakan">
      {children}
    </div>
  );
}
