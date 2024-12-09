import { FormEvent, ReactNode, SetStateAction, ChangeEvent } from "react";

export type textInputProps = {
  name: string;
  type: "text" | "email" | "number" | "password";
  inputLabel: string;
  placeholder: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type formButtonProp = {
  value: string;
};

export type formCompProp = {
  title: string;
  children: ReactNode;
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
