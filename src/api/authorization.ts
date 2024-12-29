import { myShopAxios } from "./axios.ts";

export const setAuthToken = (token: string) => {
  if (token) {
    myShopAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete myShopAxios.defaults.headers.common["Authorization"];
  }
};
