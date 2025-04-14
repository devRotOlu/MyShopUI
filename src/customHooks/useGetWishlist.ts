import { useContext, useEffect, useRef } from "react";
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
    dataUpdatedAt: wishlistDateTime,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      return await getWishlist(loginData.email);
    },
    queryKey: ["wishlist"],
    enabled: () => (isLoggedIn ? true : false),
    refetchInterval: () => (isLoggedIn ? 4000 : false),
  });

  const prevWishlistUpdateTimeRef = useRef(wishlistDateTime);

  useEffect(() => {
    const isNewFetch = prevWishlistUpdateTimeRef.current !== wishlistDateTime;
    if (isNewFetch) {
      const fetchedData = wishlistData!.data as wishlistType[];
      setWishList([...fetchedData]);
      prevWishlistUpdateTimeRef.current = wishlistDateTime;
    }
  }, [wishlistDateTime, wishlistData, setWishList]);

  return {
    isLoadingWishlist: isLoading,
  };
};
