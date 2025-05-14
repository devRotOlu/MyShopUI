import React, { useContext, useEffect } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import Loader from "../components/Loader.tsx";
import CardPayment from "../components/cardPayment/CardPayment.tsx";
import DialogHeader from "../components/dialogHeader/DialogHeader.tsx";
import CheckoutError from "../components/checkoutError/CheckoutError.tsx";
import BankTransfer from "./BankTransfer.tsx";
import PaymentOptions from "../components/MonnifyPaymentOptions.tsx";

import { checkoutContext } from "../components/checkout/Checkout.tsx";
import "./style.css";
import { monnifyDialogProps } from "../types.ts";

const MonnifyDialog = ({ isMonnifyError, setIsMonnifyError }: monnifyDialogProps) => {
  const { initializePayment, transactionRef, monnifyOption, setMonnifyOption, isInitializingPayment } = useContext(checkoutContext);

  useEffect(() => {
    initializePayment();
    return () => {
      setIsMonnifyError(false);
      setMonnifyOption("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitializingPayment) {
    return <Loader color="white" />;
  }

  return (
    <div id="monnify" className="bg-white">
      <DialogHeader>
        <p className="font-italic">{transactionRef}</p>
      </DialogHeader>
      <div>
        {!isMonnifyError && monnifyOption === "card" && <CardPayment />}
        {!isMonnifyError && monnifyOption === "" && <PaymentOptions />}
        {!isMonnifyError && monnifyOption === "transfer" && <BankTransfer />}
        {isMonnifyError && <CheckoutError />}
      </div>
    </div>
  );
};

export default MonnifyDialog;
