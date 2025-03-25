import React from "react";
import Skeleton from "react-loading-skeleton";

import { skeletonProps } from "../types";

const SkeletonPageLoader = ({ count }: skeletonProps) => {
  return (
    <div className="d-flex flex-column gap-5">
      {Array(count)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="d-flex gap-3" key={index}>
              <div className="d-flex flex-column gap-3 w-25">
                <div>
                  <Skeleton />
                </div>
                <div className="d-flex gap-2">
                  <div className="w-50">
                    <Skeleton />
                  </div>
                  <div className="w-50">
                    <div className="w-50">
                      <Skeleton />
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ width: "70%" }}>
                    <Skeleton />
                  </div>
                </div>
              </div>

              <div className="flex-grow-1 d-flex flex-column gap-3">
                <div className="w-50">
                  <Skeleton />
                </div>
                <div className="w-75">
                  <Skeleton />
                </div>
                <div className="w-100">
                  <Skeleton />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SkeletonPageLoader;
