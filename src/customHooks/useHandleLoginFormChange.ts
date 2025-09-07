import { ChangeEvent, useState } from "react";

import { loginStateType, useHandleLoginFormChangeData } from "../types/types";

export const useHandleLoginFormChange = (): useHandleLoginFormChangeData => {
  const [formValues, setFormValues] = useState<loginStateType>({ email: "", password: "" });
  const handleChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };
  return {
    handleLoginInputChange: handleChange,
    formValues,
  };
};
