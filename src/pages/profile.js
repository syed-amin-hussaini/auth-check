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

export default function Profile() {
  const [getStated, setGetStated] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const router = useRouter();

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

  const f_complete = () => {
    setFormComplete(true);
  };
  

  return (
    <div>
      <Head>
        <title>Oreo | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} `}> 
        {/* {getStated && <Image src={Almost_1} fill alt="Almost There Banner" />} */}
        {!getStated && <Layer2 name="#APlayfulTwist" style="0" classes="position-absolute start-0 top-0" />}
        {formComplete && <Layer1 name="#APlayfulTwist" style="0" classes="position-absolute start-0 top-0" /> }

        <div className="d-flex justify-content-center flex-column align-items-center h-100">
          <p className="text-white fw_r text-center p-3 mb-0 w-75">
            We just need a couple of details about you. Build your Oreo x
            Monopoly collection and win exciting gifts.
          </p>
          <Form firstTime={firstTime} f_complete={f_complete} />
          <small className="text-white fw_r text-center p-3">
            &copy; {new Date().getFullYear()} Oreo Pakistan Instance - All
            rights reserved
          </small>
        </div>
      </main>
    </div>
  );
}
