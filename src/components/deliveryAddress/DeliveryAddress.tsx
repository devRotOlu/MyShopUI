import React, { useContext, useState, MouseEvent } from "react";

import PageWrapper from "../PageWrapper";
import AccountTab from "../dashboard/AccountTab";
import SkeletonPageLoader from "../SkeletonPageLoader";
import ProfileSummary from "./ProfileSummary";
import EditProfile from "./EditProfile";
import ProfileWrapper from "./ProfileWrapper";
import AddProfile from "./AddProfile";
import Modal from "../modal/Modal";
import ConfirmationDialog from "./ConfirmationDialog";
import Alert from "../alert/Alert";

import { useGetDeliveryProfile } from "../../customHooks/useGetDeliveryProfile";
import "./style.css";
import { appContext } from "../context/AppContext";
import { useModal } from "../../customHooks/useModal";
import { useDeleteDeliveryProfile } from "../../customHooks/useDeleteDeliveryProfile";
import { useUpdateDeliveryProfile } from "../../customHooks/useUpdateDeliveryProfile";
import { useAddDeliveryProfile } from "../../customHooks/useAddDeliveryProfile";

const DeliveryAddress = () => {
  const { showModal, setShowModal } = useModal();

  const [pageIndex, setPageIndex] = useState<"0" | "1" | "2">("0");
  const [profileofInterestIndex, setProfileofInterestIndex] = useState(-1);
  const [showAlert, setShowAlert] = useState(false);

  const { deliveryProfiles } = useContext(appContext);

  const { deleteProfile, isDeleted } = useDeleteDeliveryProfile(profileofInterestIndex);
  const { loadingDeliveryProfile } = useGetDeliveryProfile();
  const { updateDeliveryProfile, updatingDeliveryProfile, isUpdated } = useUpdateDeliveryProfile(() => setPageIndex("0"));
  const { addDeliveryProfile, addingDeliveryProfile, isAdded } = useAddDeliveryProfile(() => setPageIndex("0"));

  const alertMessage = isDeleted ? "Address successfully deleted!" : isUpdated ? "Delivery Address updated successfully!" : isAdded ? "New Delivery Address saved successfully!" : "";

  console.log(isUpdated, "updated");
  console.log(alertMessage, "message");

  if ((isAdded || isDeleted || isUpdated) && !showAlert) {
    setShowAlert(true);
  }

  const handleDeletion = (_: MouseEvent<HTMLButtonElement>) => {
    const profile = deliveryProfiles[profileofInterestIndex];
    const id = Number(profile.id);
    deleteProfile(id);
    setShowModal(false);
  };

  if (loadingDeliveryProfile) {
    return (
      <PageWrapper pageId="delivery_page">
        <div className="bg-white">
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

  console.log(showAlert, "show");

  return (
    <>
      <PageWrapper pageId="delivery_page">
        <div className="d-flex justify-content-center gap-3">
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
                <AddProfile addDeliveryProfile={addDeliveryProfile} addingDeliveryProfile={addingDeliveryProfile} />
              </ProfileWrapper>
            )}
          </div>
        </div>
      </PageWrapper>
      {showAlert && <Alert alertMessage={alertMessage} setIsDisplayed={setShowAlert} styles={{ backgroundColor: "green" }} />}
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ConfirmationDialog setShowModal={setShowModal} handleDeletion={handleDeletion} />
        </Modal>
      )}
    </>
  );
};

export default DeliveryAddress;
