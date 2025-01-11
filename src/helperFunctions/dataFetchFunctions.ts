import { myShopAxios } from "../api/axios.ts";
import { addedItemType, updatedItemType } from "../types.ts";

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

export const validateAccessToken = async () => {
  return await myShopAxios.get("Account/validate_token");
};

export const updateTokens = async (customerId: string) => {
  return await myShopAxios.post(`Account/token_refresh?customerId=${customerId}`);
};

// wishlist controller functions

export const getWishlist = async (email: string) => {
  return await myShopAxios.get("Wishlist/");
};
