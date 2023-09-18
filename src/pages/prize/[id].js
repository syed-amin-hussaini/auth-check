import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Webcam from "react-webcam";

import styles from "@/src/styles/Camera.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { TorchContextProvider, torchContext } from "@/components/useTorch";
import TorchControl from "@/components/torchControl";
import Footer from "@/components/Footer";
import CompleteLogo from "@/public/assets/images/complete-logo.png";
import Image from "next/image";

export default function Price() {
  // // Torch
  // const [torch, setTorch] = useState(false)

  // const CheckTorch = (torch) => {
  //   console.log("CheckTorch")
  //   console.log({torch})
    
  // }

  // useEffect(() => {
  //   console.log("useEffect")
  //   CheckTorch();
  // }, [])

  // Torch end

  const router = useRouter();
  const { id } = router.query;

  // Camera
  const videoConstraints = {
    width: 500,
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
    // Camera End

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
          {/* <TorchContextProvider>
            <TorchControl />
          </TorchContextProvider> */}
         
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
          
        </div>

        <p className="text-white text-center fw_r">
          place the cookie in the center and tap to scan
        </p>
        <button onClick={capture}>Scan {id}</button>

        <Footer />
      </main>
    </div>
  );
}
