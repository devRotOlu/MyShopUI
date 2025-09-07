import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";

import BreadCrumb from "../breadCrumb/BreadCrumb";
import PageWrapper from "../PageWrapper";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import HomeProductLayout from "../homeProductLayout/HomeProductLayout";
import EmptyView from "../emptyView/EmptyView";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import ProductCard from "../productCard/ProductCard";
import HomeCardsWrapper from "../homeCardsWrapper/HomeCardsWrapper";

import { wishlistContext } from "../context/WishlistProvider";
import "./style.css";
import { wishlistType } from "../../types/types";

const maxProductPerPage = 20;
const firstPage = 1;
const SavedItems = () => {
  const { wishList, isLoadingWishlist, getWishlistQueryFinished } = useContext(wishlistContext);
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [currentProducts, setCurrentProducts] = useState<wishlistType[]>([]);

  const isEmptyView = !wishList.length && getWishlistQueryFinished && !isLoadingWishlist;
  const showContent = !isLoadingWishlist && getWishlistQueryFinished && wishList.length;

  const products = currentProducts.map(({ product }) => {
    const { id } = product;
    return <ProductCard key={id} product={product} />;
  });

  return (
    <PageWrapper pageId="saved_items">
      {isEmptyView && (
        <EmptyView>
          <div className="d-flex flex-column gap-3 align-items-center">
            <Icon icon="mdi:favourite" style={{ fontSize: "4rem", color: "var(--lighter_pink)" }} />
            <p className="fw-bold text-center">You haven't added any items yet.</p>
          </div>
        </EmptyView>
      )}
      {showContent && (
        <div className="align-self-stretch w-100" id="bread_crumb_wrapper">
          <BreadCrumb currentLinkLabel="Saved Items" />
        </div>
      )}
      {isLoadingWishlist && (
        <HomeCardsWrapper>
          <ProductCardSkeleton count={5} />
        </HomeCardsWrapper>
      )}
      {showContent && (
        <HomeProductLayout>
          <HomeCardsWrapper>{products}</HomeCardsWrapper>
          <div className="align-self-end d-flex justify-content-center w-100 my-4">
            <NavigationButtons params={{ itemCount: products.length, maxItemPerPage: maxProductPerPage, setCurrentItems: setCurrentProducts, items: wishList, currentPage, setCurrentPage, firstPage, currentItems: currentProducts }} />
          </div>
        </HomeProductLayout>
      )}
    </PageWrapper>
  );
};

export default SavedItems;
