import Head from "next/head";
import { signIn } from "next-auth/react";
import styles from "@/src/styles/login.module.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Alert from "@/components/Alert";
import { cookieDataServer } from "@/components/GenerateToken";
import nookies from "nookies";
import CookieImg from "@/public/assets/images/login/cookie.png";
import OneNote from "@/public/assets/images/login/one-note.png";
import TwoNote from "@/public/assets/images/login/two-note.png";
import Cancel from "@/public/assets/images/login/cancel.png";
import UncleHalf from "@/public/assets/images/login/uncle-half.png";
import Facebook from "@/public/assets/images/login/facebook.svg";
import Google from "@/public/assets/images/login/google.svg";
import Form from "./Form";

const Modal = ({ index,content,handleBack }) => {
  const [showModal, setShowModal] = useState(index);
  
  useLayoutEffect(() => {
  console.log({content,index})
    setShowModal(index);
  }, [index]);

  return showModal ? (
    <div className={`${styles.newLogin}`} style={{ zIndex: 99 }}>
        <div className={`${styles.newLoginBox}`}>
          <>
            <Image
              onClick={() => handleBack()}
              className={styles.cancel}
              src={Cancel}
              width={35}
              height={35}
              alt="Cookie image"
            />
            <h4 className="text-center text-primary mb-4">
              Thank you for <br /> your submission
            </h4>
            <p className="w-75 m-auto text-center">
              {content}
            </p>
            
          </>
        </div>
      
    </div>
  ) : (
    ""
  );
};

export default Modal;
