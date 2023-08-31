import { SessionProvider, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

function MyApp({ Component, pageProps, session }) {
  return (
    // <SessionProvider session={pageProps.session}>
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" /> */}
        <link
          rel="stylesheet"
          href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        />
      </Head>
      <script async  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

    
      <Component {...pageProps} />
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
