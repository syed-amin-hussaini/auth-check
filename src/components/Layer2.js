import Image from 'next/image'
import React from 'react'

import Logo from "@/public/assets/images/complete-logo.png";
import Uncle from "@/public/assets/images/almost-there/chacha.webp";
import layer from "@/public/assets/images/layer-2.webp";
import styles from "@/src/styles/login.module.scss";

const Layer2 = ({name="",classes="",style=""}) => {
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
            width: "65%",
            height: "auto",
            objectFit: "contain",
            marginBottom: "40px",
            display: "block",
          }}
        />
        <div className='mb-3 bg-danger p-2 text-center w-100 '>
          <p className='text-white w-75 m-auto fs-5 mb-2'>
            We just need a couple of details about you. Build your
          </p>
          <Image
          alt="Logo"
          src={Logo}
          className='mb-2'
          style={{
            width: "70%",
            height: "auto",
            margin:"0 auto",
            
            display: "block",
          }}
          />
          <p className='text-white px-2 m-auto fs-4'>
            Collection & Win Exciting Gifts.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Layer2