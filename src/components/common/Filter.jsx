import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaBuilding,
  FaUser,
  FaLaptop,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

export default function Filter({ onApply }) {
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    department: "",
    option1: "",
    option2: "",
    option3: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFilters({
      date: "",
      time: "",
      department: "",
      option1: "",
      option2: "",
      option3: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-4">
        {/* Date Input */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Date
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Time Input */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Time
          </label>
          <div className="relative">
            <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            <input
              type="time"
              name="time"
              value={filters.time}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Department Select */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Department
          </label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none z-10" />
            <select
              name="department"
              value={filters.department}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white text-sm"
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="IT">IT</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Users Select */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            User
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none z-10" />
            <select
              name="option1"
              value={filters.option1}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white text-sm"
            >
              <option value="">All Users</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
              <option value="user4">User 4</option>
              <option value="user5">User 5</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Devices Select */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Device
          </label>
          <div className="relative">
            <FaLaptop className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none z-10" />
            <select
              name="option2"
              value={filters.option2}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white text-sm"
            >
              <option value="">All Devices</option>
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
              <option value="Desktop">Desktop</option>
              <option value="Smartwatch">Smartwatch</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex gap-2 md:col-span-2 lg:col-span-3 xl:col-span-1 items-end">
          <button
            onClick={() => onApply(filters)}
            className="flex-1 xl:flex-none bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaFilter className="text-sm" />
            Apply
          </button>
          <button
            onClick={handleClear}
            className=" bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaTimes className="text-sm" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
