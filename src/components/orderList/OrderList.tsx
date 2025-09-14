import React, { useState, MouseEventHandler } from "react";

import CancelledOrders from "../CancelledOrders";

import { orderListProps } from "../../types/types";
import "./style.css";

const OrderList = ({ orders, children }: orderListProps) => {
  const [showActiveOrders, setShowActiveOrders] = useState(true);
  const handleActiveOrders: MouseEventHandler<HTMLButtonElement> = () => {
    if (!showActiveOrders) {
      setShowActiveOrders(true);
    }
  };
  const handleCancelledOrders: MouseEventHandler<HTMLButtonElement> = () => {
    if (showActiveOrders) {
      setShowActiveOrders(false);
    }
  };
  return (
    <div id="order_list" className="rounded">
      <div className="bg-white">
        <h3 className="fs-6 text-muted mx-3 mb-0 pt-3 pb-2 border-bottom">My Orders</h3>
      </div>
      <div className="bg-white pb-sm-0 pb-3">
        <div className="border-bottom pt-3 pb-2 d-flex gap-3 mx-3 mb-sm-0 justify-content-md-start justify-content-between">
          <button onClick={handleActiveOrders} className="order_toggle_btn px-1" style={{ borderBottom: showActiveOrders ? "solid thin var(--lighter_pink)" : "", color: showActiveOrders ? "var(--lighter_pink)" : "" }}>
            ONGOING/ DELIVERED ({orders.length})
          </button>
          <button onClick={handleCancelledOrders} className="order_toggle_btn px-1" style={{ borderBottom: !showActiveOrders ? "solid thin var(--lighter_pink)" : "", color: !showActiveOrders ? "var(--lighter_pink)" : "" }}>
            CANCELLED (0)
          </button>
        </div>
      </div>
      <div className="pt-sm-3 pt-0 pb-5" id="orders_wrapper">
        {showActiveOrders && <div className="d-flex flex-column gap-sm-0 gap-2">{children}</div>}
        {!showActiveOrders && (
          <div>
            <CancelledOrders />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
