import { Button } from "../button/Button";
import { Quantity } from "../quantity/Quantity";
import "./ProductCardModal.css";

const ProductCardModal = ({ product, show, onClose }) => {
  if (!show || !product) {
    return null;
  }

  const { name, description, imageUrl, originalPrice, promotionalPrice, category } =
    product;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span class="close-button" onClick={onClose}>&times;</span>
        <img class="product-image" id="modal-img" src={imageUrl} alt={name} />
        <div>
          <h1 id="modal-name" class="product-title">
            {name}
          </h1>
          <del id="modal-promotional-price" class="product-price">
            $ {originalPrice}
          </del>
          <span id="modal-price" class="product-promotional-price">
            $ {promotionalPrice}
          </span>
          <p id="modal-description" class="product-description">
            {description}
          </p>
          <div class="divider"></div>
          <div class="container-add-to-cart">
            <Quantity />
            <Button className="cart-button">
              Add to Cart <img src="images/Rectangle.png" alt="Rectangle" />
            </Button>
          </div>
          <div class="divider"></div>
          <span>Category: </span>
          <span id="modal-category" class="product-category">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardModal;
