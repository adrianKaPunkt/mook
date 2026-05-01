import type { Location } from "@/types";
import type { GlobalDict } from "@/dictionaries";
import FooterLogos from "./FooterLogos";
import ImprintModal from "./ImprintModal";
import PrivacyModal from "./PrivacyModal";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

type FooterProps = {
  location?: Location;
  dict?: GlobalDict;
  lang?: string;
};

const Footer = ({ location, dict, lang = "de" }: FooterProps) => {
  const locale = lang === "en" ? "en" : "de";
  const openingHours = location?.openingHours?.[locale];
  const f = dict?.footer;

  return (
    <div className="bg-zinc-900 text-white pt-20">
      <div className="mg-container grid grid-cols-1 lg:grid-cols-4 mb-20 gap-20 md:gap-5">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-heading uppercase tracking-tight">Mook Group</h2>
          <p className="mt-8 text-lg opacity-80">{f?.voucher ?? "Gutschein"}</p>
          <p className="mt-4 text-lg opacity-80">{f?.events ?? "Veranstaltungen"}</p>
          <a href="https://www.mook-group.de/presse/" className="footerNav mt-4 block">
            {f?.press ?? "Presse"}
          </a>
          <p className="mt-4 footerNav">{f?.jobs ?? "Jobs"}</p>
          {dict?.imprintModal ? (
            <ImprintModal dict={dict.imprintModal} triggerLabel={f?.imprint ?? "Impressum"} />
          ) : (
            <p className="mt-4 footerNav">{f?.imprint ?? "Impressum"}</p>
          )}
          {dict?.privacyModal ? (
            <PrivacyModal dict={dict.privacyModal} triggerLabel={f?.privacy ?? "Datenschutz"} />
          ) : (
            <p className="mt-4 footerNav">{f?.privacy ?? "Datenschutz"}</p>
          )}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-heading uppercase tracking-tight">{location?.name}</h2>
          <p className="mt-8 text-lg opacity-80">{location?.street}</p>
          <p className="mt-4 text-lg opacity-80">
            {location?.zip} {location?.city}
          </p>
          <p className="mt-4 text-lg opacity-80">{location?.phone}</p>
          <p className="mt-4 text-lg opacity-80">{location?.email}</p>
          <a
            className="footerNav mt-4 block"
            href="https://www.sevenrooms.com/explore/zenzakan/reservations/create/search?venues=franziska%2Civoryclub%2Cmonamiemaxi%2Cmsteakhouse%2Czenzakan"
          >
            Reservation
          </a>
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-heading uppercase tracking-tight mb-8">
            {f?.openingHours ?? "Opening Hours"}
          </h2>
          {openingHours?.map((oh, i) => (
            <p key={i} className="mt-4 text-lg opacity-80">
              {oh.days}: {oh.hours}
            </p>
          ))}
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-heading uppercase tracking-tight">
            {f?.followUs ?? "Follow Us"}
          </h2>
          {location?.socialLinks?.instagram && (
            <a
              href={location.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 footerNav flex items-center justify-center md:justify-end gap-3"
            >
              <FaInstagram />
              Instagram
            </a>
          )}
          {location?.socialLinks?.facebook && (
            <a
              href={location.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 footerNav flex items-center justify-center md:justify-end gap-3"
            >
              <FaFacebook />
              Facebook
            </a>
          )}
          {location?.socialLinks?.twitter && (
            <a
              href={location.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 footerNav flex items-center justify-center md:justify-end gap-3"
            >
              <FaXTwitter />
              Twitter
            </a>
          )}
        </div>
      </div>
      <FooterLogos />
      <div className="py-8 text-center text-sm opacity-70">
        © Copyright {new Date().getFullYear()} by Mook Group.{" "}
        {f?.allRightsReserved ?? "All rights reserved."}
      </div>
    </div>
  );
};

export default Footer;
