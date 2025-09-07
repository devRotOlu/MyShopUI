import React from "react";

import { activeOrdersProps } from "../types/types";

const ActiveOrders = ({ children }: activeOrdersProps) => {
  return <div>{children}</div>;
};

export default ActiveOrders;
