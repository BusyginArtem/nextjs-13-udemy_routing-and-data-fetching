type Props = {
  title: string;
};

function EventSummary(props: Props) {
  const { title } = props;

  return (
    <section className='w-full h-[30vh] bg-gradient-to-bl from-teal-700 to-teal-900'>
      <h1 className='m-0 pt-12 text-2xl text-center text-white md:text-5xl'>{title}</h1>
    </section>
  );
}

export default EventSummary;
