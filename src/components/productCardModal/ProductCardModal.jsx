import { useState } from "react";
import { useCart } from "../../context/Cart/Cart";
import { useInfo } from "../../hooks/useInfo/useInfo";
import { Button } from "../button/Button";
import { Quantity } from "../quantity/Quantity";
import "./ProductCardModal.css";

const ProductCardModal = ({ product, show, onClose }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const { getCategoryName } = useInfo();
  const { addToCart } = useCart();

  if (!show || !product) {
    return null;
  }

  const {
    id,
    name,
    description,
    imageUrl,
    originalPrice,
    promotionalPrice,
    category,
  } = product;

  const handleCloseModal = () => {
    setProductQuantity(1);
    onClose()
  }

  const handleQuantityChange = (quantity) => {
    setProductQuantity(quantity);
  };

  const handleAddToCart = () => {
    addToCart({ productId: id, quantity: productQuantity });
    handleCloseModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={handleCloseModal}>
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
            <Button className="cart-button" onClick={handleAddToCart}>
              Add to Cart <img src="images/Rectangle.png" alt="Rectangle" />
            </Button>
          </div>
          <div className="divider"></div>
          <span>Category: </span>
          <span id="modal-category" className="product-category">
            {getCategoryName(category)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardModal;
