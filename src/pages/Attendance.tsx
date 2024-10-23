import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { SearchIcon, ArrowLeftIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';

interface Offer {
  _id: string;
  title: string;
  discount: number;
  validUntil?: Date;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  offer?: Offer;
  sold: number;
  images: string[];
  totalrating: number;
}

const MostSellingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMostSellingProducts();
  }, []);

  const fetchMostSellingProducts = async () => {
    try {
      const response = await axios.get('user/most-selling', {
        params: { limit: 10 },
      });
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch most selling products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-lg">{error}</div>;
  }

  const filteredProducts = products.filter((product) => {
    const title = product.title.toLowerCase();
    const description = product.description.toLowerCase();
    return title.includes(searchInput.toLowerCase()) || description.includes(searchInput.toLowerCase());
  });

  return (
    <div className="container mx-auto py-8">
      <button
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out flex items-center"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Most Selling Products</h2>

      <div className="flex justify-center mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border border-gray-300 rounded-lg w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }} // Initial state
            whileInView={{ scale: 1, opacity: 1 }} // Animate to this state when in view
            exit={{ scale: 0.8, opacity: 0 }} // Exit animation
            transition={{ duration: 0.5 }} // Transition duration
            viewport={{ once: false }} // Reset animation when scrolling
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4 flex items-center">
              <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
              {product.offer && (
                <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  {product.offer.discount} Rs Off
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center">
              <ShoppingCartIcon className="h-5 w-5 text-gray-500 mr-1" />
              <p className="text-gray-500">Sold: {product.sold}</p>
            </div>
            <div className="mt-2 flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
              <p className="text-yellow-500">Rating: {product.totalrating}</p>
            </div>
            <div className="px-4 py-2 bg-gray-100">
               <Link to={`/dashboard/viewproduct/${product._id}`}>
  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
    View Product
  </button>
</Link>

              </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MostSellingProducts;
