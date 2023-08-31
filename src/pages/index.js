import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";


export default function Home({user }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (session) {
    // Access custom parameters
    const customParams = session.user;
    console.log(customParams)
    // ...use customParams as needed

    console.log(customParams)
  }
  
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    location: "",
    number: "",

    submit: true,

    success: false,
    errStatus: false,
    errMsg: "",
  });
  // console.log({session})


  return (
    <div>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        {loading && <div className={{}}>Loading...</div>}
        <h1>Hello, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Custom Token: {user?.customToken}</p>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}
