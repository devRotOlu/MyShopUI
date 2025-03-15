import React, { useState, useContext } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";

import PayPal from "./PayPal";
import MonnifyDialog from "./monnify/MonnifyDialog.tsx";
import DeliveryOption from "./DeliveryOption.tsx";
import PaymentOption from "./PaymentOption.tsx";
import PageWrapper from "../PageWrapper.tsx";
import Modal from "../modal/Modal.tsx";

import { checkoutContextType, payPlatformType } from "../../types.ts";
import { appContext } from "../context/AppContext.tsx";
import { useMonnify } from "../../customHooks/useMonnify.ts";
import { useModal } from "../../customHooks/useModal.tsx";
import "./style.css";

const clientId: string = process.env.REACT_APP_PayPal_ClientID!;

export const checkoutContext = React.createContext({} as checkoutContextType);

const Checkout = () => {
  const {
    loginData: { email },
  } = useContext(appContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [payOption, setPayOption] = useState<payPlatformType>("");
  const [payPalIsSuccess, setPayPalIsSuccess] = useState<boolean>(false);
  const [payPalOrderID, setPayPalOrderID] = useState<string>("");
  const [monnifyOption, setMonnifyOption] = useState<"card" | "transfer" | "">("");

  const { showModal, setShowModal } = useModal();
  const { isSentCardDetails, cardDetailsSent, ...monnifyData } = useMonnify();

  const { isLoadedStatus, isTransactionSuccessful, transactionRef } = monnifyData;

  if ((isSentCardDetails && cardDetailsSent) || (isLoadedStatus && isTransactionSuccessful) || payPalIsSuccess) {
    let orderId = transactionRef;
    if (payPalIsSuccess) {
      orderId = payPalOrderID;
    }
    const data = { checkoutId: orderId };
    navigate(`/checkout/successful/${orderId}`, { state: data, replace: true });
  }

  return (
    <checkoutContext.Provider value={{ ...monnifyData, payPalIsSuccess, setPayPalIsSuccess, setPayPalOrderID, monnifyOption, setMonnifyOption, setShowModal }} key={location.pathname}>
      <PageWrapper pageId="checkout">
        <div className="d-flex gap-3">
          <section className="d-flex flex-column gap-3 flex-grow-1" id="payment_option">
            <DeliveryOption />
            <PaymentOption setPayOption={setPayOption} payOption={payOption} />
          </section>
          <section className="" id="order_details">
            <div></div>
          </section>
        </div>
        {showModal && (
          <Modal styles={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {payOption === "payPal" && (
              <PayPalScriptProvider options={{ clientId }}>
                <PayPal />
              </PayPalScriptProvider>
            )}
            {payOption === "monnify" && <MonnifyDialog />}
          </Modal>
        )}
      </PageWrapper>
    </checkoutContext.Provider>
  );
};

export default Checkout;
