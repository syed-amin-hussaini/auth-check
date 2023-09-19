
import { cookieDataServer } from "@/components/GenerateToken";
import axios from "axios";
import nookies, { setCookie } from "nookies";

export default async function handler(req, res) {
  let user = cookieDataServer(req);
  console.log({user})
}
