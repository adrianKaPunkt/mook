import Title from "../_components/Title";
import { getDictionary, hasLocale } from "../dictionaries";

const GeishaRoomSection = async ({ lang }: { lang: string }) => {
  const locale = hasLocale(lang) ? lang : "de";
  const dict = await getDictionary(locale);

  return (
    <section id="geisha-room" className="min-h-screen bg-zinc-950 py-16">
      <Title symbol="geisha" title={dict.geisha.title} />
      <div className="mg-container">
        <div className="w-[40%] mx-auto pt-50">
          <p className="text-foreground text-lg leading-9">{dict.geisha.description}</p>
        </div>
      </div>
    </section>
  );
};

export default GeishaRoomSection;
