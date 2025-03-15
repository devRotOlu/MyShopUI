import React from "react";
import { Icon } from "@iconify/react";

import { modalCloseButtonProps } from "../types";

const ModalCloseButton = ({ setShowModal }: modalCloseButtonProps) => {
  return (
    <button type="button" onClick={() => setShowModal(false)} className="py-1 px-2 d-flex gap-2 align-items-center" id="modal_cancel_btn">
      <Icon icon="iconoir:cancel" />
      <span>Cancel</span>
    </button>
  );
};

export default ModalCloseButton;
