import { myShopAxios } from "../api/axios.ts";
import { addedItemType, updatedItemType, loginStateType, addWishlistType, modifyUserType, deliveryDataType, cardPaymentType, addReviewType, transferStatusType, paystackVerificationDTO, resetPasswordDataType } from "../types.ts";

// cart controller functions
export const addItemToCart = async (data: addedItemType) => {
  return await myShopAxios.post("Cart/add_item", data);
};

export const addItemsToCart = async (data: addedItemType[]) => {
  return await myShopAxios.post("Cart/add_items", data);
};

export const updateCartItem = async (data: updatedItemType) => {
  return await myShopAxios.put("Cart/update_item", data);
};

export const updateCartItems = async (data: updatedItemType[]) => {
  return await myShopAxios.put("Cart/update_items", data);
};

export const getCartItems = async (email: string) => {
  return await myShopAxios.get(`Cart?email=${email}`);
};

export const deleteCartItem = async (itemId: number) => {
  return await myShopAxios.delete(`Cart?id=${itemId}`);
};

// product controller functions

export const getProducts = async () => {
  return await myShopAxios.get("Product/list-products");
};

export const getProduct = async (productId: number) => {
  return await myShopAxios.get(`Product/get-product?productId=${productId}`);
};

export const addReview = async (data: addReviewType) => {
  return await myShopAxios.post("Product/add-review", data);
};

export const getCategoryProducts = async (categoryId: number, min?: number, max?: number, rating?: number) => {
  return await myShopAxios.get(`Product/category_products?categoryId=${categoryId}${rating ? `&rating=${rating}` : ""}${min ? `&min=${min}` : ""}${max ? `&max=${max}` : ""}`);
};

export const searchProduct = async (searchTerm: string) => {
  return await myShopAxios.get(`Product/product_search?searchTerm=${searchTerm}`);
};

export const getBrandProducts = async (brand: string, min?: number, max?: number, rating?: number) => {
  return await myShopAxios.get(`Product/brand_products?brand=${brand}${rating ? `&rating=${rating}` : ""}${min ? `&min=${min}` : ""}${max ? `&max=${max}` : ""}`);
};

// account controller functions

export const resetPassword = async (data: resetPasswordDataType) => {
  await myShopAxios.post("Account/reset-password", data);
};

export const sendEmailForPassWordReset = async (email: string) => {
  await myShopAxios.post(`Account/password-reset-email?email=${email}`);
};

export const signinUser = async (data: loginStateType) => await myShopAxios.post("Account/login", data);

export const validateAccessToken = async () => {
  return await myShopAxios.get("Account/validate_token");
};

export const updateTokens = async () => {
  return await myShopAxios.post("Account/token_refresh");
};

export const logoutUser = async () => await myShopAxios.post("Account/logout");

export const modifyProfile = async (user: modifyUserType) => {
  return await myShopAxios.patch("Account/modify-details", user);
};

export const getDeliveryProfile = async (userId: string) => {
  return await myShopAxios.get(`Account/get_delivery_profile?userId=${userId}`);
};

export const addDeliveryProfile = async (deliveryProfile: deliveryDataType) => {
  return await myShopAxios.post("Account/add_delivery_profile", deliveryProfile);
};

export const updateDeliveryProfile = async (deliveryProfile: deliveryDataType) => {
  return await myShopAxios.patch("Account/modify_delivery_profile", deliveryProfile);
};

export const deleteDeliveryProfile = async (profileId: number) => {
  return await myShopAxios.delete(`Account/delete_delivery_profile?profileId=${profileId}`);
};

export const deleteAccount = async () => {
  return await myShopAxios.delete("Account/delete_account");
};

// wishlist controller functions

export const getWishlist = async (email: string) => {
  return await myShopAxios.get(`Wishlist?email=${email}`);
};

export const addToWishlist = async (data: addWishlistType) => {
  return await myShopAxios.post("Wishlist/add_item", data);
};

// monnify controller functions

export const initializePayment = async (customerEmail: string) => {
  return await myShopAxios.get(`MonnifyCheckout/initialize?customerEmail=${customerEmail}`);
};

export const getTranserInfo = async (bankCode: string, transactionRef: string) => {
  return await myShopAxios.get(`MonnifyCheckout/bank_transfer?bankCode=${bankCode}&transactionReference=${transactionRef}`);
};

export const getTransactionStatus = async (data: transferStatusType) => {
  return await myShopAxios.post("MonnifyCheckout/transaction_status", data);
};

export const sendCardDetails = async (data: cardPaymentType) => {
  return await myShopAxios.post("MonnifyCheckout/card_charge", data);
};

// payStack controller
export const initializePayStackPayment = async (email: string) => {
  return await myShopAxios.get(`PayStackCheckout/initialize?email=${email}`);
};

export const verifyPayStackPayment = async (data: paystackVerificationDTO) => {
  return await myShopAxios.post("PayStackCheckout/verify_payment", data);
};

// orders controller
export const getOrders = async (customerId: string) => {
  return await myShopAxios.get(`Order?customerId=${customerId}`);
};

// category controller
export const getCategories = async () => {
  return await myShopAxios.get("Category/categories");
};

export const appendBuffer = (buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer => {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

export const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): string => {
  return btoa(
    new Uint8Array(arrayBuffer).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  );
};
