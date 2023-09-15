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

import { useTorchLight } from '@blackbox-vision/use-torch-light';
import { HTMLStreamElement, Stream } from "@cloudflare/stream-react";
import { TorchContextProvider } from "@/components/useTorch";
import TorchControl from "@/components/torchControl";


export default function Price() {
  
  const router = useRouter();
  const { id } = router.query

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "environment",
  };

  // Torch
  const streamRef = useRef<HTMLStreamElement>(null);

  const [on, toggle] = useTorchLight(streamRef.current);

  // 

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    let data_i = JSON.stringify({
      img: imageSrc
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
        console.log({response})
        // Handle success
      } else {
        console.log("Else")
        // Handle error
      }
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} container-fluid`}>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={false}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg" 
          screenshotQuality={1}
          />
        <button onClick={capture}>Capture photo {id}</button>
        <button onClick={toggle} style={{marginBottom:"40px"}}>{on ? 'Disable Torch' : 'Enable Torch'}</button>
        {imgSrc && <img style={{position: "absolute",left: "20%",top: "-20px"}} src={imgSrc} />}
        <TorchContextProvider>
          <TorchControl />
        </TorchContextProvider>
      </main>
    </div>
  );
}
