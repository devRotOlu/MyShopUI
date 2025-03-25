import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import ProductSkeleton from "../SkeletonPageLoader";
import Product from "../product/Product";
import PageWrapper from "../PageWrapper";
import Carousel from "../carousel/Carousel";
import Thumbnail from "../thumbnail/Thumbnail";
import ThumbnailWrap from "./ThumbnailWrap";
import Modal from "../modal/Modal";
import ModalCloseButton from "../ModalCloseButton";

import { appContext } from "../context/AppContext";
import { useModal } from "../../customHooks/useModal";
import "./style.css";

const ProductPage = () => {
  const { products } = useContext(appContext);
  const { setShowModal, showModal } = useModal();

  const [activeIndex, setActiveIndex] = useState(0);

  const { productName } = useParams();
  const splits = (productName as string).split("-");
  const id = Number(splits[splits.length - 1]);

  if (!products.length) {
    return (
      <PageWrapper pageId="productPage">
        <ProductSkeleton count={2} />
      </PageWrapper>
    );
  }

  const product = products.find((_product) => {
    return _product.id === id;
  });

  const { name, images } = product!;

  const carousel = <Carousel name={name} images={images} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />;

  const thumbnails = images.map((image, index) => {
    const { url } = image;
    return (
      <ThumbnailWrap key={index} setActiveIndex={setActiveIndex} index={index} activeIndex={activeIndex}>
        <Thumbnail url={url} name={`${name}-${index + 1}`} key={index} />
      </ThumbnailWrap>
    );
  });

  const thumbnailsWraps = <div className="d-flex justify-content-center gap-2 w-100 mt-2 overflow-auto">{thumbnails}</div>;

  return (
    <>
      <PageWrapper pageId="productPage">
        <Product product={product!}>
          <>
            <div onClick={() => setShowModal(true)}>{carousel}</div>
            {thumbnailsWraps}
          </>
        </Product>
      </PageWrapper>
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "center" }}>
          <div className="bg-white">
            <div className="pt-2 pb-3 d-flex justify-content-between px-5 border">
              <h2 className="fs-4">Product Images</h2>
              <ModalCloseButton setShowModal={setShowModal} />
            </div>
            <div className="px-5 mt-3">
              {carousel}
              {thumbnailsWraps}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductPage;
