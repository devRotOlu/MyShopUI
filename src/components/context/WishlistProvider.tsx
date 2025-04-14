import React, { useState } from "react";

import { ProvidersProp, wishlistContextType, wishlistType } from "../../types";

export const wishlistContext = React.createContext({} as wishlistContextType);

const WishlistProvider = ({ children }: ProvidersProp) => {
  const [wishList, setWishList] = useState<wishlistType[]>([]);

  return <wishlistContext.Provider value={{ wishList, setWishList }}>{children}</wishlistContext.Provider>;
};

export default WishlistProvider;
