import { Button } from "../button/Button";
import { Quantity } from "../quantity/Quantity";
import "./ProductCardModal.css";
import { useState } from "react";

const ProductCardModal = ({ product, show, onClose }) => {
  const [productQuantity, setProductQuantity] = useState(0);

  if (!show || !product) {
    return null;
  }

  const {
    // id,
    name,
    description,
    imageUrl,
    originalPrice,
    promotionalPrice,
    category,
  } = product;

  const handleQuantityChange = (quantity) => {
    setProductQuantity(quantity);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <img
          className="product-image"
          id="modal-img"
          src={imageUrl}
          alt={name}
        />
        <div>
          <h1 id="modal-name" className="product-title">
            {name}
          </h1>
          <del id="modal-promotional-price" className="product-price">
            $ {originalPrice}
          </del>
          <span id="modal-price" className="product-promotional-price">
            $ {promotionalPrice}
          </span>
          <p id="modal-description" className="product-description">
            {description}
          </p>
          <div className="divider"></div>
          <div className="container-add-to-cart">
            <Quantity
              quantity={productQuantity}
              onQuantityChange={handleQuantityChange}
            />
            <Button className="cart-button">
              Add to Cart <img src="images/Rectangle.png" alt="Rectangle" />
            </Button>
          </div>
          <div className="divider"></div>
          <span>Category: </span>
          <span id="modal-category" className="product-category">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardModal;
