import React from 'react';
import './Quantity.css';

export const Quantity = ({ quantity, onQuantityChange }) => {
  const handleDecrease = () => {
    onQuantityChange(Math.max(quantity - 1, 0));
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="quantity-input">
      <button onClick={handleDecrease}>-</button>
      <input 
        type="number" 
        value={quantity} 
        onChange={handleChange} 
        min="0"
      />
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};
