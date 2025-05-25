import React from "react";
import { useLocation } from "react-router-dom";

import PageWrapper from "../PageWrapper";
import { getCategories } from "../../helperFunctions/dataFetchFunctions";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search");
  const { data, isSuccess } = useQuery({
    queryKey: ["product_categories"],
    queryFn: getCategories,
  });
  return (
    <PageWrapper pageId="search">
      <div></div>
    </PageWrapper>
  );
};

export default SearchPage;
