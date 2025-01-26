import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import Brand from "../Brand";
import PaymentOption from "./PaymentOption";
import UserBankInfo from "./UserBankInfo";
import Loader from "../Loader";
import PaymentTitle from "./PaymentTitle";

import { appContext } from "../AppContext";
import { MonnifyProps } from "../../types";
import { payOptions } from "../../data";
import { initializePayment } from "../../helperFunctions/dataFetchFunctions";

const Monnify = () => {
  const appStates = useContext(appContext);
  const {
    cartItemsTotalPrice,
    loginData: { email },
  } = appStates;

  const [payOption, setPayOption] = useState<"card" | "transfer" | "">("");

  const _payOptions = payOptions.map((_payOption, index) => {
    return <PaymentOption key={index} payOption={_payOption} setPayOption={setPayOption} />;
  });

  const { data, isLoading } = useQuery({
    queryFn: () => initializePayment(email),
    queryKey: ["initialize_payment"],
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  const transactionRef: string = data?.data?.transactionReference;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="monnify">
      <div className="border-bottom px-3 py-2 d-flex flex-column">
        <Brand styles={{ width: "100px", alignSelf: "center" }} />
        <button className="align-self-end">
          <Icon icon="mdi:cancel-box" />
        </button>
      </div>
      <div className="px-3 py-2 d-flex justify-content-between border-bottom">
        <p className="font-italic">{transactionRef}</p>
        <p className="fw-bold">&#8358;{cartItemsTotalPrice * 1500}</p>
      </div>
      {payOption === "" && <p className="text-white bg-dark text-center py-2">SELECT PAYMENT METHOD</p>}
      {payOption === "transfer" && <PaymentTitle title="TRANSFER" setPayOption={setPayOption} />}
      {payOption === "card" && <PaymentTitle title="Card" setPayOption={setPayOption} />}
      <div className="pt-3 pb-5 px-3">
        {payOption === "" && <ul className="d-flex flex-column gap-3 m-0 p-0 m-0">{_payOptions}</ul>}
        {payOption === "transfer" && <UserBankInfo transactionRef={transactionRef} />}
      </div>
    </div>
  );
};

export default Monnify;
