import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";

import BreadCrumb from "../breadCrumbs/BreadCrumb";
import ProductCard from "../productCard/ProductCard";
import PageWrapper from "../PageWrapper";
import NavigationButtons from "../navigationButtons/NavigationButtons";
import PageLayout from "../pageLayout/PageLayout";
import EmptyView from "../emptyView/EmptyView";

import { wishlistContext } from "../context/WishlistProvider";
import "./style.css";
import { wishlistType } from "../../types";

const maxProductPerPage = 20;

const SavedItems = () => {
  const { wishList, isFetchedWishlist, isLoadingWishlist } = useContext(wishlistContext);
  const [currentProducts, setCurrentProducts] = useState<wishlistType[]>([]);

  const isEmptyView = isFetchedWishlist && !wishList.length;

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
      {!isEmptyView && (
        <>
          <div className="align-self-stretch w-100">
            <BreadCrumb currentLinkLabel="Saved Items" />
          </div>
          <PageLayout productCards={products} isLoading={isLoadingWishlist}>
            {wishList.length !== 0 && (
              <div className="align-self-end d-flex justify-content-center w-100 my-4">
                <NavigationButtons itemCount={wishList.length} maxItemPerPage={maxProductPerPage} setCurrentItems={setCurrentProducts} items={wishList} />
              </div>
            )}
          </PageLayout>
        </>
      )}
    </PageWrapper>
  );
};

export default SavedItems;
