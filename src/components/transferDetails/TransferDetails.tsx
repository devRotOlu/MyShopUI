import React, { useContext, MouseEvent } from "react";

import Loader from "../Loader";
import CloseTransferBtn from "../checkout/CloseTransferBtn";

import { transferDetailsProp } from "../../types";
import { checkoutContext } from "../checkout/Checkout";
import { deliveryContext } from "../context/DeliveryProfileProvider";
import "./style.css";

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
    <div id="transfer_details">
      <p className="text-white bg-dark text-center py-2">TRANSFER DETAILS</p>
      <div className="pt-3 pb-5 px-3">
        <div className="d-flex flex-column gap-3">
          <p className="text-center">Kindly transfer into the given account using the USSD code then click 'I have made a transfer' button to complete the transaction.</p>
          {children}
          {isFetchingTransactionStatus && (
            <div className="d-flex align-items-center flex-column gap-3">
              <Loader />
              <p className="text-center">Please wait while we confirm your transaction</p>
            </div>
          )}
          {!isFetchingTransactionStatus && (
            <button id="confirm_transfer_btn" onClick={handleTransactionStatus} className="w-100 bg-white rounded py-2">
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
