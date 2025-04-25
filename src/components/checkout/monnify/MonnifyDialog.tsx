import React, { useContext, useEffect } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import Loader from "../../Loader";
import CardPayment from "./CardPayment";
import DialogHeader from "./DialogHeader.tsx";
import CheckoutError from "../CheckoutError.tsx";
import BankTransfer from "./BankTransfer.tsx";
import PaymentOptions from "./PaymentOptions.tsx";

import { checkoutContext } from "../Checkout.tsx";

const MonnifyDialog = () => {
  const { paymentInitialized, initializePayment, transactionRef, monnifyOption, isCardPaymentError, isPaymentError, isBankTransferError } = useContext(checkoutContext);

  useEffect(() => {
    initializePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!paymentInitialized) {
    return <Loader color="white" />;
  }

  const shouldDisplayError = isCardPaymentError || isBankTransferError || isPaymentError;

  return (
    <div id="monnify" className="bg-white">
      <DialogHeader>
        <p className="font-italic">{transactionRef}</p>
      </DialogHeader>
      {!shouldDisplayError && monnifyOption === "card" && <CardPayment />}
      {monnifyOption === "" && <PaymentOptions />}
      {!shouldDisplayError && monnifyOption === "transfer" && <BankTransfer />}
      {shouldDisplayError && <CheckoutError />}
    </div>
  );
};

export default MonnifyDialog;
