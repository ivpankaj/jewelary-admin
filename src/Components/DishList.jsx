import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DishList = ({ products, currentImageIndices, handleEdit, handleImageChange, ConfirmDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products by name"
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const currentImageIndex = currentImageIndices[product._id] || 0;

          return (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-6">
              {product.images && product.images.length > 0 && (
                <div className="relative mb-4">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={`Dish ${product.title} Image`}
                    className="w-full h-48 rounded"
                  />
                  <button
                    onClick={() => handleImageChange('left', product._id)}
                    className="absolute text-xl left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-300"
                    style={{ zIndex: 1 }}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => handleImageChange('right', product._id)}
                    className="absolute text-xl right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-300"
                    style={{ zIndex: 1 }}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold">Price: ${product.price}</p>
              <p className="text-gray-800 font-bold">Quantity: {product.quantity}</p>
              <p className="text-gray-800 font-bold">Category: {product.category}</p>

              <div className="flex justify-between mt-4">
                <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline">
                  <FaEdit />
                </button>
                <button onClick={() => ConfirmDelete(product._id)} className="text-red-500 hover:underline">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishList;
