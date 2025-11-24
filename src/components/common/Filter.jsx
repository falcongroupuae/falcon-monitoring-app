import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaBuilding,
  FaUser,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

export default function Filter({ onApply }) {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    department: "",
    user: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFilters({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      department: "",
      user: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-wrap items-end gap-5 w-full">
        <div className="flex flex-wrap items-end gap-5 flex-grow">
          <div className="relative w-48">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Start Date
            </label>
            <FaCalendarAlt className="absolute left-3 top-10 text-gray-400 text-sm pointer-events-none" />
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative w-48">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              End Date
            </label>
            <FaCalendarAlt className="absolute left-3 top-10 text-gray-400 text-sm pointer-events-none" />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Start Time
            </label>
            <FaClock className="absolute left-3 top-10 text-gray-400 text-sm pointer-events-none" />
            <input
              type="time"
              name="startTime"
              value={filters.startTime}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              End Time
            </label>
            <FaClock className="absolute left-3 top-10 text-gray-400 text-sm pointer-events-none" />
            <input
              type="time"
              name="endTime"
              value={filters.endTime}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Department
            </label>
            <FaBuilding className="absolute left-3 top-10 text-gray-400 text-sm pointer-events-none" />
            <select
              name="department"
              value={filters.department}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="relative w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              User
            </label>
            <FaUser className="absolute left-3 top-10 text-gray-400 text-sm pointer-events-none" />
            <select
              name="user"
              value={filters.user}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
              <option value="user4">User 4</option>
              <option value="user5">User 5</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => onApply(filters)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition"
          >
            <FaFilter className="text-sm" />
            Apply
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <FaTimes className="text-sm" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
