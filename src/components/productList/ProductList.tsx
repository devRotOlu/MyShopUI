import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../productCard/ProductCard.tsx";
import Alert from "../alert/Alert.tsx";
import ProductCardSkeleton from "../productCard/ProductCardSkeleton.tsx";

import { appContext } from "../context/AppContext.tsx";
import { useModifyCart } from "../../customHooks/useModifyCart.ts";

const ProductList = () => {
  const appStates = useContext(appContext);
  const { products } = appStates;
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);

  const { handleAddToCart, addedItem, addCartError, addCartSuccess, isAddingToCart, updateCartError, updateCartSuccess, isUpdatingCart } = useModifyCart();

  const possibleErrorRef = useRef(false);
  const possibleSuccessRef = useRef(false);

  useEffect(() => {
    if (isAddingToCart || isUpdatingCart) {
      possibleErrorRef.current = true;
      possibleSuccessRef.current = true;
    }
  }, [isAddingToCart, isUpdatingCart]);

  useEffect(() => {
    if ((addCartSuccess || updateCartSuccess) && possibleSuccessRef.current && !(isAddingToCart || isUpdatingCart)) {
      possibleSuccessRef.current = false;
      setIsSuccessAlert(true);
    }
  }, [addCartSuccess, updateCartSuccess, isAddingToCart, isUpdatingCart]);

  useEffect(() => {
    if ((addCartError || updateCartError) && possibleErrorRef.current && !(isAddingToCart || isUpdatingCart)) {
      possibleErrorRef.current = false;
      setIsErrorAlert(true);
    }
  }, [addCartError, isAddingToCart, isUpdatingCart, updateCartError]);

  const _products = products.map(({ id }, index) => {
    return <ProductCard key={id} handleAddToCart={handleAddToCart} index={index} status={{ isAddingToCart, isUpdatingCart }} />;
  });

  return (
    <>
      <div id="product_list" className="w-100 d-flex justify-content-between">
        {!products.length && <ProductCardSkeleton count={4} />}
        {products.length && _products}
      </div>
      {isSuccessAlert && (
        <Alert styles={{ backgroundColor: `var(--light_Green)` }} alertMessage={`${addedItem} has been added to cart`} setIsDisplayed={setIsSuccessAlert}>
          <div id="cart_alert" className="d-flex cart_alert justify-content-between">
            <Link to="/cart/overview">View Cart</Link>
            <Link to="/checkout/complete-order">Proceed to Checkout</Link>
          </div>
        </Alert>
      )}
      {isErrorAlert && <Alert styles={{ backgroundColor: "red" }} alertMessage={`Error occured while adding ${addedItem}`} setIsDisplayed={setIsErrorAlert} />}
    </>
  );
};

export default ProductList;
