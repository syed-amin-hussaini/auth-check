import axios from "axios";

const axiosCall = async (url, body, token= "" ) => {
  //  url: "https://obackend.hul-hub.com/api/scan-cookie",
  // let tokenBearer = token.length != 0 && { Authorization: `Bearer ${token}` };
  const headers = {
    "Content-Type": "application/json",
    Authorization: token.length != 0 ? `Bearer ${token}` : ""
    // Authorization: `Bearer ${userToken}`,
  }
  const response = await axios({
    method: "post",
    url: url,
    data: body,
    headers
  });
  return response;
};

export { axiosCall };
