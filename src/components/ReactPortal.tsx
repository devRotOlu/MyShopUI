import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import { appendModalWrapperToBody } from "../helperFunctions/utilityFunctions.ts";
import { ReactPortalProp } from "./types.ts";

const ReactPortal = ({ wrapperId, children }: ReactPortalProp) => {
  const [modalWrapperRef, setModalWrapperRef] = useState(null);

  useLayoutEffect(() => {
    const modalWrapper = appendModalWrapperToBody(wrapperId);
    setModalWrapperRef(modalWrapper);

    return () => {
      if (modalWrapper.parentNode) {
        modalWrapper.parentNode.removeChild(modalWrapper);
      }
    };
  }, [wrapperId]);

  if (!modalWrapperRef) {
    return null;
  }

  return createPortal(children, modalWrapperRef);
};

export default ReactPortal;
