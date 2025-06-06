import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AppProvider from "./components/context/AppProvider.tsx";
import UserProvider from "./components/context/UserProvider.tsx";
import AlertProvider from "./components/context/AlertProvider.tsx";
import CartProvider from "./components/context/CartProvider.tsx";
import WishlistProvider from "./components/context/WishlistProvider.tsx";
import DeliveryProfileProvider from "./components/context/DeliveryProfileProvider.tsx";
import Routes from "./components/Routes.tsx";

import "./App.css";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <AlertProvider>
        <UserProvider>
          <DeliveryProfileProvider>
            <WishlistProvider>
              <CartProvider>
                <AppProvider>
                  <Routes />
                </AppProvider>
              </CartProvider>
            </WishlistProvider>
          </DeliveryProfileProvider>
        </UserProvider>
      </AlertProvider>
    </SkeletonTheme>
  );
}

export default App;
