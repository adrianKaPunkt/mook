import { Geisha } from "../_components/geisha/Geisha";
import { KeyholeRevealSection } from "../_components/geisha/KeyholeRevealSection";
import Title from "../_components/Title";
import { getDictionary, hasLocale } from "../dictionaries";

const GeishaRoomSection = async ({ lang }: { lang: string }) => {
  const locale = hasLocale(lang) ? lang : "de";
  const dict = await getDictionary(locale);

  return (
    <section id="geisha-room" className="bg-zinc-950">
      <div className="relative py-16">
        <Title symbol="geisha" title={dict.geisha.title} />
        <div className="absolute left-1/2 -translate-x-1/2 top-55">
          <Geisha />
        </div>
      </div>
      <KeyholeRevealSection description={dict.geisha.description} />
    </section>
  );
};

export default GeishaRoomSection;
