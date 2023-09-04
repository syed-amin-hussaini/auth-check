import Head from "next/head";
import 'react-phone-input-2/lib/style.css';
import styles from "@/src/styles/Form.module.scss";
// import { getSession, useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Drawer from "@/components/Drawer";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import PhoneInput from "react-phone-input-2";

export default function Registration({ session }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  const [phoneLength, setPhoneLength] = useState(0);
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    location: "",
    number: "",

    submit: false,

    success: false,
    errStatus: false,
    errMsg: "",
  });

  const fieldValid = (formatVal) => {
    setPhoneLength(formatVal.format.length);
  };
  useEffect(() => {
    setForm((prev) => {
      console.log({ session });
      return {
        ...prev,
        name: session?.user?.name,
        email: session?.user?.email,
      };
    });
    console.log({ form });
  }, []);


  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Head>
        <title>Oreo | Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Drawer />
      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} row`}>
          <div className={`col-md-12`}>
            <label htmlFor="name">
              Name 
            </label>
            <br />
            <input
              type="text"
              className={styles.autoColor}
              maxLength={64}
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
            <label htmlFor="name">
              Email 
            </label>
            <br />
            <input
              type="text"
              className={styles.autoColor}
              maxLength={256}
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
            <label htmlFor="name">
              Age 
            </label>
            <br/>
            <input
              type="number"
              className={styles.autoColor}
              maxLength={64}
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
            <label htmlFor="name">
              Location 
            </label>
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
                  {...field}
                  country={"pk"}
                  containerClass={styles.tel_container}
                  inputClass={styles.tel_input}
                  buttonClass={`${styles.tel_box} form-country-box`}
                  onChange={(_, telDetail, __, formatVal) => {
                    fieldValid(telDetail);
                    field.onChange(formatVal);
                  }}
                  value={field.value}
                  inputProps={{
                    placeholder: "(201) 555-0123*",
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
            >
              {form?.submit ? (
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

  console.log({ session });
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: { session },
  };
}
