import "@/styles/globals.css";
import Head from "next/head";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import RootLayout from "@/components/Layouts/RootLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <RootLayout>{page}</RootLayout>);

  return getLayout(
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='keywords' content='HTML, CSS, JavaScript, NextJS' />
        <meta name='author' content='Artem Busyhin' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
