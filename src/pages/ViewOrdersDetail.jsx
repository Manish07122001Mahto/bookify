import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";

function ViewOrdersDetail() {
  const firebase = useFirebase();
  const params = useParams();
  const bookId = params.bookId;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    firebase.getOrders(bookId).then((orders) => setOrders(orders.docs));
  }, []);
  return (
    <div className="container">
      <h1>Orders</h1>
      {orders?.map((order) => {
        const data = order.data();
        return (
          <div
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            Order By: {data.displayName}
            <h6>QTY: {data.qty}</h6>
            <h6>Email: {data.userEmail}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default ViewOrdersDetail;
