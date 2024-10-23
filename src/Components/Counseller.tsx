import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    pic: '/pic1.jpg', // Placeholder image URL
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+0987654321',
    address: '456 Elm St, Othertown, USA',
    pic: '/pic2.jpg', // Placeholder image URL
  },
  // Add more users as needed
];

const Counseller = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Counseller</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={user.pic}
              alt={user.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-blue-500 mr-2" />
                <p className="text-gray-700">{user.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaPhone className="text-green-500 mr-2" />
                <p className="text-gray-700">{user.phone}</p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                <p className="text-gray-700">{user.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counseller;
