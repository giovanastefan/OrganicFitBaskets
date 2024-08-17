import './Quantity.css'

export const Quantity = () => {
  return (
    <div class="quantity-input">
      <button>-</button>
      <input type="text" value="5" readonly />
      <button>+</button>
    </div>
  );
};
