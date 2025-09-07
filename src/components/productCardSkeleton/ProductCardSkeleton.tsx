import React from "react";
import Skeleton from "react-loading-skeleton";

import { skeletonProps } from "../../types/types";
import "./style.css";

const ProductCardSkeleton = ({ count }: skeletonProps) => {
  return Array(count)
    .fill(0)
    .map((_, index) => {
      return (
        <div className="product_card_skeleton rounded d-flex flex-column justify-content-between h-100" key={index}>
          <div className="w-100 d-flex flex-column gap-2 pb-1">
            <div className="w-100">
              <Skeleton height={200} />
            </div>
            <div className="product_title">
              <Skeleton />
            </div>
          </div>
          <div>
            <div className="border-bottom border-top py-2">
              <div className="d-inline-block w-25">
                <Skeleton />
              </div>
              <div className="d-inline-block w-25" style={{ float: "right" }}>
                <Skeleton />
              </div>
            </div>
            <div className="pt-2">
              <Skeleton height={35} />
            </div>
          </div>
        </div>
      );
    });
};

export default ProductCardSkeleton;
