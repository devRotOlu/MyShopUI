import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { userContext } from "../components/context/UserProvider";
import { getWishlist } from "../helperFunctions/dataFetchFunctions";
import { useGetWishlistData, wishlistType } from "../types";
import { wishlistContext } from "../components/context/WishlistProvider";

export const useGetWishlist = (): useGetWishlistData => {
  const { loginData, isLoggedIn } = useContext(userContext);
  const { setWishList } = useContext(wishlistContext);

  const {
    data: wishlistData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: async () => {
      return await getWishlist(loginData.email);
    },
    queryKey: ["wishlist"],
    enabled: () => (isLoggedIn ? true : false),
    refetchInterval: 3000,
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
  };
};
