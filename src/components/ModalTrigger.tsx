import React, { useRef, useEffect } from "react";

import { openModal } from "../helperFunctions/utilityFunctions.ts";
import { ModalTriggerProp } from "../types.ts";

const ModalTrigger = ({ modalInstance, class_name, styles, children }: ModalTriggerProp) => {
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
    <div ref={divRef} className={class_name} style={styles}>
      {children}
    </div>
  );
};

export default ModalTrigger;
