// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Lead {
//   id: number;
//   name: string;
//   status: string;
//   leadOwner: string;
// }

// interface AssignLeadsModalProps {
//   employeeId: number;
//   employeeName: string;
//   onClose: () => void;
//   apiUrl: string;
// }

// const AssignLeadsModal: React.FC<AssignLeadsModalProps> = ({ employeeId, employeeName, onClose, apiUrl }) => {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/team-lead/get-all-leads`); // Adjust this endpoint to fetch all leads
//         setLeads(response.data);
//       } catch (error) {
//         console.error('Error fetching leads:', error);
//       }
//     };

//     fetchLeads();
//   }, [apiUrl]);

//   const handleCheckboxChange = (id: number) => {
//     setSelectedLeads(prev =>
//       prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
//     );
//   };

//   const handleAssignLeads = async () => {
//     try {
//       await axios.post(`${apiUrl}/team-lead/leads/assign`, {
//         employeeId,
//         leadIds: selectedLeads,
//       });
//       alert('Leads assigned successfully!');
//       onClose(); // Close the modal after assigning
//     } catch (error) {
//       console.error('Error assigning leads:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assign Leads to {employeeName}</h2>
//         <ul>
//           {leads.map(lead => (
//             <li key={lead.id} className="flex items-center mb-2">
//               <input
//                 type="checkbox"
//                 checked={selectedLeads.includes(lead.id)}
//                 onChange={() => handleCheckboxChange(lead.id)}
//               />
//               <span className="ml-2">{lead.name} - {lead.status} Lead owner - {lead.leadOwner}</span>
//             </li>
//           ))}
//         </ul>
//         <div className="flex justify-between mt-4">
//           <button
//             onClick={handleAssignLeads}
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Assign Leads
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignLeadsModal;





import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Lead {
  id: number;
  name: string;
  status: string;
  leadOwner: string;
}

interface AssignLeadsModalProps {
  employeeId: number;
  employeeName: string;
  onClose: () => void;
  apiUrl: string;
}

const AssignLeadsModal: React.FC<AssignLeadsModalProps> = ({ employeeId, employeeName, onClose, apiUrl }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${apiUrl}/team-lead/get-all-leads`);
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, [apiUrl]);

  const handleCheckboxChange = (id: number) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
    );
  };

  const handleAssignLeads = async () => {
    try {
      await axios.post(`${apiUrl}/team-lead/leads/assign`, {
        employeeId,
        leadIds: selectedLeads,
      });
      alert('Leads assigned successfully!');
      onClose(); // Close the modal after assigning
    } catch (error) {
      console.error('Error assigning leads:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assign Leads to {employeeName}</h2>
        <div className="max-h-60 overflow-y-auto">
          <ul>
            {leads.map(lead => (
              <li key={lead.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={() => handleCheckboxChange(lead.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">
                  {lead.name} - <span className={`font-semibold ${lead.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{lead.status}</span> - Lead Owner: {lead.leadOwner}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAssignLeads}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Assign Leads
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignLeadsModal;
