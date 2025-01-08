import React from "react";

import { CartTableProp } from "../../types.ts";

const CartTable = ({ children }: CartTableProp) => {
  return (
    <table className="w-100">
      <tr style={{ backgroundColor: "var(--darker_Grey)" }}>
        <th className="py-3 w-50">Items Details</th>
        <th className="py-3">Quantity</th>
        <th className="py-3">Item Price</th>
        <th className="py-3">Action</th>
      </tr>
      {children}
    </table>
  );
};

export default CartTable;
