import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddTaskForm = ({ addNewTask }) => {
  return (
    <div className="flex justify-end p-4">
      <button onClick={addNewTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
        <FaPlus className="mr-2" />
        Add Task
      </button>
    </div>
  );
};

export default AddTaskForm;
