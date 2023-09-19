import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import React, { useEffect, useState, useRef} from "react";
import Drawer from "@/components/Drawer";
import Link from "next/link";

export default function Home(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div>
      <Head>
        <title>Oreo | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://db.onlinewebfonts.com/c/7001cb455721479a34c81bc405ad96d4?family=Pluto+Black" rel="stylesheet" />
      </Head>
      <main className="container-fluid main float-center flex-column gap-4 px-3">
      <Nav />
      <Drawer />
               
        <div className="card text-center w-100">
          
            <div className="card-header bg-warning text-black fw_b fs-6">
              WIN THE GRAND PRIZE
            </div>
            <div className="card-body">
              <p className="card-text fw_r">Found Mr Pennybags on the cookie?</p>
              <p className="card-text fw_r">Scan it to win a grand prize.</p>
              <Link href="/prize/grand" className="btn bg-black text-white fw-bold">
                Scan your Oreo Cookie
              </Link>
            </div>
        </div>

        <div className="card text-center w-100">
          <div className="card-header bg-danger text-black fw_b fs-6">
            <b> A CHANCE TO WIN THE BOARD</b>
          </div>
          <div className="card-body">
            <p className="card-text fw_r">
              Scan and collect all 5 limited edition cookies for a chance to win
              Oreo X Monopoly board.
            </p>
            <Link href="/prize/collect" className="btn bg-black text-white fw-bold">
              Build your collection
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log({session})
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: { session }
  }
}
