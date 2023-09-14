import Head from "next/head";
import Nav from "@/components/Nav";
import React, { useState, useRef } from "react";
import Drawer from "@/components/Drawer";
import Webcam from "react-webcam";
import styles from "@/src/styles/Camera.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { useTorchLight } from "@blackbox-vision/use-torch-light";

export default function Price() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const { id } = router.query;

  const [torchEnabled, setTorchEnabled] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);

  // Declare and initialize the streamRef
  const streamRef = useRef(null);

  // Toggle Torch
  const [on, toggle] = useTorchLight();

  const toggleTorch = () => {
    setTorchEnabled(!torchEnabled);
    toggle(streamRef.current); // Pass the streamRef to the toggle function
  };

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "environment",
    torch: torchEnabled,
  };

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

      if (response.status === 200) {
        console.log(response.data); // Handle success
      } else {
        console.error("Error:", response.status, response.statusText); // Handle error
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
      <Nav />
      <Drawer />
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
        <button style={{ marginBottom: "40px" }} onClick={toggleTorch}>
          {torchEnabled ? "Disable Torch" : "Enable Torch"}
        </button>

        {imgSrc && (
          <img
            style={{ position: "absolute", left: "20%", top: "-20px" }}
            src={imgSrc}
            alt="captured image"
          />
        )}
      </main>
    </div>
  );
}
