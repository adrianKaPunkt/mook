import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type LogoSubTextProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  delay?: number;
  sizes?: string;
};

const LogoSubText = ({
  src,
  alt,
  className,
  imageClassName,
  priority,
  delay,
  sizes,
}: LogoSubTextProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    gsap.fromTo(
      rootRef.current,
      {
        opacity: 0,
        y: 18,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        delay,
        ease: "power3.out",
      },
    );
  }, [delay]);

  return (
    <div className={`absolute ${className ?? ""}`} ref={rootRef}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain saturate-150 ${imageClassName ?? ""}`}
        priority={priority}
        sizes={sizes ?? "20vw"}
      />
    </div>
  );
};

export default LogoSubText;
