import React, { useState, useRef, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import LoginOnModal from "../loginOnModal/LoginOnModal";
import Alert from "../alert/Alert";
import Modal from "../modal/Modal";

import { AppContextProp, productType, cartType, userDataType, addedItemType, updatedItemType, AppContextType, isInitialRenderType, wishlistType, deliveryDataType } from "../../types";
import { getProducts, getCartItems, validateAccessToken, updateTokens, addItemsToCart, updateCartItems, getWishlist, logoutUser, modifyProfile } from "../../helperFunctions/dataFetchFunctions";
import { getLocalCartItems, emptyLocalCart } from "../../helperFunctions/utilityFunctions";
import { useModal } from "../../customHooks/useModal";

const clientId: string = process.env.REACT_APP_RSA_Public_Key!;

// 10 minutes
const tokenRefreshTime = 65 * 1000 * 60;

export const appContext = React.createContext({} as AppContextType);

const AppContext = ({ children }: AppContextProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isOldSession, setIsOldSession] = useState(false);
  const [cart, setCart] = useState<cartType[]>([]);
  const [wishList, setWishList] = useState<wishlistType[]>([]);
  const [loginData, setLoginData] = useState<userDataType>({
    id: "",
    phoneNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    state: "",
    city: "",
  });

  const [deliveryProfile, setDeliveryProfile] = useState<deliveryDataType>({
    streetAddress: "",
    city: "",
    lastName: "",
    firstName: "",
    additionalInformation: undefined,
    directions: undefined,
    phoneNumber: "",
    state: "",
    lGA: "",
  });

  const [products, setProducts] = useState<productType[]>([]);
  const [shouldDisplayAlert, setShouldDisplayAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const setInitialRender = (comp: string, value: boolean) => {
    isInitialRenderRef.current = {
      ...isInitialRenderRef.current,
      [comp]: value,
    };
  };

  const { data: productData, isSuccess: productsFetched } = useQuery({ queryKey: ["products"], queryFn: getProducts, staleTime: 3 * 60 * 1000 });

  const { isSuccess: tokenValidated, data: userData } = useQuery({
    queryKey: ["validate_token"],
    queryFn: validateAccessToken,
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: updateItems, isSuccess: itemsUpdated } = useMutation({
    mutationFn: updateCartItems,
  });

  const { mutate: addItems, isSuccess: itemsAdded } = useMutation({
    mutationFn: addItemsToCart,
  });

  const {
    data: cartData,
    isSuccess: cartFetched,
    isError: cartFetchError,
    dataUpdatedAt: cartUpdateTime,
  } = useQuery({
    queryKey: ["cart"],
    enabled: () => (isLoggedIn ? true : false),
    queryFn: async () => {
      return await getCartItems(loginData.email);
    },
    refetchInterval: () => (isLoggedIn ? 4000 : false),
  });

  const { data: wishlistData, dataUpdatedAt: wishlistDateTime } = useQuery({
    queryFn: async () => {
      return await getWishlist(loginData.email);
    },
    queryKey: ["wishlist"],
    enabled: () => (isLoggedIn ? true : false),
    refetchInterval: () => (isLoggedIn ? 4000 : false),
  });

  const { mutate: mutateTokensRefresh, isError: refreshFailed } = useMutation({
    mutationFn: () => updateTokens(loginData.id),
  });

  const { mutate: logoutMutate, isSuccess: isLoggedOut } = useMutation({
    mutationFn: logoutUser,
  });

  const {
    mutate: profileMutate,
    data: modifiedUserData,
    isPending: modifyingProfile,
    isSuccess: profileModified,
  } = useMutation({
    mutationFn: modifyProfile,
  });

  if (tokenValidated && !isLoggedIn) {
    setIsLoggedIn(true);
    setLoginData(userData.data);
    setIsOldSession(true);
  }

  if (productsFetched && !products.length) {
    setProducts(productData.data);
  }

  if (isLoggedOut && isLoggedIn) {
    setIsLoggedIn(false);
    setShouldDisplayAlert(true);
    navigate("/");
  }

  // These keep hold of items that are added newly
  // and those that already exists in the DB and
  // needed to be updated
  const updatedItemsRef = useRef<updatedItemType[]>([]);
  const addedItemsRef = useRef<addedItemType[]>([]);

  const prevCartUpdateRef = useRef(cartUpdateTime);
  const prevCartRef = useRef(cart);
  const isInitialRenderRef = useRef<isInitialRenderType>({
    home: true,
  });
  const prevWishlistUpdateTimeRef = useRef(wishlistDateTime);

  const modifyingProfileRef = useRef(false);

  const handLogout = () => {
    logoutMutate();
  };

  useEffect(() => {
    const localCartItems = getLocalCartItems();
    const shouldDeleteCart =
      (updatedItemsRef.current.length && addedItemsRef.current.length && itemsAdded && itemsUpdated) ||
      (updatedItemsRef.current.length && !addedItemsRef.current.length && !itemsAdded && itemsUpdated) ||
      (!updatedItemsRef.current.length && addedItemsRef.current.length && itemsAdded && !itemsUpdated);
    if (shouldDeleteCart && localCartItems.length) {
      emptyLocalCart();
      updatedItemsRef.current = [];
      addedItemsRef.current = [];
    }
  }, [itemsAdded, itemsUpdated]);

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
    const isNewFetch = prevCartUpdateRef.current !== cartUpdateTime;
    if (isNewFetch) {
      var fetchedData = cartData!.data as cartType[];
      setCart([...fetchedData]);
      prevCartUpdateRef.current = cartUpdateTime;
    }
  }, [cartData, cartUpdateTime]);

  useEffect(() => {
    const isNewFetch = prevWishlistUpdateTimeRef.current !== wishlistDateTime;
    if (isNewFetch) {
      const fetchedData = wishlistData!.data as wishlistType[];
      setWishList([...fetchedData]);
      prevWishlistUpdateTimeRef.current = wishlistDateTime;
    }
  }, [wishlistDateTime, wishlistData]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (!isLoggedIn && !cartFetched) {
        var cartItems = getLocalCartItems();
        if (cartItems.length) {
          setCart([...cartItems]);
        }
      }
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [cartFetched, isLoggedIn]);

  useEffect(() => {
    if (cart !== prevCartRef.current) {
      prevCartRef.current = cart;
    }
  }, [cart]);

  useEffect(() => {
    const myTimeInterval = setInterval(() => {
      if (isLoggedIn) {
        mutateTokensRefresh();
      }
    }, tokenRefreshTime);
    return () => clearInterval(myTimeInterval);
  }, [isLoggedIn, mutateTokensRefresh]);

  useEffect(() => {
    if (isLoggedIn && refreshFailed) {
      setIsLoggedIn(false);
      navigate("/account/login");
    }
  }, [isLoggedIn, navigate, refreshFailed]);

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

  useEffect(() => {
    if (cartFetched && updatedItemsRef.current.length && !itemsAdded) {
      updateItems(updatedItemsRef.current);
    }
  }, [cartFetched, itemsAdded, updateItems]);

  useEffect(() => {
    if (cartFetched && addedItemsRef.current.length && !itemsUpdated) {
      addItems(addedItemsRef.current);
    }
  }, [addItems, cartFetched, itemsUpdated]);

  useEffect(() => {
    if (modifyingProfile) {
      modifyingProfileRef.current = true;
    }
  }, [modifyingProfile]);

  useEffect(() => {
    const isUpdated = modifyingProfileRef.current === true && profileModified === true;
    if (isUpdated) {
      modifyingProfileRef.current = false;
      const _data = modifiedUserData?.data;
      console.log(_data, "data");
      setLoginData((prevData) => ({ ...prevData, ..._data }));
    }
  }, [modifiedUserData, profileModified]);

  const { setShowModal, showModal } = useModal();

  return (
    <appContext.Provider
      value={{
        deliveryProfile,
        setDeliveryProfile,
        modifyingProfile,
        profileMutate,
        wishList,
        setShowModal,
        isLoggedIn,
        setIsLoggedIn,
        products,
        cart,
        cartItemsCount,
        setCart,
        loginData,
        setLoginData,
        isOldSession,
        setIsOldSession,
        isInitialRender: isInitialRenderRef.current,
        setInitialRender,
        handLogout,
        cartItemsTotalPrice,
      }}
    >
      {children}
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "end" }}>
          <LoginOnModal />
        </Modal>
      )}
      {shouldDisplayAlert && <Alert alertMessage="You have successfully logged out" setIsDisplayed={setShouldDisplayAlert} styles={{ backgroundColor: `var(--light_Green)` }} />}
    </appContext.Provider>
  );
};

export default AppContext;
