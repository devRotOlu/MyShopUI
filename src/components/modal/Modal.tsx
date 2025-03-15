import React, { ReactNode, CSSProperties } from "react";

import "./style.css";

type modalProps = {
  children: ReactNode;
  styles: CSSProperties;
};

const Modal = ({ children, styles }: modalProps) => {
  return (
    <div id="modal">
      <div id="modalContainer" style={styles}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
