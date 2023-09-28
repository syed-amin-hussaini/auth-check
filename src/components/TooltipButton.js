import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import styles from "@/src/styles/Camera.module.scss";

const TooltipButton = ({ id, text, image=[], multiple = false }) => {
  const [cookieArray, setCookieArray] = useState([])
  
  useEffect(() => {
    setCookieArray(image)
    console.log(image)
  })
  
  return (
    <>
      <span
        data-tooltip-id={id}
        className={`bg-white rounded-circle ${styles.btnContainer}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          width="100%"
          fill="currentColor"
          className="bi bi-question-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
          />
        </svg>
      </span>
      <ReactTooltip
        id={id}
        place="bottom-end"
        openOnClick={true}
        style={{
          padding: "20px 15px",
          maxWidth:"90%"
        }}
        className="opacity-100 bg-white text-black text-center"
        effect="solid"
      >
        <div>
          <h6 className="text-start" style={{ color: "#0073b9" }}>
            Instruction
          </h6>
          <div className={styles.cookie}>
            {multiple ? (
              <>
                {cookieArray?.map((item,i) => {
                  {/* return <h1 key={i}>{i}</h1> */}
                  return <Image key={i}
                    src={item}
                    alt=""
                    className="expTwoCookie"
                    height={70}
                    width={70}
                    priority
                  />
                })}
                
              </>
            ) : (
              <Image
                src={image}
                alt=""
                className="expTwoCookie"
                style={{ width: "40%", height: "auto" }}
                priority
              />
            )}
          </div>
          <p
            className={`fw_r d-block mt-2 ${styles.instruction_font}`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </ReactTooltip>
    </>
  );
};

export default TooltipButton;
