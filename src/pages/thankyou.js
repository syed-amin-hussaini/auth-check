import Head from 'next/head'

import styles from "@/src/styles/Thankyou.module.scss";
import CompleteLogo from "@/public/assets/images/complete-logo.png";
import Image from 'next/image';
import Footer from '@/components/Footer';
import CurvedText from './CurvedText';
import Uncle from '@/public/assets/images/thankyou/uncle.webp';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layer from '@/public/assets/images/thankyou/layer-3.png';

const Thankyou = ({ content, image }) => {
  return (
    <div>
       <Head>
        <title>Oreo / Thank You</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.main} container-fluid`}
        style={{backgroundImage:`url(${Layer.src})`}}
      >
         {/* <Image
          // className={`${styles.logo}`}
          src={Layer}
          alt="Complete Logo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          style={{zIndex: -2}}
          /> */}
         <Image
          className={`${styles.logo}`}
          src={CompleteLogo}
          alt="Complete Logo"
          />
        <CurvedText image={image} />
        <p className={`${styles.thankyou_content} fs-5 fw_r mb-5 text-white`}>
          {content}
        </p>
        <h1 className='fs-1 text-white mb-5'>Stay playful</h1>
        <Footer className={"mb-3"} />
      </main>
    </div>
  )
}

Thankyou.defaultProps = {
  image: Uncle,
  content: "Your cookie will be analyzed, and we'll let you know if you're eligible to claim the prize.",
};

export default Thankyou