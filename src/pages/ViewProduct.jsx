import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, TrashIcon, XIcon } from '@heroicons/react/solid';

function ViewProduct() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    img: [],
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/user/product/get/${id}`);
        setDetail(response.data.data);
      } catch (error) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      quantity: product.quantity || '',
      img: [],
    });
    setShowEditModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, img: files });
  };

  const handleImageNavigation = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      const totalImages = detail.images.length;
      if (direction === 'left') {
        return prevIndex === 0 ? totalImages - 1 : prevIndex - 1;
      } else {
        return prevIndex === totalImages - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'img') {
        value.forEach((image) => formDataObj.append('pictures', image));
      } else {
        formDataObj.append(key, value);
      }
    });

    setLoader(true);
    try {
      if (editingProduct) {
        await axios.put(`/user/admin/product/update/${editingProduct._id}`, formDataObj);
        setSuccessMessage('Product updated successfully!');
        setShowEditModal(false);
        setEditingProduct(null);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoader(false);
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      await axios.delete(`/user/admin/delete/${detail._id}`);
      setShowDeleteModal(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoader(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      quantity: '',
      img: [],
    });
  };

  const closeModal = () => {
    setShowEditModal(false);
    resetForm();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  if (!detail) {
    return <div className="flex items-center justify-center h-screen">No product details found</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <button
        className="mb-6 flex items-center bg-blue-600 text-white py-2 px-5 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => navigate('/dashboard')}
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/2">
          <img
            src={detail.images[currentImageIndex]}
            alt={detail.title}
            className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
          />
          <button
            onClick={() => handleImageNavigation('left')}
            className="absolute text-xl left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-300"
            style={{ zIndex: 1 }}
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={() => handleImageNavigation('right')}
            className="absolute text-xl right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-300"
            style={{ zIndex: 1 }}
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="md:w-1/2 md:ml-6">
          <h1 className="text-4xl font-bold text-orange-600 mb-3">{detail.title}</h1>
          <p className="text-gray-700 mb-4">{detail.description}</p>
          <div className="flex items-center mb-3">
            <span className="text-3xl font-bold text-green-600">${detail.price}</span>
            <span className="ml-4 text-sm text-gray-500">({detail.totalrating} ★)</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Category:</span> {detail.category}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Quantity Available:</span> {detail.quantity}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Sold:</span> {detail.sold}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Last Updated:</span> {new Date(detail.updatedAt).toLocaleDateString()}
          </p>
          <div className="flex justify-between mt-6">
            <button onClick={() => handleEdit(detail)} className="text-blue-500 hover:underline">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button onClick={confirmDelete} className="text-red-500 hover:underline">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Blur Effect */}
      {showEditModal && (
        <div className="fixed inset-0 flex  mt-22 items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              <XIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                {loader ? 'Updating...' : 'Update Product'}
              </button>
            </form>
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-between mt-4">
              <button onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProduct;
