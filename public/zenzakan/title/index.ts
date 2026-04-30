import AboutSymbol from "@/public/zenzakan/title/about.svg";
import GeishaSymbol from "@/public/zenzakan/title/geisha.svg";
import MenuSymbol from "@/public/zenzakan/title/menu.svg";
import PrivateSymbol from "@/public/zenzakan/title/private.svg";
import ContactSymbol from "@/public/zenzakan/title/contact.svg";

export const titleSymbols = {
  about: AboutSymbol,
  geisha: GeishaSymbol,
  menu: MenuSymbol,
  private: PrivateSymbol,
  contact: ContactSymbol,
};

export type TitleSymbol = keyof typeof titleSymbols;
