import React, { FormEvent, ReactNode, SetStateAction, ChangeEvent, CSSProperties, Dispatch, MouseEvent, FocusEvent, MouseEventHandler, ReactElement } from "react";
import { AxiosResponse } from "axios";
import { MutateOptions, QueryObserverResult, RefetchOptions, UseMutateFunction } from "@tanstack/react-query";
import { deliveryAddressSchemaType, loginSchemaType } from "./formSchemaTypes";
import z, { ZodObject, ZodRawShape } from "zod";

export type SEO_OptimizerProps = {
  title: string;
  description: string;
  imageUrl?: string;
  robots?: "index, follow" | "noindex, nofollow" | "noindex, follow";
};

export type validationErrorType = {
  error: string;
};

type baseUserType = {
  firstName: string;
  lastName: string;
};

export type forgotPasswordInstructionType = {
  isInvalidEmail: boolean;
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
  handleBlur?: (event: FocusEvent<HTMLInputElement>) => void;
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

export type authPageWrapperProp = {
  children: ReactNode;
  id: string;
};

export type providersProp = {
  children: ReactNode;
};

export type AlertProp = {
  alertMessage: string;
  alertTitle?: string;
  children?: ReactNode;
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

export type loginFormElementProp = {
  validationErrors: Partial<Record<keyof loginSchemaType, string>>;
  name: string;
  inputLabel: string;
  children: ReactNode;
  isError?: boolean;
};

export type loginStateType = { email: string; password: string };

export type resetPasswordDataType = {
  userId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export type useModalDataType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type useLoginSubmitDataType = {
  prevFormValues: {
    email: string;
    password: string;
  };
  handleSubmit: (event: FormEvent<Element>) => void;
};

export type useLogoutDataType = {
  logoutUser: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, void, unknown>;
  isLoggedOut: boolean;
  logoutTime: number;
  isLoggingOut: boolean;
};

export type useDeleteAccountDataType = {
  isDeletingAccount: boolean;
  isAccountDeleted: boolean;
  deleteAccount: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, void, unknown>;
  accountDeletionTime: number;
};

export type useHandleLoginFormChangeData = {
  handleLoginInputChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
  formValues: loginStateType;
};

export type useLoginData = {
  signingUser: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, loginStateType, unknown>;
  isAuthenticating: boolean;
  loginTime: number;
  isLoginError: boolean;
};

export type useMonnifyType = {
  isMonnifyInitializationError: boolean;
  orderId?: string;
  sendingCardDetails: boolean;
  isBankTransferError: boolean;
  isPaymentError: boolean;
  isFetchingTransferDetails: boolean;
  bankDetails: bankDetailsType;
  isSentCardDetails: boolean;
  isLoadedDetails: boolean;
  isLoadedStatus: boolean;
  isTransactionSuccessful: boolean;
  isFetchingTransactionStatus: boolean;
  refetchTransactionStatus: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, transferStatusType, unknown>;
  sendCardDetails: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, sendCardDetailsType, unknown>;
  cardDetailsSent: boolean;
  isCardPaymentError: boolean;
  isInitializingPayment: boolean;
  initializePayment: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<unknown, unknown>, Error>>;
  transactionRef: string;
  sendTransferDetails: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<unknown, unknown>, Error>>;
  detailsSent: boolean;
};

type reviewsType = {
  reviewer: {
    id: string;
    details: baseUserType;
  };
  review: string;
  rating: number;
  reviewDate: string;
};

export type productCardWrapperProps = {
  children: ReactNode;
};

export type categoryProps = {
  products: productType[];
  isLoading: boolean;
  children: ReactNode;
};

export type searchBarProps = {
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchResults: React.Dispatch<React.SetStateAction<searchResultType | null>>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  userInput: string;
};

export type searchDisplayProps = {
  searchResults: searchResultType | null;
  searchTerm: string;
};

export type searchProductsProps = {
  products: productType[];
  children: ReactNode;
};

export type searchBrandsProps = {
  brands: string[];
  children: ReactNode;
};

export type searchCategoriesProps = {
  categories: productCategoryType[];
  children: ReactNode;
};

export type productPageProps = {
  productName: string;
};

export type attributeType = {
  attributeId: number;
  value: string;
  attribute: {
    name: string;
    unit: string;
  };
};

export type sortPanelProps = {
  currentPage: number;
  productPerPage: number;
  totalProducts: number;
};

export type searchbarBrandWrapperProps = {
  hideSearchbar: boolean;
};

export type searchResultType = {
  products: productType[];
  brands: string[];
};

export type selectedPricesType = {
  minPrice?: number;
  maxPrice?: number;
};

export type filterPanelProps = {
  products: productType[];
};

export type brandPageProps = {
  brand: string;
  isLoading: boolean;
  products: productType[];
  children: ReactNode;
};

export type homeProductLayoutProps = {
  children: ReactNode;
};

export type homeCardsWrapperProps = {
  children: ReactNode;
};

export type categoryPageLayoutProps = {
  filterWrapper: ReactNode;
  children: ReactNode;
};

export type categoryCardsWrapperProps = {
  children: ReactNode;
};

export type productCarouselModalProps = {
  modalCloseButton: ReactNode;
  carouselContent: ReactNode;
};

export type productType = {
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  id: number;
  images: { url: string }[];
  reviews: reviewsType[];
  averageRating: number;
  attributes: attributeType[];
  category: productCategoryType;
};

type updateQuantityType = (value: number, productId: number, cartQuantity?: number, id?: number) => void;

export type cartItemProp = {
  item: cartType;
  index?: number;
  itemCount?: number;
};

export type useUpdateItemDataType = {
  isUpdatingCartItem: boolean;
  isUpdatedCartItem: boolean;
  updateCartItem: updateQuantityType;
};

export type productCardProp = {
  product: productType;
};

export type useMoveToWishlistDataType = {
  moveItemToWishlist: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, number, unknown>;
  isMovedToWishlist: boolean;
  isMovingToWishlist: boolean;
  isItemExistErrorIndex: number;
};

export type navigationButtonsProps<T> = {
  params: {
    firstPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemCount: number;
    maxItemPerPage: number;
    setCurrentItems: React.Dispatch<React.SetStateAction<T[]>>;
    currentItems: T[];
    items: T[];
  };
};

export type productSummaryModalProps = {
  product: productType;
  children: ReactNode;
  quantityToAdd: number;
  brand: string;
};

export type itemToggleButtonProps = {
  itemQuantity: number;
  handleIncreaseItem: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDecreaseItem: (event: MouseEvent<HTMLButtonElement>) => void;
  styles?: CSSProperties;
};

type userAddressType = {
  streetAddress: string;
  city: string;
  state: string;
};

type userProviderSignUpType = {
  signup: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, signupType, unknown>;
  isSigningUp: boolean;
  isSignupError: boolean;
};

export type useSignupDataType = userProviderSignUpType & {
  isSignupSuccess: boolean;
};

export type useTokenValidationDataType = {
  isValidatingToken: boolean;
};

export type useConfirmEmailDataType = {
  confirmEmail: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, confirmEmailDTO, unknown>;
  isEmailConfirmed: boolean;
  isEmailConfirmedFailed: boolean;
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

export type activeOrdersProps = {
  children: ReactNode;
};

export type orderProps = {
  order: orderType;
  setOrderCosts: Dispatch<SetStateAction<Record<string, number>>>;
  orderIndex: number;
  orderCosts: Record<string, number>;
  setOrderIndex: Dispatch<SetStateAction<number>>;
};

export type itemsOrderedType = {
  cartItem: cartType;
  orderedQuantity: number;
};

export type orderListProps = {
  orders: orderType[];
  children: ReactNode;
};

export type productReviewProps = {
  productId: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userReviews: userReviewType[];
};

export type orderedItemProps = {
  item: itemsOrderedType;
  isReviewed: boolean;
  handleReview: (productId: number) => void;
};

export type orderHistoryProps = {
  props: {
    userReviews: userReviewType[];
    setReviewId: Dispatch<SetStateAction<number>>;
    order: orderType;
    setOrderIndex: Dispatch<SetStateAction<number>>;
    orderCost: number;
    setShowModal: Dispatch<SetStateAction<boolean>>;
  };
};

export type userReviewType = {
  productId: number;
  rating: number;
  review: string;
};

export type orderType = {
  id: number;
  orderId: string;
  orderDate: string;
  deliveryProfile: deliveryDataType;
  orderStatus: string;
  orderedItems: itemsOrderedType[];
};

export type addProfileFormElementProps = {
  setDeliveryProfile: (value: React.SetStateAction<deliveryDataType>) => void;
  validationErrors: Partial<Record<keyof deliveryAddressSchemaType, string>>;
};

export type deliveryDataType = baseUserType &
  userAddressType & {
    id?: string | number;
    phoneNumber: string;
    lga: string;
    directions?: string;
    additionalInformation?: string;
    isDefaultProfile?: boolean;
  };

export type useCartItemDataType = {
  setValidateQuantity: React.Dispatch<React.SetStateAction<boolean>>;
  validateQuantity: boolean;
  handleQuantityUpdate: (value: number) => void;
  handleAddToWishlist: () => void;
  handleDeleteItem: () => void;
  beingModified: boolean;
};

export type cartType = {
  id?: number;
  cartQuantity: number;
  product: productType;
};

export type encryptDataType = {
  encryptedBody: ArrayBuffer;
  encryptedKey: ArrayBuffer;
  encryptedIV: ArrayBuffer;
};

export type addReviewType = {
  reviewerId: string;
  productId: number;
  review: string;
  rating: number;
};

export type addedItemType = {
  customerId: string;
  productId: number;
  quantity: number;
};

export type alertLinksType = {
  children: ReactNode;
};

export type processLocalCartItemsParamType = {
  params: {
    isLoggedIn: boolean | undefined;
    localStorageIndex: number;
    setCart: (value: React.SetStateAction<cartType[]>) => void;
    customerId: string;
    cartFetched: boolean;
    cartData: unknown;
    cartItemsAdded: boolean;
    itemsUpdated: boolean;
    setLocalAddedItems: React.Dispatch<React.SetStateAction<addedItemType[]>>;
    setLocalUpdatedItems: React.Dispatch<React.SetStateAction<updatedItemType[]>>;
    localAddedItems: addedItemType[];
    localUpdatedItems: updatedItemType[];
  };
};

export type updatedItemType = {
  customerId: string;
  productId: number;
  quantity: number;
  id: number;
};

export type profileLayoutProps = {
  children: ReactNode;
  heading: string;
  formBtnWrapRef: React.RefObject<HTMLDivElement>;
};

export type wishlistType = {
  id: number;
  product: productType;
};

export type cartTableProps = {
  children: ReactNode;
};

export type failedRequestType = {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
};

export type passwordChecklistDisplayProps = {
  value: string;
};

export type signupType = baseUserType & { email: string; phoneNumber: string; password: string };

export type MonnifyProps = {
  transactionRef: string;
};

export type payOptionType = { payMethod: string; message: string; icon: string };

export type monnifyPaymentOptionProp = {
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

type cardDetailsType = {
  transactionReference: string;
  card: { number: string; expiryMonth: string; expiryYear: string; pin: string; cvv: string };
};

export type confirmEmailDTO = {
  userId: string;
  token: string;
};

export type sendCardDetailsType = {
  card: ArrayBuffer;
  key: ArrayBuffer;
  iv: ArrayBuffer;
};

export type transferStatusType = {
  transactionReference: string;
  profileId: number;
  orderInstruction?: string;
};

export type paystackVerificationDTO = {
  reference: string;
  profileId: number;
  orderInstruction?: string;
};

export type cardPaymentType = {
  profileId: number;
  cardDetails: cardDetailsType;
  orderInstruction?: string;
};

export type addWishlistType = {
  customerId: string;
  productId: number;
};

export type confirmTransferBtnProps = {
  fetchTransaction: () => void;
};

export type productCategoryType = {
  id: number;
  name: string;
};

export type checkoutContextType = {
  setIsMonnifyError: (value: React.SetStateAction<boolean>) => void;
  isCardPaymentError: boolean;
  isBankTransferError: boolean;
  isPaymentError: boolean;
  isMonnifyInitializationError: boolean;
  orderInstruction: string | undefined;
  setOrderInstruction: React.Dispatch<React.SetStateAction<string | undefined>>;
  sendingCardDetails: boolean;
  setProfileIndex: Dispatch<SetStateAction<number>>;
  profileIndex: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMonnifyOption: React.Dispatch<React.SetStateAction<"" | "card" | "transfer">>;
  monnifyOption: "" | "card" | "transfer";
  isInitializingPayment: boolean;
  detailsSent: boolean;
  isLoadedDetails: boolean;
  transactionRef: string;
  sendCardDetails: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, sendCardDetailsType, unknown>;
  bankCode: string;
  setBankCode: React.Dispatch<React.SetStateAction<string>>;
  sendTransferDetails: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<unknown, unknown>, Error>>;
  isFetchingTransferDetails: boolean;
  isLoadedStatus: boolean;
  refetchTransactionStatus: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, transferStatusType, unknown>;
  isFetchingTransactionStatus: boolean;
  bankDetails: bankDetailsType;
  isTransactionSuccessful: boolean;
  initializePayment: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<unknown, unknown>, Error>>;
};

export type monnifyDialogProps = {
  setIsMonnifyError: React.Dispatch<React.SetStateAction<boolean>>;
  isMonnifyError: boolean;
};

export type payPlatformType = "monnify" | "payStack" | "";

export type checkoutPaymentOptionProps = {
  children: ReactNode;
  payOption: payPlatformType;
};

export type checkoutPaymentOptionsProps = {
  setPayOption: Dispatch<SetStateAction<payPlatformType>>;
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
  children: ReactNode;
};

export type skeletonProps = {
  count: number;
};

export type productAccordionProps = {
  productDescription: ReactNode;
  productReviews: ReactNode;
};

export type productTabProps = {
  setTabIndex: Dispatch<SetStateAction<number>>;
  tabIndex: number;
  reviewsLength: number;
};

export type productProps = {
  product: productType;
  children: ReactNode;
  isWishlistItem: boolean | undefined;
};

export type productDescriptionProps = {
  description: string;
  attributes: attributeType[];
};

export type productReviewsProps = {
  reviews: reviewsType[];
  averageRating: number;
};

export type ratingStatsProps = {
  ratingFrequency: number[];
  reviewsLength: number;
};

export type productRatingsProps = {
  rating: number;
  styles: string;
};

export type accountBreadCrumbProps = {
  currentLinkLabel: string;
};

export type breadCrumbProps = accountBreadCrumbProps & {
  handleFilterModal?: () => void;
  children?: ReactNode;
};

export type thumbnailProps = {
  children: ReactElement<HTMLImageElement>;
};

export type thumbnailWrapperProps = {
  children: ReactNode;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  activeIndex: number;
};

export type pageWrapperProps = {
  children: React.ReactNode;
  pageId: string;
};

export type carouselImageProps = {
  name: string;
  url: string;
  index: number;
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
  isLocalModification: number;
  handleAddCartItem: (product: productType, value: number) => void;
  addedItem: string;
  addCartItemError: boolean;
  isAddedCartItem: boolean;
  isAddingCartItem: boolean;
  updateCartItemError: boolean;
  isUpatedCartItem: boolean;
  isUpdatingCartItem: boolean;
};

export type useAddToWhishlistDataType = {
  isAddingToWishList: boolean;
  addItemToWishList: (customerId: string, productId: number) => void;
  isAddedToWishlist: boolean;
};

export type loaderProps = {
  size?: string;
  color?: string;
};

export type savedItemButtonProps = {
  data: {
    styles: CSSProperties;
    icon: ReactNode;
    showAlert?: boolean;
    handleAddToWishlist: MouseEventHandler<HTMLButtonElement>;
    handleRemoveFromWishlist: MouseEventHandler<HTMLButtonElement>;
    isBeingAdded: boolean;
    isBeingRemoved: boolean;
    isSaved: boolean;
  };
};

export type quantityValidatorProps = {
  quantity: number;
  setValidateQuantity: React.Dispatch<React.SetStateAction<boolean>>;
};

export type userTabDataType = {
  tab: string;
  icon: string;
  link: { linkLabel: string; to: string }[];
};

export type TabProps = userTabDataType & {};

export type profileCardProps = {
  profileIndex: number;
  handleCardClick: (profileIndex: number) => void;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

export type addressBookProps = {
  setAddAddress: Dispatch<SetStateAction<boolean>>;
};

export type addressFormProps = {
  setAddAddress: Dispatch<SetStateAction<boolean>>;
};

export type profileSummaryProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPageIndex: React.Dispatch<React.SetStateAction<"0" | "1" | "2">>;
  profileIndex: number;
  setProfileofInterestIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type cartContextType = {
  isFetchingLocalCart: boolean;
  getCartQueryFinished: boolean;
  cartFetched: boolean;
  isFetchingCart: boolean;
  setLocalStorageIndex: React.Dispatch<React.SetStateAction<number>>;
  moveItemToWishlist: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, number, unknown>;
  isMovingToWishlist: boolean;
  isAddedCartItem: boolean;
  isAddingCartItem: boolean;
  handleAddCartItem: (product: productType, value: number) => void;
  isUpdatingCartItem: boolean;
  isDeletingCartItem: boolean;
  deleteCartItem: (itemId?: number, itemIndex?: number) => void;
  cart: cartType[];
  cartItemsCount: number;
  setCart: Dispatch<SetStateAction<cartType[]>>;
  cartItemsTotalPrice: number;
};

export type useDeleteWishlistDataType = { deleteFromWishlist: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, addWishlistType, unknown>; isDeletingWishlistItem: boolean; isDeletedWishlistItem: boolean };

export type wishlistContextType = useGetWishlistData &
  useDeleteWishlistDataType &
  useAddToWhishlistDataType & {
    wishList: wishlistType[];
    setWishList: Dispatch<SetStateAction<wishlistType[]>>;
  };

export type useGetWishlistData = {
  isLoadingWishlist: boolean;
  isFetchedWishlist: boolean;
  getWishlistQueryFinished: boolean;
};

export type emptyViewProps = {
  children: ReactNode;
};

export type deliveryContextType = {
  isDeletedAddress: boolean;
  handleProfileDeletion: (profileId: number, profileIndex: number) => void;
  isUpdatedAddress: boolean;
  updatingDeliveryProfile: boolean;
  updateDeliveryProfile: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, deliveryDataType, unknown>;
  isAddedAddress: boolean;
  addingDeliveryProfile: boolean;
  addDeliveryProfile: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, deliveryDataType, unknown>;
  deliveryProfiles: deliveryDataType[];
  setDeliveryProfiles: Dispatch<SetStateAction<deliveryDataType[]>>;
};

export type productContextType = { productsFetched: boolean; isLoadingProducts: boolean; products: productType[]; productImageAspectRatio: number };

export type userContextType = userProviderSignUpType & {
  signingUser: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, loginStateType, unknown>;
  isLoggedOut: boolean;
  confirmEmail: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, confirmEmailDTO, unknown>;
  isValidatingToken: boolean;
  isAuthenticating: boolean;
  deleteAccount: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, void, unknown>;
  isDeletingAccount: boolean;
  isJustLoggedIn: boolean;
  isLoginError: boolean;
  initialDeliveryProfile: deliveryDataType;
  modifyingProfile: boolean;
  profileMutate: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, modifyUserType, unknown>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean | undefined;
  loginData: userDataType;
  setLoginData: Dispatch<SetStateAction<userDataType>>;
  isOldSession: boolean;
  setIsOldSession: Dispatch<SetStateAction<boolean>>;
  handLogout: () => void;
};

export type useGetDeliveryProfileDataType = {
  loadingDeliveryProfile: boolean;
};

export type ConfirmationDialogProps = {
  handleDeletion: MouseEventHandler<HTMLButtonElement>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type useAddCartItemsDataType = {
  cartItemsAdded: boolean;
  addCartItems: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, addedItemType[], unknown>;
};

export type useDeleteCartItemDataType = {
  isLocalDelete: number;
  isDeletingCartItem: boolean;
  cartItemDeleted: boolean;
  deleteCartItem: (itemId?: number, itemIndex?: number) => void;
};

export type useUpdateCartItemsDataType = {
  itemsUpdated: boolean;
  updateCartItems: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, updatedItemType[], unknown>;
};

export type useGetCartItemsDataType = {
  cartFetched: boolean;
  cartData: AxiosResponse<unknown, unknown> | undefined;
  isFetchingCart: boolean;
  getCartQueryFinished: boolean;
};

export type useGetQueryParamsDataType = {
  min?: number;
  max?: number;
  rating?: number;
  sortOrder?: "desc" | "asc";
};

export type useDeleteDeliveryProfileDataType = {
  profileDeleted: boolean;
  handleProfileDeletion: (profileId: number, profileIndex: number) => void;
  profileDeletionTime: number;
};

export type useAddDeliveryProfileDataType = {
  profileAdditionTime: number;
  profileAdded: boolean;
  addDeliveryProfile: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, deliveryDataType, unknown>;
  addingDeliveryProfile: boolean;
};

export type useValidationDataType<T extends ZodRawShape> = {
  validationErrors: Partial<Record<keyof z.infer<ZodObject<T>>, string>>;
  testValidation: (data: unknown) => data is z.infer<ZodObject<T>>;
};

export type useVerifyPayStackPaymentDataType = {
  isPaystackPaymentSuccess: boolean;
  isPaystackPaymentError: boolean;
  verifyPayStackPayment: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<unknown, unknown>, Error>>;
  orderId?: string;
};

export type useUpdateDeliveryProfileDataType = {
  profileUpdated: boolean;
  profileUpdateTime: number;
  updateDeliveryProfile: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, deliveryDataType, unknown>;
  updatingDeliveryProfile: boolean;
};

export type profileFormProps = {
  props: {
    testValidation: (data: unknown) => data is deliveryDataType;
    handlePageIndex: () => void;
    handleDeliveryProfile: () => void;
    isPending: boolean;
    legend: string;
    deliveryProfile: deliveryDataType;
  };
  children: React.ReactNode;
};

export type ProfileWrapperProps = {
  children: ReactNode;
  setPageIndex: React.Dispatch<React.SetStateAction<"0" | "1" | "2">>;
  profileHeader: ReactNode;
  headerText: string;
};

export type addProfileProps = {
  setPageIndex: React.Dispatch<React.SetStateAction<"0" | "1" | "2">>;
  addingDeliveryProfile: boolean;
  addDeliveryProfile: (deliveryProfile: deliveryDataType) => void;
};

export type editProfileProps = {
  setPageIndex: React.Dispatch<React.SetStateAction<"0" | "1" | "2">>;
  profileToEditIndex: number;
  updateDeliveryProfile: UseMutateFunction<AxiosResponse<unknown, unknown>, Error, deliveryDataType, unknown>;
  updatingDeliveryProfile: boolean;
};

export type resetPasswordInstructionProps = {
  instruction: string;
};

export type resetPasswordErrorProps = {
  message: string;
};

export type forgotPasswordSuccessAlertProps = {
  email: string;
  mutate: (variables: void, options?: MutateOptions<void, Error, void, unknown> | undefined) => void;
};
