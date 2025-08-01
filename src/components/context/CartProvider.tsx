import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Alert from "../alert/Alert";
import AlertLinks from "../alertLinks/AlertLinks";

import { addedItemType, cartContextType, cartType, ProvidersProp, updatedItemType } from "../../types";
import { userContext } from "./UserProvider";
import { alertContext } from "./AlertProvider";
import { useGetCartItems } from "../../customHooks/useGetCartItems";
import { useUpdateCartItems } from "../../customHooks/useUpdateCartItems";
import { useAddCartItems } from "../../customHooks/useAddCartItems";
import { useDeleteCartItem } from "../../customHooks/useDeleteCartItem";
import { useModifyCart } from "../../customHooks/useModifyCart";
import { useMoveToWishlist } from "../../customHooks/useMoveToWishlist";
import { useProcessLocalCartItems } from "../../customHooks/useProcessLocalCartItems";
import { getLocalCartItems } from "../../helperFunctions/utilityFunctions";

export const cartContext = React.createContext({} as cartContextType);

const CartProvider = ({ children }: ProvidersProp) => {
  const [localStorageIndex, setLocalStorageIndex] = useState(1);
  const [cart, setCart] = useState<cartType[]>([]);

  const isFetchingLocalCart = getLocalCartItems().length > 0 && cart.length === 0;

  // to separate cartItems in the localstorage
  // into those that already exits in the database
  // and just needs updating and those that are to be
  // newly added.
  const [localAddedItems, setLocalAddedItems] = useState<addedItemType[]>([]);
  const [localUpdatedItems, setLocalUpdatedItems] = useState<updatedItemType[]>([]);

  const { loginData, isLoggedIn, isLoggedOut } = useContext(userContext);
  const { handleAlert } = useContext(alertContext);

  const { cartFetched, cartData, isFetchingCart, getCartQueryFinished } = useGetCartItems(setCart);
  const { itemsUpdated } = useUpdateCartItems(localUpdatedItems);
  const { cartItemsAdded } = useAddCartItems(localAddedItems);
  const { deleteCartItem, cartItemDeleted, isDeletingCartItem, isLocalDelete } = useDeleteCartItem(setLocalStorageIndex);
  const { handleAddCartItem, isUpdatingCartItem, isUpatedCartItem, isAddedCartItem, isAddingCartItem, addedItem, isLocalModification, addCartItemError, updateCartItemError } = useModifyCart(setLocalStorageIndex, cart);
  const { moveItemToWishlist, isMovingToWishlist, isMovedToWishlist, isItemExistErrorIndex } = useMoveToWishlist();
  useProcessLocalCartItems({ params: { isLoggedIn, localStorageIndex, setCart, customerId: loginData.id, cartFetched, cartData, cartItemsAdded, itemsUpdated, setLocalAddedItems, setLocalUpdatedItems, localAddedItems, localUpdatedItems } });

  const prevCartRef = useRef(cart);

  useEffect(() => {
    if (isLoggedOut) {
      setCart([]);
    }
  }, [isLoggedOut]);

  const { count: cartItemsCount, totalPrice: cartItemsTotalPrice } = useMemo(() => {
    var count = 0;
    var totalPrice = 0;
    if (isLoggedIn || cart !== prevCartRef.current) {
      for (let index = 0; index < cart.length; index++) {
        const {
          cartQuantity,
          product: { unitPrice },
        } = cart[index];
        count += cartQuantity;
        totalPrice += cartQuantity * unitPrice;
      }
    }
    return {
      count,
      totalPrice,
    };
  }, [isLoggedIn, cart]);

  useEffect(() => {
    if (cart !== prevCartRef.current) {
      prevCartRef.current = cart;
    }
  }, [cart]);

  useEffect(() => {
    if (isItemExistErrorIndex || isMovedToWishlist) {
      let alertDialog: React.JSX.Element = <></>;
      if (isItemExistErrorIndex) {
        alertDialog = <Alert alertTitle="Cart Error" alertMessage="Unable to add duplicate item, this item was added already." styles={{ backgroundColor: `var(--light_red)` }} />;
      } else {
        alertDialog = <Alert alertMessage="Product successfully moved to Saved Items" styles={{ backgroundColor: `var(--light_Green)` }} />;
      }
      handleAlert({ showAlert: true, alertDialog });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isItemExistErrorIndex, isMovedToWishlist]);

  useEffect(() => {
    if (cartItemDeleted || isLocalDelete) {
      const alertDialog = <Alert alertMessage="Product successfully removed from your Cart" styles={{ backgroundColor: `var(--light_Green)` }} />;
      handleAlert({ showAlert: true, alertDialog });
    }
  }, [cartItemDeleted, handleAlert, isLocalDelete]);

  useEffect(() => {
    if (isAddedCartItem || isUpatedCartItem || isLocalModification) {
      const alertDialog = (
        <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertMessage={`${addedItem} has been added to cart`}>
          <AlertLinks>
            <Link to="/cart/overview">View Cart</Link>
            <Link to="/checkout/complete-order">Proceed to Checkout</Link>
          </AlertLinks>
        </Alert>
      );
      handleAlert({ showAlert: true, alertDialog });
    }
  }, [addedItem, handleAlert, isAddedCartItem, isLocalModification, isUpatedCartItem]);

  useEffect(() => {
    if (addCartItemError || updateCartItemError) {
      const alertDialog = <Alert styles={{ backgroundColor: "red" }} alertMessage={`Error occured while adding ${addedItem}`} />;
      handleAlert({ showAlert: true, alertDialog });
    }
  }, [addCartItemError, addedItem, handleAlert, updateCartItemError]);

  return (
    <cartContext.Provider
      value={{
        isFetchingLocalCart,
        getCartQueryFinished,
        cartFetched,
        isFetchingCart,
        setLocalStorageIndex,
        moveItemToWishlist,
        isMovingToWishlist,
        isAddedCartItem,
        isAddingCartItem,
        handleAddCartItem,
        isUpdatingCartItem,
        isDeletingCartItem,
        deleteCartItem,
        cart,
        cartItemsCount,
        cartItemsTotalPrice,
        setCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
