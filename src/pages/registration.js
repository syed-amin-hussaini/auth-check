import Head from "next/head";
// import styles from "../styles/Home.module.css";
// import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Drawer from "@/components/Drawer";

export default function Registration({session}) {
  // const { data: session, status } = useSession();
  // const loading = status === "loading";
 

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

  useEffect(() => { 

    setForm((prev) => {
      console.log({session})
      return {
        ...prev,
        name:session?.user?.name,
        email: session?.user?.email,
      };
    });
    console.log({ form });
  }, []);

  return (
    <div>
      <Head>
        <title>Oreo | Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Drawer />
      <main>
        <form>
          
          <label>
            <span>Name</span>
            <input
              type="text"
              id="name"
              autoComplete="off"
              disabled={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
            />
          </label>
        
          <label>
            <span>Email</span>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
              disabled={form.email}
            />
          </label>
          
          <label>
            <span>Age</span>
            <input
              type="number"
              id="age"
              autoComplete="off"
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              value={form.age}
            />
          </label>
          <label>
            <span>Location</span>
            <input
              type="text"
              id="location"
              autoComplete="off"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              value={form.location}
            />
          </label>
          <label>
            <span>Number</span>
            <input
              type="number"
              id="number"
              autoComplete="off"
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              value={form.number}
            />
          </label>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  console.log({session})
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: { session }
  }
}