import React, { useMemo } from "react";

import Thumbnail from "../thumbnail/Thumbnail";

import { orderProps } from "../../types";
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
  // {
  //   orderedQuantity,
  //   cartItem: {
  //     id,
  //     product: { name, images },
  //   },
  // }

  const itemThumbnails = orderedItems.map((item, index) => {
    const {
      cartItem: {
        product: { images, name },
      },
    } = item;
    const { url } = images[0];
    return <Thumbnail name={name} url={url} key={index} />;
  });

  useMemo(() => {
    let totalCost = 0;
    for (let index = 0; index < orderedItems.length; index++) {
      const {
        cartItem: {
          product: { unitPrice },
        },
        orderedQuantity,
      } = orderedItems[index];
      totalCost += unitPrice * orderedQuantity;
    }
    const key = `${orderIndex}`;
    setOrderCosts((prevCosts) => ({ ...prevCosts, [key]: totalCost }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCost = orderCosts[`${orderIndex}` as keyof typeof orderCosts];
  return (
    <div className="py-3 order border-bottom">
      <div className="d-flex justify-content-between pb-2">
        <p className="fw-bold">
          Order Date: {orderDate} | <span className="text-danger">{orderStatus}</span>
        </p>
        <button className="py-2 px-4  fw-light view_details_btn" onClick={() => setOrderIndex(orderIndex)}>
          View Details
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-muted">
            Total: {totalCost} <br />
            Order No: {orderId}
          </p>
        </div>
        <div>
          <p className="text-end fw-bold">Delivery Address:</p>
          <p className="text-muted">
            {streetAddress}, {city}
          </p>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3">{itemThumbnails}</div>
    </div>
  );
};

export default Order;
