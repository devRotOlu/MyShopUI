import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import BrandPage from "./brandPage/BrandPage";
import FilterPanel from "./flterPanel/FilterPanel";

import { productType, selectedPricesType } from "../types";
import { getBrandProducts } from "../helperFunctions/dataFetchFunctions";
import { useFilterQueryParams } from "../customHooks/useFilterQueryParams";

const BrandPageWrapper = () => {
  const [selectedPrices, setSelectedPrices] = useState<selectedPricesType>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { brand } = useParams();

  const { min, max, rating } = useFilterQueryParams();

  const key = brand + min + max + rating;
  const { data, isLoading } = useQuery({
    queryKey: ["brand_products", brand, `min-${min}`, `max-${max}`, `rating-${rating}`],
    queryFn: () => getBrandProducts(brand, min, max, rating),
    refetchOnWindowFocus: false,
  });
  const products: productType[] = data?.data || [];
  return (
    <BrandPage key={key} brand={brand} isLoading={isLoading} products={products}>
      <FilterPanel filterPanelData={{ products, selectedPrices, selectedRating, setSelectedPrices, setSelectedRating }} />
    </BrandPage>
  );
};

export default BrandPageWrapper;
