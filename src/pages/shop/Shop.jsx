import { useState, useEffect } from "react";
import { Select } from "../../components/select/Select";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Shop.css";
import { ProductsList } from "../../components/ProductList/ProductsList";

export const Shop = () => {
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const handlePriceOrderChange = (event) => {
    setSelectedPriceOrder(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        let products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
  }, [selectedPriceOrder]);

  return (
    <div className="shop-container">
      {message && <p>{message}</p>}
      <Select
        id="price"
        label="Price"
        placeholder="Order by Price"
        value={selectedPriceOrder}
        onChange={handlePriceOrderChange}
        options={[
          { value: "low", label: "Low to high" },
          { value: "high", label: "High to low" },
        ]}
      />
      <ProductsList products={products} />
    </div>
  );
};
