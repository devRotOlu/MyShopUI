import React, { useContext } from "react";

import PageWrapper from "./PageWrapper";
import AccountTab from "./dashboard/AccountTab";
import SkeletonPageLoader from "./SkeletonPageLoader";
import FormComp from "./formComp/FormComp";
import TextInput from "./textInput/TextInput";
import Loader from "./Loader";
import FormButton from "./formButton/FormButton";

import { useGetDeliveryProfile } from "../customHooks/useGetDeliveryProfile";
import { appContext } from "./context/AppContext";

const DeliveryAddress = () => {
  const { loadingDeliveryProfile } = useGetDeliveryProfile();

  const { deliveryProfile } = useContext(appContext);

  return (
    <PageWrapper pageId="delivery_page">
      <div className="d-flex justify-content-center gap-3">
        <AccountTab />
        <div></div>
      </div>
    </PageWrapper>
  );
};

export default DeliveryAddress;
