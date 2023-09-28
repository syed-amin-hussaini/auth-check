import Head from "next/head";

import styles from "@/src/styles/Thankyou.module.scss";
import CompleteLogo from "@/public/assets/images/complete-logo.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import Uncle from "@/public/assets/images/thankyou/uncle.png";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layer from "@/public/assets/images/thankyou/layer-3.png";
import CurvedText from "@/components/CurvedText";
import Nav from "@/components/Nav";

const Thankyou = ({ content, image, index = 0, handleBack = "" }) => {
  useEffect(() => {
    if (!image) return;
    // setTimeout(() => {
      // return handleBack();
    // }, 5000);
  }, [index]);

  return (
    <div
      className="w-100 position-absolute top-0 start-0"
      style={{ zIndex: index }}
    >
      <Nav />
      <main
        className={`${styles.main} container-fluid`}
        style={{ backgroundImage: `url(${Layer.src})` }}
      >
        {/* <Image
          // className={`${styles.logo}`}
          src={Layer}
          alt="Complete Logo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          style={{zIndex: -2}}
          /> */}

        <div className={`d-flex justify-content-between align-items-center w-100 px-3 ${styles.logoContainer}`}>
          <span
            onClick={() => handleBack()}
            className={`bg-white rounded-circle ${styles.btnContainer}`}
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
            <svg width="100%" height="100%" x="0" y="0" viewBox="0 0 24 24">
              <g>
                <path
                  d="M10.6 12.71a1 1 0 0 1 0-1.42l4.59-4.58a1 1 0 0 0 0-1.42 1 1 0 0 0-1.41 0L9.19 9.88a3 3 0 0 0 0 4.24l4.59 4.59a1 1 0 0 0 .7.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.42Z"
                  fill="#000"
                  opacity="1"
                  data-original="#000"
                ></path>
              </g>
            </svg>
          </span>
          <Image
            className={`${styles.logo}`}
            src={CompleteLogo}
            alt="Complete Logo"
          />
          <span
            // onClick={}
            className={`bg-white rounded-circle opacity-0 ${styles.btnContainer}`}
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
                  fill="#000"
                  fillRule="evenodd"
                  d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                  data-original="#000"
                  className=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
        <CurvedText image={image} />
        {content && (
          <p className={`${styles.thankyou_content} fs-5 fw_r mb-5 text-white`}>
            {content}
          </p>
        )}
        <h1 className="fs-1 text-white mb-5">Stay playful</h1>
        <Footer className={"mb-3"} />
      </main>
    </div>
  );
};

Thankyou.defaultProps = {
  image: Uncle,
  content:
    "Your cookie will be analyzed, and we'll let you know if you're eligible to claim the prize.",
};

export default Thankyou;
