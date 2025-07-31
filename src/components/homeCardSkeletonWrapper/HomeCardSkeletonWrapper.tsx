import React from "react";

import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";

const HomeCardSkeletonWrapper = () => {
  return (
    <div className="w-100 d-flex justify-content-between px-4 flex-wrap gap-3 mb-5">
      <ProductCardSkeleton count={5} />
    </div>
  );
};

export default HomeCardSkeletonWrapper;
