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

export const encryptData = async (data: unknown, publicKeyPem: string): Promise<encryptDataType> => {
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

export const splitString = (value: string, separator: string, divisor: number): string => {
  let valueArray = value.split("");
  valueArray = valueArray.map((str, index) => {
    const position = index + 1;
    if (position !== 1 && position % divisor === 1) {
      return separator + str;
    }
    return str;
  });
  return valueArray.join("");
};

type splitUrlDataType = {
  prefix: string;
  suffix: string;
  separator: string;
};

/**
 *
 * @param url - Original Cloudinary image URL
 * @returns - object containing splitted url parts or null
 */
export const splitUrl = (url: string): splitUrlDataType | null => {
  const separator = "/upload/";
  try {
    const [prefix, suffix] = url.split(separator);
    return { prefix, suffix, separator };
  } catch (error) {
    return null;
  }
};

/**
 * Generates a transformed Cloudinary URL for Open Graph / social share images
 *
 * @param url - Original Cloudinary image URL
 * @returns Transformed URL (1200x630 padded, white background, optimized)
 */
export const getOgImageUrl = (url: string): string => {
  const data = splitUrl(url);
  if (data) {
    const { prefix, suffix, separator } = data;

    // Insert transformation string
    const transformation = "w_1200,h_630,c_pad,b_white,f_auto,q_auto";

    return `${prefix}${separator}${transformation}/${suffix}`;
  } else {
    // if URL doesn't match expected pattern, return original
    return url;
  }
};

export const generateProductDescription = (description: string, name: string): string => {
  if (description) {
    const trimmed = description.length > 160 ? description.slice(0, 157) + "..." : description;
    return `Buy ${name} – ${trimmed} Order now on MyShop with fast delivery.`;
  }
  return `Buy ${name} at MyShop – great prices, secure checkout, and fast delivery.`;
};

// seoUtils.ts

export const generateCategoryDescription = (categoryName: string): string => {
  return `Shop ${categoryName} at MyShop – discover the best ${categoryName.toLowerCase()} from top brands. Fast delivery and secure checkout.`;
};

export const genBrandDescription = (brand: string): string => {
  return `Discover ${brand} products at MyShop. Shop quality items from ${brand} with great prices and fast delivery`;
};
