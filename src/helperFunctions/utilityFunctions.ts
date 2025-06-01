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

export const openModal = (modalInstance: string) => {
  const modal = document.getElementById(modalInstance);
  modal!.style.display = "flex";
  document.body.classList.add("modal-open");
};

export const getLocalCartItems = (): cartType[] => reactLocalStorage.getObject("cart", [], true);

export const emptyLocalCart = () => reactLocalStorage.remove("cart");

export const setLocalCart = (cartItems: cartType[]) => reactLocalStorage.setObject("cart", cartItems);

const pemToArrayBuffer = (pem: string) => {
  // Remove PEM header/footer and line breaks
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, "")
    .replace(/-----END PUBLIC KEY-----/, "")
    .replace(/\s/g, "");

  // Convert base64 to binary
  const binaryDer = window.atob(b64);
  const buffer = new Uint8Array(binaryDer.length);
  for (let i = 0; i < binaryDer.length; i++) {
    buffer[i] = binaryDer.charCodeAt(i);
  }

  return buffer.buffer; // Return as ArrayBuffer
};

export const getCryptoKey = async (publicKeyPem: string) => {
  return await window.crypto.subtle.importKey("spki", pemToArrayBuffer(publicKeyPem), { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
};

export function toBase64(bytes: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}
