import Head from "next/head";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

import "../app.css";

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
        <meta
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
          name="viewport"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta content="#333333" name="theme-color" />
      </Head>
    </ThemeProvider>
  );
}
