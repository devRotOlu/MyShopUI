import React, { useContext, useState, MouseEvent } from "react";

import PageWrapper from "../PageWrapper";
import AccountTab from "../dashboard/AccountTab";
import SkeletonPageLoader from "../SkeletonPageLoader";
import ProfileSummary from "./ProfileSummary";
import EditProfile from "./EditProfile";
import ProfileWrapper from "./ProfileWrapper";
import AddProfile from "../AddProfile";
import Modal from "../modal/Modal";
import ConfirmationDialog from "./ConfirmationDialog";

import { useGetDeliveryProfile } from "../../customHooks/useGetDeliveryProfile";
import "./style.css";
import { useModal } from "../../customHooks/useModal";
import { deliveryDataType } from "../../types";
import { deliveryContext } from "../context/DeliveryProfileProvider";

const DeliveryAddress = () => {
  const { showModal, setShowModal } = useModal();

  const [pageIndex, setPageIndex] = useState<"0" | "1" | "2">("0");
  const [profileofInterestIndex, setProfileofInterestIndex] = useState(-1);

  const { deliveryProfiles, addDeliveryProfile, addingDeliveryProfile, isAddedAddress, updateDeliveryProfile, updatingDeliveryProfile, isUpdatedAddress, handleProfileDeletion, isDeletedAddress } = useContext(deliveryContext);

  const { loadingDeliveryProfile } = useGetDeliveryProfile();

  if ((isAddedAddress || isUpdatedAddress || isDeletedAddress) && pageIndex !== "0") {
    setPageIndex("0");
  }

  const handleDeletion = (_: MouseEvent<HTMLButtonElement>) => {
    const profile = deliveryProfiles[profileofInterestIndex];
    const id = Number(profile.id);
    handleProfileDeletion(id, profileofInterestIndex);
    setShowModal(false);
  };

  if (loadingDeliveryProfile) {
    return (
      <PageWrapper pageId="delivery_page">
        <div className="align-self-stretch w-100 pt-3 px-5 bg-white">
          <SkeletonPageLoader count={2} />
        </div>
      </PageWrapper>
    );
  }

  const profileSummaries = Array(deliveryProfiles.length)
    .fill(0)
    .map((_, index) => {
      return <ProfileSummary setPageIndex={setPageIndex} profileIndex={index} setProfileofInterestIndex={setProfileofInterestIndex} setShowModal={setShowModal} />;
    });

  const handleAddDeliveryProfile = (deliveryProfile: deliveryDataType) => {
    addDeliveryProfile(deliveryProfile);
  };

  return (
    <>
      <PageWrapper pageId="delivery_page">
        <div className="d-flex justify-content-center gap-3 w-100 py-5">
          <AccountTab />
          <div className="bg-white w-50 rounded">
            {pageIndex === "0" && (
              <div className="pt-3 pb-5">
                <div className="pb-2 border-bottom border-secondary px-3 d-flex justify-content-end">
                  <button style={{ backgroundColor: "var(--lighter_pink)" }} className="py-2 px-3 rounded text-white" onClick={() => setPageIndex("2")}>
                    Add New Address
                  </button>
                </div>
                <div className="mt-3 d-flex flex-column gap-3 ">{profileSummaries}</div>
              </div>
            )}
            {pageIndex === "1" && (
              <ProfileWrapper setPageIndex={setPageIndex}>
                <EditProfile profileToEditIndex={profileofInterestIndex} updateDeliveryProfile={updateDeliveryProfile} updatingDeliveryProfile={updatingDeliveryProfile} />
              </ProfileWrapper>
            )}
            {pageIndex === "2" && (
              <ProfileWrapper setPageIndex={setPageIndex}>
                <div className="px-5 pt-3">
                  <AddProfile addDeliveryProfile={handleAddDeliveryProfile} addingDeliveryProfile={addingDeliveryProfile} />
                </div>
              </ProfileWrapper>
            )}
          </div>
        </div>
      </PageWrapper>
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ConfirmationDialog setShowModal={setShowModal} handleDeletion={handleDeletion} />
        </Modal>
      )}
    </>
  );
};

export default DeliveryAddress;
