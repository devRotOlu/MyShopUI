import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import ProductCard from "../productCard/ProductCard.tsx";
import Alert from "../alert/Alert.tsx";

import { appContext } from "../AppContext.tsx";
import { cartType } from "../../types.ts";
import { addItemToCart, updateCartItem } from "../../helperFunctions/dataFetchFunctions.ts";
import "./style.css";
import { getLocalCartItems, setLocalCart } from "../../helperFunctions/utilityFunctions.ts";

const ProductList = () => {
  const appStates = useContext(appContext);
  const { isLoggedIn, setCart, products, cart, loginData, cartItemsCount, cartFetchLastItem } = appStates;
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);

  const { mutate: addCartMutate, isError: addCartError, isSuccess: addCartSuccess, isPending: isAddingToCart } = useMutation({ mutationFn: addItemToCart });

  const { mutate: updateCartMutate, isError: updateCartError, isSuccess: updateCartSuccess, isPending: isUpdatingCart } = useMutation({ mutationFn: updateCartItem });

  const prevCountRef = useRef(cartItemsCount);
  const newCartItemRef = useRef<cartType>(null);
  const isCartItemRef = useRef(false);
  const possibleErrorRef = useRef(false);

  var productName = "";

  if (cart.length) {
    const {
      product: { name },
    } = cart[cart.length - 1];
    productName = name;
  }

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
      setCart([...cartItems, newCartItem]);
    } else {
      if (cartItem) {
        // If item already exists, we increase the
        // quantity by one on the server.
        updateCartMutate({
          customerId: loginData.id,
          productId: newproduct.id,
          quantity: cartItem.cartQuantity + 1,
          id: cartItem.id,
        });
        isCartItemRef.current = true;
      } else {
        addCartMutate({
          customerId: loginData.id,
          productId: newproduct.id,
          quantity: 1,
        });
        isCartItemRef.current = false;
      }
      newCartItemRef.current = newCartItem;
    }
  };

  useEffect(() => {
    const shouldDisplayAlert = (cartItemsCount !== prevCountRef.current && !cartFetchLastItem) || (cartItemsCount !== prevCountRef.current && cartFetchLastItem && cartFetchLastItem !== cart[cart.length - 1]);
    if (shouldDisplayAlert) {
      prevCountRef.current = cartItemsCount;
      setIsSuccessAlert(true);
    }
  }, [cart, cartFetchLastItem, cartItemsCount]);

  useEffect(() => {
    if (((isLoggedIn && addCartSuccess) || (isLoggedIn && updateCartSuccess)) && cartItemsCount !== prevCountRef.current) {
      var cartItems = [...cart];
      if (isCartItemRef.current) {
        // If the item already exists, remove its previous
        // instance
        cartItems = cartItems.filter(({ product: { id } }) => id !== newCartItemRef.current.product.id);
      }
      setCart([...cartItems, newCartItemRef.current]);
    }
  }, [addCartSuccess, cart, cartItemsCount, isLoggedIn, setCart, updateCartSuccess]);

  useEffect(() => {
    if (isAddingToCart || isUpdatingCart) {
      possibleErrorRef.current = true;
    }
  }, [isAddingToCart, isUpdatingCart]);

  useEffect(() => {
    if ((addCartError || updateCartError) && possibleErrorRef.current && !(isAddingToCart || isUpdatingCart)) {
      possibleErrorRef.current = false;
      setIsErrorAlert(true);
    }
  }, [addCartError, isAddingToCart, isUpdatingCart, updateCartError]);

  const _products = products.map(({ name, description, unitPrice, quantity, images, id }, index) => {
    const isPending = (isAddingToCart || isUpdatingCart) === true && newCartItemRef.current.product.id === id;
    const diasable = (isAddingToCart || isUpdatingCart) === true && newCartItemRef.current.product.id !== id;
    return (
      <div key={id} className="w-100">
        <ProductCard handleAddToCart={handleAddToCart} name={name} description={description} unitPrice={unitPrice} quantity={quantity} images={images} index={index} isPending={isPending} disabled={diasable} />
      </div>
    );
  });

  return (
    <>
      <div id="product_list">{_products}</div>
      {isSuccessAlert && (
        <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertMessage={`${productName} has been added to cart`} setIsDisplayed={setIsSuccessAlert}>
          <div id="cart_alert" className="d-flex cart_alert justify-content-between">
            <Link to="/cart/overview">View Cart</Link>
            <Link to="/checkout/complete-order">Proceed to Checkout</Link>
          </div>
        </Alert>
      )}
      {isErrorAlert && <Alert styles={{ backgroundColor: "red" }} alertMessage={`Error occured while adding ${newCartItemRef.current.product.name}`} setIsDisplayed={setIsErrorAlert} />}
    </>
  );
};

export default ProductList;
