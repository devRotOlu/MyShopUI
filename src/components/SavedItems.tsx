import React from "react";

import { useGetWishlist } from "../customHooks/useGetWishlist";
import SkeletonPageLoader from "./SkeletonPageLoader";
import PageWrapper from "./PageWrapper";

const SavedItems = () => {
  const { isLoadingWishlist } = useGetWishlist();
  if (isLoadingWishlist) {
    return (
      <PageWrapper pageId="productPage">
        <SkeletonPageLoader count={2} />
      </PageWrapper>
    );
  }
  return <div>SavedItems</div>;
};

export default SavedItems;
