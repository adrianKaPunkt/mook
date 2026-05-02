import { KeyholeRevealSection } from "../_components/geisha/KeyholeRevealSection";
import Title from "../_components/Title";
import { getDictionary, hasLocale } from "../dictionaries";

const GeishaRoomSection = async ({ lang }: { lang: string }) => {
  const locale = hasLocale(lang) ? lang : "de";
  const dict = await getDictionary(locale);

  return (
    <section id="geisha-room" className="bg-zinc-950">
      <div className="py-16">
        <Title symbol="geisha" title={dict.geisha.title} />
      </div>
      <KeyholeRevealSection description={dict.geisha.description} />
    </section>
  );
};

export default GeishaRoomSection;
