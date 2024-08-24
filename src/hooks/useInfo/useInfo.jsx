import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const useInfo = () => {
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  const getCategoryName = (idCategory) => {
    const category = categories.find((category) => category.id === idCategory);
    return category ? category.name : null;
  };

  return {
    categories,
    message,
    getCategoryName,
  };
};
