// Tooltip.jsx
import React from 'react';

const Tooltip = ({ text }) => {
  return (
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-blue-500 text-sm rounded px-2 py-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 pointer-events-none">
      {text}
    </div>
  );
};

export default Tooltip;
