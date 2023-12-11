import "react-phone-input-2/lib/style.css";
import styles from "@/src/styles/Form.module.scss";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import Alert from "./Alert";
import { signOut } from "next-auth/react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Form = ({
  f_complete,
  firstTime,
  cityOptions,
  styling,
  setShowModal,
  userRegister = false,
  login = false,
}) => {
  const [userData, setUserData] = useState();

  const [submit, setSubmit] = useState(false);
  const [emailExit, setEmailExit] = useState(false);

  // const [selectOpt, setSelectOpt] = useState();

  const [formError, setFormError] = useState();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      dob: "", // Add this line to set default value for "dob"
      // other default values...
    },
  });

  // Get the current date
  var currentDate = new Date();
  const startDate = watch("dob");

  // useEffect(() => {
  //   if (startDate) {
  //     // Handle the value change after the user selects a new date
  //     console.log("Date changed:", startDate);
  //   }
  // }, [startDate]);

  // Calculate yesterday's date by subtracting one day
  var yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);

  // Format the date as YYYY-MM-DD
  var formattedYesterdayDate = yesterdayDate.toISOString().split("T")[0];

  const prevDate = new Date(formattedYesterdayDate);

  const calculateAge = (birthdateString) => {
    const birthDate = new Date(birthdateString);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    const formattedBirthDate = `${
      (birthDate.getDate() < 10 ? "0" : "") + birthDate.getDate()
    }-${
      (birthDate.getMonth() + 1 < 10 ? "0" : "") + (birthDate.getMonth() + 1)
    }-${birthDate.getFullYear()}`;

    return { formattedBirthDate, age };
  };

  useEffect(() => {
    let cookies = parseCookies();
    if (cookies?.user) {
      cookies = JSON?.parse(cookies?.user);
      setUserData(cookies);
      setValue("name", cookies.name || "");
      setValue("email", cookies.email || "");
      setValue("age", cookies?.age || "");
      setValue("gender", cookies?.gender || "");
      // setSelectOpt(cookies?.location || "");
      setValue("phone", cookies?.phone || "");
      if (cookies.email) setEmailExit(true);
      // setPhone(cookies?.phone || "");
    }
  }, [setValue]);

  const handleDateChange = (date) => {
    // Extract date, month, and year from the selected date
    setValue("dob", date);
    // Do something with the extracted date, month, and year
    // You can now send these values to another function or perform any desired actions
    // For example, you might want to call setStartDate with the extracted date:
    // setDate(age);
  };

  const onSubmit = async (data) => {
    
    let { formattedBirthDate, age } = calculateAge(data.dob);
  
    
    setSubmit(true);
    const formData = new FormData();
    formData.append("name", data.name);

    !login && formData.append("email", data.email ?? "");
    !login && formData.append("dob", formattedBirthDate);
    !login && formData.append("age", age);
    !login && formData.append("gender", data.gender);
    !login && formData.append("phone", data.phone);
    !login && formData.append("promotional", data.promotional);
    !login && formData.append("email_status", userData?.email_status);
    !login && formData.append("location", "null");
    (userRegister || !login) && formData.append("id", data.phone);
    userRegister && formData.append("source", "manual");
    console.log({ formattedBirthDate, age });
    try {
      const response = await axios.post(
        `/api/form-detail${userRegister ? "?login=true" : ""}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log({ response });
      if (response.status === 200) {
        if (firstTime) {
          !userRegister && f_complete();
          console.log({ firstTime });
          setShowModal(false);

          setTimeout(() => {
            router.push("/?");
          }, 3000);
        }
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        destroyCookie(null, "user", { path: "/" });
        signOut();
      }

      setFormError(error?.response?.data?.error);
      // const FormData = error?.response?.data;
      // const statusText = error?.response?.statusText;
      // console.log(statusText);
    }
    setSubmit(false);
  };
  // const handleChange = (event) => {
  //   setSelectOpt(event.target.value);
  // };
  return (
    <>
      {formError && <Alert action="danger" msg={formError} hide={true} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${styling}`}
      >
        <div className={`row ${styles.row}`}>
          <div className={`col-md-12`}>
            <label htmlFor="name">Player Name</label>
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
            <label htmlFor="phone">
              Contact Number{" "}
              <small style={{ fontSize: ".675em" }}>(Mobile)</small>
            </label>
            <br />
            <input
              type="tel"
              className={styles.autoColor}
              maxLength={64}
              placeholder="03XXXXXXXXX"
              {...register("phone", {
                required: "Required",
                pattern: {
                  value: /^(\+92|0092|0)[1-9]\d{9}$/g,
                  message: "Invalid format",
                },
              })}
            />
            <ErrorMessage errors={errors} name="phone" as="p" />
          </div>
          {!login && (
            <>
              <div className={`col-md-12 d-none`}>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  className={styles.autoColor}
                  maxLength={256}
                  disabled={emailExit}
                  {...register("email", {
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
                <label htmlFor="gender">Player's Gender</label>
                <br />
                <select
                  // onChange={handleChange}
                  // value={selectOpt}
                  defaultValue=""
                  className={`form-select`}
                  {...register("gender", { required: "Required" })}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                </select>
                <ErrorMessage errors={errors} name="gender" as="p" />
              </div>
              <div className={`col-md-12`}>
                <label htmlFor="dob">Player's DOB</label>
                {/* <label htmlFor="dob">{startDate}</label> */}
                <br />
                <DatePicker
                  selected={startDate}
                  maxDate={prevDate}
                  onChange={(date) => handleDateChange(date)}
                  // setStartDate(date)
                  wrapperClassName="w-100"
                  dateFormatCalendar="dd-MM-yyyy" // Specify the date format
                />
                <input
                  type="hidden"
                  className={styles.autoColor}
                  value={startDate}
                  {...register("dob", {
                    required: "Required",
                  })}
                />
                <ErrorMessage errors={errors} name="dob" as="p" />
                {/* <input
              type="date"
              placeholder="yyyy-mm-dd"
              className={styles.autoColor}
              max={formattedYesterdayDate}
              {...register("age", {
                required: "Required",
              })}
            />
            <ErrorMessage errors={errors} name="age" as="p" /> */}
              </div>

              <div className={`col-md-12`}>
                <label>
                  <input
                    className="form-check-input me-2"
                    {...register("Privacy", { required: "Required" })}
                    type="checkbox"
                    checked
                  />
                  <span className={styles.form_check_label}>
                    I accept the <span id="tc">T&amp;Cs</span> and Privacy
                    Notice of Mondelez and consent to Mondelez using my personal
                    information as stated in the{" "}
                    <span id="termsOfUse">T&amp;Cs</span> and{" "}
                    <span id="privacynotice">Privacy Notice</span>
                  </span>
                </label>
                <ErrorMessage errors={errors} name="Privacy" as="p" />
              </div>
              <div className={`col-md-12`}>
                <label>
                  <input
                    className="form-check-input me-2"
                    {...register("promotional")}
                    type="checkbox"
                  />
                  <span className={styles.form_check_label}>
                    I would like to receive promotional communication from
                    Mondelez about it's products and offers.
                  </span>
                </label>
                <ErrorMessage errors={errors} name="promotional" as="p" />
              </div>
            </>
          )}
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
              <span>{ login? "Login": "Start Collecting"}</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
