import Camera from "@/components/Camera";
import { cookieDataServer, revertToken } from "@/components/GenerateToken";
import Nav from "@/components/Nav";
import axios from "axios";
import React from "react";
import nookies, { setCookie } from "nookies";

const GrandPrize = (result) => {
  return (
    <>
      <Nav />
      <Camera cookieStatus={result} />
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  let user = cookieDataServer(req);
  if (!user)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  let userId = parseInt(user?.id);
  let userAuth = revertToken(user?.auth);
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}cookie-status?user_id=${userId}`;

  // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}cookie-status?user_id=4`;
  let result;
  try {
    result = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth}`,
      },
    });
    console.log({ result });
    result = result?.data ?? "";
  } catch (error) {
    console.log("error?.response");
    console.log(error);
    if (error?.response?.data?.message === "Unauthenticated.") {
      nookies.destroy({ res }, "user", { path: "/" });
      return {
        redirect: {
          permanent: false,
          destination: "/"
        }
      };
    }
  }

  // console.log("Cookie Check");
  // console.log({ result });
  return {
    props: {result},
  };
}

export default GrandPrize;
