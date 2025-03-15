import { useContext, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { addItemToCart, updateCartItem } from "../helperFunctions/dataFetchFunctions";
import { cartType } from "../types";
import { getLocalCartItems, setLocalCart } from "../helperFunctions/utilityFunctions";
import { appContext } from "../components/context/AppContext";

const useAddToCart = () => {
  const {
    isLoggedIn,
    loginData: { id },
    products,
    cart,
    cartItemsCount,
  } = useContext(appContext);

  const prevCountRef = useRef(cartItemsCount);
  const newCartItemRef = useRef<cartType>(null);
  const possibleErrorRef = useRef<boolean>(false);
  const isCartModifiedRef = useRef<boolean>(false);

  const { mutate: addCartMutate, isError: addCartError, isSuccess: addCartSuccess, isPending: isAddingToCart } = useMutation({ mutationFn: addItemToCart });

  const { mutate: updateCartMutate, isError: updateCartError, isSuccess: updateCartSuccess, isPending: isUpdatingCart } = useMutation({ mutationFn: updateCartItem });

  useEffect(() => {
    if (prevCountRef.current !== cartItemsCount && isCartModifiedRef.current) {
      prevCountRef.current = cartItemsCount;
      isCartModifiedRef.current = false;
      setIsSuccessAlert(true);
    }
  }, [cart, cartItemsCount]);

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
    isCartModifiedRef.current = true;
  };
};
