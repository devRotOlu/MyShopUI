import { useEffect } from "react";

import { addedItemType, cartType, updatedItemType, processLocalCartItemsParamType } from "../types";
import { emptyLocalCart, getLocalCartItems } from "../helperFunctions/utilityFunctions";

export const useProcessLocalCartItems = (paremeters: processLocalCartItemsParamType) => {
  const {
    params: { isLoggedIn, localStorageIndex, setCart, customerId, cartFetched, cartData, cartItemsAdded, itemsUpdated, setLocalAddedItems, setLocalUpdatedItems, localAddedItems, localUpdatedItems },
  } = paremeters;

  // set cart items that are added to local storage
  // as items of "state" cart.
  useEffect(() => {
    var cartItems = getLocalCartItems();
    if (!isLoggedIn && localStorageIndex) {
      setCart([...cartItems]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, localStorageIndex]);

  // separates items in the local cart i.e.,
  // local storage into those that are to be
  // added newly into cart and those that
  // their quantity in the cart are to be
  // updated.
  useEffect(() => {
    const localCartItems = getLocalCartItems();
    if (localCartItems.length && cartFetched) {
      const addedItems: addedItemType[] = [];
      const updatedItems: updatedItemType[] = [];
      var cart_data = cartData as cartType[];
      for (let i = 0; i < localCartItems.length; i++) {
        const {
          cartQuantity: quantity,
          product: { id: localProductId },
        } = localCartItems[i];
        var isUpdate: boolean = false;
        for (let j = 0; j < cart_data.length; j++) {
          const {
            cartQuantity,
            product: { id: productId },
            id,
          } = cart_data[j];
          if (localProductId === productId) {
            updatedItems.push({ customerId, productId, quantity: quantity + cartQuantity, id: id! });
            isUpdate = true;
            break;
          }
        }

        if (!isUpdate) {
          addedItems.push({
            customerId,
            productId: localProductId,
            quantity,
          });
        }
      }
      setLocalAddedItems([...addedItems]);
      setLocalUpdatedItems([...updatedItems]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData, cartFetched, customerId]);

  // empties the local storage of cart items stored
  // after updating the database.
  useEffect(() => {
    const localCartItems = getLocalCartItems();
    const shouldDeleteCart = (localUpdatedItems.length && localAddedItems.length && cartItemsAdded && itemsUpdated) || (localUpdatedItems.length && !localAddedItems.length && !cartItemsAdded && itemsUpdated) || (!localUpdatedItems.length && localAddedItems.length && cartItemsAdded && !itemsUpdated);
    if (shouldDeleteCart && localCartItems.length) {
      emptyLocalCart();
      setLocalAddedItems([]);
      setLocalAddedItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemsAdded, itemsUpdated]);
};
