import { useState } from "react";
import "./OrderHistory.css";
import { OrderRow } from "./subComponents/OrderRow";

export const OrderHistory = () => {
  const [orders, setOrders] = useState([
    {
        id: 1,
        date: new Date(),
        totalPrice: 294.50,
        qtyProducts: 3,
        status: 'Processing'

    }
  ]);

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
