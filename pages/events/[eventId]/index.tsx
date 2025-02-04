import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import EventSummary from "@/components/EventDetail/event-summary";
import EventLogistics from "@/components/EventDetail/event-logistics";
import EventContent from "@/components/EventDetail/event-content";
import { Event } from "@/lib/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`);

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.statusText}`);
  }

  const events = await res.json();

  const paths = Object.keys(events).map((eventId) => ({
    params: { eventId },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{ event: Event | null }> = async (context) => {
  const { params } = context;

  if (!params || !params.eventId) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events/${params.eventId}`);
  const event: Event = await res.json();

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event: {
        ...event,
        id: params.eventId as string,
      },
    },
    revalidate: 60,
  };
};

export default function EventDetailPage({ event }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!event) {
    return <h6>Event not found!</h6>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics address={event.location} date={event.date} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p className=''>{event.description}</p>
      </EventContent>
    </>
  );
}
