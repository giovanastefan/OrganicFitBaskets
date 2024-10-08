import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Menu } from "./components/menu/Menu";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Shop } from "./pages/shop/Shop";
import { Cart } from "./pages/cart/Cart";
import { Footer } from "./components/footer/Footer";

import "./firebaseConfig";
import "./App.css";

import { useAuth } from "./context/auth/Auth";
import { CartProvider } from "./context/Cart/Cart";
import { Profile } from "./pages/profile/Profile";
import { CreateProduct } from "./pages/createProduct/CreateProduct";
import { BillingInformation } from "./pages/billingInformation/BillingInformation";
import { AboutUs } from "./pages/aboutUs/AboutUs";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <Router>
      <Menu />
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-product"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/billing-information"
          element={
            <PrivateRoute>
              <BillingInformation />
            </PrivateRoute>
          }
        />
      </Routes>
      </CartProvider>
      <Footer />
    </Router>
  );
}

export default App;
