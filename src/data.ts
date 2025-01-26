import { payOptionType } from "./types";

export const signupDetails: { name: string; type: "text" | "email" | "number" | "password"; inputLabel: string; placeholder: string }[] = [
  {
    name: "firstName",
    type: "text",
    inputLabel: "First Name",
    placeholder: "Enter First Name",
  },
  {
    name: "lastName",
    type: "text",
    inputLabel: "Last Name",
    placeholder: "Enter Last Name",
  },
  {
    name: "email",
    type: "email",
    inputLabel: "Email Address",
    placeholder: "Enter Email Address",
  },
  {
    name: "phoneNumber",
    type: "text",
    inputLabel: "Phone Number",
    placeholder: "Enter Phone Number",
  },
  {
    name: "password",
    type: "text",
    inputLabel: "Password",
    placeholder: "Enter Password",
  },
];

export const loginDetails: { name: string; type: "text" | "email" | "number" | "password"; inputLabel: string; placeholder: string }[] = [
  {
    name: "email",
    type: "text",
    inputLabel: "Email Address",
    placeholder: "Enter Email Address",
  },
  {
    name: "password",
    type: "text",
    inputLabel: "Password",
    placeholder: "Enter Password",
  },
];

export const payOptions: payOptionType[] = [
  {
    payMethod: "Bank Transfer",
    message: "Make Payments using Bank Transfer.",
    icon: "mdi:bank-transfer",
  },
  {
    payMethod: "Card",
    message: "Make Payments with your Credit or Debit Card",
    icon: "fluent-emoji-flat:credit-card",
  },
];
