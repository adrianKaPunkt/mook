"use client";

import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import ZenzakanSvg from "@/public/footer/zenzakan.svg";
import MSvg from "@/public/footer/m.svg";
import MonAmie from "@/public/footer/monamie.svg";

type LogoEntry = {
  Logo: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  href: string;
  hoverImage?: string;
};

const logos: LogoEntry[] = [
  {
    Logo: MSvg,
    name: "M-Steakhouse",
    href: "https://mook-group.de/msteakhouse",
    hoverImage: "/footer/m.webp",
  },
  {
    Logo: ZenzakanSvg,
    name: "Zenzakan",
    href: "/zenzakan",
    hoverImage: "/footer/zenzakan.webp",
  },
  {
    Logo: MonAmie,
    name: "Mon Amie Maxi",
    href: "https://mook-group.de/monamiemaxi",
    hoverImage: "/footer/monamie.svg",
  },
];

export default function FooterLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-16 border-t border-white/10 py-12">
      {logos.map(({ Logo, name, href, hoverImage }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          className="group relative inline-flex h-30 items-center justify-center"
        >
          <Logo
            aria-hidden="true"
            className="h-full w-auto text-white/50 transition-colors duration-300 group-hover:text-white hover:opacity-0"
          />
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={name}
              width={0}
              height={0}
              sizes="200px"
              className="pointer-events-none absolute inset-0 m-auto h-full w-auto object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </a>
      ))}
    </div>
  );
}
