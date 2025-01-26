import React from "react";

import Brand from "./Brand.tsx";

import { AuthPageWrapperProp } from "../types.ts";

const AuthPageWrapper = ({ children }: AuthPageWrapperProp) => {
  return (
    <main className="flex-grow-1 d-flex flex-column align-items-center gap-4 pb-4" id="signup">
      <div className="mt-4">
        <Brand styles={{ height: "130px", width: "200px" }} />
      </div>
      <div style={{ width: "30%" }}>{children}</div>
    </main>
  );
};

export default AuthPageWrapper;
