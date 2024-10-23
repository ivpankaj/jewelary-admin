import React, { useState } from 'react';

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('Director');

  const contacts = {
    Director: {
      name: 'Dipesh Kumar',
      designation: 'Company Director',
      contact: '998987655',
      company: 'Dosso21 Private Limited',
      since: '2024',
      image: '/pic6.jpg',
    },
    CEO: {
      name: 'Ankit Mishra',
      designation: 'Chief Executive Officer',
      contact: '998987655',
      company: 'Dosso21 Private Limited',
      since: '2024',
      image: '/pic1.jpg',
    },
   
    HR: {
      name: 'Ramya Kumari',
      designation: 'HR Manager',
      contact: '998987655',
      company: 'Dosso21 Private Limited',
      since: '2024',
      image: '/pic3.jpg',
    },
    'Team Leader': {
      name: 'Ram Kumar',
      designation: 'Team Leader',
      contact: '998987655',
      company: 'Dosso21 Private Limited',
      since: '2024',
      image: '/pic7.jpg',
    },
    'Senior Employee': {
      name: 'Vikram Singh',
      designation: 'Senior Employee',
      contact: '998987655',
      company: 'Dosso21 Private Limited',
      since: '2024',
      image: '/pic1.jpg',
    },
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-100 p-4 sm:p-8">
      <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-sm sm:text-lg">
        {Object.keys(contacts).map((tab) => (
          <div
            key={tab}
            className={`relative cursor-pointer pb-2 font-bold uppercase tracking-wider transition-colors duration-300 ${
              activeTab === tab
                ? 'text-yellow-500'
                : 'text-gray-600 hover:text-yellow-400'
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 transition-transform duration-300 transform scale-x-100"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="bg-gradient-to-br from-black-2 via-blue-400 to-red-600 shadow-2xl rounded-lg p-6 sm:p-8 max-w-xs sm:max-w-md w-full text-center transform transition duration-500 hover:scale-105">
          <img
            src={contacts[activeTab].image}
            alt={contacts[activeTab].name}
            className="w-24 sm:w-28 h-24 sm:h-28 rounded-full mx-auto mb-4 sm:mb-6 shadow-lg"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-2">
            {contacts[activeTab].name}
          </h2>
          <p className="text-lg sm:text-xl text-white">
            {contacts[activeTab].designation}
          </p>
          <p className="text-sm sm:text-lg text-white">{contacts[activeTab].company}</p>
          <p className="mt-4 text-lg sm:text-xl text-white font-medium">
            Contact: {contacts[activeTab].contact}
          </p>
          <p className="text-sm sm:text-lg text-white font-medium">
            Since: {contacts[activeTab].since}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
