import { FormEvent, ReactNode, SetStateAction, ChangeEvent, CSSProperties } from "react";

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
  children: ReactNode;
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  styles?: CSSProperties;
};

export type AuthPageWrapperProp = {
  children: ReactNode;
};

export type AppContextProp = {
  children: ReactNode;
};

export type AlertProp = {
  alertMessage: string;
  alertTitle?: string;
  setIsDisplayed: SetStateAction<boolean>;
  children?: ReactNode;
};

export type BrandProp = {
  styles: CSSProperties;
};

export type ModalProp = {
  modalInstance: string;
  children: ReactNode;
  styles?: CSSProperties;
};

export type ReactPortalProp = {
  wrapperId: string;
  children: ReactNode;
};

export type ModalTriggerProp = {
  modalInstance: string;
  class_name?: string;
  styles?: CSSProperties;
  children: ReactNode;
};

export type AuthFormTitleProp = {
  title: string;
};

export type AuthFormLinkProp = {
  link: string;
  linkSectionTitle: string;
  linkLabel: string;
};

export type AuthFormElementWrapperProp = {
  children: ReactNode;
};

export type LoginProp = {
  children: ReactNode[];
};

export type LoginFormElementProp = {
  name: string;
  inputLabel: string;
  children: ReactNode;
  isError?: boolean;
};

export type LoginStateType = { email: string; password: string };

export type useLoginData = {
  formValues: LoginStateType;
  setFormValues: SetStateAction<LoginStateType>;
  prevFormValues: LoginStateType;
  handleChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
  isError: boolean;
  handleSubmit: (event: FormEvent) => void;
};

export type productType = {
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  id: number;
  images: { url: string }[];
};

export type cartType = {
  cartQuantity: number;
  product: productType;
};

export type ProductCardProp = {
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  index: number;
  images: { url: string }[];
  handleAddToCart: (index: number) => void;
  isPending: boolean;
};

export type userDataType = {
  id: string;
  billingAddress: string;
  shippingAddress?: string;
  phoneNumber: string;
  email: string;
};

export type loginDataType = {
  accessToken: string;
  user: userDataType;
  refreshToken: string;
};

export type cartItemType = {
  customerId: string;
  productId: number;
  quantity: number;
};
