import React, { useContext, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "../Loader";
import CheckoutError from "../checkoutError/CheckoutError";
import DialogHeader from "../dialogHeader/DialogHeader";
import PaymentTitle from "../../monnify/PaymentTitle";

import { checkoutContext } from "../checkout/Checkout";
import "./style.css";
import { userContext } from "../context/UserProvider";
import { initializePayStackPayment } from "../../helperFunctions/dataFetchFunctions";

const PayStackDialog = () => {
  const { profileIndex, orderInstruction } = useContext(checkoutContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-100 h-10 d-flex justify-content-center align-items-center" id="paystack_dialog">
      {isFetching && <Loader color="white" />}
      {!isFetching && (
        <div id="payment_wrapper" className="bg-white">
          <DialogHeader>
            <p className="font-italic">{reference}</p>
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
