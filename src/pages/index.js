import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/src/styles/login.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Image from "next/image";
import Facebook from "@/public/assets/images/login/facebook.svg";
import Google from "@/public/assets/images/login/google.svg";
import axios from "axios";
import Layer1 from "@/components/Layer1";
import Alert from "@/components/Alert";
import { cookieDataServer } from "@/components/GenerateToken";
import nookies, { setCookie } from "nookies";

const Login = ({ emailVerifyState,userValue }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  console.log({userValue});
  const router = useRouter();
  let cookies = parseCookies();
  useEffect(() => {
    const fetchUser = () => {
      console.log("emailVerifyState && userValue")
      console.log(emailVerifyState && userValue)
      if (userValue && !router?.query?.token) {
        router.replace("/dashboard");
      }

      if (router?.query?.token && userValue) {
        setTimeout(() => {
          router.replace("/dashboard");
        }, 6000);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className={{}}>
      <Head>
        <title>Oreo | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layer1
        name={(emailVerifyState && userValue) && "#APlayfulTwist"}
        style={(emailVerifyState && userValue) && "0"}
      >
        {emailVerifyState && (
          <Alert
            customClass={"text-center"}
            action="success"
            msg={[{ msg: "Email has been verified" }]}
          />
        )}
        {!userValue && (
          <div
            style={{ maxWidth: "90%", width: "100%", marginBottom: "40px" }}
            className="text-center"
          >
            <a
              onClick={() => signIn("google")}
              className={`${styles.button} ${styles.button_google}`}
            >
              <Image
                alt="Google icon"
                src={Google}
                style={{ padding: "10px" }}
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
                style={{ padding: "10px" }}
              />
              Continue with Facebook
            </a>
          </div>
        )}
      </Layer1>
    </div>
  );
};

export async function getServerSideProps({req, res,query}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}verify-email-token`;

  let userValue = cookieDataServer(req) ?? false;
 

  let emailVerifyState = false;
  console.log(Object.keys(query).length !== 0)
  if (Object.keys(query).length !== 0) {
    const response = await axios.post(
      apiUrl,
      {
        email_token: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let result = response.data;
    console.log(result)
    if (result?.status === "success") {
      emailVerifyState = true;

      if (userValue) {
        nookies.destroy({ res }, "user", { path: "/" });
        console.log({ userValue });
  
        nookies.set({ res }, 'user', `{\"id\":\"${userValue.id}\",\"auth\":\"${userValue?.auth}\",\"profile_status\":\"${userValue?.profile_status}\", \"name\":\"${userValue?.name}\",\"email\":\"${userValue?.email}\",\"email_status\":\"true\", \"age\":\"${userValue?.age}\", \"phone\":\"${userValue?.phone}\", \"location\":\"${userValue?.location}\"}`, {
          maxAge: 31536000, // 1 year
          path: '/',    // Cookie path
        });
      }
    }
  }

  return {
    props: { emailVerifyState, userValue },
  };
}
export default Login;
