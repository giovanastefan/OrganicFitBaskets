import React, { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import "./BillingInformation.css";
import { useAuth } from "../../context/auth/Auth";
import { useCart } from "../../context/Cart/Cart"; 
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useInfo } from "../../hooks/useInfo/useInfo";

export const BillingInformation = () => {
  const { currentUser } = useAuth();
  const { cartItems } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [message, setMessage] = useState("");
  const [orderProducts, setOrderProducts] = useState([]);

  const { fetchProducts, items, calculateTotal } = useInfo(); 

  useEffect(() => {
    fetchProducts(cartItems);
    setOrderProducts(items);
  }, [cartItems, setOrderProducts, fetchProducts, items])

  console.log("TESTE", cartItems)

  const handleCheckout = async (e) => {

    setMessage("");

    const orderDetails = {
      userId: currentUser.uid,
      firstName,
      lastName,
      companyName,
      address,
      country,
      state,
      email,
      phone,
      paymentMethod,
      items: cartItems, // Usando os itens do contexto
      total: 10,
      date: new Date().toISOString(),
      status: "Processing",
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderDetails);
      setMessage("Order placed successfully!");
    } catch (err) {
      setMessage("Failed to place the order. Please try again.");
    }
  };

  return (
    <form><div className="checkout-container">
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
            <div className="country-region">
              <div className="form">
                <span>Country/Region</span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-input select-input"
                >
                  <option value="">Select Country/Region</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="state">
              <div className="form">
                <span>State</span>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="form-input select-input"
                  
                >
                  <option value="">Select State</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
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
          <div class="ship-checkbox">
            <input type="checkbox" id="ship-different" />
            <label htmlFor="ship-different">Ship to a different Address</label>
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
          <p>Green Capsicum x5 <span>$70.00</span></p>
          <p>Red Capsicum x1 <span>$14.00</span></p>
        </div>
        <div className="order-totals">
          <p>Subtotal: <span>$84.00</span></p>
          <p>Shipping: <span>Free</span></p>
          <p><strong>Total: <span>$84.00</span></strong></p>
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
        <Button onSubmit={handleCheckout}>
          Place Order
        </Button>
      </div>
    </div>
    </form>
  );
};
