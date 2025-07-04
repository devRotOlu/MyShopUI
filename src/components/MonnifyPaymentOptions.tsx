import React from "react";

import MonnifyPaymentOption from "./monnifyPaymentOption/MonnifyPaymentOption";
import MonnifyPaymentOptionTitle from "./MonnifyPaymentOptionTitle";

import { payOptions } from "../data";

const MonnifyPaymentOptions = () => {
  const _payOptions = payOptions.map((_payOption, index) => {
    return <MonnifyPaymentOption key={index} payOption={_payOption} />;
  });
  return (
    <>
      <MonnifyPaymentOptionTitle title="SELECT PAYMENT METHOD" />
      <div className="pt-md-3 pt-4 pb-5 px-3">
        <ul className="d-flex flex-column gap-4 gap-md-3 m-0 p-0 m-0">{_payOptions}</ul>
      </div>
    </>
  );
};

export default MonnifyPaymentOptions;
