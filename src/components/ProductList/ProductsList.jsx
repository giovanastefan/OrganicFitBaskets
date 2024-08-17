import React, { useState } from "react";
import ProductCard from "../productCard/ProductCard";

import "./ProductsList.css";
import ProductCardModal from "../productCardModal/ProductCardModal";

export const ProductsList = ({products}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}
      <ProductCardModal
        show={showModal}
        product={selectedProduct}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};
