import React from "react";

import { validationErrorType } from "../../types/types";

const ValidationError = ({ error }: validationErrorType) => {
  return (
    <p className="mt-1 fst-italic text-danger" style={{ fontSize: "12px" }}>
      {error}
    </p>
  );
};

export default ValidationError;
