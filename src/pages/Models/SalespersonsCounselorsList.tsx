






// // components/SalespersonsCounselorsList.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import EmployeeLeadsModal from './EmployeeLeadsModal';
// import Cookies from 'js-cookie';

// interface Employee {
//   id: number;
//   name: string;
//   email: string;
//   contactNumber: string;
// }

// const SalespersonsCounselorsList: React.FC = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

//   const apiUrl = import.meta.env.VITE_API_URL;

//   const [token, setToken] = useState<string | null>(Cookies.get('userToken'));
//       axios.defaults.headers.common['Authorization'] = `${token}`;

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/team-lead/employees/getall`);
//         setEmployees(response.data);
//       } catch (err) {
//         const errorMessage = err.response?.data?.message || 'Error fetching employees';
//         setError(errorMessage);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, [apiUrl]);

//   const handleEmployeeClick = (employee: Employee) => {
//     setSelectedEmployee(employee);
//     setModalVisible(true);
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen p-10">
//       <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">Salespersons and Counselors</h1>

//       <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-indigo-600 text-white">
//             <th className="px-4 py-2">Name</th>
//             <th className="px-4 py-2">Email</th>
//             <th className="px-4 py-2">Contact Number</th>
//             <th className="px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.id} className="text-center border-t">
//               <td className="px-4 py-2">{employee.name}</td>
//               <td className="px-4 py-2">{employee.email}</td>
//               <td className="px-4 py-2">{employee.contactNumber}</td>
//               <td className="px-4 py-2">
//                 <button
//                   className="bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600 transition-colors"
//                   onClick={() => handleEmployeeClick(employee)}
//                 >
//                   View Leads
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {modalVisible && selectedEmployee && (
//         <EmployeeLeadsModal
//           employeeId={selectedEmployee.id}
//           employeeName={selectedEmployee.name}
//           onClose={() => setModalVisible(false)}
//           apiUrl={apiUrl}
//         />
//       )}
//     </div>
//   );
// };

// export default SalespersonsCounselorsList;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeLeadsModal from './EmployeeLeadsModal';
import AssignLeadsModal from './AssignLeadsModal'; // New modal for assigning leads
import Cookies from 'js-cookie';

interface Employee {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
}

const SalespersonsCounselorsList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [assignLeadsVisible, setAssignLeadsVisible] = useState<boolean>(false); // State for assigning leads
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const token = Cookies.get('userToken');
  axios.defaults.headers.common['Authorization'] = `${token}`;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${apiUrl}/team-lead/employees/getall`);
        setEmployees(response.data);
      } catch (err :any) {
        const errorMessage = err.response?.data?.message || 'Error fetching employees';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [apiUrl]);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const handleAssignLeadsClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setAssignLeadsVisible(true);
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">Salespersons and Counselors</h1>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact Number</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          { employees.length > 0 ? employees.map((employee) => (
            <tr key={employee.id} className="text-center border-t">
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.email}</td>
              <td className="px-4 py-2">{employee.contactNumber}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-indigo-500 text-white py-1 px-3 rounded-lg hover:bg-indigo-600 transition-colors mr-2"
                  onClick={() => handleEmployeeClick(employee)}
                >
                  View Leads
                </button>
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() => handleAssignLeadsClick(employee)}
                >
                  Assign Leads
                </button>
              </td>
            </tr>
          )) : ( <div>this feature for Team_lead only</div>)}
        </tbody>
      </table>

      {modalVisible && selectedEmployee && (
        <EmployeeLeadsModal
          employeeId={selectedEmployee.id}
          employeeName={selectedEmployee.name}
          onClose={() => setModalVisible(false)}
          apiUrl={apiUrl}
        />
      )}

      {assignLeadsVisible && selectedEmployee && (
        <AssignLeadsModal
          employeeId={selectedEmployee.id}
          employeeName={selectedEmployee.name}
          onClose={() => setAssignLeadsVisible(false)}
          apiUrl={apiUrl}
        />
      )}
    </div>
  );
};

export default SalespersonsCounselorsList;
