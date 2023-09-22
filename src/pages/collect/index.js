import Image from "next/image";
import React from "react";

import Logo from "@/public/assets/images/complete-logo.png";
import Uncle from "@/public/assets/images/almost-there/chacha.webp";
import layer from "@/public/assets/images/layer-2.webp";
import styles from "@/src/styles/Collection.module.scss";
import Footer from "@/components/Footer";
import Head from "next/head";

const Index = ({ result }) => {
  // console.log({result})
  let { boardId, cookieLeft, cookieCollect } = result;
  console.log({ boardId }, { cookieLeft }, { cookieCollect });
  return (
    <>
      <Head>
        <title>Oreo | Collect cookie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div>
      <div
        className={`${styles.main} text-center`}
        style={{ backgroundImage: `url(${layer.src}) ` }}
      >
        <Image
          alt="Logo"
          src={Logo}
          style={{
            width: "85%",
            objectFit: "contain",
            margin: "0 0 30px",
            paddingBlock: "40px",
            display: "block",
          }}
        />
        <div className="row m-0">
          <p className="col-12 col-sm-9 m-auto p-0 fw_r fs-5 text-white mb-5">
            Collect all 5 embossed cookie, and win the Oreo x Monopoly board!
          </p>
          <h1 className="col-12 col-sm-9 m-auto p-0 fs-2 text-white mb-5">
            Tap the missing cookie to scan
          </h1>
        </div>
        <div className={`${styles.collection_cookie} text-center w-100`}>
          {cookieCollect.map((item, i) => {
            console.log({ item });
            return (
              <div 
                className="position-relative"
                key={i}
              >
                <span className={` position-absolute float-center ${styles.status_icon} ${item.status === "pending" && styles.pending} ${item.status === "complete" && styles.complete} ${item.status === "failed" && styles.failed}`}  dangerouslySetInnerHTML={{ __html: getIcon(item.status) }} />
                <Image
                  alt="collect"
                  src={
                    "https://www.oreostayplayful.com/assets/images/Cookie1.png"
                  }
                  width={100}
                  height={100}
                  layout="cover"
                  objectFit="cover"
                  objectPosition="center"
                  style={item.status == "open" && { opacity: "0.3" }}
                />
              </div>
            );
          })}
        </div>
        <div className="row p-2 text-center w-100">
          <div className="col-sm-12 p-0">
            <h1 className="col-12 col-sm-9 m-auto p-0 fs-2 text-white mb-5">
              You're doing great!{" "}
              <span className="fw_r fs-3"> Only {cookieLeft} cookie left.</span>
            </h1>
          </div>
          <div className="col-sm-12 p-0">
            <Footer />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // pending
  // complete
  // failed
  let result = {
    boardId: 1,
    cookieLeft: 3,
    cookieCollect: [
      {
        id: "1",
        url: "https://www.oreostayplayful.com/assets/images/Cookie1.png",
        status: "pending",
      },
      {
        id: "2",
        url: "https://www.oreostayplayful.com/assets/images/Cookie2.png",
        status: "open",
      },
      {
        id: "3",
        url: "https://www.oreostayplayful.com/assets/images/Cookie3.png",
        status: "open",
      },
      {
        id: "4",
        url: "https://www.oreostayplayful.com/assets/images/Cookie3.png",
        status: "complete",
      },
      {
        id: "5",
        url: "https://www.oreostayplayful.com/assets/images/Cookie5.png",
        status: "failed",
      },
    ],
  };
  return {
    props: { result },
  };
}

function getIcon(status) {
  let icons=  {
     'pending':  `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#fff" class="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>`,
     'failed': `<svg width="100%" height="100%" x="0" y="0" viewBox="0 0 64 64"><g><g fill="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M32.018 2.958c-3.974 0-7.19 3.242-7.19 7.212v24.896c0 3.97 3.216 7.212 7.19 7.212s7.19-3.242 7.19-7.212V10.17c0-3.97-3.215-7.212-7.19-7.212zM32.018 47.023c-3.884 0-7.058 3.126-7.058 6.96 0 3.836 3.174 6.969 7.058 6.969 3.885 0 7.058-3.133 7.058-6.968s-3.173-6.96-7.058-6.96z" fill="#fff" opacity="1" data-original="#fff" class=""></path></g></g></svg>`,
    'complete': `<svg  width="100%" height="100%" x="0" y="0" viewBox="0 0 512 512"><g><path d="M504.502 75.496c-9.997-9.998-26.205-9.998-36.204 0L161.594 382.203 43.702 264.311c-9.997-9.998-26.205-9.997-36.204 0-9.998 9.997-9.998 26.205 0 36.203l135.994 135.992c9.994 9.997 26.214 9.99 36.204 0L504.502 111.7c9.998-9.997 9.997-26.206 0-36.204z" fill="#fff" opacity="1" data-original="#fff" class=""></path></g></svg>`,
  }[status];
  return icons || '';
}

export default Index;
