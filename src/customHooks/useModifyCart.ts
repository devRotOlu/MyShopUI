import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { addItemToCart, updateCartItem } from "../helperFunctions/dataFetchFunctions";
import { cartType, productType, useModifyCartDataType } from "../types";
import { getLocalCartItems, setLocalCart } from "../helperFunctions/utilityFunctions";
import { userContext } from "../components/context/UserProvider";

export const useModifyCart = (setLocalStorageIndex: Dispatch<SetStateAction<number>>, cart: cartType[]): useModifyCartDataType => {
  const [localAdditionIndex, setLocalAdditionIndex] = useState(0);
  const {
    isLoggedIn,
    loginData: { id },
  } = useContext(userContext);

  const newCartItemRef = useRef<cartType | null>(null);

  const { mutate: addCartMutate, isError: addCartItemError, isSuccess: isAddedCartItem, isPending: isAddingCartItem } = useMutation({ mutationFn: addItemToCart });

  const { mutate: updateCartMutate, isError: updateCartItemError, isSuccess: isUpatedCartItem, isPending: isUpdatingCartItem } = useMutation({ mutationFn: updateCartItem });

  const handleAddCartItem = (product: productType, value: number) => {
    let cartItem = cart.find(({ product: { id } }) => product.id === id);

    // If the item already exists in the cart, add one
    // to it previous quantity
    const newCartItem: cartType = {
      cartQuantity: cartItem ? cartItem.cartQuantity + value : value,
      product,
    };

    if (!isLoggedIn) {
      var cartItems = getLocalCartItems();
      // If the item already exists, remove its previous
      // instance
      if (cartItem) {
        cartItems = cartItems.map((item, _) => {
          const { product: _product } = item;
          if (_product.id === product.id) {
            return newCartItem;
          }
          return item;
        });
      }

      if (!Object.keys(cartItems).length) {
        setLocalCart([newCartItem]);
      } else if (cartItem) {
        setLocalCart([...cartItems]);
      } else {
        setLocalCart([...cartItems, newCartItem]);
      }
      setLocalStorageIndex((prevIndex) => ++prevIndex);
      setLocalAdditionIndex((prevIndex) => ++prevIndex);
    } else {
      if (cartItem) {
        // If item already exists, we increase the
        // quantity by one on the server.
        updateCartMutate({
          customerId: id,
          productId: product.id,
          quantity: cartItem.cartQuantity + value,
          id: cartItem.id!,
        });
      } else {
        addCartMutate({
          customerId: id,
          productId: product.id,
          quantity: value,
        });
      }
    }
    newCartItemRef.current = newCartItem;
  };
  return { handleAddCartItem, addedItem: `${newCartItemRef.current ? newCartItemRef.current.product.name : ""}`, addCartItemError, isAddedCartItem, isAddingCartItem, updateCartItemError, isUpatedCartItem, isUpdatingCartItem, isLocalModification: localAdditionIndex };
};
