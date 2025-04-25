import React, { useState, MouseEvent } from "react";
import ActiveOrders from "./ActiveOrders";
import CancelledOrders from "./CancelledOrders";
import { orderListProps } from "../types";

const OrderList = ({ orders, children }: orderListProps) => {
  const [showActiveOrders, setShowActiveOrders] = useState(true);
  const handleActiveOrders = (_: MouseEvent<HTMLButtonElement>) => {
    if (!showActiveOrders) {
      setShowActiveOrders(true);
    }
  };
  const handleCancelledOrders = (_: MouseEvent<HTMLButtonElement>) => {
    if (showActiveOrders) {
      setShowActiveOrders(false);
    }
  };
  return (
    <>
      <div className="pt-3 pb-2 border-bottom">
        <p>My Orders</p>
      </div>
      <div className="pt-3 pb-2 border-bottom d-flex gap-3">
        <button onClick={handleActiveOrders} className="order_toggle_btn px-1" style={{ borderBottom: showActiveOrders ? "solid thin var(--lighter_pink)" : "", color: showActiveOrders ? "var(--lighter_pink)" : "" }}>
          ONGOING/ DELIVERED ({orders.length})
        </button>
        <button onClick={handleCancelledOrders} className="order_toggle_btn px-1" style={{ borderBottom: !showActiveOrders ? "solid thin var(--lighter_pink)" : "", color: !showActiveOrders ? "var(--lighter_pink)" : "" }}>
          CANCELLED (0)
        </button>
      </div>
      <div className="mt-3">
        {showActiveOrders && <ActiveOrders>{children}</ActiveOrders>}
        {!showActiveOrders && <CancelledOrders />}
      </div>
    </>
  );
};

export default OrderList;
