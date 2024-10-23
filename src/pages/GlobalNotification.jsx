import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XCircleIcon, BellIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion'; // Import Framer Motion

const GlobalNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('user/getallnotification');
        setNotifications(response.data.data);
        setFilteredNotifications(response.data.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const results = notifications.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotifications(results);
  }, [searchTerm, notifications]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('user/admin/send/notification', {
        title,
        message,
      });
      const newNotification = { title, message, createdAt: new Date().toLocaleString(), read: false };
      setNotifications((prev) => [...prev, newNotification]);
      setFilteredNotifications((prev) => [...prev, newNotification]);
      setTitle('');
      setMessage('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to create notification. Please try again.');
    }
  };

  const handleRemoveNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
  };

  const handleMarkAsRead = (index) => {
    const updatedNotifications = notifications.map((note, i) => {
      if (i === index) {
        return { ...note, read: true };
      }
      return note;
    });
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 bg-gray-100">
      <div className="max-w-6xl shadow-lg rounded-lg p-6 bg-white flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            <BellIcon className="h-6 w-6 inline-block mr-2 text-blue-500" />
            Create Global Notification
          </h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <span className="p-3 text-gray-400"><BellIcon className="h-5 w-5" /></span>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 focus:outline-none"
                  placeholder="Enter notification title"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notification message"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Create Notification
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Sent Notifications</h3>

          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="h-90 overflow-y-auto space-y-4">
            {filteredNotifications.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }} // Initial state for notification
                animate={{ opacity: 1, y: 0 }} // Animate to this state
                exit={{ opacity: 0, y: 10 }} // Exit animation
                transition={{ duration: 0.3 }} // Transition duration
                className={`p-4 rounded-lg shadow-md flex justify-between items-center ${note.read ? 'bg-gray-200' : 'bg-blue-100'} transition-all duration-300`}
              >
                <div className="flex flex-col">
                  <strong className="block text-gray-800">{note.title}</strong>
                  <p className="text-gray-600">{note.message}</p>
                  <p className="text-sm text-gray-500"><ClockIcon className="inline h-4 w-4 text-gray-400" /> {note.createdAt}</p>
                </div>
                <div className="flex items-center">
                  {!note.read && (
                    <button onClick={() => handleMarkAsRead(index)} className="ml-2 text-green-500 hover:text-green-600" title="Mark as read">
                      <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}
                  <button onClick={() => handleRemoveNotification(index)} className="ml-2 text-red-500 hover:text-red-600" title="Remove notification">
                    <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNotification;