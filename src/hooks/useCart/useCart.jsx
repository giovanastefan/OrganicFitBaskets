import { useState } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingProductIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const getQuantity = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  return {
    getQuantity,
    updateQuantity,
    addToCart,
  };
};
