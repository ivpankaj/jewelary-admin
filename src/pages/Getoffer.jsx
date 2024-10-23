import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupMessage from './PopupMessage'; 
import Popup from './Popup'; 
import { motion } from 'framer-motion';

const GetOffer = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOffer, setEditOffer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const [formData, setFormData] = useState({
    offer: '',
    discount: '',
    discountType: 'Coupon',
    prodCategory: '',
  });
  const [appliedOffers, setAppliedOffers] = useState(() => {
    const storedOffers = localStorage.getItem('appliedOffers');
    return storedOffers ? new Set(JSON.parse(storedOffers)) : new Set();
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('user/get/offers');
      setOffers(response.data.offer);
    } catch (error) {
      setError('Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setConfirmAction(() => () => deleteOffer(id));
    setShowPopup(true);
  };

  const deleteOffer = async (id) => {
    try {
      await axios.delete(`user/admin/delete/offers/${id}`);
      setOffers(offers.filter((offer) => offer._id !== id));
      const updatedOffers = new Set(appliedOffers);
      updatedOffers.delete(id);
      setAppliedOffers(updatedOffers);
      localStorage.setItem('appliedOffers', JSON.stringify([...updatedOffers]));
      setSuccessMessage('Offer deleted successfully!');
      setShowSuccessPopup(true);
    } catch (error) {
      setError('Failed to delete offer');
    } finally {
      setShowPopup(false);
    }
  };

  const handleUpdateOffer = async (id) => {
    try {
      await axios.put(`user/admin/update/offers/${id}`, formData);
      fetchOffers();
      setEditOffer(null);
      setShowEditModal(false); // Close modal after update
      setSuccessMessage('Offer updated successfully!');
      setShowSuccessPopup(true);
    } catch (error) {
      setError('Failed to update offer');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadOfferForEditing = (offer) => {
    setEditOffer(offer._id);
    setFormData({
      offer: offer.offer,
      discount: offer.discount,
      discountType: offer.discountType,
      prodCategory: offer.prodCategory,
    });
    setShowEditModal(true); // Open modal for editing
  };

  const handleCancelEdit = () => {
    setEditOffer(null);
    setFormData({
      offer: '',
      discount: '',
      discountType: 'Coupon',
      prodCategory: '',
    });
    setShowEditModal(false); // Close modal
  };

  const confirmApplyOffer = (offerId) => {
    setConfirmAction(() => () => applyOffer(offerId));
    setShowPopup(true);
  };

  const applyOffer = async (offerId) => {
    try {
      await axios.post('user/admin/offers/apply', { offerId });
      setSuccessMessage('Offer applied successfully!');
      const updatedOffers = new Set(appliedOffers).add(offerId);
      setAppliedOffers(updatedOffers);
      localStorage.setItem('appliedOffers', JSON.stringify([...updatedOffers]));
      setShowSuccessPopup(true);
    } catch (error) {
      setError('Failed to apply offer');
    } finally {
      setShowPopup(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Offers</h2>

      {/* List of offers */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <motion.div
              key={offer._id}
              className="border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-4 relative bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 rounded-bl-lg">
                {offer.discount} Rs. OFF
              </div>
              <p className="mt-2 text-gray-700">
                <span className="font-bold">Title:</span> {offer.title}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Discount Type:</span>{' '}
                {offer.discountType}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Category:</span>{' '}
                {offer.prodCategory}
              </p>
              <div className="flex justify-between items-center mt-4">
                {appliedOffers.has(offer._id) ? (
                  <span className="text-green-600 font-semibold">Applied</span>
                ) : (
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    onClick={() => confirmApplyOffer(offer._id)}
                  >
                    Apply Offer
                  </button>
                )}
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-red-600"
                  onClick={() => confirmDelete(offer._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={() => loadOfferForEditing(offer)}
                >
                  Edit
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No offers are available</p>
        )}
      </div>

      {/* Offer edit modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCancelEdit}></div>
          <div className="w-[800px] bg-white rounded-lg shadow-lg z-10 p-6 mt-28 ml-40">
            <button onClick={handleCancelEdit} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
              &#10005;
            </button>
            <h3 className="text-2xl font-semibold">Edit Offer</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateOffer(editOffer);
              }}
              className="bg-white p-6 shadow-lg rounded-lg"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Offer Name</label>
                <input
                  type="text"
                  name="offer"
                  value={formData.offer}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Discount Type</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="Coupon">Coupon</option>
                  <option value="Offers">Offers</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Category</label>
                <input
                  type="text"
                  name="prodCategory"
                  value={formData.prodCategory}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Discount Amount</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Update Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup message */}
      {showPopup && (
        <PopupMessage
          message="Are you sure you?"
          onConfirm={confirmAction}
          onCancel={() => setShowPopup(false)}
        />
      )}
      {showSuccessPopup && (
        <Popup
          message={successMessage}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
};

export default GetOffer;
