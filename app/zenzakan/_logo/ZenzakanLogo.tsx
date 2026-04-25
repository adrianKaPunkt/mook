import Image from "next/image";
import LogoRing from "./LogoRing";
import LogoLetter from "./LogoLetter";
import LogoSubText from "./LogoSubText";
import LogoKatana from "./LogoKatana";

const ZenzakanLogo = () => {
  return (
    <div className="relative w-[min(90vw,720px)] aspect-square mx-auto">
      <Image
        src="/zenzakan/logo/logo.png"
        alt="Zenzakan Logo Reference"
        fill
        className="object-contain"
        priority
      />

      <LogoRing className="hidden absolute top-[0.5%] left-[-2%] w-[107%] h-[105%]" />

      <LogoLetter
        src="/zenzakan/logo/z.webp"
        alt="Z"
        className="left-[0.6%] top-[38.8%] w-[18.5%] h-[18.5%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/e.webp"
        alt="E"
        className="left-[15%] top-[41%] w-[13%] h-[15%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/n.webp"
        alt="N"
        className="left-[25%] top-[40%] w-[13%] h-[15%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/Z1.webp"
        alt="Z1"
        className="hidden left-[26%] top-[24%] w-[48%] h-[48%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/a.webp"
        alt="A"
        className="left-[52.3%] top-[41.5%] w-[16%] h-[16%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/k.webp"
        alt="K"
        className="left-[64%] top-[41.5%] w-[14%] h-[14%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/a.webp"
        alt="A1"
        className="left-[73%] top-[41.3%] w-[16%] h-[16%]"
        priority
      />
      <LogoLetter
        src="/zenzakan/logo/n.webp"
        alt="N1"
        className="left-[84.5%] top-[40%] w-[15%] h-[16%]"
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

      <LogoKatana className="left-[17.2%] top-[11.5%] w-[30%] h-[50%] -rotate-7" />
    </div>
  );
};

export default ZenzakanLogo;
