import LinkButton from "../ui/LinkButton";

function ResultsTitle({ year, month }: { year: number; month: number }) {
  const date = new Date(year, month);

  const humanReadableDate = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className='my-8 mx-auto w-[90%] max-w-[40rem] text-center flex flex-col gap-2'>
      <h1>Events in {humanReadableDate}</h1>
      <LinkButton
        href={{
          pathname: "/events",
          query: { year, month },
        }}
      >
        Show all events
      </LinkButton>
    </section>
  );
}

export default ResultsTitle;
