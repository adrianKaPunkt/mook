import Image from "next/image";
import ZenzakanLogo from "../_components/logo/ZenzakanLogo";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <Image
        src="/zenzakan/images/hero.jpg"
        alt="Zenzakan Interior"
        fill
        priority
        className="object-cover object-center opacity-70"
      />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center px-6 text-center sm:px-12 lg:col-span-2 lg:px-20">
          <div className="flex w-full justify-center">
            <div className="w-full max-w-[860px]">
              <ZenzakanLogo />
            </div>
          </div>

          <h1 className="font-heading mb-12 max-w-2xl text-4xl font-light leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
            Erleben Sie die Kunst der asiatischen Küche.
          </h1>

          <p className="font-body font-light mb-10 max-w-md text-base leading-8 text-white/75 sm:text-lg">
            Mit feinsten Zutaten, meisterhafter Zubereitung und einem Ambiente, das alle Sinne
            berührt.
          </p>

          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <a
              href="#reservation"
              className="font-body inline-flex items-center justify-center border border-[#a40000] bg-[#a40000] px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-[#c1121f] hover:bg-[#c1121f]"
            >
              Tisch reservieren
            </a>

            <a
              href="#menu"
              className="inline-flex items-center justify-center border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-[#a40000] hover:text-[#c1121f]"
            >
              Speisekarte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
