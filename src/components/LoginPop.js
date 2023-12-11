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

const LoginPop = ({ userStatus= false }) => {
  const [modalState, setModalState] = useState("all");
  const [showModal, setShowModal] = useState(userStatus);

  useLayoutEffect(() => {
    setShowModal(userStatus);
  }, [userStatus]);

  return showModal ? (
    <div className={styles.newLogin}>
      {modalState === "all" && (
        <div className={`${styles.newLoginBox} ${styles.second}`}>
          <All setModalState={setModalState} />
        </div>
      )}
      {modalState === "login" && (
        <div className={`${styles.newLoginBox}`}>
          <Login setModalState={setModalState} setShowModal={setShowModal} />
        </div>
      )}
      {modalState === "register" && (
        <div className={`${styles.newLoginBox}`}>
          <Register setModalState={setModalState} setShowModal={setShowModal} />
        </div>
      )}
    </div>
  ) : (
    ""
  );
};

const All = ({ setModalState }) => {
  return (
    <>
      <Image
        onClick={() => setModalState("all")}
        className={styles.cancel}
        src={Cancel}
        width={35}
        height={35}
        alt="Cookie image"
      />
      <h3 className="text-center text-black mb-4">
        Welcome to <br /> Oreo x Monopoly
      </h3>
      <Image
        className={`${styles.cookie} ${styles.first}`}
        style={{ width: "100px", height: "auto" }}
        src={CookieImg}
        alt="Cookie image"
      />
      <Image
        className={`${styles.cookie} ${styles.second}`}
        style={{ width: "100px", height: "auto" }}
        src={CookieImg}
        alt="Cookie image"
      />
      <Image
        className={`${styles.noteOne}`}
        style={{ width: "60px", height: "auto" }}
        src={OneNote}
        alt="Cookie image"
      />
      <Image
        className={`${styles.noteTwo}`}
        style={{ width: "90px", height: "auto" }}
        src={TwoNote}
        alt="Cookie image"
      />
      <a onClick={() => setModalState("login")} className={`${styles.button} `}>
        Login
      </a>

      <a
        onClick={() => setModalState("register")}
        className={`${styles.button}`}
      >
        Sign Up
      </a>
      <div className={`${styles.separate} text-center my-4`}>
        <span>OR</span>
      </div>
      <a
        onClick={() => signIn("google")}
        className={`${styles.button} ${styles.button_google}`}
      >
        <Image
          alt="Google icon"
          src={Google}
          style={{ width: "28px", height: "28px", marginRight: "10px" }}
        />
        Continue with Google
      </a>
      <a
        onClick={() => signIn("facebook")}
        className={`${styles.button} ${styles.button_facebook}`}
      >
        <Image
          alt="Facebook icon"
          src={Facebook}
          style={{ width: "28px", height: "28px", marginRight: "10px" }}
        />
        Continue with Facebook
      </a>
    </>
  );
};
const Login = ({ setModalState, setShowModal }) => {
  return (
    <>
      <Image
        onClick={() => setModalState("all")}
        className={styles.cancel}
        src={Cancel}
        width={35}
        height={35}
        alt="Cookie image"
      />
      <Image
        className={styles.uncleHalf}
        src={UncleHalf}
        style={{ width: "40%", height: "auto" }}
        alt="Uncle"
      />
      <Form firstTime={true} userRegister={true} setShowModal={setShowModal} login={true} />
    </>
  );
};
const Register = ({ setModalState, setShowModal }) => {
  return (
    <div>
      <Image
        onClick={() => setModalState("all")}
        className={`${styles.cancel} ${styles.second}`}
        src={Cancel}
        width={35}
        height={35}
        alt="Cancel Icon"
      />
      <Image
        className={styles.uncleHalf}
        src={UncleHalf}
        style={{ width: "40%", height: "auto" }}
        alt="Uncle"
      />
      <h4 className="text-primary text-center">CREATE YOUR PROFILE</h4>
      <Form firstTime={true} userRegister={true} setShowModal={setShowModal}/>
    </div>
  );
};

export default LoginPop;
