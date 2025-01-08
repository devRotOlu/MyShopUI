import { reactLocalStorage } from "reactjs-localstorage";

import { cartType } from "../types";

export const appendModalWrapperToBody = (wrapperId: string) => {
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal");
  modalWrapper.id = wrapperId;
  document.body.appendChild(modalWrapper);
  return modalWrapper;
};

export const closeModal = (modalInstance: string) => {
  const modal = document.getElementById(modalInstance);
  modal!.style.display = "none";
  document.body.classList.remove("modal-open");
};

export const openModal = (modalInstance) => {
  const modal = document.getElementById(modalInstance);
  modal!.style.display = "flex";
  document.body.classList.add("modal-open");
};

export const getLocalCartItems = () => reactLocalStorage.getObject("cart", [], true);

export const emptyLocalCart = () => reactLocalStorage.remove("cart");

export const setLocalCart = (cartItems: cartType[]) => reactLocalStorage.setObject("cart", cartItems);
