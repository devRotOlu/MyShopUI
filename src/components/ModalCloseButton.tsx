import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import { modalCloseButtonProps } from "../types/types";

const ModalCloseButton = ({ setShowModal }: modalCloseButtonProps) => {
  return (
    <button type="button" onClick={() => setShowModal(false)} className="py-1 px-2 d-flex gap-2 align-items-center" id="modal_cancel_btn">
      <AiOutlineClose />
      <span>Cancel</span>
    </button>
  );
};

export default ModalCloseButton;
