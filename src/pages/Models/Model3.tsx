// AllNotesModal.tsx
import React from 'react';
import { FiX } from 'react-icons/fi';

interface AllNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  allNotes: { id: string; note: string; createdAt: string }[]; // Adjust according to your note object structure
}

const AllNotesModal: React.FC<AllNotesModalProps> = ({
  isOpen,
  onClose,
  allNotes,
}) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Notes</h2>
          <button onClick={onClose}>
            <FiX size={24} className="text-gray-500 hover:text-gray-600 transition" />
          </button>
        </div>
        <div className="space-y-4">
          {Array.isArray(allNotes) && allNotes.length > 0 ? (
            // Sort notes by date, latest first
            allNotes
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
              )
              .map((note) => (
                <div key={note.id} className="p-4 border border-gray-300 rounded">
                  <p>
                    <strong>Note:</strong> {note.note}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(note.createdAt).toLocaleDateString()}{' '}
                    <strong>Time:</strong> {new Date(note.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">No notes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllNotesModal;
