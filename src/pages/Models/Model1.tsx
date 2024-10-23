// AddNotesModal.tsx
import React from 'react';
import { FiX } from 'react-icons/fi';

interface AddNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadNotes: string;
  setLeadNotes: (value: string) => void;
  handleAddNotes: () => void;
}

const AddNotesModal: React.FC<AddNotesModalProps> = ({
  isOpen,
  onClose,
  leadNotes,
  setLeadNotes,
  handleAddNotes,
}) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Notes</h2>
          <button onClick={onClose}>
            <FiX size={24} className="text-gray-500 hover:text-gray-600 transition" />
          </button>
        </div>
        <textarea
          value={leadNotes}
          onChange={(e) => setLeadNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter notes"
          rows={5}
        />
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
            onClick={handleAddNotes}
          >
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotesModal;
