import React from "react";
import { Routes as Routers, Route } from "react-router-dom";

import SignUp from "./signup/SignUp.tsx";
import Home from "./home/Home.tsx";
import ForgotPassword from "./forgotPassword/ForgotPassword.tsx";
import Cart from "./cart/Cart.tsx";
import LoginPage from "./loginPage/LoginPage.tsx";
import Checkout from "./checkout/Checkout.tsx";
import SuccessfulCheckout from "./successfulCheckout/SuccessfulCheckout.tsx";
import AuthenticatedUserResources from "./AuthenticatedUserResources.tsx";
import AnonymousUserResources from "./AnonymousUserResources.tsx";
import MainLayout from "./mainLayout/MainLayout.tsx";
import Orders from "./orders/Orders.tsx";
import Profile from "./profile/Profile.tsx";
import DeliveryAddress from "./deliveryAddress/DeliveryAddress.tsx";
import DeleteAccount from "./deleteAccount/DeleteAccount.tsx";
import SavedItems from "./savedItems/SavedItems.tsx";
import CategoryPageWrapper from "./categoryPageWrapper/CategoryPageWrapper.tsx";
import ProductPageWrapper from "./ProductPageWrapper.tsx";
//import SearchPage from "./searchPage/SearchPage.tsx";
import BrandPageWrapper from "./BrandPageWrapper.tsx";
import ResetPassword from "./resetPassword/ResetPassword.tsx";

const Routes = () => {
  return (
    <Routers>
      <>
        <Route element={<AnonymousUserResources />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productName" element={<ProductPageWrapper />} />
            <Route path="/cart/overview" element={<Cart />} />
            <Route path="/category/:productCategory" element={<CategoryPageWrapper />} />
            <Route path="/brand/:brand" element={<BrandPageWrapper />} />
            {/* <Route path="/search" element={<SearchPage />} /> */}
          </Route>
          <Route path="/account/signup" element={<SignUp />} />
          <Route path="/account/login" element={<LoginPage />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
          <Route path="/account/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<AuthenticatedUserResources />}>
          <Route path="/checkout/complete-order" element={<Checkout />} />
          <Route path="checkout/successful/:checkoutId" element={<SuccessfulCheckout />} />
          <Route element={<MainLayout />}>
            <Route path="/account/favourites" element={<SavedItems />} />
            <Route path="/account/orders" element={<Orders />} />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/delivery-addresses" element={<DeliveryAddress />} />
            <Route path="/account/deleteAccount" element={<DeleteAccount />} />
          </Route>
        </Route>
      </>
    </Routers>
  );
};

export default Routes;
