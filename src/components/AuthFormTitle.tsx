import React from "react";

import { AuthFormTitleProp } from "../types";

const AuthFormTitle = ({ title }: AuthFormTitleProp) => {
  return (
    <div className="pb-2 pt-2 border-bottom border-secondary">
      <h1 className="text-center fs-3">{title}</h1>
    </div>
  );
};

export default AuthFormTitle;
