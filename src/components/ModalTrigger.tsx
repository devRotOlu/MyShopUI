import React, { useRef, useEffect } from "react";

import { openModal } from "../helperFunctions/utilityFunctions.ts";
import { ModalTriggerProp } from "./types";

const ModalTrigger = ({ modalInstance, className, styles, children }: ModalTriggerProp) => {
  const divRef = useRef();

  useEffect(() => {
    const _openModal = (event) => {
      event.preventDefault();
      openModal(modalInstance);
    };

    divRef.current.addEventListener("click", _openModal);
    const currentDivRef = divRef.current;
    return () => {
      currentDivRef.removeEventListener("click", _openModal);
    };
  }, [modalInstance]);

  return (
    <div ref={divRef} className={className} style={styles}>
      {children}
    </div>
  );
};

export default ModalTrigger;
