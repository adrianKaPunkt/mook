import HeroSection from "./_sections/HeroSection";
import MenuSection from "./_sections/MenuSection";
import { cookies } from "next/headers";

export default async function ZenzakanPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ?? "de";
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MenuSection lang={lang} />
    </main>
  );
}
