import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
import Loader from './Loader';
import { motion } from 'framer-motion'; // Import Framer Motion

import {ChevronLeftIcon} from '@heroicons/react/solid';

const Topproduct = () => {
  const [topProducts, setTopProducts] = useState([]); // State for top-rated products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const navigate = useNavigate();

  // Function to fetch top-rated products
  const fetchTopProducts = async () => {
    try {
      const response = await axios.get('/user/product/toprated');
      console.log('API Response:', response);
      setTopProducts(response.data.data || []); // Ensure we set to an empty array if undefined
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || 'Failed to fetch top-rated products'
        );
      } else {
        setError('Failed to fetch top-rated products');
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call the fetch function on component mount
  useEffect(() => {
    fetchTopProducts();
  }, []);

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return <div className="text-red-500 text-lg">{error}</div>;
  }

  console.log('Top Products:', topProducts);

  // Filtered products based on search input
  const filteredProducts = topProducts.filter((product) => {
    const title = product.title ? product.title.toLowerCase() : ''; // Ensure title exists
    const description = product.description ? product.description.toLowerCase() : ''; // Ensure description exists
    return (
      title.includes(searchInput.toLowerCase()) ||
      description.includes(searchInput.toLowerCase())
    );
  });

  // Render the top-rated products
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="mb-4 flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => navigate('/dashboard')}
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center">Top Rated Products</h1>

      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 w-64 border border-gray-300 rounded-lg focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // Update search input state on change
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? ( // Check if filteredProducts is not empty
          filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }} // Initial state
              whileInView={{ scale: 1, opacity: 1 }} // Animate to this state when in view
              exit={{ scale: 0.8, opacity: 0 }} // Exit animation
              transition={{ duration: 0.5 }} // Transition duration
              viewport={{ once: false }} // Reset animation when scrolling
            >
              <img
                src={product.images[0]} // Assuming the first image is the main one
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-2 text-gray-700 font-bold">
                    {product.totalrating.toFixed(1)}
                  </span>
                </div>
                <p className="text-green-600 font-bold mt-2">${product.price}</p>
              </div>
              <div className="px-4 py-2 bg-gray-100">
               <Link to={`/dashboard/viewproduct/${product._id}`}>
  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
    View Product
  </button>
</Link>

              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500">No top-rated products found.</div> // Message if no products are available
        )}
      </div>
    </div>
  );
};

export default Topproduct;
