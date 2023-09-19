import React, { useEffect } from "react";
import styles from "@/src/styles/Thankyou.module.scss";
import Image from "next/image";
import ThankYouText from "@/public/assets/images/thankyou/thank-you-msg.png";

function updateCurvedText(curvedText, radius) {
  curvedText.style.minWidth = "initial";
  curvedText.style.minHeight = "initial";
  var w = curvedText.offsetWidth;
  var h = curvedText.offsetHeight;
  curvedText.style.minWidth = w + "px";
  curvedText.style.minHeight = h + "px";
  var text = curvedText.textContent;
  var html = "";

  Array.from(text).forEach(function (letter) {
    html += "<span>" + letter + "</span>";
  });
  curvedText.innerHTML = html;

  var letters = curvedText.querySelectorAll("span");
  letters.forEach(function (letter) {
    letter.style.position = "absolute";
    letter.style.height = radius + "px";
    letter.style.transformOrigin = "bottom center";
  });

  var circleLength = 2 * Math.PI * radius;
  var angleRad = w / (2 * radius);
  var angle = (2 * angleRad * 180) / Math.PI / text.length;
  var idx = 0;

  letters.forEach(function (letter) {
    letter.style.transform =
      "translate(" +
      w / 2 +
      "px,0px) rotate(" +
      (idx * angle - (text.length * angle) / 2.1) +
      "deg)";
    idx++;
  });
}

const CurvedText = ({ image }) => {
  console.log(image)

//   useEffect(() => {
//     var curvedText = document.querySelector(".curved-text");
//     updateCurvedText(curvedText, 160);
//   }, []);

  return (
    <div>
      {/* <div className={`${styles.curved_text} curved-text`}>
        THANK YOU FOR YOUR SUBMISSION
      </div> */}
      
      <Image alt="Thank you test" className={`mt-5 ${styles.thankyou_text}`} src={ThankYouText}/> 
      <Image alt="Scanner Cookie Image" className={styles.thankyou_image} width={300} height={300} src={image}/> 
    </div>
  );
};

export default CurvedText;
