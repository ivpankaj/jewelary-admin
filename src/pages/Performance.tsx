import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaTachometerAlt, FaCalendarDay, FaUser, FaStar } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformancePage = () => {
  // Sample data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Performance Score',
        data: [80, 95, 70, 85, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Score',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Employee Performance Overview</h1>

        <div className="mb-8">
          <div className="relative">
            <Bar data={data} options={options} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <FaTachometerAlt className="text-blue-600 text-3xl sm:text-2xl" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Performance Metrics</h2>
              <p className="text-gray-600 text-sm sm:text-base">View detailed metrics and track employee performance over time.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <FaCalendarDay className="text-green-600 text-3xl sm:text-2xl" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Monthly Reports</h2>
              <p className="text-gray-600 text-sm sm:text-base">Access and download monthly performance reports for in-depth analysis.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <FaUser className="text-purple-600 text-3xl sm:text-2xl" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Employee Details</h2>
              <p className="text-gray-600 text-sm sm:text-base">View and manage detailed employee profiles and performance data.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <FaStar className="text-yellow-600 text-3xl sm:text-2xl" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Top Performers</h2>
              <p className="text-gray-600 text-sm sm:text-base">Recognize and reward top-performing employees based on their scores.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
