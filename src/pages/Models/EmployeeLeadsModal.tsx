// components/EmployeeLeadsModal.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Lead {
  id: number;
  name: string;
  status: string;
  createdAt: string;
}


interface EmployeeLeadsModalProps {
  employeeId: number | null;
  employeeName: string | null;
  onClose: () => void;
  apiUrl: string;
}

const EmployeeLeadsModal: React.FC<EmployeeLeadsModalProps> = ({ employeeId, employeeName, onClose, apiUrl }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState([]); // Updated to hold status objects

  useEffect(() => {
    // Fetch statuses on component mount
    const fetchStatuses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/team-lead/employee/allstatus/lead`);
        setStatuses(response.data.data); // Use response.data.data to get the status array
      } catch (err) {
        setError('Error fetching statuses');
      }
    };

    fetchStatuses();
  }, [apiUrl]);

  useEffect(() => {
    if (employeeId) {
      fetchLeads(employeeId);
    }
  }, [employeeId, statusFilter, startDate, endDate]);

  const fetchLeads = async (id: number) => {
    try {
      const response = await axios.post(`${apiUrl}/team-lead/employee/leads`, {
        employeeId: id,
        status: statusFilter,
        startDate,
        endDate,
      });
      setLeads(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error fetching leads';
      setError(errorMessage);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'status') setStatusFilter(value);
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(employeeId!); // Refetch leads with new filters
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leads for {employeeName}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleFilterSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={statusFilter}
              onChange={handleFilterChange}
              className="w-full mt-2 border border-gray-300 rounded-lg p-2"
            >
              <option value="">All</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleFilterChange}
              className="w-full mt-2 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleFilterChange}
              className="w-full mt-2 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Filter
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
        <h3 className="text-xl font-semibold mt-4">Leads:</h3>
        <ul className="mt-2">
          {leads.map(lead => (
            <li key={lead.id} className="py-1 border-b">
              {lead.name} - {lead.status} - {new Date(lead.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeLeadsModal;
