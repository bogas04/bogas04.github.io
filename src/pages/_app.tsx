import "../global.css";
import Head from "next/head";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-110963096-1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());

                gtag('config', 'UA-110963096-1');

                (function (d, s, scripts) {
                    var js,
                        fjs = d.getElementsByTagName(s)[0];
                    for (var i = 0; i < scripts.length; i++) {
                        if (!d.getElementById(scripts[i].id)) {
                            js = d.createElement(s);
                            js.id = scripts[i].id;
                            js.src = scripts[i].url;
                            fjs.parentNode.insertBefore(js, fjs);
                        }
                    }
                })(document, "script", [
                    { id: "google-platform", url: "//apis.google.com/js/platform.js" }
                ]);
            `,
          }}
        ></script>
      </Head>
    </>
  );
}
