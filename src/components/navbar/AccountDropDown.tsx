import React, { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { AccountDropDownProp } from "../../types";

import { appContext } from "../AppContext.tsx";

const AccountDropDown = ({ handleShowDropDown, showDropDown }: AccountDropDownProp) => {
  const appStates = useContext(appContext);
  const {
    loginData: { lastName },
    handLogout,
  } = appStates;

  return (
    <div className="position-relative" id="account_dropdown">
      <button onClick={handleShowDropDown} className="d-flex  align-items-center loginTriggerBtn justify-content-center">
        <span className="text-start text-wrap">My Account</span>
        <Icon icon="ri:arrow-drop-down-line" style={{ fontSize: "2rem" }} />
      </button>
      {showDropDown && (
        <div className="position-absolute top-100 bg-white " style={{ width: "12rem", marginTop: "-5px" }}>
          <p className="mb-2  px-3">
            Hi <span className="ps-2">{lastName}</span>
          </p>
          <ol className="p-0 d-flex flex-column m-0">
            <li className="d-flex gap-2  px-3  align-items-center">
              <Icon icon="et:profile-male" />
              <p>My Porifile</p>
            </li>
            <li className="d-flex gap-2  px-3  align-items-center">
              <Icon icon="lsicon:work-order-outline" />
              <p>My Orders</p>
            </li>
            <li className="d-flex gap-2  px-3  align-items-center">
              <Icon icon="weui:like-outlined" />
              <p>My Saved Items</p>
            </li>
            <li className="d-flex gap-2  px-3  align-items-center">
              <Icon icon="ion:location-outline" />
              <p>Track My Order</p>
            </li>
            <button onClick={handLogout} className="d-flex gap-2  px-3  align-items-center">
              <Icon icon="material-symbols-light:logout" />
              Log out
            </button>
          </ol>
        </div>
      )}
    </div>
  );
};

export default AccountDropDown;
