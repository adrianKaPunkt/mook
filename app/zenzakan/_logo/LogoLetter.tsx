import Image from "next/image";

type LogoLetterProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const LogoLetter = ({ src, alt, className, imageClassName, priority = false }: LogoLetterProps) => {
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

export default LogoLetter;
