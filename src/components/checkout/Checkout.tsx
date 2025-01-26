import React, { useState, useRef, useContext, ChangeEvent, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useQuery } from "@tanstack/react-query";

import PayPal from "./PayPal";
import Alert from "../alert/Alert";
import Modal from "../Modal";
import ModalTrigger from "../ModalTrigger";
import Monnify from "./Monnify";

import { appContext } from "../AppContext";
import { initializePayment } from "../../helperFunctions/dataFetchFunctions";
import "./style.css";

const clientId: string = process.env.REACT_APP_PayPal_ClientID!;

const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);
  const [shouldDisplayAlert, setShouldDisplayAlert] = useState(false);
  const [hasInstruction, setHasInstruction] = useState(false);
  const [payOption, setPayOption] = useState<"payPal" | "monnify" | "">("");

  const prevIsSuccessRef = useRef<boolean | undefined>(isSuccess);

  if ((isSuccess || isSuccess === false) && !shouldDisplayAlert && prevIsSuccessRef.current === undefined) {
    setShouldDisplayAlert(true);
    prevIsSuccessRef.current = isSuccess;
  }

  const appstates = useContext(appContext);
  const {
    loginData: { firstName, lastName, shippingAddress, billingAddress, phoneNumber, email },
  } = appstates;

  const handlePayPalOption = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setPayOption("payPal");
    }
  };

  const handleMonnifyOption = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setPayOption("monnify");
    }
  };

  return (
    <main className="min-vh-100" id="checkout">
      <div className="d-flex gap-3 mx-4 my-5">
        <section className="d-flex flex-column gap-3 flex-grow-1" id="payment_option">
          <div className="bg-white">
            <div className="d-flex px-3 py-2 border-bottom justify-content-between">
              <h2>1. Choose Delivery Option</h2>
              <button>Change</button>
            </div>
            <div className="py-4 px-3">
              <p>
                {firstName} {lastName}
              </p>
              <p>{shippingAddress}</p>
              <p>{phoneNumber}</p>
              <label>
                <input type="checkbox" onChange={() => setHasInstruction((preValue) => !preValue)} />
                <span>Check this box if you have any instruction regarding this order</span>
              </label>
              {hasInstruction && <textarea className="w-100" placeholder="(If you want to add a comment e.g delivery instruction)"></textarea>}
            </div>
          </div>
          <div className="bg-white">
            <div className="px-3 py-2 border-bottom">
              <h2>2. Payment Options</h2>
            </div>
            <div className="py-4 px-3 d-flex flex-column">
              <label className="d-flex gap-2 mb-4">
                <input onChange={handlePayPalOption} name="payment_option" type="radio" />
                <span>PayPal</span>
              </label>
              <label className="d-flex gap-2 mb-5">
                <input onChange={handleMonnifyOption} name="payment_option" type="radio" /> <span>Monnify</span>
              </label>
              <ModalTrigger modalInstance="checkout_instance" styles={{ position: "relative" }}>
                <button disabled={payOption === ""} className="py-3 w-100 text-light" id="payment_btn" style={{ backgroundColor: payOption === "" ? "grey" : "var(--deep_pink)" }}>
                  Continue to Payment
                </button>
                {payOption === "" && <div style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255,0.4)" }}></div>}
              </ModalTrigger>
            </div>
          </div>
        </section>
        <section className="" id="order_details">
          <div></div>
        </section>
      </div>
      <Modal styles={{ marginLeft: "auto", marginRight: "auto", alignSelf: "center", borderRadius: "0", padding: "0" }} modalInstance="checkout_instance">
        {payOption === "payPal" && (
          <PayPalScriptProvider options={{ clientId }}>
            <PayPal setIsSUccess={setIsSuccess} />
          </PayPalScriptProvider>
        )}
        {payOption === "monnify" && <Monnify />}
      </Modal>

      {shouldDisplayAlert && isSuccess && <Alert alertMessage="Ordered placement successful" styles={{ backgroundColor: `var(--light_Green)` }} setIsDisplayed={setShouldDisplayAlert} />}
      {shouldDisplayAlert && !isSuccess && <Alert alertMessage="Ordered placement failed" styles={{ backgroundColor: "red" }} setIsDisplayed={setShouldDisplayAlert} />}
    </main>
  );
};

export default Checkout;
