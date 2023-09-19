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
import ReactTooltip, { Tooltip } from "react-tooltip";
import TooltipButton from "@/components/TooltipButton";
import { translate } from "mongodb/lib/core/topologies/read_preference";
import Thankyou from "../thankyou";
import { cookieDataClient } from "@/components/GenerateToken";

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
  const [imageSend, setImageSend] = useState(true);
  const [imageVerify, setImageVerify] = useState(false);

  const capture = async (id) => {
    const imageSrc = webcamRef.current.getScreenshot();
    let userData = await cookieDataClient()
    console.log({userData})
    setImageSend(false);
    setImgSrc(imageSrc);
    let data_i = JSON.stringify({
      // user_id: userData?.,
      type: "grandprice",
      img: imageSrc,
    });
    console.log({imageSrc})
    // Camera End
    setTimeout(() => {
      setImageSend(true);
      setImageVerify(true)
      // router.push("/thankyou",)
      
    }, 5000);

    // Send the captured image to a third-party API
    // try {
    //   const response = await axios({
    //     method: "post",
    //     url: "https://obackend.hul-hub.com/api/scan-cookie",
    //     data: data_i,
    //     headers: {
    //       "Content-Type": "application/json",
    //       'Authorization': 'Bearer 1|yC7fICr8O4NSwjkFq6xBsDuMMBDtoPFXkXKIj1Qp'
    //     },
    //   });

    //   if (response.ok) {
    //     console.log({ response });
    //     setImageSend(true);
    //     setImageVerify(true)
    //     // Handle success
    //   } else {
    //     setImageSend(false);
    //     console.log("Else");
    //     // Handle error
    //   }
    // } catch (error) {
    //   console.error("Error sending image:", error);
    // }
  };

  return (
    <div>
      <Head>
        <title>Oreo | Cookie Scan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {!imageVerify ? */}
        <main
          className={`${styles.main} ${
            imageSend && styles.active
          } container-fluid`}
        >
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
            <TooltipButton
              id={"tooltip-1"}
              text={
                "This is the rare Oreo cookie you <br>need to look for! If you've found it, <br>place it in the centre and upload."
              }
            />
            <Link
              className={`bg-black rounded-circle ${styles.btnContainer}`}
              href="/dashboard"
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
              <svg version="1.1" x="0" y="0" viewBox="0 0 24 24" className="">
                <g>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                    data-original="#fff"
                    className=""
                  ></path>
                </g>
              </svg>
            </Link>
          </div>
          <div className={styles.cameraContainer}>
            <div className={styles.scanning_bar} />
            <Webcam
              audio={false}
              ref={webcamRef}
              mirrored={false}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
            />

            {/* {imgSrc && (
              <img
                style={{ position: "absolute", left: "20%", top: "-20px" }}
                src={imgSrc}
              />
            )} */}
          </div>

          <div style={{ minHeight: "120px" }}>
            {imageSend ? (
              <p className="text-white text-center fw_r pb-2">
                place the cookie in the center <br /> and tap to scan
              </p>
            ) : (
              <p className="text-white text-center fw_r pb-2">
                Scanning in process...
              </p>
            )}
            {imageSend && <button onClick={() => capture(id)}>Scan</button>}
          </div>

          <Footer />
        </main>
      {/* ': */}
      {/* <Thankyou  /> } */}
    </div>
  );
}
