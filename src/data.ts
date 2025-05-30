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
    type: "password",
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
    type: "password",
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
    name: "lga",
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

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const contacts: { contact: string; channel: string; icon: string }[] = [
  {
    contact: "Email Support",
    channel: "rotimiolumide68@gmail.com",
    icon: "mdi:email",
  },
  {
    contact: "Phone Support",
    channel: "08140836550",
    icon: "ic:round-phone",
  },
  {
    contact: "Whatsapp",
    channel: "08140836550",
    icon: "ic:sharp-whatsapp",
  },
];

export const socials: { name: string; icon: string }[] = [
  { name: "facebook", icon: "cib:facebook-f" },
  { name: "instagram", icon: "formkit:instagram" },
  { name: "x", icon: "garden:twitter-fill-12" },
  { name: "youtube", icon: "line-md:youtube-filled" },
];

export const naira = "₦";
export const prices: { label: string; minPrice?: number; maxPrice?: number }[] = [
  {
    label: `Under ${naira}2000`,
    maxPrice: 2000,
  },
  {
    label: `${naira}2000 - ${naira}5000`,
    minPrice: 2000,
    maxPrice: 5000,
  },
  {
    label: `${naira}5000 - ${naira}10000`,
    minPrice: 5000,
    maxPrice: 10000,
  },
  {
    label: `${naira}10000 - ${naira}20000`,
    minPrice: 10000,
    maxPrice: 20000,
  },
  {
    label: `${naira}20000 - ${naira}40000`,
    minPrice: 20000,
    maxPrice: 40000,
  },
  {
    label: `Above ${naira}40000`,
    minPrice: 40000,
  },
];
