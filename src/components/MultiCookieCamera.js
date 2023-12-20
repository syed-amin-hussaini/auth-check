import Head from "next/head";
// import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Webcam from "react-webcam";

import styles from "@/src/styles/Camera.module.scss";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import CompleteLogo from "@/public/assets/images/complete-logo.png";
import Image from "next/image";
import TooltipButton from "@/components/TooltipButton";
import { cookieDataClient } from "@/components/GenerateToken";
import { abortRequest, restartCall } from "@/components/Axios";
import Thankyou from "@/pages/thankyou";

export default function MultiCookieCamera({ cookieDetail, handleClick }) {
  const router = useRouter();
  // Camera
  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "environment",
  };

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState();
  const [thankYouMsg, setThankYouMsg] = React.useState();
  const [imageSend, setImageSend] = useState(true);
  const [imageVerify, setImageVerify] = useState(false);
  const [imageMsg, setImageMsg] = useState("Scan");
  const [imageArr, setImageArr] = useState();

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    let userData = await cookieDataClient();
    setImageSend(false);
    let data_i = JSON.stringify({
      user_id: userData?.id,
      collection_id: cookieDetail?.collection_id,
      product_id: cookieDetail?.product_id,
      img: imageSrc,
    });

    // Camera End
    try {
      // Send the captured image to a third-party API
      let res = await restartCall("/api/scanCookie?type=grand", data_i);
      if (
        res?.data?.result?.status === "success" ||
        res?.data?.result?.status === "failed"
      ) {
        setImageSend(true);
        setImageVerify(true);
        // console.log(res?.data?.result?.cookie_img);
        setImgSrc(res?.data?.result?.cookie_img);
        setThankYouMsg(res?.data?.result?.msg);
      } else if (res?.data?.result?.status === "retry") {
        setImageMsg("Scan Again");
        setImageSend(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Cookie status checking
  useEffect(() => {
    setImageArr(cookieDetail?.cookieArray);
  }, [cookieDetail?.cookieArray]);

  const handleBack = () => {
    if (imageVerify) {
      router.replace(router.asPath);
      handleClick();
      setImageVerify(false);
      setThankYouMsg("");
      setImgSrc("");
    }
  };
  const cameraBack = async () => {
    setImageSend(true);
    handleClick();
    let res = await abortRequest();
    console.log({ res });
  };

  return (
    <div>
      <Head>
        <title>Oreo | Multi Cookie Scan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${styles.main} ${
          imageSend && styles.active
        } container-fluid`}
      >
        <Image
          className={`z_2 ${styles.logo} mb-5`}
          src={CompleteLogo}
          width="50px"
          height="20px"
          alt="Complete Logo"
        />
        <div className="d-flex justify-content-between pt-4 position-absolute px-3 top-0 w-100 z_2">
          <span
            className={`rounded-circle ${styles.btnContainer}`}
            onClick={() => cameraBack()}
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
            <svg
              height="100%"
              width="100%"
              version="1.1"
              id="_x31_7"
              x="0px"
              y="0px"
              viewBox="0 0 63.63 64.1"
            >
              <path
                fill="#0084C7"
                d="M54.32,9.38L54.32,9.38C48.54,3.56,40.62,0,31.84,0C23.06,0,15.08,3.56,9.35,9.38C3.58,15.2,0,23.18,0,32.03
	s3.58,16.88,9.35,22.65c5.73,5.81,13.7,9.42,22.49,9.42c8.78,0,16.7-3.61,22.48-9.42c5.78-5.77,9.31-13.8,9.31-22.65
	S60.09,15.2,54.32,9.38L54.32,9.38z"
              />
              <g>
                <path
                  fill="#FFFFFF"
                  d="M31.81,16.31L18.57,27.66v18.52c0,1.49,1.2,2.69,2.69,2.69h21.12c1.49,0,2.69-1.2,2.69-2.69V27.66L31.81,16.31
		z M30.59,45.02c0,0.59-0.48,1.06-1.06,1.06H24.5c-0.59,0-1.06-0.48-1.06-1.06v-11.5c0-0.59,0.48-1.06,1.06-1.06h5.03
		c0.59,0,1.06,0.48,1.06,1.06V45.02z M40.6,36.86c0,0.51-0.41,0.92-0.92,0.92h-6.07c-0.51,0-0.92-0.41-0.92-0.92v-3.48
		c0-0.51,0.41-0.92,0.92-0.92h6.07c0.51,0,0.92,0.41,0.92,0.92V36.86z"
                />
                <path
                  fill="#FFFFFF"
                  d="M41.1,27.46h-2.8c-0.3,0-0.55-0.25-0.55-0.55v-8.89c0-0.3,0.25-0.55,0.55-0.55h2.8c0.3,0,0.55,0.25,0.55,0.55
		v8.89C41.65,27.21,41.4,27.46,41.1,27.46z"
                />
                <g>
                  <path
                    fill="#FFFFFF"
                    d="M46.5,31.74L32.94,20.22c-0.65-0.55-1.6-0.55-2.25,0L17.13,31.74c-0.73,0.62-1.83,0.53-2.45-0.2l0,0
			c-0.62-0.73-0.53-1.83,0.2-2.45l15.81-13.44c0.65-0.55,1.6-0.55,2.25,0l15.81,13.44c0.73,0.62,0.82,1.72,0.2,2.45l0,0
			C48.33,32.27,47.23,32.36,46.5,31.74z"
                  />
                </g>
              </g>
            </svg>
          </span>
          {/* <HomeLogo /> */}
          <TooltipButton
            id={"tooltip-1"}
            text={
              "Select one of the 5 limited edition <br>Oreo x Monopoly cookies and upload <br>to complete your collection."
            }
            multiple={true}
            image={imageArr}
          />
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
        </div>

        <div className="text-center" style={{ minHeight: "120px",zIndex:"1" }}>
          {imageSend ? (
            <p className="text-white text-center fw_r pb-2">
              place the cookie in the center <br /> and tap to scan
            </p>
          ) : (
            <p className="text-white text-center fw_r pb-2">
              Scanning in process...
              <br /> &nbsp;
            </p>
          )}
          <svg
            style={
              !imageSend ? { visibility: "hidden", pointerEvents: "none" } : {}
            }
            onClick={() => capture()}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={"80px"}
            height={"80px"}
            viewBox="0 0 63.63 64.1"
          >
            <path
              fill="#213167"
              d="M54.32,9.38L54.32,9.38C48.54,3.56,40.62,0,31.84,0C23.06,0,15.08,3.56,9.35,9.38C3.58,15.2,0,23.18,0,32.03
	s3.58,16.88,9.35,22.65c5.73,5.81,13.7,9.42,22.49,9.42c8.78,0,16.7-3.61,22.48-9.42c5.78-5.77,9.31-13.8,9.31-22.65
	S60.09,15.2,54.32,9.38L54.32,9.38z"
            />
            <g>
              <path
                fill="none"
                stroke="#FFFFFF"
                strokeMiterlimit="10"
                d="M43.82,24.66h-5.17l-0.59-3.21c-0.15-0.79-0.78-1.36-1.52-1.36H31.8h-4.72c-0.73,0-1.37,0.57-1.51,1.36
		l-0.59,3.21h-3.92h-1.24c-2.65,0-4.81,2.28-4.81,5.1v9.14c0,2.82,2.16,5.11,4.81,5.11h24.01c2.65,0,4.8-2.29,4.8-5.11v-9.14
		C48.62,26.94,46.48,24.66,43.82,24.66L43.82,24.66z"
              />
              <path
                fill="none"
                stroke="#FFFFFF"
                strokeMiterlimit="10"
                d="M31.82,26.71L31.82,26.71c1.93,0,3.68,0.79,4.95,2.06c1.26,1.28,2.04,3.04,2.04,4.99
		c0,1.95-0.78,3.71-2.04,4.99c-1.27,1.28-3.02,2.07-4.95,2.07c-1.93,0-3.68-0.79-4.95-2.07c-1.27-1.28-2.05-3.04-2.05-4.99
		c0-1.95,0.78-3.71,2.05-4.99C28.14,27.5,29.89,26.71,31.82,26.71L31.82,26.71z"
              />
            </g>
          </svg>
        </div>

        <Footer className="z_2 visually-hidden" />
      </main>

      <Thankyou
        index={imageVerify ? "10" : "-10"}
        image={imgSrc}
        content={thankYouMsg}
        handleBack={handleBack}
      />
    </div>
  );
}
