import Head from "next/head";
import * as React from "react";

interface AppProps {
  children: React.ReactElement;
}

function App({ children }: AppProps) {
  return (
    <>
      <Head>
        <title>ASC</title>
        <meta name="description" content="This is the ASC home page" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b4a3fd" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      {/* <Header /> */}
      <main className="overflow-hidden">{children}</main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
