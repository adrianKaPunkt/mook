import Image from "next/image";

type LogoSubTextProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const LogoSubText = ({ src, alt, className, imageClassName, priority }: LogoSubTextProps) => {
  return (
    <div className={`absolute ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain ${imageClassName ?? ""}`}
        priority={priority}
      />
    </div>
  );
};

export default LogoSubText;
