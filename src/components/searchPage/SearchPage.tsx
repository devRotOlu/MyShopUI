import React from "react";
import { useLocation } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";

import PageWrapper from "../PageWrapper";

import { getCategoryProducts } from "../../helperFunctions/dataFetchFunctions";
import { getBrandProducts } from "../../helperFunctions/dataFetchFunctions";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search");
  const results = useQueries({
    queries: [
      {
        queryKey: ["orders"],
        queryFn: async () => await getCategoryProducts(),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["user-reviews"],
        queryFn: () => {
          return getUserReviews(id);
        },
        refetchOnWindowFocus: false,
      },
    ],
  });
  return (
    <PageWrapper pageId="search">
      <div></div>
    </PageWrapper>
  );
};

export default SearchPage;
