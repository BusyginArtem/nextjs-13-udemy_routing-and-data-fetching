import type { InferGetStaticPropsType, GetStaticProps } from "next";

import EventList from "@/components/Events/EventList";
import EventsSearch from "@/components/Events/EventsSearch";

import { Event } from "@/lib/types";
import { getAllEvents } from "@/lib/dbService";

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async () => {
  try {
    const events = await getAllEvents();

    return {
      props: {
        events,
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: {
        events: [],
      },
    };
  }
};

export default function Events({ events }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <EventsSearch />
      <EventList items={events} />
    </>
  );
}
