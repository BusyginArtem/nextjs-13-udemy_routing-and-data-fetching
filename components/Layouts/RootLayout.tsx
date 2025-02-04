import MainHeader from "./MainHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main className=''>{children}</main>
    </>
  );
}
