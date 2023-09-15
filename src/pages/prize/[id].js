import Head from "next/head";
// import styles from "../styles/Home.module.css";
import Nav from "@/components/Nav";
import React, { useRef } from "react";
import Drawer from "@/components/Drawer";
import Link from "next/link";
import Webcam from "react-webcam";

import styles from "@/src/styles/Camera.module.scss";
import { useRouter } from "next/router";
import axios from "axios";

import { TorchContextProvider } from "@/components/useTorch";
import TorchControl from "@/components/torchControl";
import Footer from "@/components/Footer";
import CompleteLogo from "@/public/assets/images/complete-logo.png";
import Image from "next/image";

export default function Price() {
  const router = useRouter();
  const { id } = router.query;

  const videoConstraints = {
    width: "100%",
    height: 500,
    facingMode: "environment",
  };

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);


  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    let data_i = JSON.stringify({
      img: imageSrc,
    });

    // Send the captured image to a third-party API
    try {
      const response = await axios({
        method: "post",
        url: "https://obackend.hul-hub.com/api/scan-cookie",
        data: data_i,
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log({ response });
        // Handle success
      } else {
        console.log("Else");
        // Handle error
      }
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} container-fluid`}>
        <Image
          className={styles.logo}
          src={CompleteLogo}
          width="80px"
          height="40px"
          alt="Complete Logo"
        />
        <div className="d-flex justify-content-between w-100 px-3">
          <span
            className={`p-3 bg-black rounded-circle ${styles.btnContainer}`}
            
          >
            <svg
              // xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              // xmlns:svgjs="http://svgjs.com/svgjs"
              // xml:space="preserve"
              className={styles.torch}
              x="0"
              y="0"
              viewBox="0 0 458.017 458.017"
              style={{enableBackground:"new 0 0 512 512"}}
            >
              <g>
                <linearGradient
                  id="a"
                  x1="228.518"
                  x2="228.518"
                  y1="459.305"
                  y2="-3.923"
                  gradientTransform="matrix(1 0 0 -1 0 460.034)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-opacity="1" stop-color="#fff" offset="1"></stop>
                  <stop stop-opacity="1" stop-color="#fff" offset="1"></stop>
                </linearGradient>
                <path
                  
                  d="M313.26 115.017H144.11c-5.526-.044-10.045 4.394-10.1 9.92v54.18a9.814 9.814 0 0 0 2.077 6.33l33.923 72.405v166.324c0 18.669 15.657 33.841 34.327 33.841h49.346c18.67 0 34.327-15.172 34.327-33.841v-73.159h12.452c5.523 0 9.548-4.608 9.548-10.131v-38.1a9.43 9.43 0 0 0-9.548-9.769H288.01v-35.165l34.91-74.6-.507-.124a9.86 9.86 0 0 0 .6-4v-54.191c.109-5.368-4.154-9.809-9.522-9.918-.077-.002-.154-.002-.231-.002zm-159.25 20h149v34h-149v-34zm99.673 303h-49.346c-7.641 0-14.327-6.2-14.327-13.841v-14.159h78v14.159c0 7.641-6.686 13.841-14.327 13.841zm36.327-125v18h-2v-18h2zm-21.281-61.716a10.048 10.048 0 0 0-.719 4.316v134.4h-78v-134.4a10.042 10.042 0 0 0-.719-4.314l-29.081-62.286h137.6l-29.081 62.284z"
                  style={{ fill:"url(#a)"}}
                  fill=""
                ></path>
                <linearGradient
                  id="b"
                  x1="229.01"
                  x2="229.01"
                  y1="459.305"
                  y2="-3.923"
                  gradientTransform="matrix(1 0 0 -1 0 460.034)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    stop-opacity="1"
                    stop-color="#fff"
                    offset="0"
                  ></stop>
                  <stop
                    stop-opacity="1"
                    stop-color="#fff"
                    offset="0"
                  ></stop>
                </linearGradient>
                <path
                  className={styles.shade}
                  d="M229.01 85.76c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10s-10 4.477-10 10v65.76c0 5.523 4.477 10 10 10z"
                  style={{ fill:"url(#b)"}}
                  fill=""
                ></path>
                <linearGradient
                  id="c"
                  x1="309.387"
                  x2="309.387"
                  y1="459.305"
                  y2="-3.98"
                  gradientTransform="matrix(1 0 0 -1 0 460.034)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-opacity="1" stop-color="#fff" offset="0"></stop>
                  <stop stop-opacity="1" stop-color="#fff" offset="1"></stop>
                </linearGradient>
                <path
                  className={styles.shade}
                  d="M318.51 9.139c-5.373-1.279-10.765 2.039-12.044 7.412l-13.616 57.21c-1.279 5.373 2.04 10.765 7.413 12.044s10.765-2.04 12.044-7.413l13.616-57.21c1.278-5.373-2.04-10.764-7.413-12.043z"
                  style={{ fill:"url(#c)"}}
                  fill=""
                ></path>
                <linearGradient
                  id="d"
                  x1="148.628"
                  x2="148.628"
                  y1="459.305"
                  y2="-3.985"
                  gradientTransform="matrix(1 0 0 -1 0 460.034)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-opacity="1" stop-color="#fff" offset="1"></stop>
                  <stop stop-opacity="1" stop-color="#fff" offset="1"></stop>
                </linearGradient>
                <path
                  className={styles.shade}
                  d="M155.43 86.079c5.53-.004 10.01-4.49 10.006-10.02a10.045 10.045 0 0 0-.269-2.298l-13.616-57.21c-1.279-5.373-6.671-8.692-12.044-7.413s-8.692 6.671-7.413 12.044l13.616 57.21a10.006 10.006 0 0 0 9.72 7.687z"
                  style={{ fill:"url(#d)"}}
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
          <Link
            className={`p-3 bg-black rounded-circle ${styles.btnContainer}`}
            href="/dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 30 30"
            >
              {" "}
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
            </svg>
          </Link>
        </div>
        <div className={styles.cameraContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored={false}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
          />

          {imgSrc && (
            <img
              style={{ position: "absolute", left: "20%", top: "-20px" }}
              src={imgSrc}
            />
          )}
          <TorchContextProvider>
            <TorchControl />
          </TorchContextProvider>
        </div>

        <p className="text-white">
          place the cookie in the center and tap to scan
        </p>
        <button onClick={capture}>Scan {id}</button>

        <Footer />
      </main>
    </div>
  );
}
