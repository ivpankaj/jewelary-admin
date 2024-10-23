import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/getall`);
        setProducts(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error fetching products';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.productName}</h2>
              <p className="text-gray-600 mb-2"><strong>Category:</strong> {product.productCategory}</p>
              <p className="text-gray-600 mb-2"><strong>Price:</strong> {product.price}</p>
              <p className="text-gray-600 mb-2"><strong>Total Sales:</strong> {product.totalsale}</p>
              <p className="text-gray-600 mb-2"><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
              <p className="text-gray-600 mb-2"><strong>Description:</strong> {product.description}</p>
              <p className="text-gray-600 mb-2"><strong>Availability:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${product.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {product.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
              </p>
              <p className="text-gray-400 text-sm"><strong>Created At:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-400 text-sm"><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
