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
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-contain ${imageClassName ?? "hover:contrast-125 hover:scale-105 saturate-150 transition duration-300 ease-out"}`}
        />
      </div>
    </div>
  );
};

export default LogoLetter;
