import React, { useState, CSSProperties, useRef, useEffect, useContext } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";

import PayPal from "./PayPal";
import MonnifyDialog from "./monnify/MonnifyDialog.tsx";
import DeliveryOption from "./DeliveryOption.tsx";
import PaymentOption from "./PaymentOption.tsx";
import PageWrapper from "../PageWrapper.tsx";
import Modal from "../modal/Modal.tsx";
import SkeletonPageLoader from "../SkeletonPageLoader.tsx";
import AddressDialog from "./AddressDialog.tsx";

import { checkoutContextType, payPlatformType } from "../../types.ts";
import { useMonnify } from "../../customHooks/useMonnify.ts";
import { useModal } from "../../customHooks/useModal.ts";
import "./style.css";
import { useGetDeliveryProfile } from "../../customHooks/useGetDeliveryProfile.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";

const clientId: string = process.env.REACT_APP_PayPal_ClientID!;

export const checkoutContext = React.createContext({} as checkoutContextType);

const Checkout = () => {
  const { deliveryProfiles } = useContext(deliveryContext);

  const { loadingDeliveryProfile } = useGetDeliveryProfile();

  const location = useLocation();
  const navigate = useNavigate();

  const [payOption, setPayOption] = useState<payPlatformType>("");
  const [payPalIsSuccess, setPayPalIsSuccess] = useState<boolean>(false);
  const [payPalOrderID, setPayPalOrderID] = useState<string>("");
  const [monnifyOption, setMonnifyOption] = useState<"card" | "transfer" | "">("");
  const [profileIndex, setProfileIndex] = useState<number>(-1);

  const { showModal, setShowModal } = useModal();
  const { isSentCardDetails, cardDetailsSent, ...monnifyData } = useMonnify();

  const { isLoadedStatus, isTransactionSuccessful, transactionRef } = monnifyData;

  const isInitialProfileRef = useRef(false);

  useEffect(() => {
    if (deliveryProfiles.length && !isInitialProfileRef.current) {
      setProfileIndex(0);
      isInitialProfileRef.current = true;
    }
  }, [deliveryProfiles, deliveryProfiles.length]);

  if ((isSentCardDetails && cardDetailsSent) || (isLoadedStatus && isTransactionSuccessful) || payPalIsSuccess) {
    let orderId = transactionRef;
    if (payPalIsSuccess) {
      orderId = payPalOrderID;
    }
    const data = { checkoutId: orderId };
    navigate(`/checkout/successful/${orderId}`, { state: data, replace: true });
  }

  if (loadingDeliveryProfile) {
    return (
      <PageWrapper pageId="checkout">
        <div className="bg-white">
          <SkeletonPageLoader count={2} />
        </div>
      </PageWrapper>
    );
  }

  const styles: CSSProperties = payOption === "" ? { display: "flex", justifyContent: "end" } : { display: "flex", justifyContent: "center", alignItems: "center" };

  return (
    <checkoutContext.Provider value={{ ...monnifyData, payPalIsSuccess, setPayPalIsSuccess, setPayPalOrderID, monnifyOption, setMonnifyOption, setShowModal, profileIndex, setProfileIndex }} key={location.pathname}>
      <PageWrapper pageId="checkout">
        <div className="d-flex gap-3 w-100 py-5 px-4">
          <section className="d-flex flex-column gap-3 flex-grow-1" id="payment_option">
            <DeliveryOption />
            <PaymentOption setPayOption={setPayOption} payOption={payOption} />
          </section>
          <section className="" id="order_details">
            <div></div>
          </section>
        </div>
      </PageWrapper>
      {showModal && (
        <Modal styles={styles}>
          {payOption === "payPal" && (
            <PayPalScriptProvider options={{ clientId }}>
              <PayPal />
            </PayPalScriptProvider>
          )}
          {payOption === "monnify" && <MonnifyDialog />}
          {payOption === "" && <AddressDialog />}
        </Modal>
      )}
    </checkoutContext.Provider>
  );
};

export default Checkout;
