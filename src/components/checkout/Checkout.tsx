import React, { useState, CSSProperties, useRef, useEffect, useContext } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

import CheckoutHeader from "../checkoutHeader/CheckoutHeader.tsx";
import MonnifyDialog from "../../monnify/MonnifyDialog.tsx";
import DeliveryOption from "../deliveryOption/DeliveryOption.tsx";
import CheckoutPaymentOption from "../checkoutPaymentOption/CheckoutPaymentOption.tsx";
import PageWrapper from "../PageWrapper.tsx";
import Modal from "../modal/Modal.tsx";
import SkeletonPageLoader from "../SkeletonPageLoader.tsx";
import AddressDialog from "../AddressDialog.tsx";
import PayStackDialog from "../payStack/PayStackDialog.tsx";
import CheckoutPaymentOptions from "../checkoutPaymentOptions/CheckoutPaymentOptions.tsx";
import CheckoutError from "../checkoutError/CheckoutError.tsx";
import Sidebar from "../sidebar/Sidebar.tsx";

import { checkoutContextType, payPlatformType } from "../../types.ts";
import { useMonnify } from "../../customHooks/useMonnify.ts";
import { useModal } from "../../customHooks/useModal.ts";
import "./style.css";
import { useGetDeliveryProfile } from "../../customHooks/useGetDeliveryProfile.ts";
import { deliveryContext } from "../context/DeliveryProfileProvider.tsx";
import OrderDetails from "../orderDetails/OrderDetails.tsx";
import { useVerifyPayStackPayment } from "../../customHooks/useVerifyPayStackPayment.ts";

export const checkoutContext = React.createContext({} as checkoutContextType);

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const payStackReference = searchParams.get("reference");
  const { deliveryProfiles } = useContext(deliveryContext);

  const { loadingDeliveryProfile } = useGetDeliveryProfile();

  const location = useLocation();
  const navigate = useNavigate();

  const [payOption, setPayOption] = useState<payPlatformType>("");
  const [monnifyOption, setMonnifyOption] = useState<"card" | "transfer" | "">("");
  const [profileIndex, setProfileIndex] = useState<number>(-1);
  const [orderInstruction, setOrderInstruction] = useState<string | undefined>(undefined);
  const [isMonnifyError, setIsMonnifyError] = useState(false);
  const [bankCode, setBankCode] = useState<string>("");

  const { showModal, setShowModal } = useModal();
  const { isSentCardDetails, cardDetailsSent, orderId: monnifyOrderId, ...monnifyData } = useMonnify(bankCode);

  const { isPaystackPaymentError, isPaystackPaymentSuccess, verifyPayStackPayment, orderId: payStackOrderId } = useVerifyPayStackPayment(payStackReference, deliveryProfiles);
  const { isLoadedStatus, isTransactionSuccessful, isCardPaymentError, isBankTransferError, isPaymentError, isMonnifyInitializationError } = monnifyData;

  const isInitialProfileRef = useRef(false);
  const isPayStackErrorDisplayedRef = useRef(false);

  useEffect(() => {
    const isError = isCardPaymentError || isBankTransferError || isPaymentError || isMonnifyInitializationError;
    if (isError) {
      setIsMonnifyError(true);
    }
  }, [isCardPaymentError, isBankTransferError, isPaymentError, isMonnifyInitializationError]);

  useEffect(() => {
    if (payStackReference && deliveryProfiles.length) {
      verifyPayStackPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payStackReference, deliveryProfiles.length]);

  useEffect(() => {
    if (deliveryProfiles.length && !isInitialProfileRef.current) {
      setProfileIndex(0);
      isInitialProfileRef.current = true;
    }
  }, [deliveryProfiles, deliveryProfiles.length]);

  if ((isSentCardDetails && cardDetailsSent) || (isLoadedStatus && isTransactionSuccessful) || isPaystackPaymentSuccess) {
    const orderId = payStackOrderId || monnifyOrderId;
    const data = { checkoutId: orderId };
    navigate(`/checkout/successful/${orderId}`, { state: data, replace: true });
  }

  if (loadingDeliveryProfile) {
    return (
      <PageWrapper pageId="checkout">
        <div className="align-self-stretch w-100 bg-white">
          <CheckoutHeader />
          <div className="pt-4 px-4">
            <SkeletonPageLoader count={2} />
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (isPaystackPaymentError && !isPayStackErrorDisplayedRef.current) {
    setShowModal(true);
  }

  const displayedPayStackError = isPaystackPaymentError && !isPayStackErrorDisplayedRef.current;

  const styles: CSSProperties = payOption === "" ? { display: "flex", justifyContent: "end" } : { display: "flex", justifyContent: "center", alignItems: "center" };

  return (
    <checkoutContext.Provider value={{ ...monnifyData, monnifyOption, setMonnifyOption, setShowModal, profileIndex, setProfileIndex, setOrderInstruction, orderInstruction, bankCode, setBankCode, setIsMonnifyError }} key={location.pathname}>
      <>
        <CheckoutHeader />
        <PageWrapper pageId="checkout">
          <div className="d-flex gap-3 w-100 py-5 px-4">
            <section className="d-flex flex-column gap-3 flex-grow-1" id="payment_option">
              <DeliveryOption />
              <CheckoutPaymentOption payOption={payOption}>
                <CheckoutPaymentOptions setPayOption={setPayOption} />
              </CheckoutPaymentOption>
            </section>
            <section>
              <OrderDetails />
            </section>
          </div>
        </PageWrapper>
      </>
      {showModal && (
        <Modal styles={styles}>
          {payOption === "monnify" && <MonnifyDialog isMonnifyError={isMonnifyError} setIsMonnifyError={setIsMonnifyError} />}
          {!displayedPayStackError && payOption === "" && <AddressDialog />}
          {/* {!displayedPayStackError && payOption === "" && <Sidebar/>} */}
          {payOption === "payStack" && <PayStackDialog />}
          {displayedPayStackError && (
            <div onClick={() => (isPayStackErrorDisplayedRef.current = true)}>
              <CheckoutError />
            </div>
          )}
        </Modal>
      )}
    </checkoutContext.Provider>
  );
};

export default Checkout;
