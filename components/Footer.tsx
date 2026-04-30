import type { Location } from "@/types";
import FooterLogos from "./FooterLogos";

type FooterProps = {
  location?: Location;
};

const Footer = ({ location }: FooterProps) => {
  return (
    <div className="bg-zinc-900 text-white pt-20">
      <div className="mg-container grid grid-cols-1 lg:grid-cols-4 mb-20 gap-20 md:gap-5">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-heading uppercase tracking-tight">Mook Group</h2>
          <p className="mt-8 text-lg opacity-80">Presse</p>
          <p className="mt-4 text-lg opacity-80">Jobs</p>
          <p className="mt-4 text-lg opacity-80">Datenschutz</p>
          <p className="mt-4 text-lg opacity-80">Impressum</p>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-heading uppercase tracking-tight">{location?.name}</h2>
          <p className="mt-8 text-lg opacity-80">{location?.street}</p>
          <p className="mt-4 text-lg opacity-80">
            {location?.zip} {location?.city}
          </p>
          <p className="mt-4 text-lg opacity-80">{location?.phone}</p>
          <p className="mt-4 text-lg opacity-80">{location?.email}</p>
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-heading uppercase tracking-tight mb-8">Opening Hours</h2>
          {location?.openingHours?.map((oh, i) => (
            <p key={i} className="mt-4 text-lg opacity-80">
              {oh.days}: {oh.hours}
            </p>
          ))}
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-heading uppercase tracking-tight">Follow Us</h2>
          <p className="mt-8 text-lg opacity-80">Instagram</p>
          <p className="mt-4 text-lg opacity-80">Facebook</p>
          <p className="mt-4 text-lg opacity-80">Twitter</p>
        </div>
      </div>
      <FooterLogos />
      <div className="py-8 text-center text-sm opacity-60">
        © Copyright {new Date().getFullYear()} by Mook Group. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
