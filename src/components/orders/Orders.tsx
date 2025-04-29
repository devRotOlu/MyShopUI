import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SkeletonPageLoader from "../SkeletonPageLoader";
import AccountTab from "../dashboard/AccountTab";
import PageWrapper from "../PageWrapper";
import Order from "../order/Order";
import OrderList from "../orderList/OrderList";
import OrderDetails from "../orderDetails/OrderDetails";
import Modal from "../modal/Modal";
import ProductReview from "../productReview/ProductReview";

import { getOrders } from "../../helperFunctions/dataFetchFunctions";
import { userContext } from "../context/UserProvider";
import { orderType } from "../../types";

const Orders = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [orderCosts, setOrderCosts] = useState({});
  const [detailsIndex, setDetailsIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [reviewId, setReviewId] = useState(0);
  const {
    loginData: { id },
  } = useContext(userContext);
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isSuccess) {
      const _data = data?.data as orderType[];
      setOrders([..._data]);
    }
  }, [data?.data, isSuccess]);
  if (isLoading) {
    return (
      <PageWrapper pageId="orders">
        <div className="align-self-stretch w-100 pt-3 px-5 bg-white">
          <SkeletonPageLoader count={2} />
        </div>
      </PageWrapper>
    );
  }
  const activeOrders = orders.map((order, index) => {
    return <Order key={index} order={order} setOrderCosts={setOrderCosts} orderIndex={index} orderCosts={orderCosts} setDetailsIndex={setDetailsIndex} />;
  });

  const displayOrderDetails = detailsIndex >= 0;
  const key = `${detailsIndex}`;
  const orderCost = orderCosts[key as keyof typeof orderCosts];
  return (
    <>
      <PageWrapper pageId="orders">
        <div className="d-flex justify-content-center gap-4 py-5 w-100">
          <AccountTab />
          <div className="bg-white w-50 rounded px-3">
            {!displayOrderDetails && <OrderList orders={orders}>{activeOrders}</OrderList>}
            {displayOrderDetails && <OrderDetails order={orders[detailsIndex]} setDetailsIndex={setDetailsIndex} orderCost={orderCost} setShowModal={setShowModal} setReviewId={setReviewId} />}
          </div>
        </div>
      </PageWrapper>
      {showModal && (
        <Modal styles={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ProductReview productId={reviewId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default Orders;
