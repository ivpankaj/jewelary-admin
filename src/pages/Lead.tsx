import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define Lead interface for type safety
interface Lead {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  status: string;
  source: string;
  budget: string;
  address: string;
  notes: string;
  sales_personId: number;
}

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [formValues, setFormValues] = useState({ status: '', notes: '' });
  const [formVisible, setFormVisible] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${apiUrl}/leads/getall`);
        setLeads(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error fetching leads';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [apiUrl]);

  const handleUpdateClick = (lead: Lead) => {
    setSelectedLead(lead);
    setFormValues({ status: lead.status, notes: lead.notes });
    setFormVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLead) return;

    try {
      await axios.put(`${apiUrl}/leads/update/${selectedLead.id}`, formValues);
      // Update lead list after successful update
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === selectedLead.id
            ? { ...lead, ...formValues }
            : lead
        )
      );
      setFormVisible(false);
      setSelectedLead(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error updating lead';
      setError(errorMessage);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">Lead List</h1>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact Number</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Source</th>
            <th className="px-4 py-2">Budget</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Sales Person ID</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="text-center border-t">
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2">{lead.contactNumber}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${lead.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                    }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-2">{lead.source}</td>
              <td className="px-4 py-2">{lead.budget}</td>
              <td className="px-4 py-2">{lead.address}</td>
              <td className="px-4 py-2">{lead.notes}</td>
              <td className="px-4 py-2">{lead.sales_personId}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
                  onClick={() => handleUpdateClick(lead)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {formVisible && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Lead</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={formValues.status}
                  onChange={handleInputChange}
                  className="w-full mt-2 border border-gray-300 rounded-lg p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="New">New</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={formValues.notes}
                  onChange={handleInputChange}
                  className="w-full mt-2 border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => setFormVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadList;











