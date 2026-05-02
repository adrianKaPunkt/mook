import Image from "next/image";
import { getDictionary, hasLocale } from "../dictionaries";
import ZenzakanLogo from "../_components/hero/logo/ZenzakanLogo";
import Sakura from "../_components/sakura/Sakura";
import SakuraImg from "../_components/sakura/SakuraImg";
import HeroText from "../_components/hero/HeroText";

const HeroSection = async ({ lang }: { lang: string }) => {
  const locale = hasLocale(lang) ? lang : "de";
  const dict = await getDictionary(locale);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <Image
        src="/zenzakan/images/hero.jpg"
        alt="Zenzakan Interior"
        fill
        priority
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center px-6 text-center sm:px-12 lg:col-span-2 lg:px-20 z-30">
          <div className="flex w-full justify-center">
            <div className="-my-16 w-full max-w-[860px]">
              <ZenzakanLogo />
            </div>
          </div>

          <HeroText dict={dict.hero} />
        </div>

        <div className="relative hidden lg:block">
          <Sakura />
          <SakuraImg />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
