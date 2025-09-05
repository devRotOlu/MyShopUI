import React from "react";

import "./style.css";

const isDevelopment = process.env.NODE_ENV === "development";
const LoginDetails = () => {
  //   if (isDevelopment) return null;
  return (
    <div className="fst-italic" id="login_details">
      <p>
        Email: <span className="fw-bold">olaoluyiminka.123@gmail.com</span>
      </p>
      <p>
        Password: <span className="fw-bold">Olaolu__1234</span>
      </p>
    </div>
  );
};

export default LoginDetails;
