import { cookieDataServer, revertToken } from "@/components/GenerateToken";
import axios from "axios";
import nookies, { setCookie } from "nookies";

export default async function handler(req, res) {
  try {
    let {name,age,phone,location,email,email_status} = req?.body;
    let cookies = cookieDataServer(req)
    let userToken = revertToken(cookies?.auth);
    
    const responseVal = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}update-profile`,
      data: req.body, // No need to stringify the request body
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Connection": "Keep-Alive",
        "Content-Type": "application/json",
        // Remove unnecessary headers
      },
    });

    if (responseVal?.data?.status === 'success') {
      const serverMsg = responseVal?.data?.msg;

      nookies.destroy({ res }, "user", { path: "/" });

      nookies.set({ res }, 'user', `{\"id\":\"${cookies.id}\",\"auth\":\"${cookies?.auth}\",\"profile_status\":\"complete\", \"name\":\"${name}\",\"email\":\"${email}\",\"email_status\":\"${email_status}\", \"age\":\"${age}\", \"phone\":\"${phone}\", \"location\":\"${location}\"}`, {
        maxAge: 31536000, // 1 year
        path: '/',    // Cookie path
      });
      res.status(200).json({
        message: [serverMsg],
      });
    } else {
      res.status(422).json({
        message: responseVal?.data?.message,
        error: [responseVal?.data?.errors]
      });
    }
  } catch (error) {
    res.status(error.response?.status ?? 500).json({
      message: [error.response?.statusText ?? "Internal Server Error"],
    });
  }
}
