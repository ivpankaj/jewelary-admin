import React from 'react';

const PopupMessage = ({ message, onConfirm, onCancel, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background with blur effect */}
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50"
        style={{ backdropFilter: 'blur(5px)' }} // Background blur
      ></div>

      {/* Popup content, clear and not blurred */}
      <div className="bg-gradient-to-b w-60 text-center from-black to-blue-500 rounded-lg p-5 shadow-lg z-10">
        <h2 className="text-lg font-bold mb-4 text-white">{message}</h2>
        <div className="flex justify-between">
          <button
            onClick={() => {
              onConfirm(); // Call onConfirm function
              onClose(); // Close the popup
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => {
              onCancel(); // Optionally call onCancel function if needed
              onClose(); // Close the popup
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;