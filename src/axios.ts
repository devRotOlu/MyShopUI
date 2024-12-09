import axios from "axios";

export const myShopAxios = axios.create({
  baseURL: "https://localhost:44378/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
