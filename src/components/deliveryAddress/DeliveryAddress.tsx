import React, { useContext, useState } from "react";

import PageWrapper from "../PageWrapper";
import AccountTab from "../dashboard/AccountTab";
import SkeletonPageLoader from "../SkeletonPageLoader";
import ProfileSummary from "./ProfileSummary";
import EditProfile from "./EditProfile";

import { useGetDeliveryProfile } from "../../customHooks/useGetDeliveryProfile";
import { appContext } from "../context/AppContext";
import "./style.css";

const DeliveryAddress = () => {
  const { deliveryProfile } = useContext(appContext);

  const { loadingDeliveryProfile } = useGetDeliveryProfile();
  const [hideProfileEdit, setHideProfileEdit] = useState(true);

  const { directions, additionalInformation, ..._deliveryProfile } = deliveryProfile;

  const isEmptyProfile = Object.values(_deliveryProfile).some((value) => value.length === 0);

  if (loadingDeliveryProfile) {
    <PageWrapper pageId="delivery_page">
      <div>
        <SkeletonPageLoader count={2} />
      </div>
    </PageWrapper>;
  }

  return (
    <PageWrapper pageId="delivery_page">
      <div className="d-flex justify-content-center gap-3">
        <AccountTab />
        <div className="bg-white w-50 rounded">
          {hideProfileEdit && <ProfileSummary setHideProfileEdit={setHideProfileEdit} isEmptyProfile={isEmptyProfile} />}
          {!hideProfileEdit && <EditProfile setHideProfileEdit={setHideProfileEdit} isEmptyProfile={isEmptyProfile} />}
        </div>
      </div>
    </PageWrapper>
  );
};

export default DeliveryAddress;
