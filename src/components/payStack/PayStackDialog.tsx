import React, { useContext, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useQuery } from "@tanstack/react-query";

import Loader from "../Loader";
import CheckoutError from "../checkoutError/CheckoutError";
import DialogHeader from "../dialogHeader/DialogHeader";
import PaymentTitle from "../MonnifyPaymentOptionTitle";

import { checkoutContext } from "../checkout/Checkout";
import "./style.css";
import { userContext } from "../context/UserProvider";
import { initializePayStackPayment } from "../../helperFunctions/dataFetchFunctions";
import { cartContext } from "../context/CartProvider";
import { naira } from "../../data";

const PayStackDialog = () => {
  const { profileIndex, orderInstruction } = useContext(checkoutContext);
  const { cartItemsTotalPrice } = useContext(cartContext);

  const {
    loginData: { email },
  } = useContext(userContext);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["initialize_paystack_payment"],
    queryFn: () => initializePayStackPayment(email),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const authorizationURL = data?.data?.authorizationURL;
  const reference = data?.data?.reference;

  const handlePayment = (authorizationURL: string) => {
    reactLocalStorage.set("profileIndex", String(profileIndex));
    if (orderInstruction) {
      reactLocalStorage.set("orderInstruction", orderInstruction);
    }
    // navigate("/cart/overview", { replace: true });
    window.history.replaceState(null, "", "/cart/overview");
    setTimeout(() => {
      window.location.href = authorizationURL;
    }, 100);
  };

  useEffect(() => {
    reactLocalStorage.remove("orderInstruction");
  }, []);

  return (
    <div className="w-100 h-100  d-flex justify-content-center align-items-center" id="paystack_dialog">
      {isFetching && (
        <div tabIndex={0}>
          <Loader color="white" />
          <button style={{ opacity: 0, position: "absolute" }} tabIndex={0} aria-hidden="true">
            Hidden Focus Trap
          </button>
        </div>
      )}
      {!isFetching && (
        <div id="payment_wrapper" className="bg-white">
          <DialogHeader>
            <div className="d-flex justify-content-between">
              <p className="font-italic flex-grow-1">{reference}</p>
              <p className="fw-bold">
                {naira}
                {Math.ceil(cartItemsTotalPrice).toLocaleString()}
              </p>
            </div>
          </DialogHeader>
          {isError && <CheckoutError />}
          {!isError && (
            <>
              <PaymentTitle title="Complete Payment on PayStack" />
              <div className="px-3 py-4 d-flex flex-column align-items-center" id="#payment_btn_wrapper">
                <button id="paystack_payment_btn" className="text-center w-100" onClick={() => handlePayment(authorizationURL!)}>
                  Pay Now
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PayStackDialog;
