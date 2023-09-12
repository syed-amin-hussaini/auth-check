// Import required libraries and components
import Head from "next/head";
import "react-phone-input-2/lib/style.css";
import styles from "@/src/styles/Form.module.scss";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export default function Profile() {
  const [phoneLength, setPhoneLength] = useState(0);
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState();

  const [submit, setSubmit] = useState(false);
  const [emailExit, setEmailExit] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const fieldValid = (formatVal, pho) => {
    return false
    setPhone(pho);
    setPhoneLength(formatVal.format.length);

  };

  useEffect(() => {
    let cookies = parseCookies();
    if (cookies?.user) {
      cookies = JSON?.parse(cookies?.user);
      setUserData(cookies)
      setValue("name", cookies.name || "");
      setValue("email", cookies.email || "");
      setValue("age", cookies?.age || "");
      setValue("location", cookies?.location || "");
      setValue("phone", cookies?.phone || "");
      if (cookies.email) setEmailExit(true);
      setPhone(cookies?.phone || "");
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log({phoneLength}, {phone})

    // return;
    setSubmit(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", data.age);
    formData.append("location", data.location);
    formData.append("phone", phone);
    formData.append("email_status", userData?.email_status);

    try {
      const response = await axios.post("/api/form-detail", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        if (router.asPath === "/dashboard") {
          router.push("/dashboard");
        }
        toast("Profile Updated");
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

      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} row`}>
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
                  value: /\b\d{1,2}\b/gm,
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
            <label htmlFor="phone">Phone Number</label>
            <br />
            <input
              type="number"
              className={styles.autoColor}
              maxLength={64}
              {...register("phone", {
                required: "This field is mandatory",
                pattern: {
                  value: /^(\+92|0092|0)[1-9]\d{9}$/g,
                  message: "Incorrect Phone Format",
                },
              })}
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
