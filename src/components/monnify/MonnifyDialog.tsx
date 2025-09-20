import React, { useContext, useEffect } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import Loader from "../Loader.tsx";
import MonnifyCardPaymentOption from "../monnifyCardPaymentOption/MonnifyCardPaymentOption.tsx";
import DialogHeader from "../dialogHeader/DialogHeader.tsx";
import CheckoutError from "../checkoutError/CheckoutError.tsx";
import MonnifyBankTransferOption from "../MonnifyBankTransferOption.tsx";
import MonnifyPaymentOptions from "../MonnifyPaymentOptions.tsx";

import { checkoutContext } from "../checkout/Checkout.tsx";
import "./style.css";
import { monnifyDialogProps } from "../../types/types.ts";
import { cartContext } from "../context/CartProvider.tsx";
import { naira } from "../../data.ts";

const MonnifyDialog = ({ isMonnifyError, setIsMonnifyError }: monnifyDialogProps) => {
  const { initializePayment, transactionRef, monnifyOption, setMonnifyOption, isInitializingPayment } = useContext(checkoutContext);
  const { cartItemsTotalPrice } = useContext(cartContext);

  useEffect(() => {
    initializePayment();
    return () => {
      setIsMonnifyError(false);
      setMonnifyOption("");
    };
  }, [initializePayment, setIsMonnifyError, setMonnifyOption]);

  if (isInitializingPayment) {
    return <Loader color="white" />;
  }

  return (
    <div id="monnify" className="bg-white d-flex flex-column">
      <DialogHeader>
        <div className="d-flex justify-content-between">
          <p className="font-italic flex-grow-1 text-sm-start text-center">{transactionRef}</p>
          <p className="fw-bold d-sm-block d-none">
            {naira}
            {Math.ceil(cartItemsTotalPrice).toLocaleString()}
          </p>
        </div>
      </DialogHeader>
      <div className="flex-grow-1">
        {!isMonnifyError && monnifyOption === "card" && <MonnifyCardPaymentOption />}
        {!isMonnifyError && monnifyOption === "" && <MonnifyPaymentOptions />}
        {!isMonnifyError && monnifyOption === "transfer" && <MonnifyBankTransferOption />}
        {isMonnifyError && <CheckoutError />}
        {!isMonnifyError && monnifyOption === "" && (
          <p className="text-center" style={{ color: "var(--dark_wine)" }}>
            For successful checkout use card.
          </p>
        )}
      </div>
    </div>
  );
};

export default MonnifyDialog;
