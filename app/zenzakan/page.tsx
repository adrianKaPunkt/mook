import {
  HeroSection,
  AboutSection,
  MenuSection,
  PrivateDiningSection,
  GeishaRoomSection,
  ContactSection,
} from "./_sections";
import { cookies } from "next/headers";

export default async function ZenzakanPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ?? "de";
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection lang={lang} />
      <MenuSection lang={lang} />
      <PrivateDiningSection lang={lang} />
      <GeishaRoomSection lang={lang} />
      <ContactSection lang={lang} />
    </main>
  );
}
