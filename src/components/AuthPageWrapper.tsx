import React from "react";

import Brand from "./Brand.tsx";

import { AuthPageWrapperProp } from "./types";

const AuthPageWrapper = ({ children }: AuthPageWrapperProp) => {
  return (
    <main className="flex-grow-1 d-flex flex-column align-items-center gap-4 pb-4" id="signup">
      <div className="mt-4">
        <Brand />
      </div>
      {children}
    </main>
  );
};

export default AuthPageWrapper;
