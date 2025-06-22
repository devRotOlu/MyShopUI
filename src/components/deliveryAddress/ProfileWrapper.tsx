import React from "react";
import { Icon } from "@iconify/react";

import { ProfileWrapperProps } from "../../types";

const ProfileWrapper = ({ children, setPageIndex, profileHeader, headerText }: ProfileWrapperProps) => {
  return (
    <div className="pt-3 pb-5">
      <div className="d-sm-flex d-none gap-2 align-items-center border-bottom pb-2 px-3">
        <button onClick={() => setPageIndex("0")}>
          <Icon icon="eva:arrow-back-fill" fontSize="16px" />
        </button>
        {profileHeader}
      </div>
      <div className="border-bottom d-sm-none d-flex flex-column gap-3 pb-2">
        <h1 className="px-2 fs-6">Delivery Address</h1>
        <h2 className="px-4" style={{ fontSize: "14px" }}>
          {headerText}
        </h2>
      </div>
      {children}
    </div>
  );
};

export default ProfileWrapper;
