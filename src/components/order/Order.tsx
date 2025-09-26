import React, { useEffect, useMemo } from "react";

import Thumbnail from "../thumbnail/Thumbnail";
import ProductImage from "../../ProductImage";

import { orderProps } from "../../types/types";
import { naira, months } from "../../data";
import "./style.css";

const Order = ({ ...props }: orderProps) => {
  const { order, setOrderCosts, orderIndex, orderCosts, setOrderIndex } = props;
  const {
    orderedItems,
    orderDate,
    orderId,
    orderStatus,
    deliveryProfile: { streetAddress, city },
  } = order;

  const itemThumbnails = orderedItems.map((item, index) => {
    const {
      cartItem: {
        product: { images, name },
      },
    } = item;
    const { url } = images[0];
    return (
      <Thumbnail key={index}>
        <ProductImage name={name} url={url} imageSizes="200px" />
      </Thumbnail>
    );
  });

  const totalCost = useMemo(() => orderedItems.reduce((acc, item) => acc + item.cartItem.product.unitPrice * item.orderedQuantity, 0), [orderedItems]);

  useEffect(() => {
    const key = `${orderIndex}`;
    setOrderCosts((prev) => ({ ...prev, [key]: totalCost }));
  }, [orderIndex, setOrderCosts, totalCost]);

  const dateArray = orderDate.split("-");
  const month = months[Number(dateArray[1])];
  const day = dateArray[2];
  const year = dateArray[0];
  const orderTotalCost = orderCosts[`${orderIndex}` as keyof typeof orderCosts];
  return (
    <div className="order bg-white px-sm-0 px-3">
      <div className="py-3">
        <div className="d-flex justify-content-between pb-2 align-items-center gap-2">
          <p className="fw-bold">
            Order Date: {day} {month} {year} | <span className="text-danger">{orderStatus}</span>
          </p>
          <button className="py-sm-2 px-sm-3 px-2 py-1  fw-light view_details_btn flex-shrink-0 align-self-start" onClick={() => setOrderIndex(orderIndex)}>
            View Details
          </button>
        </div>
        <div className="d-flex justify-content-between gap-4 pt-sm-0 pt-2 pb-sm-0 pb-2">
          <div>
            <p className="text-muted">
              <span className="fw-bold">Total</span>: {naira}
              {orderTotalCost?.toLocaleString()}
            </p>
            <p className="text-muted">
              <span className="fw-bold">Order No</span>: {orderId}
            </p>
          </div>
          <div className="d-sm-block d-none ">
            <p className="text-end fw-bold">Delivery Address:</p>
            <p className="text-muted text-end">
              {streetAddress}, {city}
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 mt-3">{itemThumbnails}</div>
      </div>
    </div>
  );
};

export default Order;
