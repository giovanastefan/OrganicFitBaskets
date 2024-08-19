import React, { useState, useEffect } from "react";
import "./Home.css";
import { ProductsList } from "../../components/ProductList/ProductsList";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const Home = () => {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(products);
      } catch (error) {
        setMessage("Something is wrong, try refresh page!");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="home-container">
      {message && <p>{message}</p>}
      <ProductsList products={products} />
    </div>
  );
};
