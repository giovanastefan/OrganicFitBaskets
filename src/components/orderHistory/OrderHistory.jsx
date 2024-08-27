import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./OrderHistory.css";
import { OrderRow } from "./subComponents/OrderRow";
import { useAuth } from "../../context/auth/Auth";

export const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
        if(currentUser) {
          const q = query(collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(fetchedOrders);
        }
    };
    fetchOrders();
  }, [currentUser]);

  const renderOrders = () => {
    if (orders.length > 0) {
      return orders.map((order) => {
        return <OrderRow order={order} key={order.id}/>;
      });
    }

    return (
      <p>
        Parece que você ainda não fez nenhum pedido. Que tal fazer um agora?
      </p>
    );
  };

  return (
    <div className="orders-container">
      <div className="orders-content">
        <div className="orders-title">
          <h2>Recent Order History</h2>
        </div>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderOrders()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
