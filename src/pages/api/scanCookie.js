
import { axiosCall } from "@/components/Axios";
import { cookieDataServer, revertToken } from "@/components/GenerateToken";
import axios from "axios";
import nookies, { setCookie } from "nookies";

export default async function handler(req, res) {
  let user = cookieDataServer(req);
  let token = revertToken(user?.auth);
  try {
    let result = await axiosCall(`${process.env.NEXT_PUBLIC_API_URL}scan-cookie`, req?.body, token);
    // console.log(result.data)
    result = result?.data;
    res.status(200).json({
      result 
    });
    return result
  } catch (error) {
    res.status(error.response?.status ?? 500).json({
      message: [error.response?.statusText ?? "Internal Server Error"],
    });
  }


  res.status(200).json({
    message: [user],
  });
}
