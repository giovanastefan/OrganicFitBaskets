import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const useInfo = () => {
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesList);
    } catch (error) {
      setMessage("Something is wrong, try refresh page!");
    }
  };

  const fetchProducts = async (itemsId) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const updatedItems = itemsId.map((itemId) => {
        const product = productsList.find((product) => product.id === itemId);
        return {
          ...product,
          quantity: 1,
        };
      });

      setItems(updatedItems);
    } catch (error) {
      setMessage("Something is wrong, try refresh page!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const calculateSubTotal = (item) => {
    return (item.promotionalPrice || item.originalPrice) * item.quantity;
  };

  const calculateTotal = (items) => {
    return items
      .reduce((total, item) => total + item.originalPrice * item.quantity, 0)
      .toFixed(2);
  };

  const getCategoryName = (idCategory) => {
    const category = categories.find((category) => category.id === idCategory);
    return category ? category.name : null;
  };

  return {
    categories,
    message,
    getCategoryName,
    fetchProducts,
    items,
    calculateSubTotal,
    calculateTotal
  };
};
