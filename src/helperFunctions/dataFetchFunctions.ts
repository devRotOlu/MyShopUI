import { myShopAxios } from "../api/axios.ts";
import { cartItemType } from "../types.ts";

export const addToCart = async (data: cartItemType) => {
  return await myShopAxios.post("Cart", data);
};

export const updateCart = async (data: cartItemType) => {
  return await myShopAxios.put("Cart", data);
};

export const getProducts = async () => {
  return await myShopAxios.get("Product/list-products");
};

export const getCartItems = async (email: string) => {
  return await myShopAxios.get(`Cart?email=${email}`);
};
