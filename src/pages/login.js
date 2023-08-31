import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/src/styles/login.module.scss";
import { useEffect } from "react";
import {  useRouter } from "next/router";

const Login = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  console.log({ session });

  const handleSignIn = async (provider) => {
    const result = await signIn(provider);
    try {
      const result = await signIn(provider);
      console.log("Sign-in result:", result);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };


  return (
    <div className={{}}>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{ maxWidth: "450px", width: "100%" }}
          className="border border-1 max-auto p-4 shadow text-center"
        >
          <h2
            className="text-center fw-bolder text-uppercase mb-3"
            style={{ color: "#555", letterSpacing: "1px" }}
          >
            Oreo
          </h2>
          <a
           href={`/api/auth/signin`}
            onClick={() => handleSignIn("google")}
            className={`${styles.button} ${styles.button_google}`}
          >
            <i className={`${styles.icon} fa fa-google`}></i>
            Sign in Google
          </a>
          <a
             href={`/api/auth/signin`}
            onClick={() => handleSignIn("facebook")}
            className={`${styles.button} ${styles.button_facebook}`}
          >
            <i className={`${styles.icon}  fa fa-facebook`}></i>
            Sign in Facebook
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
