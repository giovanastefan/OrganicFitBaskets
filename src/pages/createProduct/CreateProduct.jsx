import { useState } from 'react';
import { Input } from '../../components/input/Input';
import './CreateProduct.css';
import { Button } from '../../components/button/Button';
import { db } from '../../firebaseConfig'; // Atualize o caminho se necessário
import { collection, addDoc } from 'firebase/firestore';

export const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: 'Batata Inglesa',
    description: 'Deliciosa batata',
    originalPrice: 4.99,
    promotionalPrice: 3.99,
    category: 'Vegetables',
    imageUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const createProduct = async () => {
    try {
      await addDoc(collection(db, 'products'), {
        name: product.name,
        description: product.description,
        originalPrice: parseFloat(product.originalPrice),
        promotionalPrice: parseFloat(product.promotionalPrice),
        category: product.category,
        imageUrl: product.imageUrl,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="product-container">
      <div className="product-content">
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
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              {/* Adicione mais opções conforme necessário */}
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
