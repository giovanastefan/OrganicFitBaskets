import './ProductCard.css'

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="card-container" onClick={() => onClick(product)}>
      <img src={product.imageUrl} alt={product.name} />

      <div className="card-details">
        <div className="card-title">
          <p className="name">{product.name}</p>
          <p className="price">${product.promotionalPrice}</p>
        </div>
        
        <button className="card-cart-button">
          <img src="../../../images/Cart.png" alt="Cart" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
