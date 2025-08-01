import React from "react";
import { Link } from "react-router-dom";

import { orderedItemProps } from "../../types";
import { naira } from "../../data";
import "./style.css";

const OrderedItem = ({ item, isReviewed, handleReview }: orderedItemProps) => {
  const {
    cartItem: {
      product: { name, images, id, unitPrice },
    },
    orderedQuantity,
  } = item;
  const image = images[0];
  const itemCost = orderedQuantity * unitPrice;

  return (
    <tr className="order_item">
      <td className="py-2 px-sm-3 px-2 w-100">
        <div className="d-flex gap-2 w-100 flex-wrap">
          <div>
            <img src={image.url} alt={name} />
          </div>
          <div className="order_details">
            <p className="text-muted">
              {name} <br />
            </p>
            <p className="fw-bold pt-1">
              {naira}
              {itemCost.toLocaleString()}
            </p>
            <p className="text-muted pt-1">Quantity: {orderedQuantity}</p>
          </div>
        </div>
      </td>
      <td className="py-2 px-sm-3 px-2" style={{ whiteSpace: "nowrap" }}>
        <Link to={`/product/${name}-${id}`} className="d-block text-white py-2 buy_again_link fw-light text-center" style={{ width: "100px" }}>
          Buy Again
        </Link>
        <div>
          <button className="py-2 review_btn text-white " onClick={() => handleReview(id)} style={{ width: "100px" }}>
            {isReviewed ? "Edit Review" : "Review"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderedItem;
