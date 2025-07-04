import React, { useContext, useState } from "react";

import AccountTab from "../dashboard/AccountTab";
import PageWrapper from "../PageWrapper";
import ComponentOverlay from "../ComponentOverlay.tsx";
import Loader from "../Loader.tsx";

import { userContext } from "../context/UserProvider.tsx";
import "./style.css";

const DeleteAccount = () => {
  const [signTerms, setSignTerms] = useState(false);
  const { deleteAccount, isDeletingAccount } = useContext(userContext);

  return (
    <PageWrapper pageId="delete_account">
      <div className="d-flex justify-content-center gap-3 py-sm-5 w-100">
        <AccountTab />
        <div className="bg-white d-flex align-items-sm-center justify-content-center rounded pb-sm-0 pb-5" id="content_wrapper">
          <div className="d-flex flex-column gap-5 pt-sm-0 pt-3">
            <div>
              <h2 className="fs-5">Delete Account</h2>
              <p className="fw-bold mt-sm-3 mt-5 mb-3 fs-5 ps-sm-0 ps-2">Please Read Carefully</p>
              <p className="ps-sm-0 ps-2">You are about to request that we permanently delete your data and close your myShop account. All goods and services that you have access to through your account will stop being offered as soon as it is deleted.</p>
            </div>
            <div className="d-flex flex-column gap-5 ps-sm-0 ps-2">
              <label className="d-flex gap-1 align-items-start flex-shrink">
                <input className="flex-shrink-0" id="signTerms" type="checkbox" onChange={() => setSignTerms((prevTerm) => !prevTerm)} />
                <p>Yes, please erase my myShop account and all of my personal data permanently.</p>
              </label>
              <div className="position-relative">
                <button onClick={() => deleteAccount()} className="text-white py-3 rounded w-100" style={{ backgroundColor: signTerms ? "var(--lighter_pink)" : "var(--darkest_Grey)" }}>
                  DELETE MY ACCOUNT
                </button>
                {!signTerms ||
                  (isDeletingAccount && (
                    <ComponentOverlay>
                      {isDeletingAccount && (
                        <div className="d-flex h-100 justify-content-center align-items-center">
                          <Loader size="spinner-border-sm" color="white" />
                        </div>
                      )}
                    </ComponentOverlay>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DeleteAccount;
