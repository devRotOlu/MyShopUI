import React from "react";

import PaymentOption from "./PaymentOption";
import PaymentTitle from "./PaymentTitle";

import { payOptions } from "../../../data";

const PaymentOptions = () => {
  const _payOptions = payOptions.map((_payOption, index) => {
    return <PaymentOption key={index} payOption={_payOption} />;
  });
  return (
    <>
      <PaymentTitle title="SELECT PAYMENT METHOD" />
      <div className="pt-3 pb-5 px-3">
        <ul className="d-flex flex-column gap-3 m-0 p-0 m-0">{_payOptions}</ul>
      </div>
    </>
  );
};

export default PaymentOptions;
