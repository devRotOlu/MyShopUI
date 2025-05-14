import React, { useContext, useState } from "react";

import BreadCrumb from "../breadCrumbs/BreadCrumb";
import ProductCard from "../productCard/ProductCard";
import SkeletonPageLoader from "../SkeletonPageLoader";
import PageWrapper from "../PageWrapper";
import NavigationButtons from "../navigationButtons/NavigationButtons";

import { useGetWishlist } from "../../customHooks/useGetWishlist";
import { wishlistContext } from "../context/WishlistProvider";
import "./style.css";
import { wishlistType } from "../../types";

const maxProductPerPage = 20;

const SavedItems = () => {
  const { isLoadingWishlist } = useGetWishlist();
  const { wishList } = useContext(wishlistContext);
  const [currentProducts, setCurrentProducts] = useState<wishlistType[]>([]);

  if (isLoadingWishlist) {
    return (
      <PageWrapper pageId="saved_items">
        <div className="align-self-stretch w-100 bg-white mt-3">
          <SkeletonPageLoader count={2} />
        </div>
      </PageWrapper>
    );
  }

  if (!wishList.length) {
    return (
      <PageWrapper pageId="saved_items">
        <div className="align-self-stretch w-100 text-white">
          <div></div>
        </div>
      </PageWrapper>
    );
  }
  const products = currentProducts.map(({ product }) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  return (
    <PageWrapper pageId="saved_items">
      <div className="align-self-stretch w-100">
        <div className="w-100">
          <BreadCrumb currentLinkLabel="Saved Items" />
        </div>
        <div className="d-flex gap-3">{products}</div>
        <div className="align-self-end d-flex justify-content-center w-100 my-4">
          <NavigationButtons itemCount={wishList.length} maxItemPerPage={maxProductPerPage} setCurrentItems={setCurrentProducts} items={wishList} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default SavedItems;
