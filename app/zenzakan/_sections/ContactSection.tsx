import { MapCard } from "@/components/map/MapCard";
import Title from "../_components/Title";
import { getDictionary, hasLocale } from "../dictionaries";

const ContactSection = async ({ lang }: { lang: string }) => {
  const locale = hasLocale(lang) ? lang : "de";
  const dict = await getDictionary(locale);

  return (
    <section id="contact" className="min-h-screen bg-zinc-950 py-16">
      <Title symbol="contact" title={dict.contact.title} />
      <div className="mg-container">
        <div className="px-4 lg:w-[40%] mx-auto pt-50">
          <p className="text-foreground text-lg leading-9"></p>
        </div>
        <div className="grid lg:grid-cols-2">
          <MapCard />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
