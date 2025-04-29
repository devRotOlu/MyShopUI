import React from "react";

import { ratingStatsProps } from "../../types";

const RatingStats = ({ ratingFrequency, reviewsLength }: ratingStatsProps) => {
  const stats = Array(5)
    .fill(0)
    .map((_, index) => {
      const number = index + 1;
      const count = ratingFrequency[index];
      const gauageWidth = (count / reviewsLength) * 100;
      return (
        <div className="d-flex gap-2 align-items-center">
          <span style={{ color: count ? "var(--dark_moderate_violet)" : "" }}>{number} Star</span>
          <div className="flex-grow-1">
            <div className="h-100" style={{ backgroundColor: "var(--dark_moderate_violet)", width: `${gauageWidth}%` }}></div>
          </div>
          <span style={{ color: count ? "var(--dark_moderate_violet)" : "" }}>{count}</span>
        </div>
      );
    });
  return (
    <div className="d-flex flex-column-reverse gap-2" id="rating_stats">
      {stats}
    </div>
  );
};

export default RatingStats;
