import { deliveryProfileDataType, payOptionType, userProfileDataType, userTabDataType } from "./types";

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

const baseProfile: userProfileDataType[] = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter Last Name",
  },
  { name: "streetAddress", label: "Street Address", placeholder: "Street Address" },
  { name: "state", label: "State", placeholder: "State" },
  { name: "city", label: "City", placeholder: "City" },
];

export const deliveryProfileData: deliveryProfileDataType[] = [
  ...baseProfile,
  {
    name: "direction",
    label: "Directions (optional)",
    placeholder: "Directions",
  },
  {
    name: "lGA",
    label: "LGA  (Local Govt.Area)",
    placeholder: "",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Mobile Number",
  },
];

export const userProfileData: userProfileDataType[] = [...baseProfile, { name: "currentPassword", label: "Current Password", placeholder: "" }, { name: "newPassword", label: "New Password", placeholder: "" }];
