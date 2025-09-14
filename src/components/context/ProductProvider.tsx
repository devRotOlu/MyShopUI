import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../helperFunctions/dataFetchFunctions";
import { productContextType, productType, providersProp } from "../../types/types";

export const productContext = React.createContext({} as productContextType);

const ProductProvider = ({ children }: providersProp) => {
  const [products, setProducts] = useState<productType[]>([]);
  const { data: productData, isSuccess: productsFetched, isLoading: isLoadingProducts } = useQuery({ queryKey: ["products"], queryFn: getProducts, staleTime: 3 * 60 * 1000 });
  if (productsFetched && !products.length) {
    setProducts(productData.data);
  }
  return <productContext.Provider value={{ products, productsFetched, isLoadingProducts, productImageAspectRatio: 1 }}>{children}</productContext.Provider>;
};

export default ProductProvider;
