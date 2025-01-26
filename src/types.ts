import { FormEvent, ReactNode, SetStateAction, ChangeEvent, CSSProperties, Dispatch, MouseEvent } from "react";
import { AxiosRequestConfig } from "axios";

export type textInputProps = {
  name: string;
  type: "text" | "email" | "number" | "password";
  placeholder?: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
};

export type formButtonProp = {
  value: string;
  styles: CSSProperties;
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
  setIsDisplayed: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
  styles: CSSProperties;
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
  setFormValues: Dispatch<SetStateAction<LoginStateType>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
  isError: boolean;
  handleSubmit: (event: FormEvent) => void;
  isSuccess: boolean;
};

export type productType = {
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  id: number;
  images: { url: string }[];
};

export type CartItemProp = {
  item: cartType;
  itemIndex: number;
  delete_Item: (cartId: number, itemIndex: number) => void;
  updateQuantity: (value: number, productId: number, itemIndex: number, product?: productType, cartQuantity?: number, id?: number) => void;
  isModifying: boolean;
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
  disabled?: boolean;
};

export type AccountDropDownProp = {
  handleShowDropDown: (event: MouseEvent<HTMLButtonElement>) => void;
  showDropDown: boolean;
};

export type userDataType = {
  id: string;
  billingAddress: string;
  shippingAddress?: string;
  phoneNumber: string;
  email: string;
  profilePictureUri: string;
  firstName: string;
  lastName: string;
};

export type cartType = {
  id?: number;
  cartQuantity: number;
  product: productType;
};

export type addedItemType = {
  customerId: string;
  productId: number;
  quantity: number;
};

export type updatedItemType = {
  customerId: string;
  productId: number;
  quantity: number;
  id: number;
};

export type wishlistType = {
  id: number;
  product: productType;
};

export type CartTableProp = {
  children: ReactNode;
};

export type failedRequestType = {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
};
export type isInitialRenderType = {
  home: boolean;
};
export type signupType = { firstName: string; lastName: string; email: string; phoneNumber: string; password: string };

export type PayPalProps = {
  setIsSUccess: Dispatch<SetStateAction<boolean | undefined>>;
};

export type MonnifyProps = {
  transactionRef: string;
};

export type payOptionType = { payMethod: string; message: string; icon: string };

export type paymentOptionProp = {
  payOption: payOptionType;
  setPayOption: Dispatch<SetStateAction<"card" | "transfer" | "">>;
};

export type bankDetailsType = {
  accountNumber: string;
  accountName: string;
  bankName: string;
  accountDurationSeconds: string;
  uSSDPayment: string;
  expiresOn: string;
  amount: number;
  fee: number;
  totalPayable: number;
};

export type userBankInfoProp = {
  transactionRef: string;
};

export type paymentTitleProp = {
  title: string;
  setPayOption: Dispatch<SetStateAction<"card" | "transfer" | "">>;
};

export type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  products: productType[];
  cart: cartType[];
  cartItemsCount: number;
  setCart: Dispatch<SetStateAction<cartType[]>>;
  loginData: userDataType;
  setLoginData: Dispatch<SetStateAction<userDataType>>;
  isOldSession: boolean;
  setIsOldSession: Dispatch<SetStateAction<boolean>>;
  isInitialRender: isInitialRenderType;
  setInitialRender: (comp: string, value: boolean) => void;
  handLogout: () => void;
  cartItemsTotalPrice: number;
};
