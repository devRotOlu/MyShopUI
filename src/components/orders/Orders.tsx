import React, { useContext, useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import SkeletonPageLoader from "../SkeletonPageLoader";
import AccountTab from "../dashboard/AccountTab";
import PageWrapper from "../PageWrapper";
import Order from "../order/Order";
import OrderList from "../orderList/OrderList";
import OrderHistory from "../orderHistory/OrderHistory";
import Modal from "../modal/Modal";
import ProductReview from "../productReview/ProductReview";
import AccountBreadCrumb from "../accountBreadCrumb/AccountBreadCrumb";
import SEOEnhanzer from "../../SEOEnhanzer";

import { getOrders, getUserReviews } from "../../helperFunctions/dataFetchFunctions";
import { userContext } from "../context/UserProvider";
import { orderType, userReviewType } from "../../types/types";
import "./style.css";

const Orders = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [orderCosts, setOrderCosts] = useState({});
  const [orderIndex, setOrderIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [reviewId, setReviewId] = useState(0);

  const {
    loginData: { id },
  } = useContext(userContext);

  const results = useQueries({
    queries: [
      {
        queryKey: ["orders"],
        queryFn: async () => await getOrders(id),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["user-reviews"],
        queryFn: () => {
          return getUserReviews(id);
        },
        refetchOnWindowFocus: false,
      },
    ],
  });

  const [orderQuery, userReviewsQuery] = results;

  useEffect(() => {
    if (orderQuery.isSuccess) {
      const _data = orderQuery.data?.data as orderType[];
      setOrders([..._data]);
    }
  }, [orderQuery.data?.data, orderQuery.isSuccess]);

  if (results.some((query) => query.isLoading)) {
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
  const userReviews: userReviewType[] = userReviewsQuery.data?.data ?? [];
  return (
    <>
      <SEOEnhanzer title="Account Orders | MyShop Online Shopping" description="View your past orders and track current purchases" robots="noindex, nofollow" />
      <PageWrapper pageId="orders">
        <div className="w-100">
          <AccountBreadCrumb currentLinkLabel="Account Orders" />
        </div>
        <div className="d-flex justify-content-center gap-md-4 gap-3 w-100 pb-sm-5 pb-sm-5 px-md-3 px-sm-2 px-0">
          <AccountTab />
          <div id="page_content" className="bg-white">
            {!displayOrderHistory && <OrderList orders={orders}>{activeOrders}</OrderList>}
            {displayOrderHistory && <OrderHistory props={{ order: orders[orderIndex], setOrderIndex, orderCost, setShowModal, setReviewId, userReviews }} />}
          </div>
        </div>
      </PageWrapper>
      {showModal && (
        <Modal setCloseModal={() => setShowModal(false)} styles={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ProductReview productId={reviewId} setShowModal={setShowModal} userReviews={userReviews} />
        </Modal>
      )}
    </>
  );
};

export default Orders;
