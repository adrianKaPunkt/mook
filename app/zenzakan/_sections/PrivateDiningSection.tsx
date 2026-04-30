import Title from "../_components/Title";
import { getDictionary, hasLocale } from "../dictionaries";

const PrivateDiningSection = async ({ lang }: { lang: string }) => {
  const locale = hasLocale(lang) ? lang : "de";
  const dict = await getDictionary(locale);

  return (
    <section id="private-dining" className="min-h-screen bg-zinc-950 py-16">
      <Title symbol="private" title={dict.privateDining.title} />
      <div className="mg-container">
        <div className="px-4 lg:w-[40%] mx-auto pt-50">
          <p className="text-foreground text-lg leading-9">{dict.privateDining.description}</p>
        </div>
      </div>
    </section>
  );
};

export default PrivateDiningSection;
