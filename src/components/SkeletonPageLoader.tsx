import React from "react";
import Skeleton from "react-loading-skeleton";

import { skeletonProps } from "../types";

const SkeletonPageLoader = ({ count }: skeletonProps) => {
  return (
    <div className="d-flex flex-column gap-5 py-5">
      {Array(count)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="d-flex gap-3" key={index}>
              <div className="d-flex flex-column gap-3 w-25">
                <div>
                  <Skeleton height="25px" borderRadius="10px" baseColor="#f6f7f9" />
                </div>
                <div className="d-flex gap-2">
                  <div className="w-50">
                    <Skeleton height="25px" borderRadius="10px" baseColor="#f6f7f9" />
                  </div>
                  <div className="w-50">
                    <div className="w-50">
                      <Skeleton height="25px" borderRadius="10px" baseColor="#f6f7f9" />
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ width: "70%" }}>
                    <Skeleton height="25px" borderRadius="10px" baseColor="#f6f7f9" />
                  </div>
                </div>
              </div>

              <div className="flex-grow-1 d-flex flex-column gap-3">
                <div className="w-50">
                  <Skeleton height="25px" borderRadius="10px" baseColor="#f6f7f9" />
                </div>
                <div className="w-75">
                  <Skeleton height="25px" borderRadius="10px" baseColor="#f6f7f9" />
                </div>
                <div className="w-100">
                  <Skeleton height="25px" borderRadius="10px" baseColor="#f6f7f9" />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SkeletonPageLoader;
