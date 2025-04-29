import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { orderDetailsProp } from "../../types";
import { months } from "../../data";
import "./style.css";

const OrderDetails = ({ ...props }: orderDetailsProp) => {
  const { order, setDetailsIndex, orderCost, setShowModal, setReviewId } = props;
  const {
    orderedItems,
    orderDate,
    orderId,
    orderStatus,
    deliveryProfile: { streetAddress, city, lastName, firstName, phoneNumber },
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
        product: { name, images, id },
      },
      orderedQuantity,
    } = item;
    const image = images[0];
    return (
      <tr key={index}>
        <td className="w-75 py-2 px-3">
          <div className="d-flex gap-2 w-100 flex-wrap">
            <div>
              <img src={image.url} alt={name} />
            </div>
            <div>
              <p>
                {name} <br /> <span>{orderCost}</span> <br />
                Quantity: {orderedQuantity}
              </p>
            </div>
          </div>
        </td>
        <td className="py-2 px-3 w-25">
          <div className="d-flex flex-column gap-3">
            <Link to={`/product/${name}-${id}`} className="text-white px-4 py-2 buy_again_btn fw-light">
              Buy Again
            </Link>
            <button className="px-4 py-2 review_btn text-white" onClick={() => handleReview(id)}>
              Review
            </button>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div id="order_details" className="pb-5">
      <div className="pt-3 pb-2 border-bottom d-flex gap-2 align-items-center">
        <button onClick={() => setDetailsIndex(-1)}>
          <Icon fontSize={20} icon="material-symbols-light:arrow-back" />
        </button>{" "}
        <p>Order Details</p>
      </div>
      <table className="w-100 mt-3">
        <tr>
          <th colSpan={2} className="py-2 px-3">
            Order Informations
          </th>
        </tr>
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
          <td className="text-end py-2 px-3 fw-bold"> {orderCost}</td>
        </tr>
      </table>
      <table className="mt-3 w-100">
        <tr>
          <th className="py-2 px-3">Payment Informations </th>
          <th className="py-2 px-3">Delivery Informations </th>
        </tr>
        <tr>
          <td className="py-2 px-3">
            <p>
              Payment Method <br />
              <span>Online Payment</span>
            </p>
            <p className="pt-1">Total: {orderCost}</p>
          </td>
          <td className="py-2 px-3">
            <p>
              {lastName}
              <br />
              {firstName}
            </p>
            <p className="pt-1">
              {streetAddress}, {city}
            </p>
          </td>
        </tr>
        <tr>
          <td className="py-2 px-3"></td>
          <td className="py-2 px-3">{phoneNumber}</td>
        </tr>
      </table>
      <table className="mt-3 w-100">
        <tr>
          <th className="w-75 py-2 px-3">Items Ordered</th>
          <th className="py-2 px-3">
            <p className="bg-danger py-1 px-2 text-white" id="order_status">
              {orderStatus}
            </p>
          </th>
        </tr>
        {_orderedItems}
      </table>
    </div>
  );
};

export default OrderDetails;
