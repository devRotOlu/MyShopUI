import React from "react";

import Brand from "../brand/Brand.tsx";

import { authPageWrapperProp } from "../../types.ts";
import "./style.css";

const AuthPageWrapper = ({ children, id }: authPageWrapperProp) => {
  return (
    <main className="flex-grow-1 d-flex flex-column align-items-center gap-4 pb-4" id={id}>
      <div className="mt-4" id="brand">
        <Brand />
      </div>
      <div id="auth_wrapper">{children}</div>
    </main>
  );
};

export default AuthPageWrapper;
