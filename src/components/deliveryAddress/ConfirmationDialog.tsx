import React from "react";
import { MdLanguage } from "react-icons/md";

import { ConfirmationDialogProps } from "../../types/types";

const ConfirmationDialog = ({ setShowModal, handleDeletion }: ConfirmationDialogProps) => {
  return (
    <div className="d-flex flex-column gap-4 text-white py-3 px-4 rounded" id="delete_confirmation_dialog">
      <div className="d-flex gap-2">
        <MdLanguage />
        <p>www.myShop.com</p>
      </div>
      <p>Are you sure you want to delete this address?</p>
      <div className="d-flex gap-2 justify-content-end">
        <button className="py-2 px-3 rounded" onClick={handleDeletion}>
          Ok
        </button>
        <button className="text-white py-2 px-3 rounded" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
