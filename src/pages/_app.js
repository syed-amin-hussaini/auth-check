import { SessionProvider, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import "@/src/styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function MyApp({ Component, pageProps, session }) {
  return (
    // <SessionProvider session={pageProps.session}>
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>

      <Component {...pageProps} />
      
      <ToastContainer
        // toastStyle={{background:"#000",color:"#fff"}}
        // progressStyle={{background:"#7F8FBB"}}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </SessionProvider>
  );
}

// export async function getServerSideProps(context) {
//   // Use the fetchCookieMiddleware to fetch the cookie value
//   const { myCookieValue } = await fetchCookieMiddleware(context);
//   console.log(myCookieValue)
//   return {
//     props: {
//       myCookieValue,
//     },
//   };
// }

export default MyApp;
