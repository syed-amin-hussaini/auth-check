import Head from "next/head";
import "react-phone-input-2/lib/style.css";
import styles from "@/src/styles/Form.module.scss";
// import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Drawer from "@/components/Drawer";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { toast } from "react-toastify";

import nookies from "nookies";
import { useRouter } from "next/router";

export default function Profile({ session, userCurrent }) {
  const [phoneLength, setPhoneLength] = useState(0);
  const [phone, setPhone] = useState(0);

  const [submit, setSubmit] = useState(false);
  const [emailExit, setEmailExit] = useState(false);

  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  const fieldValid = (formatVal, pho) => {
    setPhone(pho);
    setPhoneLength(formatVal.format.length);
  };

  // useEffect(() => {
  //   setValue("name", session?.user?.name);
  //   setValue("email", session?.user?.email);
  //   setValue("age", userCurrent?.age);
  //   setValue("location", userCurrent?.location);
  //   setValue("phone", userCurrent?.phone);
  //   session?.user?.email && setEmailExit(true);
  //   setPhone(userCurrent?.phone);
  // }, []);
  useEffect(() => {
    setValue("name", session?.user?.name);
    setValue("email", session?.user?.email);
    setValue("age", userCurrent?.age);
    setValue("location", userCurrent?.location);
    setValue("phone", userCurrent?.phone);
    session?.user?.email && setEmailExit(true);
    setPhone(userCurrent?.phone);
  }, [
    // session?.user?.name,
    // session?.user?.email,
    // setValue,
    // userCurrent?.age,
    // userCurrent?.location,
    // userCurrent?.phone,
  ]);

  const onSubmit = async (data) => {
    setSubmit(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", data.age);
    formData.append("location", data.location);
    formData.append("phone", phone);

    try {
      const response = await axios({
        method: "post",
        url: "/api/form-detail",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });
      console.log({ response });
      if (response.status === 200) {
        toast("Profile Updated");
        router.push("/");
      }
    } catch (error) {
      const status = error?.response?.status;
      const statusText = error?.response?.statusText;
      console.log(status, statusText);
      toast.error(statusText);
    }

    setSubmit(false);
  };

  return (
    <div>
      <Head>
        <title>Oreo | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Drawer />
      <main className={styles.main}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form} row`}
        >
          <div className={`col-md-12`}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              className={styles.autoColor}
              maxLength={99}
              {...register("name", {
                required: "This field is mandatory",
                pattern: {
                  value: /^([a-zA-Z ]+)$/,
                  message: "Incorrect Name Format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="name" as="p" />
          </div>

          <div className={`col-md-12`}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              className={styles.autoColor}
              maxLength={256}
              disabled={emailExit}
              {...register("email", {
                required: "This field is mandatory",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Incorrect Email Format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="email" as="p" />
          </div>
          <div className={`col-md-12`}>
            <label htmlFor="age">Age</label>
            <br />
            <input
              type="number"
              className={styles.autoColor}
              maxLength={99}
              {...register("age", {
                required: "This field is mandatory",
                pattern: {
                  // value: /\b\d{1,2}\b/gm,
                  message: "Incorrect Age Format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="age" as="p" />
          </div>

          <div className={`col-md-12`}>
            <label htmlFor="location">Location</label>
            <br />
            <input
              type="text"
              className={styles.autoColor}
              maxLength={64}
              {...register("location", {
                required: "This field is mandatory",
              })}
            />
            <ErrorMessage errors={errors} name="location" as="p" />
          </div>
          <div className={`col-md-12`}>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "This field is mandatory",
                minLength: {
                  value: phoneLength,
                  message: "Incorrect Phone Format",
                },
              }}
              render={({ field }) => (
                <>
                  <label>Number </label>
                  <PhoneInput
                    disableDropdown={true}
                    {...field}
                    country={"pk"}
                    containerClass={styles.tel_container}
                    inputClass={styles.tel_input}
                    onlyCountries={["pk"]}
                    buttonClass={`${styles.tel_box} form-country-box`}
                    onChange={(cur, telDetail, __, formatVal) => {
                      // console.log({cur},{telDetail},{__},{formatVal})
                      fieldValid(telDetail, cur);
                      field.onChange(formatVal);
                    }}
                    value={field.value}
                    inputProps={{
                      placeholder: "+92 000-0000000",
                    }}
                  />
                </>
              )}
            />
            <ErrorMessage errors={errors} name="phone" as="p" />
          </div>
          <div className={`mt-3`}>
            <button
              type="submit"
              className={`${styles.submitBtn}`}
              disabled={submit}
            >
              {submit ? (
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
              ) : (
                <span>Start Collecting</span>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const cookies = nookies?.get(context?.res);

  const userIdCookie = cookies["user"];
  let userCurrent;
  if (!session) {
    return {
      // redirect: {
      //   destination: '/login',
      //   permanent: false,
      // },
      rewrite: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (userIdCookie) {
    userCurrent = JSON.parse(userIdCookie);
  }
  return {
    props: { session, userCurrent },
  };
}
