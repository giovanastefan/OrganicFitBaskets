import { useState, useEffect } from "react";
import { Input } from "../../components/input/Input";
import "./CreateProduct.css";
import { Button } from "../../components/button/Button";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const CreateProduct = () => {
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    originalPrice: null,
    promotionalPrice: null,
    category: "",
    imageUrl: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const createProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        description: product.description,
        originalPrice: parseFloat(product.originalPrice),
        promotionalPrice: parseFloat(product.promotionalPrice),
        category: product.category,
        imageUrl: product.imageUrl,
      });

      setMessage("Product created with sucess!");
      setProduct({
        name: '',
        description: '',
        originalPrice: '',
        promotionalPrice: '',
        category: '',
        imageUrl: '',
      });
    } catch (e) {
      setMessage("Something is wrong, try again!");
    }
  };

  return (
    <div className="product-container">
      <div className="product-content">
        {message && <p>{message}</p>}
        <h1>Create a new product</h1>
        <div className="input-content">
          <Input
            label="Name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
          <Input
            label="Description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
          <div className="price-container">
            <Input
              label="Original Price"
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleInputChange}
            />
            <Input
              label="Promotional Price"
              type="number"
              name="promotionalPrice"
              value={product.promotionalPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Image URL"
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleInputChange}
          />
          <Button onClickButton={createProduct}>Create Product</Button>
        </div>
      </div>
    </div>
  );
};
