import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaTasks, FaBirthdayCake } from 'react-icons/fa';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-400 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8">My Calendar</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaCalendarAlt className="mr-2" /> Choose a Date
        </h2>
        <Calendar
          onChange={onDateChange}
          value={date}
          className="border-none w-full shadow-md rounded-lg"
        />
        <p className="text-gray-700 mt-4 text-center">
          Selected Date: {date.toDateString()}
        </p>
      </div>

      {/* Additional content to make it more attractive */}
      {/* <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gradient-to-r from-teal-400 to-blue-500 text-white p-4 rounded-lg">
            <div className="flex items-center">
              <FaTasks className="text-lg mr-3" />
              <div>
                <p className="font-bold">Team Meeting</p>
                <p className="text-sm">September 15, 2024</p>
              </div>
            </div>
            <span>10:00 AM</span>
          </div>

          <div className="flex items-center justify-between bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg">
            <div className="flex items-center">
              <FaBirthdayCake className="text-lg mr-3" />
              <div>
                <p className="font-bold">Jane's Birthday</p>
                <p className="text-sm">September 20, 2024</p>
              </div>
            </div>
            <span>All Day</span>
          </div>

          <div className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-lg">
            <div className="flex items-center">
              <FaTasks className="text-lg mr-3" />
              <div>
                <p className="font-bold">Project Deadline</p>
                <p className="text-sm">September 30, 2024</p>
              </div>
            </div>
            <span>5:00 PM</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CalendarPage;
