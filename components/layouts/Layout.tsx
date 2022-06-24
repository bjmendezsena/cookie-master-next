import * as React from "react";
import Head from "next/head";
import { Navbar } from "../ui";

type Props = {
  children: React.ReactNode;
};
export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>CookieMaster</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main
        style={{
          padding: "20px 50px",
        }}
      >
        {children}
      </main>
    </>
  );
};
