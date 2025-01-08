import axios from "axios";
// import { AxiosRequestConfig } from "axios";

// import { updateTokens } from "../helperFunctions/dataFetchFunctions.ts";
// import { failedRequestType } from "../types.ts";

axios.defaults.withCredentials = true;

// let isRefreshing: boolean = false;
// let failedRequests: failedRequestType[] = [];

export const myShopAxios = axios.create({
  baseURL: "https://localhost:44378/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// myShopAxios.interceptors.response.use(
//   (response) => {
//     console.log(response, "from interceptor");
//     return response;
//   },
//   async (error) => {
//     const originalRequest: AxiosRequestConfig = error.config;

//     if (error.response && error.response.status === 401) {
//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           await updateTokens();

//           // retry all request that failed due to
//           // unauthorization
//           failedRequests.forEach(({ config, resolve, reject }) => {
//             myShopAxios
//               .request(config)
//               .then((response) => resolve(response))
//               .catch((error) => reject(error));
//           });

//           // clear failed requests
//           failedRequests = [];
//           console.log("in here");
//           return myShopAxios(originalRequest);
//         } catch (error) {}
//       } else {
//         // add all failed requests during refreshing
//         // to the failedRequest list.
//         return new Promise((resolve, reject) => {
//           var failedRequest: failedRequestType = {
//             resolve,
//             reject,
//             config: error.config,
//           };
//           failedRequests.push(failedRequest);
//         });
//       }
//     }
//   }
// );
