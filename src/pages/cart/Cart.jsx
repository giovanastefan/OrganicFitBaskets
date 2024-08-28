import { useState } from "react";
import { Button } from "../../components/button/Button";
import { Quantity } from "../../components/quantity/Quantity";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Green Capsicum",
      imageUrl:
        "https://cdn.awsli.com.br/600x450/1304/1304130/produto/50538831/0792430fe7.jpg",
      price: 2.99,
      quantity: 10,
    },
    {
      id: 2,
      name: "Red Apple",
      imageUrl:
        "https://acdn.mitiendanube.com/stores/174/441/products/maca-vermelha-italiana-d9cb5f3f39fd29943115122899225013-240-0.jpg",
      price: 3.99,
      quantity: 5,
    },
    {
      id: 3,
      name: "Butter",
      imageUrl:
        "https://conteudo.imguol.com.br/c/entretenimento/16/2018/05/30/manteiga-1527708112983_v2_4x3.jpg",
      price: 10.39,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const total = calculateTotal();

  const renderItems = () => {
    return items.map((item) => (
      <tr key={item.id}>
        <td data-label="Product">
          <img src={item.imageUrl} alt={item.name} />
          {item.name}
        </td>
        <td data-label="Price">${item.price.toFixed(2)}</td>
        <td data-label="Quantity">
          <Quantity
            quantity={item.quantity}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(item.id, newQuantity)
            }
          />
        </td>
        <td data-label="Subtotal">
          ${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h2 className="center">My Shopping Cart</h2>
      <div className="cart-page-container center">
        <div className="cart-details container-border">
          <table className="cart-table">
            <thead className="cart-info">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>{renderItems()}</tbody>
          </table>
          <div className="cart-details-footer">
            <Button onClickButton={() => navigate("/shop")}>Return to shop</Button>
          </div>
        </div>
        <div className="cart-total container-border">
          <h2>Cart Total</h2>
          <div className="total-item">
            <span>Subtotal:</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="total-item">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total-item">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
          <Button onClickButton={() => navigate("/billing-information", { state: { items, total } })}>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
