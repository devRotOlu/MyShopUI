import { useContext, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCartItems } from "../helperFunctions/dataFetchFunctions";
import { userContext } from "../components/context/UserProvider";
import { cartType, useGetCartItemsDataType } from "../types";

export const useGetCartItems = (setCart: (value: React.SetStateAction<cartType[]>) => void): useGetCartItemsDataType => {
  const {
    loginData: { email },
    isLoggedIn,
  } = useContext(userContext);

  const {
    data,
    isSuccess,
    isError: cartFetchError,
  } = useQuery({
    queryKey: ["cart"],
    enabled: () => (isLoggedIn ? true : false),
    queryFn: async () => {
      return await getCartItems(email);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      var fetchedData = data!.data as cartType[];
      setCart([...fetchedData]);
    }
  }, [data, isSuccess, setCart]);

  return {
    cartFetched: isSuccess,
    cartData: data,
  };
};
