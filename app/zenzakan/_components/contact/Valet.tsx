import Image from "next/image";
import type { getDictionary } from "@/app/zenzakan/dictionaries";

type Props = {
  dict: Awaited<ReturnType<typeof getDictionary>>["contact"];
};

const Valet = ({ dict }: Props) => {
  return (
    <div className="flex flex-col justify-start items-end">
      <div className="relative w-full flex justify-end">
        <div className="bg-black/20 absolute inset-0 z-10" />
        <Image
          src="/zenzakan/images/valet.jpg"
          width={300}
          height={200}
          alt="Valet Parking"
          className="w-full lg:w-[75%] object-contain grayscale-75"
        />
      </div>
      <div className="text-center w-full lg:w-[75%] mt-9">
        <h2 className="text-foreground text-2xl font-bold mb-4">{dict.valet}</h2>
        <p className="text-foreground text-lg leading-9">{dict.valet_description}</p>
      </div>
    </div>
  );
};

export default Valet;
