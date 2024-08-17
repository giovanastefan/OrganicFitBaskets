import React, { useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";

import "./Home.css";
import ProductCardModal from "../../components/productCardModal/ProductCardModal";
import { ProductsList } from "../../components/ProductList/ProductsList";

export const Home = () => {
  const products = [
    {
      id: 1,
      name: "Alface",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
      imageUrl:
        "https://cdn.awsli.com.br/600x450/1304/1304130/produto/50538831/0792430fe7.jpg",
      price: 2.99,
      promotionalPrice: 3.99,
      category: "Vegetables",
    },
    {
      id: 2,
      name: "Tomate",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
      imageUrl:
        "https://revistacampoenegocios.com.br/wp-content/uploads/2020/05/shutterstock_120016855.jpg",
      price: 3.49,
      promotionalPrice: 3.99,
      category: "Vegetables",
    },
    {
      id: 3,
      name: "Cenoura",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhGaDaTCNDT8w4tApoz-Q-M6H7ls00-7hTw&s",
      price: 4.99,
      promotionalPrice: 3.99,
      category: "Vegetables",
    },
    {
      id: 4,
      name: "Maçã",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
      imageUrl:
        "https://acdn.mitiendanube.com/stores/174/441/products/maca-vermelha-italiana-d9cb5f3f39fd29943115122899225013-240-0.jpg",
      price: 5.49,
      promotionalPrice: 3.99,
      category: "Fruits",
    },
    {
      id: 5,
      name: "Banana",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Banana.png/800px-Banana.png",
      price: 2.99,
      promotionalPrice: 3.99,
      category: "Fruits",
    },
  ];

  return (
    <div className="home-container">
      <ProductsList products={products} />
    </div>
  );
};
