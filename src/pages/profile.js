// Import required libraries and components
import Head from "next/head";
import "react-phone-input-2/lib/style.css";
import styles from "@/src/styles/Form.module.scss";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Image from "next/image";

import Almost_1 from "@/public/assets/images/almost-there/screen-1.webp";
import Almost_2 from "@/public/assets/images/almost-there/screen-2.webp";
import CookieImg from "@/public/assets/images/almost-there/cookie.png";
import Form from "@/components/Form";
import Layer1 from "@/components/Layer1";
import Layer2 from "@/components/Layer2";
import Footer from "@/components/Footer";

export default function Profile({cityOptions}) {
  const [getStated, setGetStated] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [down, setDown] = useState("-0vh");

  useEffect(() => {
    let cookies = parseCookies();
    if (cookies?.user) {
      cookies = JSON?.parse(cookies?.user);

      if (cookies?.profile_status !== "complete") {
        setGetStated(true);
        setFirstTime(true);

        setTimeout(() => {
          setGetStated(false);
        }, 5000);
      }
    }
  }, []);

  // useEffect(() => {
    // console.log({cityOptions})
  // }, [cityOptions])

  const f_complete = () => {
    setFormComplete(true);
  };
  const ScrollDown = () => {
    console.log("asdasd")
    setDown("-100vh")
  };
  
  return (
    <div>
      <Head>
        <title>Oreo | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={`${styles.main} `}> 
        {/* {getStated && <Image src={Almost_1} fill alt="Almost There Banner" />} */}
        <Layer2 ScrollDown={ScrollDown} classes={styles.layer_1} name="#APlayfulTwist" style={down}  />
        {formComplete && <Layer1 name="#APlayfulTwist" style="0" classes="position-absolute start-0 top-0" /> }

        <div id="fromScroll" style={{height:"100vh",overflowY:"auto",transform: `translateY(${down})`}}  className={`d-flex justify-content-center flex-column align-items-center ${styles.layer_1}`}>
          <div className="row m-0">
            <p className="col-11 col-sm-8 fw_r m-auto mb-0 px-1 py-3 text-center text-white">
              We just need a couple of details about you. Build your Oreo x
              Monopoly collection and win exciting gifts.
            </p>
          </div>
          <Form cityOptions={cityOptions} firstTime={firstTime} f_complete={f_complete} />
          {/* <small className="text-white fw_r text-center p-3">
            &copy; {new Date().getFullYear()} Oreo Pakistan Instance - All
            rights reserved
          </small> */}
          <Footer className="p-3" />
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps({req, res}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}get-cities`;

  let cityOptions;
 
  
    const response = await axios.get(
      apiUrl,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = response.data;
    // console.log(result)
  if (result?.status === "success") {
      cityOptions= result?.cities;
    
    }
  return {
    props: {cityOptions},
  };
}