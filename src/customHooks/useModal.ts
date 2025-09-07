import { useState } from "react";

import { useModalDataType } from "../types/types";

export const useModal = (): useModalDataType => {
  const [showModal, setShowModal] = useState(false);

  return {
    showModal,
    setShowModal,
  };
};
