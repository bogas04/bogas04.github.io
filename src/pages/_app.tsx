import Head from "next/head";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

import "../global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // remove all sws
    if (window.navigator.serviceWorker) {
      navigator.serviceWorker
        .getRegistrations()
        .then((sws) => sws.map((sw) => sw.unregister()));
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta content="#333333" name="theme-color" />
        <script async src="https://unpkg.com/thesemetrics@latest"></script>
      </Head>
    </ThemeProvider>
  );
}
