import classes from "./event-content.module.css";

function EventContent({ children }: { children: React.ReactNode }) {
  return (
    <section className='text-2xl text-[#3a3a3a] w-[90%] max-w-[40rem] m-auto mt-32 text-center'>{children}</section>
  );
}

export default EventContent;
