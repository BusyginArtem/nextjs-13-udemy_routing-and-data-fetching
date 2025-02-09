import type { InferGetStaticPropsType, GetStaticProps } from "next";

import EventList from "@/components/Events/EventList";
import { Event } from "@/lib/types";
import { getFeaturedEvents } from "@/lib/dbService";
import Head from "next/head";

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async (context) => {
  try {
    const events = await getFeaturedEvents();

    if (!events.length) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        events,
        revalidate: 60 * 60, // 3600 one hour
        // revalidate: 30, // 30 seconds
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
  return (
    <>
      <Head>
        <title>Featured events</title>
        <meta name='description' content='Events app' />
      </Head>
      <EventList items={events} />
    </>
  );
}
