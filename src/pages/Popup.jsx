// Popup.jsx
import React, { useEffect } from 'react';

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto close after 20 seconds
    }, 800); // 20000 ms = 20 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background with blur effect */}
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-95"
        style={{ backdropFilter: 'blur(5px)' }} // Apply blur to the background
      ></div>

      {/* Popup content, clear and not blurred */}
      <div className="bg-gradient-to-r from-black to-blue-500 rounded-lg p-6 shadow-lg z-10 transform transition-all duration-300 scale-100">
        <h2 className="text-lg font-bold mb-4 text-white text-center">{message}</h2>
      </div>
    </div>
  );
};

export default Popup;
