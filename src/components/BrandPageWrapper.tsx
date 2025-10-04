import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import BrandPage from "./brandPage/BrandPage";
import FilterPanel from "./flterPanel/FilterPanel";

import { productType } from "../types/types";
import { getBrandProducts } from "../helperFunctions/dataFetchFunctions";
import { useGetQueryParams } from "../customHooks/useGetQueryParams";

const BrandPageWrapper = () => {
  const { brand } = useParams();

  const { min, max, rating, sortOrder } = useGetQueryParams();

  const key = brand + min + max + rating;
  const { data, isLoading, isFetched, isSuccess } = useQuery({
    queryKey: ["brand_products", brand, `min-${min}`, `max-${max}`, `rating-${rating}`, `sortOrder-${sortOrder}`],
    queryFn: () => getBrandProducts(brand, min, max, rating, sortOrder),
    refetchOnWindowFocus: false,
  });
  const products: productType[] = data?.data || [];
  return (
    <BrandPage key={key} brand={brand} isLoading={isLoading} products={products} isFetched={isFetched} isSuccess={isSuccess}>
      <FilterPanel products={products} />
    </BrandPage>
  );
};

export default BrandPageWrapper;
