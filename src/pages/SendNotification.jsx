import React, { useState } from 'react';
import axios from 'axios';

const SendNotification = () => {
  const [userIds, setUserIds] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idsArray = userIds.split(',').map((id) => id.trim());

    try {
      const response = await axios.post('user/admin/send/notification/users', {
        userIds: idsArray,
        title,
        message,
      });

      setStatusMessage(response.data.message);
      setErrorMessage('');
      setUserIds('');
      setTitle('');
      setMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to send notification');
      setStatusMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Send Notification</h2>

        {statusMessage && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{statusMessage}</div>}
        {errorMessage && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userIds" className="block text-gray-700 font-semibold mb-2">
              User IDs (comma-separated)
            </label>
            <input
              type="text"
              id="userIds"
              value={userIds}
              onChange={(e) => setUserIds(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user IDs"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter notification title"
              required
            />
          </div>

        

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendNotification;
