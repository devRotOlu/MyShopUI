import React, { useContext, useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import Navbar from "../navbar/Navbar.tsx";
import CartItem from "../cartItems/CartItem.tsx";
import CartTable from "../cartTable/CartTable.tsx";
import Alert from "../alert/Alert.tsx";
import OrderSummary from "./OrderSummary.tsx";
import EmptyCart from "./EmptyCart.tsx";
import PageWrapper from "../PageWrapper.tsx";

import { deleteCartItem } from "../../helperFunctions/dataFetchFunctions.ts";
import { appContext } from "../context/AppContext.tsx";
import { useUpdateCartItem } from "../../customHooks/useUpdateCartItem.ts";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist.tsx";
import "./style.css";

const Cart = () => {
  const appstates = useContext(appContext);
  const { cart } = appstates;

  const [shouldDisplayAlert, setShouldDisplayAlert] = useState<boolean>(false);
  const isPossibleDeletionRef = useRef<boolean>(true);

  const { isUpdating, updateQuantity } = useUpdateCartItem();
  const { addItemToWishList, isAddingToWishList } = useAddToWhishlist();

  const {
    mutate: deleteItem,
    isPending: isDeleting,
    isSuccess: itemDeleted,
  } = useMutation({
    mutationFn: deleteCartItem,
  });

  if (itemDeleted && isPossibleDeletionRef.current) {
    isPossibleDeletionRef.current = false;
    setShouldDisplayAlert(true);
  }

  const delete_Item = (cartId: number) => deleteItem(cartId);

  const cartItems = cart.map((item, index) => {
    return <CartItem delete_Item={delete_Item} key={index} item={item} updateQuantity={updateQuantity} addToWishlist={addItemToWishList} status={{ beingAddedToWhishlist: isAddingToWishList, beingDeleted: isDeleting, beingUpdated: isUpdating }} />;
  });

  useEffect(() => {
    if (isPossibleDeletionRef.current === false) {
      isPossibleDeletionRef.current = true;
    }
  }, [isDeleting]);

  const isEmptyCart = cart.length === 0;

  return (
    <>
      <Navbar />
      <PageWrapper pageId="cart">
        {isEmptyCart && <EmptyCart />}
        {!isEmptyCart && (
          <>
            <div className="d-flex gap-5 px-3 w-100">
              <div className="flex-grow-1 bg-white">
                <CartTable>{cartItems}</CartTable>
              </div>
              <OrderSummary />
            </div>
            {shouldDisplayAlert && <Alert alertMessage="Product successfully removed from your Cart" styles={{ backgroundColor: `var(--light_Green)` }} setIsDisplayed={setShouldDisplayAlert} />}
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default Cart;
