import Head from "next/head";

function BrowserTab({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="../favicon.ico" />
    </Head>
  );
}

export default BrowserTab;
