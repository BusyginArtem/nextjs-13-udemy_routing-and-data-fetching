import type { InferGetStaticPropsType, GetStaticProps } from "next";

import EventList from "@/components/Events/EventList";
import { Event } from "@/lib/types";
import { getFeaturedEvents } from "@/lib/dbService";

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async (context) => {
  try {
    const events = await getFeaturedEvents();

    return {
      props: {
        events,
      },
    };
  } catch (error) {
    return {
      props: {
        events: [],
      },
    };
  }
};

export default function Home({ events }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <EventList items={events} />;
}
