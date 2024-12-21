import { FormEvent, ReactNode, SetStateAction, ChangeEvent } from "react";

export type textInputProps = {
  name: string;
  type: "text" | "email" | "number" | "password";
  placeholder: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
};

export type formButtonProp = {
  value: string;
};

export type formCompProp = {
  title: string;
  linkSectionTitle: string;
  link: string;
  linkTitle: string;
  children: ReactNode;
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type AuthPageWrapperProp = {
  children: ReactNode;
};
