import React, { useContext, MouseEvent } from "react";

import Loader from "../Loader";
import CloseTransferBtn from "../checkout/CloseTransferBtn";

import { transferDetailsProp } from "../../types";
import { checkoutContext } from "../checkout/Checkout";
import { deliveryContext } from "../context/DeliveryProfileProvider";

const TransferDetails = ({ children }: transferDetailsProp) => {
  const { isFetchingTransactionStatus, refetchTransactionStatus, profileIndex, transactionRef, orderInstruction } = useContext(checkoutContext);
  const { deliveryProfiles } = useContext(deliveryContext);
  const handleTransactionStatus = (_: MouseEvent<HTMLButtonElement>) => {
    const deliveryProfile = deliveryProfiles[profileIndex];
    const profileId = Number(deliveryProfile.id);
    refetchTransactionStatus({
      transactionReference: transactionRef,
      profileId,
      orderInstruction,
    });
  };
  return (
    <div>
      <p className="text-white bg-dark text-center py-2">TRANSFER DETAILS</p>
      <div className="pt-3 pb-5 px-3">
        <div id="transfer_details" className="d-flex flex-column gap-3">
          <p>Kindly transfer into the given account using the USSD code.</p>
          {children}
          {isFetchingTransactionStatus && (
            <div className="d-flex align-items-center flex-column gap-3">
              <Loader />
              <p>Please wait while we confirm your transaction</p>
            </div>
          )}
          {!isFetchingTransactionStatus && (
            <button id="transfer_btn" onClick={handleTransactionStatus} className="w-100 bg-white rounded" style={{ color: "var(--lighter_pink)", border: "solid thin var(--lighter_pink)" }}>
              I have made transfer
            </button>
          )}
          {!isFetchingTransactionStatus && <CloseTransferBtn />}
        </div>
      </div>
    </div>
  );
};

export default TransferDetails;
