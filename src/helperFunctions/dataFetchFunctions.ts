import { myShopAxios } from "../api/axios.ts";
import { addedItemType, updatedItemType, LoginStateType, cardRequestType, addWishlistType } from "../types.ts";

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

// account controller functions

export const signinUser = async (data: LoginStateType) => await myShopAxios.post("Account/login", data);

export const validateAccessToken = async () => {
  return await myShopAxios.get("Account/validate_token");
};

export const updateTokens = async (customerId: string) => {
  return await myShopAxios.post(`Account/token_refresh?customerId=${customerId}`);
};

export const logoutUser = async () => await myShopAxios.post("Account/logout");

// wishlist controller functions

export const getWishlist = async (email: string) => {
  return await myShopAxios.get(`Wishlist?email=${email}`);
};

export const addToWishlist = async (data: addWishlistType) => {
  return await myShopAxios.post("Wishlist/add_item", data);
};

// checkout controller functions

// export const createOrder = async (id: string) => {
//   return await myShopAxios.post(`Checkout/create_order?customerId=${id}`);
// };

// export const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data:onApproveData) => {
//   return await myShopAxios.post("Checkout/capture_order");
// };

// monnify controller functions

export const initializePayment = async (customerEmail: string) => {
  return await myShopAxios.get(`MonnifyCheckout/initialize?customerEmail=${customerEmail}`);
};

export const getTranserInfo = async (bankCode: string, transactionRef: string) => {
  return await myShopAxios.get(`MonnifyCheckout/bank_transfer?bankCode=${bankCode}&transactionReference=${transactionRef}`);
};

export const getTransactionStatus = async (transactionRef: string) => {
  return await myShopAxios.get(`MonnifyCheckout/transaction_status?transactionRef=${transactionRef}`);
};

export const sendCardDetails = async (cardDetails: cardRequestType) => {
  console.log(cardDetails, "details");
  return await myShopAxios.post("MonnifyCheckout/card_charge", cardDetails);
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
