import Head from "next/head";
// import fetch from "node-fetch";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  async function getSentiment() {
    try {
      const response = await fetch(
        `https://serverless-py.vercel.app/goemotions?text=${text}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(text),
        }
      );
      if (!response.ok) {
        throw Error("Error could not analyze");
      }
      const data = await response.json();

      setResult(data);
      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  }

  const handleGetSentiment = (e) => {
    e.preventDefault();
    getSentiment();
    setText("");
  };

  const tapServer = () => {
    return fetch("https://serverless-py.vercel.app/")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  };
  useEffect(() => {
    tapServer();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <form onSubmit={handleGetSentiment}>
          <input
            type="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Get Sentiment</button>
        </form>
      </div>
    </div>
  );
}