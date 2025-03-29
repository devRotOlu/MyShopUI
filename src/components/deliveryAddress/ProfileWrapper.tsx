import React from "react";
import { Icon } from "@iconify/react";

import { ProfileWrapperProps } from "../../types";

const ProfileWrapper = ({ children, setPageIndex }: ProfileWrapperProps) => {
  return (
    <div className="pt-3 pb-5">
      <div className="d-flex gap-2 align-items-center border-bottom pb-2 px-3">
        <button onClick={() => setPageIndex("0")}>
          <Icon icon="eva:arrow-back-fill" fontSize="16px" />
        </button>
        <h2 className="fs-6">
          Add Delivery <br />
          Address
        </h2>
      </div>
      {children}
    </div>
  );
};

export default ProfileWrapper;
