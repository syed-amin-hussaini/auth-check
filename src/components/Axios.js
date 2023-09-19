import axios from "axios";

const axiosCall = async (url, body) => {
  //  url: "https://obackend.hul-hub.com/api/scan-cookie",
  const response = await axios({
    method: "post",
    url: url,
    data: body,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${userToken}`,
    },
  });
  console.log({ response });
  return response;
};

export { axiosCall };
