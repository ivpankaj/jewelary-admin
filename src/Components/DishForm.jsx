import React from 'react';

const DishForm = ({ formData, handleInputChange, handleFileChange, handleSubmit, editingProduct }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4">{editingProduct ? 'Edit Dish' : 'Create a New Dish'}</h2>

      {['title', 'description', 'price', 'category', 'quantity'].map(field => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
          type="file"
          name="pictures"
          multiple
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {editingProduct ? 'Update Dish' : 'Create Dish'}
      </button>
    </form>
  );
};

export default DishForm;
