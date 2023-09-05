import React from "react";
import { Camera } from "react-cam";
import Webcam from "react-webcam";
// import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const CameraModule = () => {
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);
  return (
    <div>
       <Webcam audio={false} ref={webcamRef}   videoConstraints={videoConstraints} screenshotFormat="image/jpeg" />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && <img src={imgSrc} />}
    </div>
  );
};

export default CameraModule;
