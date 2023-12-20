import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import React, { useEffect, useState, useRef } from "react";
import Drawer from "@/components/Drawer";
import Link from "next/link";
import Image from "next/image";
import HomeScreen from "@/public/assets/images/almost-there/home-screen.png";
import Score from "@/public/assets/images/login/score.svg";

export default function Home() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Prompt the user before they leave the page
      // const confirmationMessage = "Are you sure you want to leave?";
      // event.returnValue = confirmationMessage;
      return (event.returnValue = "");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // window.addEventListener('beforeunload');

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // window.removeEventListener('beforeunload');
    };
  }, []);
  return (
    <div>
      <Head>
        <title>Oreo | Home page</title>
        <link
          href="https://db.onlinewebfonts.com/c/7001cb455721479a34c81bc405ad96d4?family=Pluto+Black"
          rel="stylesheet"
        />
      </Head>
      <main className="container-fluid main float-center flex-column gap-4 px-3">
        <Nav />
        <Image style={{width:"60%",height:"auto"}} className="" src={HomeScreen} alt={"Uncle"} />
        <div className="d-flex justify-content-between pt-4 position-absolute px-3 top-0 w-100">
          <span
            className={`rounded-circle btnContainer`}
            // onClick={() => }
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 30 30"
              height="100%"
              width="100%"
            >
              {" "}
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
            </svg> */}
            <Image src={Score} className="btnContainer"  alt="Score image"/>
          </span>
         
        </div>
        <div className="card text-center w-75">
          <div className="card-header bg-warning text-white fw_b fs-6">
            Find Mr. Monopoly
          </div>
          <div className="card-body">
            <p className="card-text px-4 fw_r">
              Scan the cookie and get a chance to win a grand prize.
            </p>
            <Link
              href="/grand-prize"
              className="btn bg-black text-white fw-bold w-75"
            >
              Scan your cookie
            </Link>
          </div>
        </div>

        <div className="card text-center w-75">
          <div className="card-header bg-danger text-white fw_b fs-6">
            <b> Collect all 5 to win!</b>
          </div>
          <div className="card-body">
            <p className="card-text fw_r px-4 mb-4">
              Scan all 5 Monopoly cookies and get a chance to win a Limited
              Edition Board.
            </p>
            <Link href="/collect" className="btn bg-black text-white fw-bold w-75">
              Build your collection
            </Link>
          </div>
        </div>
        <div className="card text-center w-75">
          <div className="card-header bg-success text-white fw_b fs-6">
            <b> Play Oreo X Monopoly Street Game </b>
          </div>
          <div className="card-body">
            <p className="card-text fw_r px-4 mb-4">
              Roll the dice and try your luck to win exciting Oreo gifts!
            </p>
            <Link href="/" className="btn bg-black text-white fw-bold w-75">
              Play Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: '/',
//   //       permanent: false,
//   //     },
//   //   }
//   // }

//   return {
//     props: { session },
//   };
// }
