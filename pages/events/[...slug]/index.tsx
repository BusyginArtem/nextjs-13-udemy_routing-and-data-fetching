import Head from "next/head";
import { useRouter } from "next/router";

import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import EventList from "@/components/Events/EventList";
import ResultsTitle from "@/components/Events/ResultsTitle";

import { Event } from "@/lib/types";
import { getFilteredEvents } from "@/lib/dbService";

export const getServerSideProps: GetServerSideProps<{ events: Event[] }> = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }

  const slug = params?.slug || [];

  const year = slug[0];
  const month = slug[1];

  const events = await getFilteredEvents({ year, month });

  if (!events) {
    return {
      props: {
        events: [],
      },
    };
  }

  return {
    props: {
      events,
    },
  };
};

export default function FilteredEvents({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const filters = router.query.slug as string[];

  if (!filters) {
    return <p className='text-center my-4'>Loading ...</p>;
  }

  const year = +filters[0];
  const month = +filters[1];

  const isSearchParamsIncorrect = isNaN(year) || isNaN(month) || month < 1 || month > 12 || filters.length > 2;

  return (
    <>
      <Head>
        <title>{`Events for the chosen filter ${month}/${year}`}</title>
        <meta name='description' content={`Events app | Events for the ${month}/${year} period`} />
      </Head>
      <ResultsTitle year={year} month={month} />

      {isSearchParamsIncorrect ? (
        <p className='text-center my-4'>Wrong search params.</p>
      ) : events.length > 0 ? (
        <EventList items={events} />
      ) : (
        <p className='text-center my-4'>No events found for chosen filter!</p>
      )}
    </>
  );
}
