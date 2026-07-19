import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* GoatCounter analytics */}
          <script
            data-goatcounter="https://bogas04.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
          ></script>
          {/* RSS feed link */}
          <link rel="alternate" type="application/rss+xml" href="/blog.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
