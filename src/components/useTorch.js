import React, { createContext, useState, useReducer } from "react";

export const torchContext = createContext({});

export function TorchContextProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isTorchSupported, setIsTorchSupported] = useState(false);

  let btn = null;

  const log = function (msg) {
    console.log(msg);
  };

  const getTorchLight = () => {
    //Test browser support
    const SUPPORTS_MEDIA_DEVICES = "mediaDevices" in navigator;

    console.log("===torch", SUPPORTS_MEDIA_DEVICES);

    if (SUPPORTS_MEDIA_DEVICES) {
      //Get the environment camera (usually the second one)
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const cameras = devices.filter(
            (device) => device.kind === "videoinput"
          );

          if (cameras.length === 0) {
            log("No camera found on this device.");
          }
          // Create stream and get video track
          navigator.mediaDevices
            .getUserMedia({
              video: {
                facingMode: "environment"
              }
            })
            .then((stream) => {
              let track = stream.getVideoTracks()[0];

              console.log("===torch 2", track);
              setCurrentTrack(track);

              //Create image capture object and get camera capabilities
              const imageCapture = new ImageCapture(track);

              console.log("===torch 3", imageCapture);

              imageCapture
                .getPhotoCapabilities()
                .then((capabilities) => {
                  //let there be light!
                  btn = document.querySelector("#switch");
                  console.log("===torch 4", btn);

                  console.log("===torch 4.5", capabilities);

                  const closeComponentBtn = document.querySelector(
                    "#closeComponent"
                  );
                  const closeTimesComponentBtn = document.querySelector(
                    "#closeTimesButton"
                  );

                  console.log("===test 0", closeComponentBtn);
                  console.log("===test 1", closeTimesComponentBtn);
                  console.log("===test 2", btn);

                  const torchSupported =
                    !!capabilities.torch ||
                    ("fillLightMode" in capabilities &&
                      capabilities.fillLightMode.length != 0 &&
                      capabilities.fillLightMode != "none");

                  console.log("===torch 5", torchSupported);

                  if (torchSupported) {
                    setIsTorchSupported(true);
                    let torch = false;
                    btn.addEventListener("click", function (e) {
                      console.log("===torch clicked");
                      try {
                        track.applyConstraints({
                          advanced: [
                            {
                              torch: (torch = !torch)
                            }
                          ]
                        });
                      } catch (err) {
                        log(err);
                      }
                    });
                    closeTimesComponentBtn.addEventListener("click", function (
                      e
                    ) {
                      console.log("===torch clicked teste 1");
                      try {
                        track.applyConstraints({
                          advanced: [
                            {
                              torch: false
                            }
                          ]
                        });
                      } catch (err) {
                        log(err);
                      }
                    });
                    closeComponentBtn.addEventListener("click", function (e) {
                      console.log("===torch clicked teste");
                      try {
                        track.applyConstraints({
                          advanced: [
                            {
                              torch: false
                            }
                          ]
                        });
                      } catch (err) {
                        log(err);
                      }
                    });
                  } else {
                    log("No torch found");
                  }
                })
                .catch(log);
            })
            .catch(log);
        })
        .catch(log);
    }
  };

  return (
    <>
      <torchContext.Provider
        value={{
          currentTrack,
          setCurrentTrack,
          getTorchLight,
          isTorchSupported
        }}
      >
        {children}
      </torchContext.Provider>
    </>
  );
}
