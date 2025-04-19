import React, { useContext, useState, MouseEvent } from "react";

import BreadCrumb from "../breadCrumbs/BreadCrumb";
import ProductCard from "../productCard/ProductCard";

import { useGetWishlist } from "../../customHooks/useGetWishlist";
import SkeletonPageLoader from "../SkeletonPageLoader";
import PageWrapper from "../PageWrapper";
import { wishlistContext } from "../context/WishlistProvider";
import "./style.css";
import { Icon } from "@iconify/react";

const SavedItems = () => {
  const { isLoadingWishlist } = useGetWishlist();
  const minPageIndex = 1;
  const [currentPageIndex, setCurrentPageIndex] = useState(minPageIndex);
  const { wishList } = useContext(wishlistContext);
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
        <div className="align-self-stretch w-100">
          <div></div>
        </div>
      </PageWrapper>
    );
  }
  const maxPageIndex = Math.ceil(wishList.length / 20);
  const handlePreviousBtnClick = (_: MouseEvent<HTMLButtonElement>) => {
    setCurrentPageIndex((prevIndex) => (prevIndex !== minPageIndex ? --prevIndex : prevIndex));
  };
  const handleNextBtnClick = (_: MouseEvent<HTMLButtonElement>) => {
    setCurrentPageIndex((prevIndex) => (prevIndex !== maxPageIndex ? ++prevIndex : prevIndex));
  };
  const products = wishList.map(({ product }) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });
  const pageIndicators = Array(maxPageIndex)
    .fill(0)
    .map((_, index) => {
      const isCurrentIndex = currentPageIndex === index + 1;
      return (
        <span className="page_indicator" key={index} style={{ backgroundColor: isCurrentIndex ? "var(--lighter_pink)" : "", color: isCurrentIndex ? "white" : "" }}>
          {index + 1}
        </span>
      );
    });
  return (
    <PageWrapper pageId="saved_items">
      <div className="align-self-stretch w-100">
        <div className="w-100">
          <BreadCrumb currentLinkLabel="Saved Items" />
        </div>
        <div className="d-flex gap-3">{products}</div>
        <div className="my-3 d-flex justify-content-center w-100 align-items-center gap-3">
          <button onClick={handlePreviousBtnClick} className="d-flex align-items-center gap-1 py-1 px-2" id="previous_btn" style={{ color: currentPageIndex !== minPageIndex ? "black" : "", backgroundColor: currentPageIndex !== minPageIndex ? "var(--cerebral_grey)" : "" }}>
            <Icon icon="grommet-icons:form-previous" />
            Previous
          </button>
          <div>{pageIndicators}</div>
          <button className="d-flex align-items-center gap-1 py-1 px-2" id="next_btn" onClick={handleNextBtnClick} style={{ color: currentPageIndex !== maxPageIndex ? "black" : "", backgroundColor: currentPageIndex !== maxPageIndex ? "var(--cerebral_grey)" : "" }}>
            Next
            <Icon icon="grommet-icons:form-next" />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SavedItems;
