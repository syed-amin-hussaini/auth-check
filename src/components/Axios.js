import axios from "axios";

let controller = new AbortController();

const axiosCall = async (
  url = "",
  body = "",
  token = "",
  method = "post",
  abort = false
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: token.length !== 0 ? `Bearer ${token}` : "",
  };

  if (abort) {
    // If the call is aborted, create a new AbortController
    controller.abort();
    controller = new AbortController();
  }

  try {
    const response = await axios({
      signal: controller.signal,
      method,
      url,
      data: body,
      headers,
    });

    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      // Handle cancellation
      console.log("Request canceled:", error.message);
    } else {
      // Handle other errors
      console.error("Request failed:", error.message);
    }
  }
};

// Function to abort the request
const abortRequest = () => {
  controller.abort();
};

// Function to restart the call
const restartCall = (url = "", body = "", token = "", method = "post", abort = true ) => {
  // Set the 'abort' parameter to true to indicate that the previous call was aborted
  return axiosCall(url,body,token,method,abort);
};

export { axiosCall, abortRequest, restartCall };
