import Head from "next/head";
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
        revalidate: 60 * 60, // 3600 one hour
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

export default function Events({ events }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>All events</title>
        <meta name='description' content='Events app | All events' />
      </Head>
      <EventsSearch />
      <EventList items={events} />
    </>
  );
}
