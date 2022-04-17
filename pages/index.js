import Head from "next/head";
import GoEmotions from "../components/GoEmotions";

export default function Home() {
  return (
    <>
      <Head>
        <title>GoEmotions</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GoEmotions />
    </>
  );
}
