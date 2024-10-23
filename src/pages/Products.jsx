import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PopupMessage from './PopupMessage';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Popup from './Popup';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, PlusIcon, TrashIcon, PencilIcon, StarIcon, ClipboardListIcon, CurrencyDollarIcon, TagIcon, } from '@heroicons/react/solid';
import { motion } from 'framer-motion';


const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', quantity: '', category: '', img: [], });
  const [loader, setLoader] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoader(true);
    try {
      const response = await axios.get('user/product/getall');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoader(false);
    }
  };

  const deleteImageFromServer = async (pictureIndex, productId) => {

    setLoader(true);

    try {
      await axios.delete(`user/admin/delete/${productId}/image/${pictureIndex}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting images:', error);
    } finally {
      setLoader(false);
    }
  };

  const deleteImageFromState = (index, productId) => {
    deleteImageFromServer(index, productId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...formData.img, ...files];
    setFormData((prev) => ({ ...prev, img: updatedImages }));
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

    try {
      if (editingProduct) {
        await axios.put(`user/admin/product/update/${editingProduct._id}`, formDataObj);
        setSuccessMessage('Product updated successfully!');
      } else {
        await axios.post('user/admin/create', formDataObj);
        setSuccessMessage('Product created successfully!');
      }
      fetchProducts();
      setFormData({
        title: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        img: [],
      });
      setEditingProduct(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingProduct(product);
    setFormData({
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      quantity: product.quantity || '',
      img: [],
    });
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const confirmDelete = (id) => {
    setConfirmAction(() => () => handleDelete(id));
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    setLoader(true);
    try {
      await axios.delete(`user/admin/delete/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleSearch = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`user/product/getall?category=${searchInput}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleImageChange = (direction, productId) => {
    setCurrentImageIndices((prevIndices) => {
      const currentIndex = prevIndices[productId] || 0;
      const totalImages = products.find(product => product._id === productId)?.images.length || 0;

      return {
        ...prevIndices,
        [productId]: direction === 'left'
          ? (currentIndex === 0 ? totalImages - 1 : currentIndex - 1)
          : (currentIndex === totalImages - 1 ? 0 : currentIndex + 1),
      };
    });
  };

  return (
    <div className="container mx-auto p-8">
      <button
        className="mb-4 flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => navigate('/dashboard')}
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="mb-4 relative">
        <label className="block text-purple-700 text-sm font-bold mb-2">Search by Category</label>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter category to search"
        />
        <button
          onClick={handleSearch}
          className="absolute text-lg text-blue-600 left-3 bottom-2 transform -translate-y-1/2"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4 flex items-center">
          <PlusIcon className="h-6 w-6 mr-2" />
          {editingProduct ? 'Edit Dish' : 'Create a New Dish'}
        </h2>

        {['title', 'description', 'price', 'category', 'quantity'].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="text-gray-700 text-sm font-bold mb-2 flex items-center">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type="text"
              value={formData[field]}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={`Enter dish ${field}`}
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload Pictures</label>
          <input
            type='file'
            name="pictures"
            multiple
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingProduct ? 'Update Dish' : 'Create Dish'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const currentImageIndex = currentImageIndices[product._id] || 0;

          return (
            <motion.div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {product.images && product.images.length > 0 && (
                <div className="relative mb-4">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={`Dish ${product.title} Image`}
                    className="w-full h-48 rounded"
                  />
                  <button
                    onClick={() => deleteImageFromState(currentImageIndex, product._id)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                  >
                    X
                  </button>
                  <button
                    onClick={() => handleImageChange('left', product._id)}
                    className="absolute text-xl left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-300"
                    style={{ zIndex: 1 }}
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleImageChange('right', product._id)}
                    className="absolute text-xl right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-300"
                    style={{ zIndex: 1 }}
                  >
                    <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
              )}

              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>

              <div className="flex items-center text-gray-800 font-bold">
                <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-2" />
                <span className='text-blue-600'>$ {product.price}</span>
              </div>

              <div className="flex items-center text-gray-800 font-bold">
                <StarIcon className="h-5 w-5 text-pink-600 mr-2" />
                Quantity: {product.quantity}
              </div>

              <div className="flex items-center text-gray-800 font-bold">
                <TagIcon className="h-5 w-5 text-orange-600 mr-2" />
                Category: {product.category}
              </div>

              <div className="flex items-center text-gray-800 font-bold">
                <ClipboardListIcon className="h-5 w-5 text-red-600 mr-2" />
                Sold: {product.sold}
              </div>

              <div className="flex items-center text-gray-800 font-bold">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                {product.rating}
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline">
                  <PencilIcon className="h-5 text-3xl w-5" />
                </button>
                <button onClick={() => confirmDelete(product._id)} className="text-red-500 hover:underline">
                  <TrashIcon className="h-5 text-xl w-5" />
                </button>
              </div>
              <div className="px-4 py-2 bg-gray-100">
                <Link to={`/dashboard/viewproduct/${product._id}`}>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                    View Product
                  </button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {showPopup && (
        <PopupMessage
          message="Are you sure you want to delete this dish?"
          onConfirm={confirmAction}
          onCancel={() => {
            setShowPopup(false);
            setConfirmAction(null);
          }}
        />
      )}

      {successMessage && (
        <Popup
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
};

export default MainPage;
