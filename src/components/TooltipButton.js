import Image from "next/image";
import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import styles from "@/src/styles/Collection.module.scss";
import Cancel from "@/public/assets/images/login/cancel.png";

const TooltipButton = ({ id, text, image = [], multiple = false }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <>
      <span
        data-tooltip-id={id}
        className={`rounded-circle btnContainer`}
      >
        <svg
          width="100%"
          height="100%"
          onClick={() => setTooltipOpen(!tooltipOpen)}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 63.63 64.1"
        >
          <path
            fill="#0084C7"
            d="M54.32,9.38L54.32,9.38C48.54,3.56,40.62,0,31.84,0C23.06,0,15.08,3.56,9.35,9.38C3.58,15.2,0,23.18,0,32.03
	s3.58,16.88,9.35,22.65c5.73,5.81,13.7,9.42,22.49,9.42c8.78,0,16.7-3.61,22.48-9.42c5.78-5.77,9.31-13.8,9.31-22.65
	S60.09,15.2,54.32,9.38L54.32,9.38z"
          />
          <g>
            <path
              fill="#FFFFFF"
              d="M26.55,35.93c-0.37-0.98-0.7-1.92-0.7-3.6c0-1.54,0.7-2.85,2.76-4.02l2.57-1.45c1.03-0.66,1.54-1.12,1.54-2.15
		c0-1.08-0.84-1.73-2.2-1.73c-2.11,0-4.96,1.17-6.46,2.34l-2.2-7.11c2.2-1.26,5.48-2.62,10.06-2.62c6.27,0,9.83,3.6,9.83,8.56
		c0,3.98-1.83,5.9-4.03,7.07l-2.71,1.45c-0.94,0.56-1.36,1.03-1.36,2.01c0,0.37,0.05,0.8,0.19,1.26H26.55z M30.2,38.7
		c3.23,0,5.15,1.83,5.15,4.96c0,3.14-1.92,4.87-5.15,4.87c-3.28,0-5.15-1.73-5.15-4.87C25.05,40.52,26.92,38.7,30.2,38.7z"
            />
          </g>
        </svg>
      </span>
      <div className="tooltip-box round">
        <ReactTooltip
          id={id}
          place="bottom-end"
          isOpen={tooltipOpen}
          onRequestClose={() => setTooltipOpen(false)}
          openOnClick={true}
          style={{
            padding: "20px 15px",
            maxWidth: "90%",
          }}
          className="opacity-100 bg-white text-black text-center rounded-4"
          effect="solid"
        >
          <div>
            <h4
              className="text-primary"
              // style={{ color: "#0073b9" }}
            >
              Instruction
            </h4>
            <Image
              onClick={() => setTooltipOpen(!tooltipOpen)}
              className={
                "position-absolute top-0 end-0 p-1 my-2 mx-1 cursor-pointer"
              }
              src={Cancel}
              width={35}
              height={35}
              alt="Cookie image"
            />
            <div className={"d-flex gap-2"}>
              {multiple ? (
                <>
                  {image?.map((item, i) => (
                    <Image
                      key={i}
                      src={item}
                      alt=""
                      className="expTwoCookie"
                      height={60}
                      width={60}
                      priority
                    />
                  ))}
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
              className={`fw-normal d-block mt-2 ${styles.instruction_font}`}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        </ReactTooltip>
      </div>
    </>
  );
};

export default TooltipButton;
