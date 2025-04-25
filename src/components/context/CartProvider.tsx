import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Alert from "../alert/Alert";

import { addedItemType, cartContextType, cartType, ProvidersProp, updatedItemType } from "../../types";
import { userContext } from "./UserProvider";
import { emptyLocalCart, getLocalCartItems } from "../../helperFunctions/utilityFunctions";
import { alertContext } from "./AlertProvider";
import { useGetCartItems } from "../../customHooks/useGetCartItems";
import { useUpdateCartItems } from "../../customHooks/useUpdateCartItems";
import { useAddCartItems } from "../../customHooks/useAddCartItems";
import { useDeleteCartItem } from "../../customHooks/useDeleteCartItem";
import { useModifyCart } from "../../customHooks/useModifyCart";
import "./style.css";

export const cartContext = React.createContext({} as cartContextType);

const CartProvider = ({ children }: ProvidersProp) => {
  const [localStorageIndex, setLocalStorageIndex] = useState(1);
  const [cart, setCart] = useState<cartType[]>([]);

  const { loginData, isLoggedIn } = useContext(userContext);
  const { handleAlert } = useContext(alertContext);

  // to separate cartItems in the localstorage
  // into those that already exits in the database
  // and just needs updating and those that are to be
  // newly added.
  const updatedItemsRef = useRef<updatedItemType[]>([]);
  const addedItemsRef = useRef<addedItemType[]>([]);

  const { cartFetched, cartData } = useGetCartItems(setCart);
  const { itemsUpdated } = useUpdateCartItems(updatedItemsRef.current);
  const { cartItemsAdded } = useAddCartItems(addedItemsRef.current);
  const { deleteCartItem, cartItemDeleted, isDeletingCartItem, isLocalDelete } = useDeleteCartItem(setLocalStorageIndex);
  const { handleAddCartItem, isUpdatingCartItem, isUpatedCartItem, isAddedCartItem, isAddingCartItem, addedItem, isLocalModification, addCartItemError, updateCartItemError } = useModifyCart(setLocalStorageIndex, cart);

  const prevCartRef = useRef(cart);

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

  // set cart items that are added to local storage
  // as items of "state" cart.
  useEffect(() => {
    var cartItems = getLocalCartItems();
    if (!isLoggedIn && cartItems.length && localStorageIndex) {
      setCart([...cartItems]);
    }
  }, [isLoggedIn, localStorageIndex]);

  useEffect(() => {
    if (cart !== prevCartRef.current) {
      prevCartRef.current = cart;
    }
  }, [cart]);

  // separates items in the local cart i.e.,
  // local storage into those that are to be
  // added newly into cart and those that
  // their quantity in the cart are to be
  // updated.
  useEffect(() => {
    const localCartItems = getLocalCartItems();
    if (localCartItems.length && cartFetched) {
      var cart_data = cartData?.data as cartType[];
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
            updatedItemsRef.current.push({
              customerId: loginData.id,
              productId,
              quantity: quantity + cartQuantity,
              id: id!,
            });
            isUpdate = true;
            break;
          }
        }

        if (!isUpdate) {
          addedItemsRef.current.push({
            customerId: loginData.id,
            productId: localProductId,
            quantity,
          });
        }
      }
    }
  }, [cartData?.data, cartFetched, loginData.id]);

  // empties the local storage of cart items stored
  // after updating the database.
  useEffect(() => {
    const localCartItems = getLocalCartItems();
    const shouldDeleteCart =
      (updatedItemsRef.current.length && addedItemsRef.current.length && cartItemsAdded && itemsUpdated) ||
      (updatedItemsRef.current.length && !addedItemsRef.current.length && !cartItemsAdded && itemsUpdated) ||
      (!updatedItemsRef.current.length && addedItemsRef.current.length && cartItemsAdded && !itemsUpdated);
    if (shouldDeleteCart && localCartItems.length) {
      emptyLocalCart();
      updatedItemsRef.current = [];
      addedItemsRef.current = [];
    }
  }, [cartItemsAdded, itemsUpdated]);

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
          <div id="cart_alert" className="d-flex cart_alert justify-content-between">
            <Link className="" to="/cart/overview">
              View Cart
            </Link>
            <Link to="/checkout/complete-order">Proceed to Checkout</Link>
          </div>
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
