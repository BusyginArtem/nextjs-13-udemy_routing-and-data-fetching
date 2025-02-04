import Link from "next/link";
import React from "react";

export default function MainHeader() {
  return (
    <header className='w-full flex justify-between items-baseline py-4 px-[10%] h-20 bg-gray-900 sticky top-0'>
      <div className='text-2xl md:text-4xl text-teal-300 font-fira'>
        <Link href='/'>NextEvents</Link>
      </div>
      <nav>
        <ul className='text-teal-400 text-lg md:text-xl'>
          <li>
            <Link href='/events'>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
