import React, { FormEvent, ReactNode, SetStateAction, ChangeEvent, CSSProperties, Dispatch, MouseEvent, FocusEvent } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { QueryObserverResult, RefetchOptions, UseMutateFunction } from "@tanstack/react-query";

type baseUserType = {
  firstName: string;
  lastName: string;
};

export type userProfileDataType = {
  name: string;
  label: string;
  placeholder: string;
};

export type deliveryProfileDataType = userProfileDataType;

export type textInputProps = {
  name: string;
  type: "text" | "email" | "number" | "password";
  placeholder?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  handleFocus?: (event: FocusEvent<HTMLInputElement>) => void;
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

export type ReactPortalProp = {
  wrapperId: string;
  children: ReactNode;
};

export type AuthFormTitleProp = {
  title: string;
};

export type authFormLinkProps = {
  linkSectionTitle: string;
  children: React.ReactNode;
};

export type pageLinkProps = {
  link: string;
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

export type useModalDataType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type useLoginData = {
  formValues: LoginStateType;
  setFormValues: Dispatch<SetStateAction<LoginStateType>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
  isError: boolean;
  handleSubmit: (event: FormEvent) => void;
  isSuccess: boolean;
};

export type useMonnifyType = {
  isBankTransferError: boolean;
  isPaymentError: boolean;
  isFetchingTransferDetails: boolean;
  setBankCode: React.Dispatch<React.SetStateAction<string>>;
  bankCode: string;
  bankDetails: bankDetailsType;
  isSentCardDetails: boolean;
  isLoadedDetails: boolean;
  isLoadedStatus: boolean;
  isTransactionSuccessful: boolean;
  isFetchingTransactionStatus: boolean;
  isFetchedTransactionStatus: boolean;
  refetchTransactionStatus: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  sendCardDetails: UseMutateFunction<AxiosResponse<any, any>, Error, cardRequestType, unknown>;
  cardDetailsSent: boolean;
  isCardPaymentError: boolean;
  paymentInitialized: boolean;
  isInitializingPayment: boolean;
  initializePayment: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  transactionRef: string;
  sendTransferDetails: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  detailsSent: boolean;
};

type reviewsType = baseUserType & {
  profilePictureURI?: string;
};

export type productType = {
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  id: number;
  images: { url: string }[];
  reviews: reviewsType[];
};

type updateQuantityType = (value: number, productId: number, product?: productType, cartQuantity?: number, id?: number) => void;

export type CartItemProp = {
  item: cartType;
  delete_Item: (cartId: number) => void;
  updateQuantity: updateQuantityType;
  addToWishlist: (customerId: string, productId: number) => void;
  status: { beingUpdated: boolean; beingDeleted: boolean; beingAddedToWhishlist: boolean };
};

export type useUpdateItemDataType = {
  isUpdating: boolean;
  updateQuantity: updateQuantityType;
};

export type ProductCardProp = {
  status: {
    isAddingToCart: boolean;
    isUpdatingCart: boolean;
  };
  index: number;
  handleAddToCart: (index: number) => void;
};

export type itemToggleButtonProps = {
  itemQuantity: number;
  handleIncreaseItem: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDecreaseItem: (event: MouseEvent<HTMLButtonElement>) => void;
  styles?: CSSProperties;
};

export type AccountDropDownProp = {
  handleShowDropDown: (event: MouseEvent<HTMLButtonElement>) => void;
  showDropDown: boolean;
};

type userAddressType = {
  streetAddress: string;
  city: string;
  state: string;
};

export type userDataType = baseUserType &
  userAddressType & {
    id: string;
    phoneNumber: string;
    email: string;
  };

export type modifyUserType = baseUserType &
  userAddressType & {
    currentPassword?: string;
    newPassword?: string;
  };

export type profileDataType = baseUserType &
  userAddressType & {
    currentPassword?: string;
    newPassword?: string;
  };

export type deliveryDataType = baseUserType &
  userAddressType & {
    id?: string | number;
    phoneNumber: string;
    lga: string;
    directions?: string;
    additionalInformation?: string;
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
export type signupType = baseUserType & { email: string; phoneNumber: string; password: string };

export type MonnifyProps = {
  transactionRef: string;
};

export type payOptionType = { payMethod: string; message: string; icon: string };

export type paymentOptionProp = {
  payOption: payOptionType;
};

export type bankDetailsType = {
  accountNumber: string;
  accountName: string;
  bankName: string;
  accountDurationSeconds: string;
  ussdPayment: string;
  expiresOn: string;
  amount: number;
  fee: number;
  totalPayable: number;
};

export type transferDetailsProp = {
  children: React.ReactNode;
};

export type userBankInfoProp = {
  transactionRef: string;
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type paymentTitleProp = {
  title: string;
  children?: React.ReactNode;
};

export type cardType = {
  number: string;
  expiry: string;
  cvv: string;
  pin: string;
};

export type cardRequestType = {
  transactionReference: string;
  card: { number: string; expiryMonth: string; expiryYear: string; pin: string; cvv: string };
};

export type addWishlistType = {
  customerId: string;
  productId: number;
};

export type confirmTransferBtnProps = {
  fetchTransaction: () => void;
};

export type checkoutContextType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isBankTransferError: boolean;
  isPaymentError: boolean;
  setMonnifyOption: React.Dispatch<React.SetStateAction<"" | "card" | "transfer">>;
  monnifyOption: "" | "card" | "transfer";
  isInitializingPayment: boolean;
  detailsSent: boolean;
  isLoadedDetails: boolean;
  transactionRef: string;
  sendCardDetails: UseMutateFunction<AxiosResponse<any, any>, Error, cardRequestType, unknown>;
  bankCode: string;
  setBankCode: React.Dispatch<React.SetStateAction<string>>;
  sendTransferDetails: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  isFetchingTransferDetails: boolean;
  isFetchedTransactionStatus: boolean;
  isLoadedStatus: boolean;
  refetchTransactionStatus: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  isFetchingTransactionStatus: boolean;
  bankDetails: bankDetailsType;
  isTransactionSuccessful: boolean;
  paymentInitialized: boolean;
  setPayPalIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setPayPalOrderID: React.Dispatch<React.SetStateAction<string>>;
  initializePayment: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  payPalIsSuccess: boolean;
  isCardPaymentError: boolean;
};

export type payPlatformType = "payPal" | "monnify" | "";

export type payOptionProps = {
  setPayOption: Dispatch<SetStateAction<payPlatformType>>;
  payOption: payPlatformType;
};

export type transactionStatusType = {
  paymentStatus: string;
};

type componentOverlayOwnProps<E extends React.ElementType> = {
  as?: E;
  children?: ReactNode;
};

export type componentOverlayProps<E extends React.ElementType> = componentOverlayOwnProps<E> & Omit<React.ComponentProps<E>, keyof componentOverlayOwnProps<E>>;

export type dialogHeaderProps = {
  children?: React.ReactNode;
};

export type skeletonProps = {
  count: number;
};

export type productTabProps = {
  description: string;
};

export type productProps = {
  product: productType;
  children: ReactNode;
  index: number;
};

export type thumbnailProps = {
  url: string;
  name: string;
};

export type thumbnailWrapProps = {
  children: ReactNode;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  activeIndex: number;
};

export type pageWrapperProps = {
  children: React.ReactNode;
  pageId: string;
};

export type carouselProps = {
  activeIndex: number;
  images: { url: string }[];
  name: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type caurouselControlProps = {
  handleOnClickPrevious: (event: MouseEvent<HTMLButtonElement>) => void;
  handleOnClickNext: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type modalCloseButtonProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type useModifyCartDataType = {
  handleAddToCart: (productIndex: number) => void;
  addedItem: string;
  addCartError: boolean;
  addCartSuccess: boolean;
  isAddingToCart: boolean;
  updateCartError: boolean;
  updateCartSuccess: boolean;
  isUpdatingCart: boolean;
};

export type useAddToWhishlistDataType = {
  isAddingToWishList: boolean;
  addItemToWishList: (customerId: string, productId: number) => void;
};

export type loaderProps = {
  size?: string;
  color?: string;
};

export type addToWishlistProps = {
  productId: number;
  setDisplayAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export type quantityExceededErrorProps = {
  quantityExceedRef: React.RefObject<boolean>;
  quantity: number;
  validateQuantity: boolean;
  setValidateQuantity: React.Dispatch<React.SetStateAction<boolean>>;
};

export type userTabDataType = {
  tab: string;
  icon: string;
  link: { linkLabel: string; to: string }[];
};

export type TabProps = userTabDataType & {};

export type profileSummaryProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPageIndex: React.Dispatch<React.SetStateAction<"0" | "1" | "2">>;
  profileIndex: number;
  setProfileofInterestIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type AppContextType = {
  initialDeliveryProfile: deliveryDataType;
  deliveryProfiles: deliveryDataType[];
  setDeliveryProfiles: Dispatch<SetStateAction<deliveryDataType[]>>;
  modifyingProfile: boolean;
  profileMutate: UseMutateFunction<AxiosResponse<any, any>, Error, modifyUserType, unknown>;
  wishList: wishlistType[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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

export type useGetDeliveryProfileDataType = {
  loadingDeliveryProfile: boolean;
};

export type ConfirmationDialogProps = {
  handleDeletion: (_: MouseEvent<HTMLButtonElement>) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type useDeleteDeliveryProfileDataType = {
  deleteProfile: UseMutateFunction<AxiosResponse<any, any>, Error, number, unknown>;
  isDeleted: boolean;
};

export type useAddDeliveryProfileDataType = {
  isAdded: boolean;
  addDeliveryProfile: UseMutateFunction<AxiosResponse<any, any>, Error, deliveryDataType, unknown>;
  addingDeliveryProfile: boolean;
};

export type useUpdateDeliveryProfileDataType = {
  isUpdated: boolean;
  updateDeliveryProfile: UseMutateFunction<AxiosResponse<any, any>, Error, deliveryDataType, unknown>;
  updatingDeliveryProfile: boolean;
};

export type ProfileFormProps = {
  children: React.ReactNode;
  handleDeliveryProfile: () => void;
  isPending: boolean;
};

export type ProfileWrapperProps = {
  children: ReactNode;
  setPageIndex: React.Dispatch<React.SetStateAction<"0" | "1" | "2">>;
};

export type AddProfileProps = {
  addingDeliveryProfile: boolean;
  addDeliveryProfile: UseMutateFunction<AxiosResponse<any, any>, Error, deliveryDataType, unknown>;
};

export type EditProfileProps = {
  profileToEditIndex: number;
  updateDeliveryProfile: UseMutateFunction<AxiosResponse<any, any>, Error, deliveryDataType, unknown>;
  updatingDeliveryProfile: boolean;
};
