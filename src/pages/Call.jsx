import React from "react";
import { FaPhoneAlt } from "react-icons/fa"; // Icon for the call button

const Call = () => {
  // Sample data for contacts
  const contacts = [
    {
      id: 1,
      name: "Muskan Gupta",
      phoneNumber: "+9178654462",
      imageUrl: "/pic2.jpg",
    },
    {
      id: 2,
      name: "Sanjeev Singh",
      phoneNumber: "+9178654462",
      imageUrl: "/pic6.jpg",
    },
    {
      id: 3,
      name: "Pankaj Verma",
      phoneNumber: "+9178654462",
      imageUrl: "/pic7.jpg",
    },
  ];

  const handleCall = (phoneNumber) => {
    alert(`Calling ${phoneNumber}`);
    // Logic for making a call can be added here (e.g., using a VoIP service)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Contacts</h1>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-4 mb-5 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Contact Profile Image */}
            <div className="flex items-center">
              <img
                src={contact.imageUrl}
                alt={contact.name}
                className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md"
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {contact.name}
                </h2>
                <p className="text-gray-600">{contact.phoneNumber}</p>
              </div>
            </div>
            {/* Call Button */}
            <button
              onClick={() => handleCall(contact.phoneNumber)}
              className="flex items-center justify-center bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition duration-300 shadow-lg hover:shadow-xl"
            >
              <FaPhoneAlt size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Call;
