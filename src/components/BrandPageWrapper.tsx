import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import BrandPage from "./brandPage/BrandPage";
import FilterPanel from "./flterPanel/FilterPanel";

import { useSearchParams } from "react-router-dom";
import { productType, selectedPricesType } from "../types";
import { getBrandProducts } from "../helperFunctions/dataFetchFunctions";

const BrandPageWrapper = () => {
  const [selectedPrices, setSelectedPrices] = useState<selectedPricesType>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { brand } = useParams();
  const [searchParams] = useSearchParams();
  const min = Number(searchParams.get("min")) || undefined;
  const max = Number(searchParams.get("max")) || undefined;
  const rating = Number(searchParams.get("rating")) || undefined;
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
