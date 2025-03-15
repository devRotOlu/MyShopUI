import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { updateCartItem } from "../helperFunctions/dataFetchFunctions";
import { getLocalCartItems, setLocalCart } from "../helperFunctions/utilityFunctions";
import { cartType, productType } from "../types";
import { useUpdateItemDataType } from "../types";
import { appContext } from "../components/context/AppContext";

export const useUpdateCartItem = (): useUpdateItemDataType => {
  const {
    loginData: { id: customerId },
    isLoggedIn,
  } = useContext(appContext);

  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: updateCartItem,
  });

  const updateQuantity = (value: number, productId: number, product?: productType, cartQuantity?: number, id?: number) => {
    if (isLoggedIn) {
      updateItem({
        customerId,
        productId,
        quantity: cartQuantity! + value,
        id: id!,
      });
    } else {
      let cartItems = getLocalCartItems();
      let index = cartItems.findIndex(({ product: { id } }) => {
        return id === productId;
      });

      if (index) {
        cartItems[index].cartQuantity += value;
        setLocalCart([...cartItems]);
      } else {
        const item: cartType = {
          cartQuantity: cartQuantity! + value,
          product: product!,
        };
        setLocalCart([...cartItems, item]);
      }
    }
  };
  return { isUpdating, updateQuantity };
};
