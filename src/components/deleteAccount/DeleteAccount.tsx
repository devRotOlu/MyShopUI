import React, { useState } from "react";

import AccountTab from "../dashboard/AccountTab";
import PageWrapper from "../PageWrapper";
import ComponentOverlay from "../ComponentOverlay.tsx";

import "./style.css";

const DeleteAccount = () => {
  const [signTerms, setSignTerms] = useState(false);

  return (
    <PageWrapper pageId="delete_account">
      <div className="d-flex justify-content-center gap-3">
        <AccountTab />
        <div className="w-50 bg-white d-flex align-items-center justify-content-center rounded" id="content_wrapper">
          <div className="d-flex flex-column gap-5">
            <div>
              <h2 className="fs-6 mb-0">Delete Account</h2>
              <p className="fw-bold">Please Read Carefully</p>
              <p>You are about to request that we permanently delete your data and close your myShop account. All goods and services that you have access to through your account will stop being offered as soon as it is deleted.</p>
            </div>
            <div className="d-flex flex-column gap-5">
              <label className="d-flex gap-1 align-items-start">
                <input id="signTerms" type="checkbox" onChange={() => setSignTerms((prevTerm) => !prevTerm)} />
                <p>Yes, please erase my myShop account and all of my personal data permanently.</p>
              </label>
              <div className="position-relative">
                <button onClick={() => console.log("hello")} className="text-white py-3 rounded w-100" style={{ backgroundColor: signTerms ? "var(--lighter_pink)" : "var(--darkest_Grey)" }}>
                  DELETE MY ACCOUNT
                </button>
                {!signTerms && <ComponentOverlay />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DeleteAccount;
