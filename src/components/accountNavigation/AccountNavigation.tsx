import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineHeart, AiOutlineDelete, AiOutlineBook } from "react-icons/ai";

import "./style.css";

const AccountNavigation = () => {
  return (
    <table id="account_navigation" className="w-100">
      <tbody>
        <tr>
          <td className="py-2 w-50 border border-start-0 border-end-0 ps-2">
            <Link className="d-flex gap-2 align-items-center" to="/account/orders">
              <AiOutlineBook size="1.5rem" />
              <div className="link_details">
                <p>My Orders </p>
                <span className="mt-1 d-block text-muted">Items Ordered</span>
              </div>
            </Link>
          </td>
          <td className="py-2 w-50 border border-end-0 ps-2">
            <Link className="d-flex gap-2 align-items-center" to="/account/delivery-addresses">
              <AiOutlineHome size="1.5rem" />
              <div className="link_details">
                <p>My Addresses </p>
                <span className="mt-1 d-block text-muted">View Saved addresses</span>
              </div>
            </Link>
          </td>
        </tr>
        <tr>
          <td className="py-2 w-50 border border-start-0 border-end-0 ps-2">
            <Link className="d-flex gap-2 align-items-center" to="/account/favourites">
              <AiOutlineHeart size="1.5rem" />
              <div className="link_details">
                <p>My Saved Items </p>
                <span className="mt-1 d-block text-muted">View liked items</span>
              </div>
            </Link>
          </td>
          <td className="py-2 w-50 border border-end-0 ps-2">
            <Link className="d-flex gap-2 align-items-center" to="/account/delivery-addresses">
              <AiOutlineDelete size="1.5rem" />
              <div className="link_details">
                <p>Delete Account </p>
                <span className="mt-1 d-block text-muted">Close your account</span>
              </div>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccountNavigation;
