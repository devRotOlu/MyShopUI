import React, { useContext } from "react";

import { carouselImageProps } from "../../types/types";
import { productContext } from "../context/ProductProvider";

const CarouselImage = ({ name, url, index }: carouselImageProps) => {
  const { productImageAspectRatio } = useContext(productContext);
  return (
    <div className="w-100" key={index}>
      <img src={url} alt={name} className="w-100" style={{ aspectRatio: `${productImageAspectRatio}` }} />
    </div>
  );
};

export default CarouselImage;
