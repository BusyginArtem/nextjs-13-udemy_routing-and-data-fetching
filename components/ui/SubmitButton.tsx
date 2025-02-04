export default function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className='text-[#dafff7] bg-[#03be9f] border border-[#03be9f] rounded-[6px] py-2 px-6 text-center cursor-pointer shadow-[0_1px_6px_rgba(0,_0,_0,_0.2)] hover:bg-[#02afa1] hover:border-[#02afa1]'
      type='submit'
    >
      {children}
    </button>
  );
}
