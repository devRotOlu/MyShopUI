import React, { useContext, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import SkeletonPageLoader from "../SkeletonPageLoader";
import Product from "../product/Product";
import PageWrapper from "../PageWrapper";
import Carousel from "../carousel/Carousel";
import Thumbnail from "../thumbnail/Thumbnail";
import ThumbnailWrapper from "../thumbnailWrapper/ThumbnailWrapper";
import Modal from "../modal/Modal";
import ModalCloseButton from "../ModalCloseButton";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import ProductCarouselModal from "../productCarouselModal/ProductCarouselModal";

import { useModal } from "../../customHooks/useModal";
import "./style.css";
import { checkProductInWishlist, getProduct } from "../../helperFunctions/dataFetchFunctions";
import { productPageProps, productType } from "../../types";
import { userContext } from "../context/UserProvider";

const ProductPage = ({ productName }: productPageProps) => {
  const {
    loginData: { id: customerId },
    isLoggedIn,
  } = useContext(userContext);
  const { setShowModal, showModal } = useModal();

  const [activeIndex, setActiveIndex] = useState(0);

  const splits = (productName as string).split("-");
  const id = Number(splits[splits.length - 1]);

  const results = useQueries({
    queries: [
      {
        queryKey: ["product", productName],
        queryFn: () => getProduct(id),
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
      },
      { queryKey: ["check_wishlist"], queryFn: () => checkProductInWishlist(id, customerId), refetchInterval: isLoggedIn ? 3000 : false, enabled: isLoggedIn ? true : false, refetchIntervalInBackground: false, refetchOnWindowFocus: true, retry: false },
    ],
  });

  const [productQuery, wishlistQuery] = results;

  if (results.some((query) => query.isLoading)) {
    return (
      <PageWrapper pageId="productPage">
        <div className="pt-3 px-5 h-100 w-100 bg-white flex-grow-1">
          <SkeletonPageLoader count={2} />
        </div>
      </PageWrapper>
    );
  }

  const product: productType = productQuery.data?.data;

  const category = product?.category.name;

  const { name, images } = product!;

  const carousel = <Carousel name={name} images={images} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />;

  const thumbnails = images.map((image, index) => {
    const { url } = image;
    return (
      <ThumbnailWrapper key={index} setActiveIndex={setActiveIndex} index={index} activeIndex={activeIndex}>
        <Thumbnail url={url} name={`${name}-${index + 1}`} key={index} />
      </ThumbnailWrapper>
    );
  });

  const thumbnailsWraps = <div className="d-flex justify-content-center gap-2 w-100 mt-2 overflow-auto px-0 pb-2">{thumbnails}</div>;

  return (
    <>
      <PageWrapper pageId="productPage">
        <div className="w-100">
          <BreadCrumb currentLinkLabel={category} />
          <Product product={product!} data={wishlistQuery.data?.data}>
            <>
              <div className="w-100" id="carousel_holder" onClick={() => setShowModal(true)}>
                {carousel}
              </div>
              {thumbnailsWraps}
            </>
          </Product>
        </div>
      </PageWrapper>
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "center" }}>
          <ProductCarouselModal
            modalCloseButton={<ModalCloseButton setShowModal={setShowModal} />}
            carouselContent={
              <>
                {carousel}
                {thumbnailsWraps}
              </>
            }
          />
        </Modal>
      )}
    </>
  );
};

export default ProductPage;
