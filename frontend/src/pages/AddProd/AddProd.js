import React, { useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import './AddProd.css';

function AddProd() {
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    image: null,
    vendorAddress: user.Address,
    price: '',
    quantity: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', user.Email);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('image', product.image);
    formData.append('vendorAddress', product.vendorAddress);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);

    const response = await axios.post('http://localhost:5000/produpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    if (response.status === 200) {
      alert('Product information and image uploaded successfully');
    }
    else {
      alert('Product information and image not uploaded');
    }
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </label>
      <label>
        Product Category:
        <input type="text" name="category" value={product.category} onChange={handleChange} required />
      </label>
      <label>
        Product Image:
        <input type="file" name="image" onChange={handleChange} required />
      </label>
      <label>
        Vendor Address:
        <input type="text" name="vendorAddress" value={user.Address} disabled onChange={handleChange} required />
      </label>
      <label>
        Product Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </label>
      <label>
        Product Quantity:
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddProd;