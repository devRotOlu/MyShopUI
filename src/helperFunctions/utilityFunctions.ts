import { reactLocalStorage } from "reactjs-localstorage";

import { cartType, encryptDataType } from "../types/types";

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

const getCryptoKey = async (publicKeyPemPem: string) => {
  return await window.crypto.subtle.importKey("spki", pemToArrayBuffer(publicKeyPemPem), { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
};

export function toBase64(bytes: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

export const encryptData = async (data: any, publicKeyPem: any): Promise<encryptDataType> => {
  const publicKey = await getCryptoKey(publicKeyPem);
  // 2. Generate AES key and IV
  const aesKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const aesIV = crypto.getRandomValues(new Uint8Array(12));

  // 3. Encrypt the payload using AES
  const encoder = new TextEncoder();
  const encryptedBody = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: aesIV,
    },
    aesKey,
    encoder.encode(JSON.stringify(data))
  );
  // 4. Export AES key as raw for encryption
  const rawKey = await crypto.subtle.exportKey("raw", aesKey);

  // 5. Encrypt AES key and IV using RSA public key
  const encryptedKey = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, rawKey);

  const encryptedIV = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, aesIV);

  return { encryptedBody, encryptedIV, encryptedKey };
};

export const truncateName = (name: string, possibleLength: number = 100) => (name.length > 30 ? name.substring(0, possibleLength) + "..." : name);
