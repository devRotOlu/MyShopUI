import React from "react";
import { Link } from "react-router-dom";

import { authPageWrapperProp } from "../../types/types.ts";
import logo from "../../assests/logo_new_2.webp";
import "./style.css";

const AuthPageWrapper = ({ children, id }: authPageWrapperProp) => {
  return (
    <main className="flex-grow-1 d-flex flex-column align-items-center gap-5 pb-4 auth_page" id={id}>
      <Link to="/">
        <div className="mt-3" id="brand">
          <img src={logo} alt="App Brand" style={{ width: "100%" }} />
        </div>
      </Link>
      <div id="auth_wrapper">{children}</div>
    </main>
  );
};

export default AuthPageWrapper;
