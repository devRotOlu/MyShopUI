import React from "react";
import { Icon } from "@iconify/react";

import { orderDetailsProp } from "../types";

const OrderDetails = ({ order, setDetailsIndex, orderCost }: orderDetailsProp) => {
  const {
    orderedItems,
    orderDate,
    orderId,
    orderStatus,
    deliveryProfile: { streetAddress, city, lastName, firstName, phoneNumber },
  } = order;
  return (
    <>
      <div className="pt-3 pb-2 border-bottom d-flex gap-2 align-items-center">
        <button onClick={() => setDetailsIndex(-1)}>
          <Icon fontSize={20} icon="material-symbols-light:arrow-back" />
        </button>{" "}
        <p>Order Details</p>
      </div>
      <table className="w-100 mt-3">
        <tr>
          <th colSpan={2}>Order Informations</th>
        </tr>
        <tr>
          <td>Order Number</td>
          <td className="text-end">{orderId}</td>
        </tr>
        <tr>
          <td>Order Date</td>
          <td className="text-end">{orderDate}</td>
        </tr>
        <tr>
          <td>Sold by</td>
          <td className="text-end">My Shop Ltd</td>
        </tr>
        <tr>
          <td>Total Amount</td>
          <td className="text-end">{orderCost}</td>
        </tr>
      </table>
      <table className="mt-3 w-100">
        <tr>
          <th>Payment Informations </th>
          <th>Delivery Informations </th>
        </tr>
        <tr>
          <td>
            <p>
              Payment Method <br />
              <span>Online Payment</span>
            </p>
            <p>{orderCost}</p>
          </td>
          <td>
            <p>
              {lastName}
              <br />
              {firstName}
            </p>
            <p>
              {streetAddress}, {city}
            </p>
            <p>{phoneNumber}</p>
          </td>
        </tr>
      </table>
    </>
  );
};

export default OrderDetails;
