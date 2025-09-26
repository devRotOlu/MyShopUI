import React, { CSSProperties, useContext } from "react";

import { splitUrl } from "./helperFunctions/utilityFunctions";
import { productContext } from "./components/context/ProductProvider";

type productImageProps = {
  url: string;
  name: string;
  imageSizes?: string;
  styles?: CSSProperties;
};

const ProductImage = ({ url, name, imageSizes, styles }: productImageProps) => {
  const { productImageAspectRatio } = useContext(productContext);
  const data = splitUrl(url);

  if (!data) {
    return <img src={url} alt={name} className="w-100" style={{ aspectRatio: productImageAspectRatio }} loading="lazy" />;
  }

  const { suffix, prefix, separator } = data;

  const sizes = imageSizes || "(max-width: 768px) 200px, (max-width: 1024px) 400px, 500px";

  return (
    <img
      src={url} // full-size 500x500 default
      alt={name}
      className="w-100"
      style={{ aspectRatio: productImageAspectRatio, display: "block", objectFit: "cover", ...styles }}
      srcSet={`
        ${prefix}${separator}w_200,c_fill/${suffix} 200w,
        ${prefix}${separator}w_300,c_fill/${suffix} 300w,
        ${prefix}${separator}w_400,c_fill/${suffix} 400w,
        ${url} 500w
      `}
      sizes={sizes}
      loading="lazy"
    />
  );
};

export default ProductImage;
