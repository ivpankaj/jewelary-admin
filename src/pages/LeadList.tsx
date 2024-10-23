import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PopupMessage from './PopupMessage'; 
import Popup from './Popup';
import { motion } from 'framer-motion';
import {
  TrashIcon,
  LockClosedIcon,
  UserIcon,
  LockOpenIcon,
  ArrowLeftIcon,
} from '@heroicons/react/outline';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  role: string;
  isBlocked: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchInput, setSearchInput] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showBlockPopup, setShowBlockPopup] = useState<boolean>(false);
  const [actionUserId, setActionUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>('user/getalluser');
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`user/delete/${userToDelete}`);
        setSuccessMessage('User deleted successfully!');
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      } finally {
        setShowDeletePopup(false);
        setUserToDelete(null);
      }
    }
  };

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    setActionUserId(id);
    setShowBlockPopup(true);
  };

  const confirmBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      const action = isBlocked ? 'unblock' : 'block';
      await axios.put(`user/${action}/${id}`);
      setSuccessMessage(`User ${isBlocked ? 'unblocked' : 'blocked'} successfully!`);
      fetchUsers();
    } catch (err) {
      console.error(`Error ${isBlocked ? 'unblocking' : 'blocking'} user:`, err);
    } finally {
      setShowBlockPopup(false);
      setActionUserId(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname} ${user.email} ${user.mobile} ${user.role}`
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <button
        className="mb-4 flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">User Management</h2>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search users..."
            className="p-2 w-64 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        {/* User List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-200"
              initial={{ scale: 0.9, opacity: 0.5 }}
              whileInView={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0.5 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: false }}
            >
              <div className="flex items-center mb-4">
                <UserIcon className="text-blue-600 h-12 w-12 mr-3" />
                <h3 className="text-2xl font-semibold">
                  {user.firstname} {user.lastname}
                </h3>
              </div>
              <p className="text-gray-500">Email: {user.email}</p>
              <p className="text-gray-500">Mobile: {user.mobile}</p>
              <p className="text-gray-500">Role: {user.role}</p>
              <p className={`text-sm font-semibold mt-2 text-${user.isBlocked ? 'red' : 'green'}-600`}>
                {user.isBlocked ? 'Blocked' : 'Active'}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                  className={`bg-${user.isBlocked ? 'green' : 'yellow'}-500 hover:bg-${user.isBlocked ? 'green' : 'yellow'}-600 text-white font-bold py-2 px-4 rounded transition duration-300`}
                >
                  {user.isBlocked ? <LockOpenIcon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confirmation Popup for Deletion */}
      {showDeletePopup && (
        <PopupMessage
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeletePopup(false);
            setUserToDelete(null);
          }}
        />
      )}

      {/* Confirmation Popup for Block/Unblock */}
      {showBlockPopup && actionUserId && (
        <PopupMessage
          message={`Are you sure you want to ${users.find(user => user._id === actionUserId)?.isBlocked ? 'unblock' : 'block'} this user?`}
          onConfirm={() => confirmBlockToggle(actionUserId, users.find(user => user._id === actionUserId)?.isBlocked!)}
          onCancel={() => {
            setShowBlockPopup(false);
            setActionUserId(null);
          }}
        />
      )}

      {/* Success Popup */}
      {successMessage && (
        <Popup
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
};

export default UserManagement;
