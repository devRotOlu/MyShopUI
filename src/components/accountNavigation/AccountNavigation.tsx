import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const AccountNavigation = () => {
  return (
    <table id="account_navigation" className="w-100">
      <tbody>
        <tr>
          <td className="py-2 w-50 border border-start-0 border-end-0 ps-2">
            <Link className="d-flex gap-2 align-items-center" to="/account/orders">
              <Icon icon="lsicon:work-order-outline" fontSize="1.5rem" />
              <div className="link_details">
                <p>My Orders </p>
                <span className="mt-1 d-block text-muted">Items Ordered</span>
              </div>
            </Link>
          </td>
          <td className="py-2 w-50 border border-end-0 ps-2">
            <Link className="d-flex gap-2 align-items-center" to="/account/delivery-addresses">
              <Icon icon="material-symbols:garage-home-outline-rounded" fontSize="1.5rem" />
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
              <Icon icon="weui:like-outlined" fontSize="1.5rem" />
              <div className="link_details">
                <p>My Saved Items </p>
                <span className="mt-1 d-block text-muted">View liked items</span>
              </div>
            </Link>
          </td>
          <td className="py-2 w-50 border border-end-0 ps-2">
            <Link className="d-flex gap-2 align-items-center" to="/account/delivery-addresses">
              <Icon icon="uiw:user-delete" fontSize="1.5rem" />
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
