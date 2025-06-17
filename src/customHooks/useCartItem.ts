import { useContext, useState } from "react";

import { cartContext } from "../components/context/CartProvider";
import { userContext } from "../components/context/UserProvider";
import { useModifyCart } from "./useModifyCart";
import { cartType, useCartItemDataType } from "../types";

export const useCartItem = (item: cartType): useCartItemDataType => {
  const [validateQuantity, setValidateQuantity] = useState(false);
  const { isDeletingCartItem, deleteCartItem, moveItemToWishlist, isMovingToWishlist, cart, setLocalStorageIndex } = useContext(cartContext);
  const { isLoggedIn } = useContext(userContext);
  const { handleAddCartItem, isUpdatingCartItem } = useModifyCart(setLocalStorageIndex, cart);

  const { cartQuantity, id: cartId, product } = item;
  const { quantity, id: productId } = product;

  const handleQuantityUpdate = (value: number) => {
    if (quantity === cartQuantity && value > 0) {
      if (!validateQuantity) {
        setValidateQuantity(true);
      }
      return;
    }
    handleAddCartItem(product, value);
  };

  const handleAddToWishlist = () => {
    if (isLoggedIn) moveItemToWishlist(cartId!);
  };

  const handleDeleteItem = () => {
    if (isLoggedIn) deleteCartItem(cartId!);
    else deleteCartItem(undefined, productId);
  };

  const beingModified = isMovingToWishlist || isDeletingCartItem || isUpdatingCartItem;

  return {
    handleAddToWishlist,
    handleDeleteItem,
    handleQuantityUpdate,
    beingModified,
    validateQuantity,
    setValidateQuantity,
  };
};
