import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {ChevronLeftIcon} from '@heroicons/react/solid';

function ViewProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const [detail, setDetail] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const navigate = useNavigate();
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`user/product/get/${id}`);
        setDetail(response.data);
      } catch (error) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!detail) {
    return <div>No product details found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-4 flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => navigate('/dashboard')}
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-4">{detail.title}</h1>
      <img
        src={detail.images[0]} // Display the first image
        alt={detail.title}
        className="h-64 w-full object-cover mb-4"
      />
      <p className="text-gray-700">{detail.description}</p>
      <p className="text-green-600 font-bold mt-2">${detail.price}</p>
      <p className="mt-2">Category: {detail.category}</p>
      <p className="mt-2">Quantity Available: {detail.quantity}</p>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Ratings:</h3>
        {detail.ratings && detail.ratings.length > 0 ? (
          detail.ratings.map((rating) => (
            <div key={rating._id} className="border-b py-2">
              <p className="text-yellow-500">★ {rating.totalrating}</p>
              <p>{rating.comment}</p>
              <p>By: {rating.postedby.username}</p>
            </div>
          ))
        ) : (
          <p>No ratings available</p>
        )}
      </div>
    </div>
  );
}

export default ViewProduct;
