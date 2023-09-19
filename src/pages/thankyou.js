import Head from 'next/head'

import styles from "@/src/styles/Thankyou.module.scss";
import CompleteLogo from "@/public/assets/images/complete-logo.png";
import Image from 'next/image';
import Footer from '@/components/Footer';
import CurvedText from './CurvedText';
import Uncle from '@/public/assets/images/thankyou/uncle.webp';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Thankyou = ({ content, image,name }) => {
  const router = useRouter();
  
  console.log(content, image,name) // Alerts 'Someone'

  useEffect(() => {
      console.log(name) // Alerts 'Someone'
  }, [router.query]);
  return (
    <div>
       <Head>
        <title>Oreo / Thank You</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.main} container-fluid`}
      >
         <Image
          className={`${styles.logo}  m-auto`}
          src={CompleteLogo}
          width="80px"
          height="40px"
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