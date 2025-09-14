import React, { ReactNode, CSSProperties, useEffect, useRef } from "react";
import { FocusTrap } from "focus-trap-react";

import "./style.css";

type modalProps = {
  children: ReactNode;
  styles: CSSProperties;
  setCloseModal: () => void;
};

const Modal = ({ children, styles, setCloseModal }: modalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCloseModal();
    };

    const handleKeyDownGlobal = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener("keydown", handleKeyDownGlobal);

    return () => {
      window.removeEventListener("keydown", handleKeyDownGlobal);
      document.body.style.overflow = "auto";
      previouslyFocusedElement.current?.focus();
    };
  }, []);

  return (
    <div id="app_modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc" tabIndex={-1} ref={modalRef}>
      <FocusTrap>
        <div id="modalContainer" style={styles}>
          <h2 id="modalTitle" className="visually-hidden">
            Modal Title
          </h2>
          <p id="modalDesc" className="visually-hidden">
            Modal description goes here.
          </p>
          {children}
        </div>
      </FocusTrap>
    </div>
  );
};

export default Modal;
