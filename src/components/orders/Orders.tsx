import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SkeletonPageLoader from "../SkeletonPageLoader";
import AccountTab from "../dashboard/AccountTab";
import PageWrapper from "../PageWrapper";
import Order from "../order/Order";
import OrderList from "../orderList/OrderList";
import OrderHistory from "../orderHistory/OrderHistory";
import Modal from "../modal/Modal";
import ProductReview from "../productReview/ProductReview";
import AccountBreadCrumb from "../accountBreadCrumb/AccountBreadCrumb";

import { getOrders, getProductsReviewed } from "../../helperFunctions/dataFetchFunctions";
import { userContext } from "../context/UserProvider";
import { orderType } from "../../types";
import "./style.css";

const Orders = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [orderCosts, setOrderCosts] = useState({});
  const [orderIndex, setOrderIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [reviewId, setReviewId] = useState(0);
  // const [reviewedProducts, setReviewedProducts] = useState<number[]>([]);
  // const [isLoadingReviewedProducts, setIsLoadingReviewedProducts] = useState(false);
  const {
    loginData: { id },
  } = useContext(userContext);
  const {
    isLoading: isLoadingOrders,
    data: _orders,
    isSuccess: getOrderQueryIsSuccess,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(id),
    refetchOnWindowFocus: false,
  });
  const orderId = orders?.[orderIndex]?.id;
  const {
    isLoading: isLoadingReviewedProducts,
    data: productReviewedData,
    isSuccess: getProductReviewQueryIsSuccess,
  } = useQuery({
    queryKey: ["reviewed-products", orderId],
    queryFn: () => {
      return getProductsReviewed(orderId);
    },
    refetchOnWindowFocus: false,
    enabled: !!orderId,
  });
  useEffect(() => {
    if (getOrderQueryIsSuccess) {
      const _data = _orders?.data as orderType[];
      setOrders([..._data]);
    }
  }, [_orders?.data, getOrderQueryIsSuccess]);
  if (isLoadingOrders || isLoadingReviewedProducts) {
    return (
      <PageWrapper pageId="orders">
        <div className="align-self-stretch w-100 pt-3 px-5 bg-white">
          <SkeletonPageLoader count={2} />
        </div>
      </PageWrapper>
    );
  }
  const activeOrders = orders.map((order, index) => {
    return <Order key={index} order={order} setOrderCosts={setOrderCosts} orderIndex={index} orderCosts={orderCosts} setOrderIndex={setOrderIndex} />;
  });

  const displayOrderHistory = orderIndex >= 0;
  const key = `${orderIndex}`;
  const orderCost = orderCosts[key as keyof typeof orderCosts];
  const reviewedProducts = getProductReviewQueryIsSuccess ? productReviewedData.data : [];
  return (
    <>
      <PageWrapper pageId="orders">
        <div className="w-100">
          <AccountBreadCrumb currentLinkLabel="Account Orders" />
        </div>
        <div className="d-flex justify-content-center gap-md-4 gap-3 w-100 pb-sm-5 pb-sm-5 px-md-3 px-sm-2 px-0">
          <AccountTab />
          <div id="page_content">
            {!displayOrderHistory && <OrderList orders={orders}>{activeOrders}</OrderList>}
            {displayOrderHistory && <OrderHistory props={{ order: orders[orderIndex], setOrderIndex, orderCost, setShowModal, setReviewId, reviewedProducts }} />}
          </div>
        </div>
      </PageWrapper>
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ProductReview productId={reviewId} setShowModal={setShowModal} orderId={orders[orderIndex].id} reviewedProducts={reviewedProducts} />
        </Modal>
      )}
    </>
  );
};

export default Orders;
