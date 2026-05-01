"use client";

import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import ZenzakanSvg from "@/public/footer/zenzakan.svg";
import MSvg from "@/public/footer/m.svg";
import MonAmieSvg from "@/public/footer/monamie.svg";
import IvorySvg from "@/public/footer/ivory.svg";
import FrabziskaSvg from "@/public/footer/franziska.svg";

type LogoEntry = {
  Logo: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  href: string;
  /** Raster image shown on hover (webp/png). */
  hoverImage?: string;
  /** Inline SVG shown on hover — use this when you only have an SVG and want color control. */
  HoverLogo?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Tailwind color class applied to HoverLogo, e.g. "text-accent". */
  hoverClassName?: string;
};

const logos: LogoEntry[] = [
  {
    Logo: MSvg,
    name: "M-Steakhouse",
    href: "https://mook-group.de/msteakhouse",
    hoverImage: "/footer/m.webp",
  },
  {
    Logo: IvorySvg,
    name: "Ivory Club",
    href: "https://mook-group.de/ivoryclub",
    hoverImage: "/footer/ivory.webp",
  },
  {
    Logo: ZenzakanSvg,
    name: "Zenzakan",
    href: "/zenzakan",
    hoverImage: "/footer/zenzakan.webp",
  },
  {
    Logo: MonAmieSvg,
    name: "Mon Amie Maxi",
    href: "https://mook-group.de/monamiemaxi",
    HoverLogo: MonAmieSvg,
    hoverClassName: "text-accent",
  },
  {
    Logo: FrabziskaSvg,
    name: "Franziska",
    href: "https://mook-group.de/franziska",
    HoverLogo: FrabziskaSvg,
    hoverClassName: "text-accent",
  },
];

export default function FooterLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-16 border-t border-white/10 px-8 pt-20 pb-10">
      {logos.map(({ Logo, name, href, hoverImage, HoverLogo, hoverClassName }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          className="group relative inline-flex h-20 items-center justify-center"
        >
          <Logo
            aria-hidden="true"
            className="h-full w-auto brightness-0 invert opacity-50 transition-opacity group-hover:opacity-100"
          />
          {HoverLogo && (
            <HoverLogo
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 m-auto h-full w-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${hoverClassName ?? "text-white"}`}
            />
          )}
          {hoverImage && !HoverLogo && (
            <Image
              src={hoverImage}
              alt={name}
              width={0}
              height={0}
              sizes="200px"
              unoptimized={hoverImage.endsWith(".svg")}
              className="pointer-events-none absolute inset-0 m-auto h-full w-auto object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </a>
      ))}
    </div>
  );
}
