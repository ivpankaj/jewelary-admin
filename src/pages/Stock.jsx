import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/solid';

const StockPage = () => {
  const [products, setProducts] = useState([]);
 
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState('in'); // Track active button
  const navigate = useNavigate();

  // Fetch products based on the default status when component mounts
  useEffect(() => {
    fetchProducts(activeStatus); // Fetch "in" stock products by default
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchProducts = async (status) => {
    try {
      const response = await axios.get(`user/admin/check-stock?status=${status}`);
      setProducts(response.data.data);
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.response.data.message || 'Error fetching products');
      setProducts([]); // Clear products on error
    }
    setActiveStatus(status); // Set the active status
  };


  
  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-6 flex items-center bg-blue-600 text-white py-2 px-5 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => navigate('/dashboard')}
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-4">Product Stock Status</h1>

      <div className="relative mb-4">
        <div className="flex space-x-2">
          <button 
            className={`text-gray-800 px-4 py-2 rounded transition duration-300 ease-in-out ${activeStatus === 'in' ? 'border-b-2 border-blue-500 text-blue-500' : 'border border-green-500 text-green-500'}`} 
            onClick={() => fetchProducts('in')}
          >
            In Stock
          </button>
          <button 
            className={`text-gray-800 px-4 py-2 rounded transition duration-300 ease-in-out ${activeStatus === 'out' ? 'border-b-2 border-blue-500 text-blue-500' : 'border border-red-500 text-red-500'}`} 
            onClick={() => fetchProducts('out')}
          >
            Out of Stock
          </button>
          <button 
            className={`text-gray-800 px-4 py-2 rounded transition duration-300 ease-in-out ${activeStatus === 'near' ? 'border-b-2 border-blue-500 text-blue-500' : 'border border-purple-500 text-purple-500'}`} 
            onClick={() => fetchProducts('near')}
          >
            Near Out of Stock
          </button>
        </div>
        <div 
          className={`absolute h-3 bg-blue-500 transition-all duration-300 ease-in-out`} 
          style={{
            width: '0%', // Adjusted to cover the active button entirely
            left: `${activeStatus === 'in' ? '0%' : activeStatus === 'out' ? '0%' : '0%'}`, // Adjust left position according to button index
            bottom: '0'
          }}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div>
  <h2 className="text-xl font-semibold mb-4">Products:</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <div key={product._id} className="border rounded-md shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
        {product.images.length > 1 && (
            <div className="mt-2 ml-3">
              <h4 className="font-semibold">Images:</h4>
              <div className="flex">
                {product.images.slice(1).map((image, index) => (
                  <img key={index} src={image} alt={`${product.title} ${index}`} className="h-16 w-16 object-cover mr-2 rounded" />
                ))}
              </div>
            </div>
          )}
        <div className="p-4">
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</span>
            <span className="text-gray-500 line-through">${product.costPrice.toFixed(2)}</span>
          </div>
          <p className="text-gray-500">Category: {product.category}</p>
          <p className="text-gray-500">Quantity: {product.quantity}</p>
          <p className="text-gray-500">Sold: {product.sold}</p>
          
          
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default StockPage;
