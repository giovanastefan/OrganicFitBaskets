import { useState, useEffect } from "react";
import { useCart } from "../../context/Cart/Cart";
import { Button } from "../../components/button/Button";
import { Quantity } from "../../components/quantity/Quantity";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useInfo } from "../../hooks/useInfo/useInfo";

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [items, setItems] = useState([]);
  const {
    fetchProducts,
    items: cartProducts,
    message,
    calculateTotal,
    calculateSubTotal,
  } = useInfo();

  useEffect(() => {
    if (cartProducts.length === 0 && cartItems.length > 0) {
      fetchProducts(cartItems);
    }
    setItems(cartProducts);
  }, [cartItems, fetchProducts, cartProducts]);

  const handleQuantityChange = (id, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const renderItems = () => {
    return items.map((item) => (
      <tr key={item.id}>
        <td data-label="Product">
          <img src={item.imageUrl} alt={item.name} />
          {item.name}
        </td>
        <td data-label="Price">${item.originalPrice.toFixed(2)}</td>
        <td data-label="Quantity">
          <Quantity
            quantity={item.quantity}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(item.id, newQuantity)
            }
          />
        </td>
        <td data-label="Subtotal">{calculateSubTotal(item).toFixed(2)}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <h2 className="center">My Shopping Cart</h2>
      {message && <p className="error-message">{message}</p>}
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
            <Button onClickButton={() => navigate("/shop")}>
              Return to shop
            </Button>
          </div>
        </div>
        <div className="cart-total container-border">
          <h2>Cart Total</h2>
          <div className="total-item">
            <span>Subtotal:</span>
            <span>${calculateTotal(items)}</span>
          </div>
          <div className="total-item">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total-item">
            <span>Total:</span>
            <span>${calculateTotal(items)}</span>
          </div>
          <Button onClickButton={() => navigate("/billing-information")}>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};