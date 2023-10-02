import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";

export default function Faq() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className={{}}>
      <Head>
        <title>Oreo | Faq</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
     <h1>Faq</h1>
    </div>
  );
}
