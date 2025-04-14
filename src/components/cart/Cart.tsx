import React, { useContext } from "react";

import Navbar from "../navbar/Navbar.tsx";
import CartItem from "../cartItems/CartItem.tsx";
import CartTable from "../cartTable/CartTable.tsx";
import OrderSummary from "./OrderSummary.tsx";
import EmptyCart from "./EmptyCart.tsx";
import PageWrapper from "../PageWrapper.tsx";

import { useUpdateCartItem } from "../../customHooks/useUpdateCartItem.ts";
import { useAddToWhishlist } from "../../customHooks/useAddToWishlist.ts";
import "./style.css";
import { cartContext } from "../context/CartProvider.tsx";

const Cart = () => {
  const { cart, isDeletingCartItem, deleteCartItem } = useContext(cartContext);

  const { isUpdating, updateQuantity } = useUpdateCartItem();
  const { addItemToWishList, isAddingToWishList } = useAddToWhishlist();

  const delete_Item = (cartId: number) => deleteCartItem(cartId);

  const cartItems = cart.map((item, index) => {
    return <CartItem delete_Item={delete_Item} key={index} item={item} updateQuantity={updateQuantity} addToWishlist={addItemToWishList} status={{ beingAddedToWhishlist: isAddingToWishList, beingDeleted: isDeletingCartItem, beingUpdated: isUpdating }} />;
  });

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
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default Cart;
