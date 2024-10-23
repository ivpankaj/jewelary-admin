import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LeadEntryForm: React.FC = () => {
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    source: '',
    address: '',
    note: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('userToken');
  axios.defaults.headers.common['Authorization'] = `${token}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, contactNumber, source, note } = leadData;
    if (!name || !email || !contactNumber || !source || !note) {
      return "All fields marked as mandatory must be filled.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null); // Clear previous errors

    try {
      await axios.post(`${apiUrl}/team-lead/lead/create`, leadData);
      setSuccess('Lead added successfully!');
      setLeadData({
        name: '',
        email: '',
        contactNumber: '',
        source: '',
        address: '',
        note: '',
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error adding lead';
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Lead</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Lead Name"
          value={leadData.name}
          onChange={handleChange}
          required
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Lead Email"
          value={leadData.email}
          onChange={handleChange}
          required
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={leadData.contactNumber}
          onChange={handleChange}
          required
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={leadData.source}
          onChange={handleChange}
          required
          className="border rounded p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={leadData.address}
          onChange={handleChange}
          className="border rounded p-2 mb-4 w-full"
        />
        <textarea
          name="note"
          placeholder="Notes"
          value={leadData.note}
          onChange={handleChange}
          required
          className="border rounded p-2 mb-4 w-full"
        ></textarea>
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded">
          Add Lead
        </button>
      </form>
    </div>
  );
};

export default LeadEntryForm;
