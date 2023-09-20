import React, { useEffect, useState } from "react";

const Alert = ({customClass = "", action, msg, hide = false}) => {
  const [alert, setAlert] = useState(true);
  const [entries, setEntries] = useState();
  
  useEffect(() => {
    setEntries(Object?.values(msg[0]))
    setAlert(true)
    if (hide) {
      setTimeout(() => {
        setEntries([])
      }, 5000);
    }
  }, [msg])

  const closeAlert = () => {
    setAlert(false)
    setEntries([]);
  }
  return (
    <div
      className={`custom-alert alert alert-${action} ${entries?.length !== 0 ? "alert-active" :""} alert-dismissible fade ${alert && "show"} ${customClass}`}
      role="alert"
    >
      {
        entries?.map((item,i) => {
          return <small className="d-block" key={i}>{item}</small>
        })
      }  
      {hide &&
      <button
        type="button"
        className="btn-close"
        onClick={()=>closeAlert()}
      ></button>
      }
    </div>
  );
};

export default Alert;
