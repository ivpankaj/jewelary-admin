import React from "react";
import { FaSearch, FaTasks, FaEnvelope, FaBell, FaUserCircle } from "react-icons/fa"; // Import icons

const Header = () => {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4 shadow-md">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-2 right-3 text-gray-400" />
        </div>
        <button className="text-gray-300 hover:text-white transition-colors">
          <FaTasks size={20} />
        </button>
        <button className="text-gray-300 hover:text-white transition-colors">
          <FaBell size={20} />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white transition-colors">
          <FaEnvelope size={20} />
        </button>
        <button className="text-gray-300 hover:text-white transition-colors">
          <FaBell size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <FaUserCircle size={30} />
        </div>
      </div>
    </header>
  );
};

export default Header;
