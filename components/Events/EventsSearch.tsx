import React from "react";
import SubmitButton from "../ui/SubmitButton";
import { useRouter } from "next/router";

export default function EventsSearch() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      year: { value: string };
      month: { value: string };
    };

    router.push(`/events/${formElements.year.value}/${formElements.month.value}`);
  };

  const { year: selectedYear = "", month: selectedMonth = 1 } = router.query;

  return (
    <form
      onSubmit={handleSubmit}
      className='m-8 mx-auto shadow-md p-4 bg-white rounded-lg w-[90%] max-w-[40rem] flex justify-between flex-row gap-4'
    >
      <div className='w-full flex flex-col gap-4 md:flex-row md:w-[80%] flex-1'>
        <div className='flex-1 flex gap-4 items-center justify-between'>
          <label htmlFor='year' className='font-bold'>
            Year
          </label>
          <select
            defaultValue={selectedYear}
            name='year'
            id='year'
            className='font-inherit bg-white rounded-md w-[80%] md:w-full p-1'
          >
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>

        <div className='flex-1 flex gap-4 items-center justify-between'>
          <label htmlFor='month' className='font-bold'>
            Month
          </label>
          <select
            defaultValue={selectedMonth}
            id='month'
            name='month'
            className='font-inherit bg-white rounded-md w-[80%] md:w-full p-1'
          >
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>
      </div>

      <SubmitButton>Find Events</SubmitButton>
    </form>
  );
}
