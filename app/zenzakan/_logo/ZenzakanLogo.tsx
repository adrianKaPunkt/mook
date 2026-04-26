"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import LogoRing from "./LogoRing";
import LogoLetter from "./LogoLetter";
import LogoSubText from "./LogoSubText";
import LogoKatana from "./LogoKatana";

const ZenzakanLogo = () => {
  useEffect(() => {
    gsap.set(".logo-letter", {
      opacity: 0,
      y: 30,
      scale: 0.9,
    });

    gsap.to(".logo-letter", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: "back.out(1.7)",
      stagger: 0.3,
      delay: 2.4,
    });
  }, []);

  return (
    <div className="relative w-[min(90vw,720px)] aspect-square mx-auto">
      <Image
        src="/zenzakan/logo/logo.png"
        alt="Zenzakan Logo Reference"
        fill
        className="hidden object-contain"
        priority
      />

      <LogoRing className="absolute top-[21%] left-[20%] w-[61%] h-[61%]" />

      <LogoLetter
        src="/zenzakan/logo/z.webp"
        alt="Z"
        className="logo-letter left-[0.6%] top-[38.8%] w-[18.5%] h-[18.5%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/e.webp"
        alt="E"
        className="logo-letter left-[15%] top-[41%] w-[13%] h-[15%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/n.webp"
        alt="N"
        className="logo-letter left-[25%] top-[40%] w-[13%] h-[15%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/Z1.webp"
        alt="Z1"
        className="logo-letter left-[26%] top-[24%] w-[48%] h-[48%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/a.webp"
        alt="A"
        className="logo-letter left-[52.3%] top-[41.5%] w-[16%] h-[16%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/k.webp"
        alt="K"
        className="logo-letter left-[64%] top-[41.5%] w-[14%] h-[14%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/a.webp"
        alt="A1"
        className="logo-letter left-[73%] top-[41.3%] w-[16%] h-[16%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/n.webp"
        alt="N1"
        className="logo-letter left-[84.5%] top-[40%] w-[15%] h-[16%]"
        priority
      />
      <LogoSubText
        src="/zenzakan/logo/Pan.webp"
        alt="Pan"
        className="left-[10%] top-[57%] w-[15%] h-[10%]"
        priority
      />
      <LogoSubText
        src="/zenzakan/logo/Asian.webp"
        alt="Asian"
        className="left-[19.3%] top-[56%] w-[26%] h-[11%]"
        priority
      />
      <LogoSubText
        src="/zenzakan/logo/Supperclub.webp"
        alt="Supperclub"
        className="left-[44.1%] top-[54.5%] w-[50%] h-[16%]"
        priority
      />

      <LogoKatana className="left-[39%] top-[11.5%] w-[16%] h-[75%] rotate-4" />
    </div>
  );
};

export default ZenzakanLogo;
