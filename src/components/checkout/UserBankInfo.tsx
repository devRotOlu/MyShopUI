import React, { FormEvent, useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";

import TextInput from "../textInput/TextInput";
import FormComp from "../formComp/FormComp";
import FormButton from "../formButton/FormButton";

import { getTranserInfo } from "../../helperFunctions/dataFetchFunctions";
import { userBankInfoProp, bankDetailsType } from "../../types";

const UserBankInfo = ({ transactionRef }: userBankInfoProp) => {
  const [bankCode, setBankCode] = useState<string>("");

  const { data, refetch: sendDetails } = useQuery({
    queryKey: ["bank_transfer"],
    enabled: false,
    queryFn: () => getTranserInfo(bankCode, transactionRef),
  });

  const bankDetails: bankDetailsType = data?.data;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendDetails();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBankCode(event.target.value);
  };

  return (
    <FormComp handleFormSubmit={handleFormSubmit} styles={{ backgroundColor: "inherit" }}>
      <>
        <TextInput value={bankCode} handleChange={handleChange} name="bankCode" type="text">
          <p>Bank Code</p>
        </TextInput>
        <FormButton value="Get Details" styles={{ backgroundColor: "var(--lighter_pink)" }} />
      </>
    </FormComp>
  );
};

export default UserBankInfo;
