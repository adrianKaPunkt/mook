type FooterProps = {
  location?: Location;
};

const Footer = ({ location }: FooterProps) => {
  return (
    <div className="bg-zinc-950 text-white pt-20">
      <div className="mg-container grid grid-cols-1 lg:grid-cols-4">
        <div>
          <h2 className="text-xl font-heading uppercase tracking-tight">Mook Group</h2>
        </div>
        <div>
          <h2 className="text-xl font-heading uppercase tracking-tight">ZENZAKAN</h2>
        </div>
      </div>
      <div className="py-8 text-center text-sm opacity-60">
        © Copyright {new Date().getFullYear()} by Mook Group. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
