import React from "react";
import { Icon } from "@iconify/react";

import OrderedItem from "../orderedItem/OrderedItem";

import { orderHistoryProps } from "../../types/types";
import { months, naira } from "../../data";
import "./style.css";

const OrderHistory = ({ props }: orderHistoryProps) => {
  const { order, setOrderIndex, orderCost, setShowModal, setReviewId, userReviews } = props;
  const {
    orderDate,
    orderId,
    orderStatus,
    deliveryProfile: { streetAddress, city, lastName, firstName, phoneNumber },
    orderedItems,
  } = order;

  const dateArray = orderDate.split("-");
  const date = dateArray[2];
  const month = months[Number(dateArray[1])];
  const year = dateArray[0];
  const handleReview = (productId: number) => {
    setShowModal(true);
    setReviewId(productId);
  };
  const _orderedItems = orderedItems.map((item, index) => {
    const {
      cartItem: {
        product: { id },
      },
    } = item;
    const isReviewed = userReviews?.some(({ productId }) => id === productId);
    return <OrderedItem key={index} item={item} isReviewed={isReviewed} handleReview={handleReview} />;
  });

  return (
    <div id="order_details" className="pb-5 bg-white rounded">
      <div className="pt-3 pb-2 d-flex gap-2 align-items-center p-sm-x-3 px-2">
        <button aria-label="back" className="d-sm-block d-none" onClick={() => setOrderIndex(-1)}>
          <Icon fontSize={20} icon="material-symbols-light:arrow-back" />
        </button>{" "}
        <h2 className="fs-6 text-muted ">Order Details</h2>
      </div>
      <div className="px-3" id="table_wrapper">
        <table className="w-100 mt-3">
          <thead>
            <tr>
              <th colSpan={2} className="py-2 px-3">
                Order Informations
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">Order Number</td>
              <td className="text-end py-2 px-3">{orderId}</td>
            </tr>
            <tr>
              <td className="py-2 px-3">Order Date</td>
              <td className="text-end py-2 px-3">
                {date} {month} {year}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3">Sold by</td>
              <td className="text-end py-2 px-3">My Shop Ltd</td>
            </tr>
            <tr>
              <td className="py-2 px-3 fw-bold">Total Amount</td>
              <td className="text-end py-2 px-3 fw-bold">
                {naira}
                {orderCost.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="mt-3 w-100">
          <thead>
            <tr>
              <th className="py-2 px-sm-3 px-0">Payment Informations </th>
              <th className="py-2 px-sm-3 px-0">Delivery Informations </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-sm-2 py-0 px-sm-3 px-0" data-header="Payment Informations">
                <div className="w-100 px-sm-0 px-3">
                  <p>
                    Payment Method <br />
                    <span className="text-muted">Online Payment</span>
                  </p>
                  <p className="pt-2">
                    Total: {naira}
                    {orderCost.toLocaleString()}
                  </p>
                </div>
              </td>
              <td className="py-2 px-sm-3 px-0" data-header="Delivery Informations">
                <div className="w-100 px-sm-0 px-3">
                  <p className="text-muted">
                    {lastName}
                    &nbsp;&nbsp;
                    {firstName}
                  </p>
                  <p className="pt-3 text-muted">
                    {streetAddress}, {city}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="d-sm-table-cell d-none  px-sm-3 px-0"></td>
              <td className="px-sm-3 px-0 text-muted">
                <p className="px-sm-0 px-3">{phoneNumber}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="mt-3 w-100">
          <thead>
            <tr className="order_item">
              <th className="py-2 ps-3 pe-2 w-100">Items Ordered</th>
              <th className="py-2 pe-3 " style={{ whiteSpace: "nowrap" }}>
                <p className="bg-danger py-1 px-2 text-white" id="order_status">
                  {orderStatus}
                </p>
              </th>
            </tr>
          </thead>
          <tbody>{_orderedItems}</tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
