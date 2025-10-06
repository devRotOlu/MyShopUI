import React from "react";

import MonnifyPaymentOption from "./monnifyPaymentOption/MonnifyPaymentOption";
import MonnifyPaymentOptionTitle from "./MonnifyPaymentOptionTitle";

import { payOptions } from "../data";
import { monnifyPaymentIconMap } from "../iconMap";

const MonnifyPaymentOptions = () => {
  const _payOptions = payOptions.map((_payOption, index) => {
    const { icon: iconName } = _payOption;
    const icon = monnifyPaymentIconMap[iconName as keyof typeof monnifyPaymentIconMap];
    return <MonnifyPaymentOption key={index} payOption={{ ..._payOption, icon }} />;
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
