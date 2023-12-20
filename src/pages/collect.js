import Image from "next/image";
import React, { useEffect, useState } from "react";

import Logo from "@/public/assets/images/complete-logo.png";
import layer from "@/public/assets/images/layer-2.webp";
import styles from "@/src/styles/Collection.module.scss";
import Footer from "@/components/Footer";
import Head from "next/head";
const MultiCookieCamera = React.lazy(() =>
  import("@/components/MultiCookieCamera")
);
import { useRouter } from "next/router";
import { handleCallback } from "mongodb/lib/utils";
import { axiosCall, fetchData } from "@/components/Axios";
import { cookieDataServer, revertToken } from "@/components/GenerateToken";
import Nav from "@/components/Nav";
import nookies, { setCookie } from "nookies";
import TooltipButton from "@/components/TooltipButton";
import CompleteLogo from "@/public/assets/images/complete-logo-1.png";
import UncleCookie from "@/public/assets/images/camera/Mr.Monopoly-cookie.png";
import Uncle from "@/public/assets/images/camera/uncle-half.png";
const Index = ({ result, cookieArray }) => {
  let { collection_id, cookieLeft, cookieCollect = [] } = result;

  const router = useRouter();

  const [camera, setCamera] = useState(false);
  const [cookieDetail, setCookieDetail] = useState();

  const CurrentCookie = (collection_id, value) => {
    setCamera(true);
    let product_id = value?.product_id;
    setCookieDetail({
      collection_id,
      product_id,
      cookieArray,
    });
  };
  const handleClick = () => {
    router.replace(router.asPath);
    setCamera(false);
  };

  // console.log({result})

  return (
    <>
      <Head>
        <title>Oreo | Collect cookie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <div
          className={`${styles.main} text-center`}
          style={{ backgroundImage: `url(${layer.src})` }}
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
              onClick={() => history.go(-1)}
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
              id={"tooltip-2"}
              text={
                "Select one of the 5 limited edition <br>Oreo x Monopoly cookies and upload <br>to complete your collection."
              }
              multiple={true}
              image={cookieArray}
            />
          </div>
          <div className="row m-0" style={{ marginTop: "120px !important" }}>
            <div
              className="col-9 m-auto position-relative"
              style={{ marginTop: "120px !important" }}
            >
              <Image
                className={styles.uncleHalf}
                src={Uncle}
                style={{ width: "45%", height: "auto" }}
                alt="Uncle"
              />
              <p className="p-4 rounded-4 fw_r fs-5 bg-white mb-5">
                Collect all 5 Oreo Monopoly cookies to get a chance to win the
                Limited Edition Board.
              </p>
            </div>

            <div className="col-10 m-auto">
              <div className={`${styles.collection_cookie} text-center w-100`}>
                {cookieCollect.map((item, index) => {
                  return (
                    <div
                      className={`position-relative cursor-pointer ${
                        item.status == "pending" ? styles.open : ""
                      }`}
                      style={
                        item.status === "complete" ||
                        item.status === "adminApproval"
                          ? { cursor: "no-drop", pointerEvents: "none" }
                          : {}
                      }
                      onClick={() =>
                        // // item.status !== "complete" &&
                        // item.status !== "adminApproval" &&
                        CurrentCookie(collection_id, item)
                      }
                      key={index}
                    >
                      <span
                        className={` position-absolute float-center ${
                          styles.status_icon
                        } ${
                          item.status === "adminApproval" && styles.pending
                        } ${item.status === "complete" && styles.complete} ${
                          item.status === "failed" && styles.failed
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: getIcon(item.status),
                        }}
                      />
                      <Image
                        alt="collect"
                        // src={
                        //   "https://www.oreostayplayful.com/assets/images/Cookie1.png"
                        // }
                        src={item.img_path}
                        width={90}
                        height={90}
                        style={{
                          height: "auto",
                          width: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          opacity: item.status == "pending" ? 0.6 : 1,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <h1 className="col-7 m-auto p-0 fs-2 text-white">
              Tap the missing cookie to scan
            </h1>
          </div>
          {/* <div className="row p-2 text-center w-100">
            <div className="col-sm-12 p-0">
              <h1 className="col-9 m-auto p-0 fs-2 text-white mb-4">
                You're doing great!{" "}
                <span className="fw_r fs-3">
                  {" "}
                  Only {cookieLeft} cookie left.
                </span>
              </h1>
            </div>
            <div className="col-sm-12 p-0">
              <Footer />
            </div>
          </div> */}
        </div>
        <div
          className="position-absolute top-0 w-100 start-0"
          style={camera ? { zIndex: 10 } : { zIndex: -10 }}
        >
          <MultiCookieCamera
            handleClick={() => handleClick()}
            cookieDetail={cookieDetail}
          />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  let user = cookieDataServer(req);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  let token = revertToken(user?.auth);
  let result;

  try {
    result = await axiosCall(
      `${process.env.NEXT_PUBLIC_API_URL}get-collection`,
      JSON.stringify({
        type: "board",
      }),
      token,
      "get"
    );
    console.log("result.data");
    console.log(result.data);
  } catch (error) {
    if (error?.response?.data?.message === "Unauthenticated.") {
      nookies.destroy({ res }, "user", { path: "/" });

      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  }

  let ress = result.data;
  let cookieArray = ress?.cookieCollect?.map((item) => item.img_path) || [];
  console.log({ cookieArray });
  return {
    props: { result: ress, cookieArray },
  };
}

function getIcon(status) {
  let icons = {
    adminApproval: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#fff" className="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>`,
    failed: `<svg width="100%" height="100%" x="0" y="0" viewBox="0 0 64 64"><g><g fill="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M32.018 2.958c-3.974 0-7.19 3.242-7.19 7.212v24.896c0 3.97 3.216 7.212 7.19 7.212s7.19-3.242 7.19-7.212V10.17c0-3.97-3.215-7.212-7.19-7.212zM32.018 47.023c-3.884 0-7.058 3.126-7.058 6.96 0 3.836 3.174 6.969 7.058 6.969 3.885 0 7.058-3.133 7.058-6.968s-3.173-6.96-7.058-6.96z" fill="#fff" opacity="1" data-original="#fff" className=""></path></g></g></svg>`,
    complete: `<svg  width="100%" height="100%" x="0" y="0" viewBox="0 0 512 512"><g><path d="M504.502 75.496c-9.997-9.998-26.205-9.998-36.204 0L161.594 382.203 43.702 264.311c-9.997-9.998-26.205-9.997-36.204 0-9.998 9.997-9.998 26.205 0 36.203l135.994 135.992c9.994 9.997 26.214 9.99 36.204 0L504.502 111.7c9.998-9.997 9.997-26.206 0-36.204z" fill="#fff" opacity="1" data-original="#fff" className=""></path></g></svg>`,
  }[status];
  return icons || "";
}

export default Index;
