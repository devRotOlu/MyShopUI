import React, { useContext } from "react";
import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Loader from "../Loader";

import { appContext } from "../AppContext";
import { myShopAxios } from "../../api/axios";
import { PayPalProps } from "../../types";

const PayPal = ({ setIsSUccess }: PayPalProps) => {
  const appSates = useContext(appContext);
  const {
    loginData: { id },
  } = appSates;

  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    var orderId = "";
    try {
      const data = await myShopAxios.post(`PayPalCheckout/create_order?customerId=${id}`);
      orderId = data.data as string;
    } catch (error) {
      setIsSUccess(false);
    }
    return orderId;
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    try {
      await myShopAxios.post("PayPalCheckout/capture_order", {
        Id: data.orderID,
        Prefer: "return=minimal",
      });
      setIsSUccess(true);
    } catch (error) {
      setIsSUccess(false);
    }
  };

  return <>{isPending ? <Loader /> : <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} />}</>;
};

export default PayPal;
