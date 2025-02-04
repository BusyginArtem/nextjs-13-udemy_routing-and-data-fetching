import { Event } from "@/lib/types";
import EventItem from "./EventItem";

type Props = {
  items: Event[];
};

export default function EventList({ items }: Props) {
  return (
    <ul className='w-[90%] max-w-[40rem] my-[5rem] mx-auto'>
      {items.map((item) => (
        <EventItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
