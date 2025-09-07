import React from "react";

import "./style.css";
import { homeCardsWrapperProps } from "../../types/types";

const HomeCardsWrapper = ({ children }: homeCardsWrapperProps) => {
  return (
    <div id="home_cards_wrapper" className="w-100">
      {children}
    </div>
  );
};

export default HomeCardsWrapper;
