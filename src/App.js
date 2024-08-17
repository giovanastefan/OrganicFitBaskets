import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from "./components/menu/Menu";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Shop } from "./pages/shop/Shop";
import { Cart } from "./pages/cart/Cart";

import'./firebaseConfig';
import "./App.css";

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
