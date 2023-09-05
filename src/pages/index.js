import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import React, { useEffect, useState } from "react";
import Drawer from "@/components/Drawer";
import Link from "next/link";
import Webcam from "react-webcam";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const videoConstraints = {
    width: 250,
    height: 250,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Drawer />
      <main className="container-fluid">
       
        <div className="card mt-5 text-center">
          <div className="card-header card-header bg-warning fw-bold">
            WIN THE GRAND PRIZE
          </div>
          <div className="card-body">
            <p className="card-text">Found Mr Pennybags on the cookie?</p>
            <p className="card-text">Scan it to win a grand prize.</p>
            <Link href="/price/grand" className="btn bg-black text-white fw-bold">
              Scan your Oreo Cookie
            </Link>
          </div>
        </div>

        <div className="card mt-5 text-center">
          <div className="card-header bg-danger">
            <b> A CHANCE TO WIN THE BOARD</b>
          </div>
          <div className="card-body">
            <p className="card-text">
              Scan and collect all 5 limited edition cookies for a chance to win
              Oreo X Monopoly board.
            </p>
            <Link href="/price/collect" className="btn bg-black text-white fw-bold">
              Build your collection
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: { session }
//   }
// }
