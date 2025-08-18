import React from "react";

import { cartTableProps } from "../../types.ts";
import "./style.css";

const CartTable = ({ children }: cartTableProps) => {
  return (
    <table className="w-100 align-self-start" id="cart_table">
      <thead>
        <tr style={{ backgroundColor: "var(--darker_Grey)" }}>
          <th className="py-3">Items Details</th>
          <th className="py-3">Quantity</th>
          <th className="py-3 text-center">Item Price</th>
          <th className="py-3 text-end">Action</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default CartTable;
