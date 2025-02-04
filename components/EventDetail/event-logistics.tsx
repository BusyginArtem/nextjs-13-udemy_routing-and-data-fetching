import Image from "next/image";

import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import { imageLoader } from "@/lib/utils";

type Props = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

function EventLogistics({ date, address, image, imageAlt }: Props) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className='shadow-md rounded-lg bg-gray-800 p-8 max-w-2xl w-4/5 mx-auto -mt-12 text-teal-200 flex flex-col items-center gap-4 md:flex-row md:items-stretch md:gap-12 md:-mt-20'>
      <div className='w-40 h-40 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white'>
        <Image
          className='w-full h-full object-cover'
          loader={imageLoader}
          src={image}
          alt={imageAlt}
          priority
          width={160}
          height={160}
          quality={75}
        />
      </div>
      <ul className='flex flex-col items-center gap-8 flex-1 md:items-start'>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address className='md:whitespace-pre'>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
