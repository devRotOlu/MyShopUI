import { payOptionType, userProfileDataType, userTabDataType } from "./types";

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

export const userTabData: userTabDataType[] = [
  {
    tab: "My Profile",
    icon: "ix:user-profile",
    link: [
      { linkLabel: "Account Information", to: "/account/profile" },
      { linkLabel: "Delivery Address", to: "/account/delivery-addresses" },
    ],
  },
  {
    tab: "My Orders",
    icon: "ic:twotone-shopping-bag",
    link: [{ linkLabel: "Order History", to: "/account/orders" }],
  },
  {
    tab: "Delete Account",
    icon: "uiw:user-delete",
    link: [{ linkLabel: "Delete Account", to: "/account/deleteAccount" }],
  },
];

export const userProfileData: userProfileDataType[] = [
  {
    name: "firstName",
    label: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
  },
  { name: "streetAddress", label: "Street Address" },
  { name: "state", label: "State" },
  { name: "city", label: "City" },
  { name: "currentPassword", label: "Current Password" },
  { name: "newPassword", label: "New Password" },
];
