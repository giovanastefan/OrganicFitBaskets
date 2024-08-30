import React, { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { Select } from "../../components/select/Select";
import "./BillingInformation.css";
import { useAuth } from "../../context/auth/Auth";
import { useCart } from "../../context/Cart/Cart";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useInfo } from "../../hooks/useInfo/useInfo";
import { useNavigate } from "react-router-dom";

export const BillingInformation = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { cartItems } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [message, setMessage] = useState("");

  const {
    fetchProducts,
    items,
    calculateTotal,
    states,
    cities,
    fetchCities,
    fetchStates,
  } = useInfo();

  fetchStates();

  useEffect(() => {
    if (state) {
      fetchCities(state);
    }
  }, [state, fetchCities]);

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchProducts(cartItems);
    }
  }, [cartItems, fetchProducts]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setMessage("");

    const orderDetails = {
      userId: currentUser.uid,
      firstName,
      lastName,
      companyName,
      address,
      state,
      city,
      email,
      phone,
      paymentMethod,
      items: cartItems,
      total: calculateTotal(items),
      date: new Date().toISOString(),
      status: "Processing",
    };

    try {
      await addDoc(collection(db, "orders"), orderDetails);
      setMessage("Order placed successfully!");
      navigate("/profile");
    } catch (err) {
      setMessage("Failed to place the order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <div className="checkout-container">
        <div className="billing-section">
          {message && (
            <div className="message">
              <p>{message}</p>
            </div>
          )}
          <h2>Billing Information</h2>
          <div className="billing-content">
            <div className="form-aligned" id="form-names">
              <div className="form" id="first-name">
                <span>First Name</span>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-input"
                  required
                  title="Please enter your first name"
                />
              </div>
              <div className="form" id="last-name">
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form" id="company-name">
                <span>Company Name</span>
                <input
                  type="text"
                  placeholder="Company Name (optional)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form" id="street-address">
              <span>Street Address</span>
              <input
                type="text"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input full-width"
              />
            </div>
            <div className="form-aligned">
              <Select
                id="state"
                label="State"
                placeholder="Select state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                options={states}
              />
              <Select
                id="city"
                label="City"
                placeholder="Select City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={cities}
              />
            </div>
            <div className="form-aligned" id="email-phone">
              <div className="form" id="form-email">
                <span>E-mail</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form" id="form-phone">
                <span>Phone</span>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div className="ship-checkbox">
              <input type="checkbox" id="ship-different" />
              <label htmlFor="ship-different">
                Ship to a different Address
              </label>
            </div>
            <h3>Additional Info</h3>
            <div className="aditional-info">
              <textarea
                placeholder="Notes about your order, e.g. special notes for delivery"
                className="form-input textarea-input"
                rows="5"
              />
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {items.map((item, index) => (
              <p key={index}>
                <img
                  src={item.imageUrl}
                  width="30px"
                  height="30px"
                  alt={item.name}
                />{" "}
                {item.name} x{item.quantity}{" "}
                <span>
                  $
                  {(
                    (item.promotionalPrice || item.originalPrice) *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </p>
            ))}
          </div>
          <div className="order-totals">
            <p className="subtotal">
              Subtotal: <span>${calculateTotal(items)}</span>
            </p>
            <p className="shipping">
              Shipping: <span>Free</span>
            </p>
            <p>
              <strong>
                Total: <span>${calculateTotal(items)}</span>
              </strong>
            </p>
          </div>
          <div className="payment-methods">
            <h3>Payment Method</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Paypal
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="amazon"
                checked={paymentMethod === "amazon"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Amazon Pay
            </label>
          </div>
          <Button type="submit">Place Order</Button>
        </div>
      </div>
    </form>
  );
};
