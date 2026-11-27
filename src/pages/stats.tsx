import Head from "next/head";

const STATS_URL = "https://bogas04.goatcounter.com/";

export default function StatsRedirect() {
  return (
    <>
      <Head>
        <title>Stats | divjot</title>
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content={`0;url=${STATS_URL}`} />
      </Head>
      <main className="min-h-screen bg-[#333] p-8 text-white">
        <p>Opening <a className="underline" href={STATS_URL}>site statistics</a>…</p>
      </main>
    </>
  );
}
