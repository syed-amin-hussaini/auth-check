import Image from 'next/image'
import React from 'react'

import Logo from "@/public/assets/images/complete-logo.png";
import Uncle from "@/public/assets/images/login/uncle.png";
import layer from "@/public/assets/images/layer.webp";
import styles from "@/src/styles/login.module.scss";

const Layer1 = ({children="",name="",classes="",style=""}) => {
  return (
    
    <div>
       <div
        className={`${styles.main} ${classes}`}
        style={{ backgroundImage: `url(${layer.src}) ` }}
      >
        <Image
          alt="Logo"
          src={Logo}
          style={{
            width: "85%",
            objectFit: "contain",
            margin: style || "0 0 30px",
            paddingBlock: "40px",
            display: "block",
          }}
        />
        {name && <h1 className='fs-1 text-white mb-5'>{name}</h1>}
        <Image
          alt="Uncle"
          src={Uncle}
          style={{
            width: "85%",
            height: "auto",
            objectFit: "contain",
            marginBottom: "40px",
            display: "block",
          }}
        />
        {children}
      </div>
    </div>
  )
}

export default Layer1