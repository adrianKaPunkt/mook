import Image from "next/image";

type LogoRingProps = {
  className?: string;
};

const LogoRing = ({ className }: LogoRingProps) => {
  return (
    <div className={className}>
      <Image
        src="/zenzakan/logo/ring.webp"
        alt="Zenzakan Logo Ring"
        fill
        className="object-contain"
      />
    </div>
  );
};

export default LogoRing;
