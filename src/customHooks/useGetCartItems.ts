import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCartItems } from "../helperFunctions/dataFetchFunctions";
import { userContext } from "../components/context/UserProvider";
import { cartType, useGetCartItemsDataType } from "../types";

export const useGetCartItems = (setCart: (value: React.SetStateAction<cartType[]>) => void): useGetCartItemsDataType => {
  const {
    loginData: { email },
    isLoggedIn,
  } = useContext(userContext);

  const { data, isSuccess, isLoading, isFetched } = useQuery({
    queryKey: ["cart"],
    enabled: () => (isLoggedIn ? true : false),
    queryFn: async () => {
      return await getCartItems(email);
    },
    refetchInterval: isLoggedIn ? 3000 : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
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
    isFetchingCart: isLoading,
    getCartQueryFinished: isFetched,
  };
};
