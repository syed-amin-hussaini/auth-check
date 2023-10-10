import Head from "next/head";
import "react-phone-input-2/lib/style.css";
import styles from "@/src/styles/Form.module.scss";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Alert from "./Alert";

const Form = ({ f_complete, firstTime, cityOptions }) => {
  const [userData, setUserData] = useState();

  const [submit, setSubmit] = useState(false);
  const [emailExit, setEmailExit] = useState(false);

  const [selectOpt, setSelectOpt] = useState();

  const [formError, setFormError] = useState();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

    // Get the current date
    var currentDate = new Date();

    // Calculate yesterday's date by subtracting one day
    var yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);

    // Format the date as YYYY-MM-DD
    var formattedYesterdayDate = yesterdayDate.toISOString().split("T")[0];

  

  useEffect(() => {
    let cookies = parseCookies();
    if (cookies?.user) {
      cookies = JSON?.parse(cookies?.user);
      setUserData(cookies);
      setValue("name", cookies.name || "");
      setValue("email", cookies.email || "");
      setValue("age", cookies?.age || "");
      setValue("location", cookies?.location || "");
      setSelectOpt(cookies?.location || "");
      setValue("phone", cookies?.phone || "");
      if (cookies.email) setEmailExit(true);
      // setPhone(cookies?.phone || "");
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    // return;
    setSubmit(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", userData.email);
    formData.append("age", data.age);
    formData.append("location", data.location);
    formData.append("phone", data.phone);
    formData.append("email_status", userData?.email_status);

    try {
      const response = await axios.post("/api/form-detail", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        if (firstTime) {
          f_complete();

          setTimeout(() => {
            router.push("/dashboard?");
          }, 5000);
        }
      }
    } catch (error) {
      // console.log(error?.response?.data?.error)

      setFormError(error?.response?.data?.error);
      // const FormData = error?.response?.data;
      // const statusText = error?.response?.statusText;
      // console.log(statusText);
    }
    setSubmit(false);
  };
  return (
    <>
      {formError && <Alert action="danger" msg={formError} hide={true} />}
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
        <div className={`row`} style={{ gap: "15px" }}>
          <div className={`col-md-12`}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              className={styles.autoColor}
              maxLength={99}
              {...register("name", {
                required: "Required",
                pattern: {
                  value: /^([a-zA-Z ]+)$/,
                  message: "Invalid format",
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
                required: "Required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="email" as="p" />
          </div>
          <div className={`col-md-12`}>
            <label htmlFor="age">Age</label>
            <br />
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              className={styles.autoColor}
              max={formattedYesterdayDate}
              {...register("age", {
                required: "Required",
              })}
            />
            <ErrorMessage errors={errors} name="age" as="p" />
          </div>

          <div className={`col-md-12`}>
            <label htmlFor="location">Location</label>
            <br />
            {/* <input
              type="text"
              className={styles.autoColor}
              maxLength={30}
              {...register("location", {
                required: "Required",
                maxLength: 30,
              })}
            /> */}
            <select value={selectOpt} defaultValue="def" className={`form-control ${styles.autoColor}` } {...register("location", { required: true })}>
              <option value="def"  disabled>Select City</option>
              {
                cityOptions?.map((item) => <option key={item?.id} value={item.id}>{ item.name}</option>
                )
              }
            </select>
            <ErrorMessage errors={errors} name="location" as="p" />
          </div>
          <div className={`col-md-12`}>
            <label htmlFor="phone">Number</label>
            <br />
            <input
              type="number"
              className={styles.autoColor}
              maxLength={64}
              placeholder="03XXXXXXXXX"
              {...register("phone", {
                pattern: {
                  value: /^(\+92|0092|0)[1-9]\d{9}$/g,
                  message: "Invalid format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="phone" as="p" />
          </div>
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
    </>
  );
};

export default Form;
