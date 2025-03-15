import React, { useContext, useState } from "react";
import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Loader from "../Loader";
import CheckoutError from "./CheckoutError";

import { appContext } from "../context/AppContext";
import { myShopAxios } from "../../api/axios";
import { checkoutContext } from "./Checkout";

const PayPal = () => {
  const {
    loginData: { id },
  } = useContext(appContext);

  const { setPayPalIsSuccess, setPayPalOrderID, payPalIsSuccess } = useContext(checkoutContext);

  const [{ isPending }] = usePayPalScriptReducer();

  const [isFetched, setIsFetched] = useState(false);

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    var orderId = "";
    setIsFetched(true);
    try {
      const data = await myShopAxios.post(`PayPalCheckout/create_order?customerId=${id}`);
      orderId = data.data as string;
      setPayPalOrderID(orderId);
    } catch (error) {
      setPayPalIsSuccess(false);
    }
    return orderId;
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    try {
      await myShopAxios.post("PayPalCheckout/capture_order", {
        Id: data.orderID,
        Prefer: "return=minimal",
      });
      setPayPalIsSuccess(true);
    } catch (error) {
      setPayPalIsSuccess(false);
    }
  };

  if (!isPending) {
    return <Loader />;
  }

  if (!payPalIsSuccess && isFetched) {
    return <CheckoutError />;
  }

  return <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} />;
};

export default PayPal;
