import React, { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

import { userContext } from "../context/UserProvider.tsx";
import "./style.css";

const AccountDropDown = () => {
  const appStates = useContext(userContext);
  const {
    loginData: { lastName },
    handLogout,
  } = appStates;

  return (
    <div className="position-relative" id="account_dropdown">
      <button className="d-flex align-items-center loginTriggerBtn justify-content-center">
        <span className="text-start text-wrap">My Account</span>
        <Icon icon="ri:arrow-drop-down-line" style={{ fontSize: "2rem" }} />
      </button>
      <div className="bg-white " id="profile_wrapper">
        <p>
          Hi <span>{lastName}</span>
        </p>
        <ol className="p-0 d-flex flex-column m-0">
          <li>
            <Link to="/account/profile">
              <Icon icon="et:profile-male" fontSize="1rem" />
              <span>My Porifile</span>
            </Link>
          </li>
          <li>
            <Link to="/account/orders">
              <Icon icon="lsicon:work-order-outline" fontSize="1rem" />
              <span>My Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/account/favourites">
              <Icon icon="weui:like-outlined" fontSize="1rem" />
              <span>My Saved Items</span>
            </Link>
          </li>
        </ol>
        <button onClick={handLogout} className="d-flex gap-2 align-items-center w-100">
          <Icon icon="material-symbols-light:logout" fontSize="1rem" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountDropDown;
