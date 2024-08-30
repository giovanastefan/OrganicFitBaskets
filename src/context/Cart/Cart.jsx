import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = ({ productId, quantity }) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.productId === productId);

      if (itemExists) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { productId, quantity }];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
