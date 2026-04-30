import AboutSection from "./_sections/AboutSection";
import GeishaRoomSection from "./_sections/GeishaRoomSection";
import HeroSection from "./_sections/HeroSection";
import MenuSection from "./_sections/MenuSection";
import { cookies } from "next/headers";

export default async function ZenzakanPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ?? "de";
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection lang={lang} />
      <MenuSection lang={lang} />
      <GeishaRoomSection lang={lang} />
    </main>
  );
}
