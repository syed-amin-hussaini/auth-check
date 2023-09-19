import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { revertToken } from "./GenerateToken";

const axiosCall = async ({ url, body,token }) => {
  console.log({ url }, { body });

  try {
    //  url: "https://obackend.hul-hub.com/api/scan-cookie",
    let tokenBearer = token && { Authorization : `Bearer ${token}` };
    const response = await axios({
      method: "post",
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/json",
        tokenBearer
      },
    });
    return response;
  } catch (error) {
    return error;
  }

  // return revertToken(token);
};

export { axiosCall };
