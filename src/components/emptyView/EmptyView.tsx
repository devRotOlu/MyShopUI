import React from "react";
import { Icon } from "@iconify/react";

import { emptyViewProps } from "../../types/types";
import "./style.css";

const EmptyView = ({ icon, label, message }: emptyViewProps) => {
  return (
    <div className="align-self-stretch d-flex justify-content-center align-items-center w-100 mb-5" id="empty_view">
      <div className="d-flex bg-white align-items-center justify-content-center">
        <div className="d-flex flex-column gap-4 align-items-center" id="empty_view_content">
          <Icon icon={icon} style={{ fontSize: "4rem", color: "var(--lighter_pink)" }} />
          <div className="d-flex flex-column gap-2">
            {label !== undefined && <p className="fw-bold text-center">{label}</p>}
            <p className="text-muted">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyView;
