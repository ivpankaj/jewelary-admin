import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyOfferPage = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [category, setCategory] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('user/admin/offers/get');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  // Apply offer to products by category
  const applyOffer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('user/admin/offers/apply', {
        offerId: selectedOffer,
      });
      setMessage(response.data.message);
      setShowPopup(false); // Close the popup after applying offer
    } catch (error) {
      console.error('Error applying offer:', error);
      setMessage('Failed to apply the offer.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto py-10 px-5">
        <h1 className="text-3xl font-bold mb-5">Apply Offer to Products</h1>

        {/* Offer Form Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowPopup(true)}
        >
          Apply Offer
        </button>

        {/* Success/Error Message */}
        {message && (
          <div className="mt-4 p-4 bg-green-100 border border-green-500 text-green-700 rounded">
            {message}
          </div>
        )}

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
              <h2 className="text-2xl font-bold mb-4">Apply Offer</h2>

              <form onSubmit={applyOffer}>
                <div className="mb-4">
                  <label className="block text-gray-700">Select Offer</label>
                  <select
                    className="w-full mt-2 p-2 border rounded-md"
                    value={selectedOffer}
                    onChange={(e) => setSelectedOffer(e.target.value)}
                    required
                  >
                    <option value="">Choose an offer</option>
                    {offers.map((offer) => (
                      <option key={offer._id} value={offer._id}>
                        {offer.title} - {offer.discountType}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Product Category</label>
                  <input
                    type="text"
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded-md"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Apply Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Blur background when popup is active */}
      {showPopup && <div className="fixed inset-0 backdrop-blur-sm z-40"></div>}
    </div>
  );
};

export default ApplyOfferPage;
