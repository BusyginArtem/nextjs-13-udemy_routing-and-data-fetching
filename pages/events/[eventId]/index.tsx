import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import EventSummary from "@/components/EventDetail/event-summary";
import EventLogistics from "@/components/EventDetail/event-logistics";
import EventContent from "@/components/EventDetail/event-content";
import { Event } from "@/lib/types";
import { getAllEvents, getEventById } from "@/lib/dbService";

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();

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

  const event = await getEventById({ id: params.eventId as string });

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
