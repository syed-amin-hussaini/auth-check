import Head from "next/head";
// import styles from "../styles/Home.module.css";
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
          {/* <span id="my-anchor-element" className={`p-3 bg-white rounded-circle ${styles.btnContainer}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"/>
            </svg>
          </span>
          <Tooltip
            anchorSelect="#my-anchor-element"
            content="Hello world!"
            place="left"
            openOnClick={true}
          /> */}
          <TooltipButton id={"tooltip-1"} text={"This is the rare Oreo cookie you <br>need to look for! If you've found it, <br>place it in the centre and upload."} />
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
