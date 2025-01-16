import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const clientId: string = process.env.REACT_APP_PayPal_ClientID!;

const PayPal = () => {
  return (
    <PayPalScriptProvider options={{ clientId }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPal;
