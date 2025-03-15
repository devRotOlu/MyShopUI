import React from "react";

import { pageWrapperProps } from "../types";

const PageWrapper = ({ children, pageId }: pageWrapperProps) => {
  return (
    <main className="min-vh-100 px-4 py-5 min-vh-100" id={pageId}>
      {children}
    </main>
  );
};

export default PageWrapper;
