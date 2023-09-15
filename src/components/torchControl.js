import { useContext, useEffect } from "react";
// import "./styles.css";
import { torchContext } from "./useTorch";

export default function TorchControl() {
  const { currentTrack, getTorchLight, isTorchSupported } = useContext(
    torchContext
  );

  const handleOn = (value) => {
    if (!isTorchSupported) {
      alert("No torch detected!");
      return;
    }
    try {
      currentTrack.applyConstraints({
        advanced: [
          {
            torch: value
          }
        ]
      });
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    if (!currentTrack) {
      getTorchLight();
    }
  }, []);

  return (
    <div className="App">
      <h1>Torch On and Off</h1>
      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "100%",
          justifyContent: "center"
        }}
      >
        <button
          style={{
            background: "green",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            padding: "8px",
            cursor: "pointer",
            fontSize: "24px",
            right:"150px"
          }}
          onClick={() => handleOn(true)}
        >
          ON
        </button>
        <button
          style={{
            background: "red",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            padding: "8px",
            cursor: "pointer",
            fontSize: "24px"
          }}
          onClick={() => handleOn(false)}
        >
          OFF
        </button>
      </div>
    </div>
  );
}
