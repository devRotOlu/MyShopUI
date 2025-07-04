import React, { ReactElement } from "react";

import Alert from "../alert/Alert";

export const promptWishlistLoginAlert = (alertMessage: string, handleClick: () => void): ReactElement => {
  return (
    <Alert alertMessage={alertMessage} styles={{ backgroundColor: "var(--darkest_Grey)" }}>
      <button className="py-1 px-2 border border-white rounded" onClick={() => handleClick()} style={{ width: "fit-content", color: "var(--dark_orange)" }}>
        Click here to Login
      </button>
    </Alert>
  );
};
