import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { userContext } from "../components/context/UserProvider";
import { getWishlist } from "../helperFunctions/dataFetchFunctions";
import { useGetWishlistData, wishlistType } from "../types/types";

export const useGetWishlist = (setWishList: React.Dispatch<React.SetStateAction<wishlistType[]>>): useGetWishlistData => {
  const { loginData, isLoggedIn } = useContext(userContext);

  const {
    data: wishlistData,
    isLoading,
    isSuccess,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      return await getWishlist(loginData.email);
    },
    queryKey: ["wishlist"],
    enabled: () => (isLoggedIn ? true : false),
    refetchInterval: isLoggedIn ? 3000 : false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const fetchedData = wishlistData!.data as wishlistType[];
      setWishList([...fetchedData]);
    }
  }, [wishlistData, setWishList, isSuccess]);

  return {
    isLoadingWishlist: isLoading,
    isFetchedWishlist: isSuccess,
    getWishlistQueryFinished: isFetched,
  };
};
