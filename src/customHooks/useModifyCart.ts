import { useContext, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { addItemToCart, updateCartItem } from "../helperFunctions/dataFetchFunctions";
import { cartType, useModifyCartDataType } from "../types";
import { getLocalCartItems, setLocalCart } from "../helperFunctions/utilityFunctions";
import { userContext } from "../components/context/UserProvider";
import { cartContext } from "../components/context/CartProvider";

export const useModifyCart = (): useModifyCartDataType => {
  const {
    isLoggedIn,
    loginData: { id },
    products,
  } = useContext(userContext);
  const { cart } = useContext(cartContext);

  const newCartItemRef = useRef<cartType>(null);

  const { mutate: addCartMutate, isError: addCartError, isSuccess: addCartSuccess, isPending: isAddingToCart } = useMutation({ mutationFn: addItemToCart });

  const { mutate: updateCartMutate, isError: updateCartError, isSuccess: updateCartSuccess, isPending: isUpdatingCart } = useMutation({ mutationFn: updateCartItem });

  const handleAddToCart = (productIndex: number) => {
    const newproduct = products[productIndex];

    const cartItem = cart.find(({ product: { id } }) => newproduct.id === id);

    // If the item already exists in the cart, add one
    // to it previous quantity
    const newCartItem: cartType = {
      cartQuantity: cartItem ? cartItem.cartQuantity + 1 : 1,
      product: newproduct,
    };

    if (!isLoggedIn) {
      var cartItems = getLocalCartItems();
      // If the item already exists, remove its previous
      // instance
      if (cartItem) {
        cartItems = cartItems.filter(({ product: { id } }) => id !== cartItem.product.id);
      }

      if (!Object.keys(cartItems).length) {
        setLocalCart([newCartItem]);
      } else {
        setLocalCart([...cartItems, newCartItem]);
      }
    } else {
      if (cartItem) {
        // If item already exists, we increase the
        // quantity by one on the server.
        updateCartMutate({
          customerId: id,
          productId: newproduct.id,
          quantity: cartItem.cartQuantity + 1,
          id: cartItem.id!,
        });
      } else {
        addCartMutate({
          customerId: id,
          productId: newproduct.id,
          quantity: 1,
        });
      }
      newCartItemRef.current = newCartItem;
    }
  };
  return { handleAddToCart, addedItem: `${newCartItemRef.current ? newCartItemRef.current.product.name : ""}`, addCartError, addCartSuccess, isAddingToCart, updateCartError, updateCartSuccess, isUpdatingCart };
};
