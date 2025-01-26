import React, { useEffect } from "react";

import ReactPortal from "./ReactPortal.tsx";

import { ModalProp } from "./../types.ts";
import { closeModal } from "../helperFunctions/utilityFunctions.ts";

const Modal = ({ modalInstance, children, styles }: ModalProp) => {
  const modal = document.getElementById(modalInstance);

  useEffect(() => {
    const _closeModal = (event: globalThis.MouseEvent) => {
      if (event.target === modal) {
        closeModal(modalInstance);
      }
    };
    window.addEventListener("click", _closeModal);
    return () => {
      window.removeEventListener("click", _closeModal);
    };
  }, [modalInstance, modal]);
  return (
    <ReactPortal wrapperId={modalInstance}>
      <div className={`modal-content ${modalInstance}`} style={styles}>
        {children}
      </div>
    </ReactPortal>
  );
};

export default Modal;
