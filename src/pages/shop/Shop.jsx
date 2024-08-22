import { useState, useEffect } from "react";
import { Select } from "../../components/select/Select";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ProductsList } from "../../components/ProductList/ProductsList";
import { useInfo } from "../../hooks/useInfo/useInfo";

import "./Shop.css";

export const Shop = () => {
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [selectedCategoryOrder, setSelectedCategoryOrder] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Alface",
      description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.',
      imageUrl:
        "https://cdn.awsli.com.br/600x450/1304/1304130/produto/50538831/0792430fe7.jpg",
      price: 2.99,
      promotionalPrice: 3.99,
      category: "Vegetables",
    },
  ]);

  const { categories } = useInfo();

  const handlePriceOrderChange = (event) => {
    setSelectedPriceOrder(event.target.value);
  };

  const handleCategoryOrderChange = (event) => {
    setSelectedCategoryOrder(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        let products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (selectedCategoryOrder) {
          products = products.filter(
            (product) => product.category === selectedCategoryOrder
          );
        }

        if (selectedPriceOrder === "low") {
          products.sort((a, b) => a.promotionalPrice - b.promotionalPrice);
        } else if (selectedPriceOrder === "high") {
          products.sort((a, b) => b.promotionalPrice - a.promotionalPrice);
        }

        setProducts(products);
      } catch (error) {
        setMessage("Something went wrong, please try refreshing the page.");
      }
    };

    fetchProducts();
  }, [selectedPriceOrder, selectedCategoryOrder]);

  return (
    <div className="shop-container">
      {message && <p>{message}</p>}
      <div className="categories-container">
        <Select
          id="category"
          placeholder="Order by Category"
          value={selectedCategoryOrder}
          onChange={handleCategoryOrderChange}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
        <Select
          id="price"
          placeholder="Order by Price"
          value={selectedPriceOrder}
          onChange={handlePriceOrderChange}
          options={[
            { value: "low", label: "Low to high" },
            { value: "high", label: "High to low" },
          ]}
        />
      </div>
      <ProductsList products={products} />
    </div>
  );
};
