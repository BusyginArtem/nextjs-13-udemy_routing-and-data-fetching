import Link from "next/link";

export default function LinkButton({
  href,
  children,
}: {
  href: string | { pathname: string; query: Record<string, string | number | string[] | number[]> };
  children: React.ReactNode;
}) {
  return (
    <Link
      className='text-[#dafff7] bg-[#03be9f] border border-[#03be9f] rounded-[6px] py-2 px-6 text-center cursor-pointer shadow-[0_1px_6px_rgba(0,_0,_0,_0.2)] hover:bg-[#02afa1] hover:border-[#02afa1]'
      href={href}
    >
      {children}
    </Link>
  );
}
