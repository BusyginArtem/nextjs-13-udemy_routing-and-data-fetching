import Image from "next/image";
//
import { Event } from "@/lib/types";
import LinkButton from "../ui/LinkButton";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import { imageLoader } from "@/lib/utils";

type Props = {
  item: Event;
};

export default function EventItem({ item }: Props) {
  const { date, image, location, title, id } = item;

  const prettyDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li className='flex flex-col md:flex-row gap-4 m-4 overflow-hidden bg-white rounded-lg shadow-deep-gray'>
      <Image
        loader={imageLoader}
        src={image}
        alt={title}
        className='w-full object-cover h-[12.5rem] md:w-[40%]'
        priority={false}
        width={200}
        height={200}
        quality={75}
      />

      <div className='w-full text-center px-4 md:w-[60%] md:p-0 md:text-left'>
        <h2 className='my-2 md:my-4'>{title}</h2>

        <div className='flex flex-row gap-2 items-center'>
          <DateIcon className='w-5 h-5 text-gray-700' />
          <time className='text-gray-600 font-bold'>{prettyDate}</time>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <AddressIcon className='w-5 h-5 text-gray-700' />
          <address className='my-2 text-gray-600 whitespace-pre font-bold'>{location}</address>
        </div>

        <div className='flex flex-col p-4 md:flex-row md:justify-end'>
          <LinkButton href={`/events/${id}`}>
            <span className='gap-2 flex items-center'>
              <span className='font-semibold'>Explore Event</span>
              <span className='ml-2 inline-flex justify-center items-center'>
                <ArrowRightIcon className='w-5 h-5' />
              </span>
            </span>
          </LinkButton>
        </div>
      </div>
    </li>
  );
}
