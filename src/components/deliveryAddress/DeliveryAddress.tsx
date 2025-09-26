import React, { useContext, useState, MouseEventHandler } from "react";

import PageWrapper from "../PageWrapper";
import AccountTab from "../dashboard/AccountTab";
import SkeletonPageLoader from "../SkeletonPageLoader";
import ProfileSummary from "../profileSummary/ProfileSummary";
import EditProfile from "../editProfile/EditProfile";
import ProfileWrapper from "./ProfileWrapper";
import AddProfile from "../addProfile/AddProfile";
import Modal from "../modal/Modal";
import ConfirmationDialog from "./ConfirmationDialog";
import AccountBreadCrumb from "../accountBreadCrumb/AccountBreadCrumb";
import SEOEnhanzer from "../../SEOEnhanzer";

import { useGetDeliveryProfile } from "../../customHooks/useGetDeliveryProfile";
import "./style.css";
import { useModal } from "../../customHooks/useModal";
import { deliveryDataType } from "../../types/types";
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

  const handleDeletion: MouseEventHandler<HTMLButtonElement> = () => {
    const profile = deliveryProfiles[profileofInterestIndex];
    const id = Number(profile.id);
    handleProfileDeletion(id, profileofInterestIndex);
    setShowModal(false);
  };

  if (loadingDeliveryProfile) {
    return (
      <PageWrapper pageId="delivery_page">
        <div className="pt-3 px-5 h-100 w-100 bg-white flex-grow-1 ">
          <SkeletonPageLoader count={2} />
        </div>
      </PageWrapper>
    );
  }

  const profileSummaries = Array(deliveryProfiles.length)
    .fill(0)
    .map((_, index) => {
      return <ProfileSummary key={index} setPageIndex={setPageIndex} profileIndex={index} setProfileofInterestIndex={setProfileofInterestIndex} setShowModal={setShowModal} />;
    });

  const handleAddDeliveryProfile = (deliveryProfile: deliveryDataType) => {
    addDeliveryProfile(deliveryProfile);
  };

  return (
    <>
      <SEOEnhanzer title="Delivery Addresses | MyShop Online Shopping" description="View, add, or update your delivery addresses for faster checkout" robots="noindex, nofollow" />
      <PageWrapper pageId="delivery_page">
        <div className="w-100">
          <AccountBreadCrumb currentLinkLabel="Delivery Addresses" />
        </div>
        <div className="d-flex justify-content-center gap-md-4 gap-3 w-100 pb-sm-5 pb-0 px-sm-3 px-0">
          <AccountTab />
          <div className="bg-white rounded" id="page_content">
            {pageIndex === "0" && (
              <div className="pt-3 pb-5">
                <div className="pb-2 border-bottom border-secondary px-3 d-flex flex-column  justify-content-end gap-3">
                  <h3 className="fs-6 d-sm-none d-block">Delivery Addresses</h3>
                  <button style={{ backgroundColor: "var(--lighter_pink)", fontSize: "12px", borderRadius: "3px" }} className="py-2 px-sm-3 px-2 fw-bold text-white align-self-end" onClick={() => setPageIndex("2")}>
                    Add New Address
                  </button>
                </div>
                <div className="mt-3 d-flex flex-column gap-3 ">{profileSummaries}</div>
              </div>
            )}
            {pageIndex === "1" && (
              <ProfileWrapper
                profileHeader={
                  <h2 className="fs-6" style={{ width: "" }}>
                    Edit Delivery <br /> Address
                  </h2>
                }
                setPageIndex={setPageIndex}
                headerText="Edit Delivery Address"
              >
                <EditProfile profileToEditIndex={profileofInterestIndex} updateDeliveryProfile={updateDeliveryProfile} updatingDeliveryProfile={updatingDeliveryProfile} setPageIndex={setPageIndex} />
              </ProfileWrapper>
            )}
            {pageIndex === "2" && (
              <ProfileWrapper
                profileHeader={
                  <h2 className="fs-6">
                    Add Delivery <br />
                    Address
                  </h2>
                }
                setPageIndex={setPageIndex}
                headerText="Add Delivery Address"
              >
                <AddProfile addDeliveryProfile={handleAddDeliveryProfile} addingDeliveryProfile={addingDeliveryProfile} setPageIndex={setPageIndex} />
              </ProfileWrapper>
            )}
          </div>
        </div>
      </PageWrapper>
      {showModal && (
        <Modal setCloseModal={() => setShowModal(false)} styles={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ConfirmationDialog setShowModal={setShowModal} handleDeletion={handleDeletion} />
        </Modal>
      )}
    </>
  );
};

export default DeliveryAddress;
