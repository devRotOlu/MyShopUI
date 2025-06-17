import React from "react";

import { pageWrapperProps } from "../types";

const PageWrapper = ({ children, pageId }: pageWrapperProps) => {
  return (
    <main className="flex-grow-1 d-flex flex-column align-items-start" id={pageId}>
      {children}
    </main>
  );
};

export default PageWrapper;
