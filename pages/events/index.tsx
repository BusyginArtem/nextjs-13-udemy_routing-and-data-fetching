import type { InferGetStaticPropsType, GetStaticProps } from "next";

import EventList from "@/components/Events/EventList";
import EventsSearch from "@/components/Events/EventsSearch";

import { Event } from "@/lib/types";
import { convertEventsToArray } from "@/lib/utils";

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async (context) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`);

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.statusText}`);
    }

    const events = await res.json();

    return {
      props: {
        events: convertEventsToArray(events),
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
