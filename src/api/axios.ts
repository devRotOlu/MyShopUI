import axios from "axios";

import { updateTokens } from "../helperFunctions/dataFetchFunctions.ts";
import { failedRequestType } from "../types.ts";

axios.defaults.withCredentials = true;

let isRefreshing: boolean = false;
let failedRequests: failedRequestType[] = [];

export const myShopAxios = axios.create({
  baseURL: "https://myshopapi-ggcb.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
    "X-Origin": window.location.origin,
  },
});

const processQueue = (error: any) => {
  failedRequests.forEach(({ reject }) => {
    reject(error);
  });
  failedRequests = [];
};

myShopAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        // This sends the refresh cookie automatically
        await updateTokens();

        isRefreshing = false;

        // Retry original request after token refresh
        return myShopAxios(originalRequest);
      } catch (err) {
        processQueue(err);

        // Optional: redirect to login or logout user
        //window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
