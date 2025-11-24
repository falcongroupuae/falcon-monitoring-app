import { useState, useEffect, Fragment } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaBuilding,
  FaUser,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getMetaDepartments, getMetaUsers } from "../../api/commonApi";

export default function Filter({ onApply }) {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    department: "",
    user: "",
  });

  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  /* ------------------ Helpers --------------------- */
  const buildDateTime = (date, time, fallback) => {
    if (!date) return null;
    const t = time ? `${time}:00` : fallback;
    return `${date}T${t}`;
  };

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

  /* ------------------ Load Departments --------------------- */
  useEffect(() => {
    loadDepartments();
  }, [filters.startDate, filters.startTime, filters.endDate, filters.endTime]);

  const loadDepartments = async () => {
    try {
      const start_dt = buildDateTime(filters.startDate, filters.startTime, "00:00:00");
      const end_dt = buildDateTime(filters.endDate, filters.endTime, "23:59:59");

      const res = await getMetaDepartments({ start_dt, end_dt });
      setDepartments(res.data || []);
    } catch (err) {
      console.error("Departments load failed", err);
      setDepartments([]);
    }
  };

  /* ------------------ Load Users --------------------- */
  useEffect(() => {
    loadUsers();
  }, [filters.department]);

  const loadUsers = async () => {
    try {
      const res = await getMetaUsers({
        department: filters.department || null,
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error("Users load failed", err);
      setUsers([]);
    }
  };


  const Dropdown = ({ label, icon, options, value, onChange, display }) => (
    <div className="relative w-48">
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          {/* Button */}
          <Listbox.Button
            className="
              relative w-full cursor-pointer rounded-lg
              bg-gray-50 hover:bg-gray-100
              py-2.5 pl-11 pr-10
              text-left text-sm text-gray-700
              shadow-sm border border-gray-300
              transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-blue-300
            "
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
              {icon}
            </div>

            <span className="block truncate">
              {display(value)}
            </span>

            <ChevronUpDownIcon className="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
          </Listbox.Button>

          {/* Options */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options
              className="
                absolute z-20 mt-2 w-full max-h-60 overflow-auto
                rounded-xl bg-white py-2 shadow-xl
                ring-1 ring-black/5 text-sm focus:outline-none
              "
            >
              {options.map((opt, i) => (
                <Listbox.Option key={i} value={opt.value}>
                  {({ selected }) => (
                    <div
                      className={`
                        cursor-pointer select-none px-4 py-2 rounded-lg
                        ${selected ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}
                      `}
                    >
                      {opt.label}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 mb-6">
      <div className="flex flex-wrap items-end gap-5 w-full">

        {/* LEFT SIDE */}
        <div className="flex flex-wrap items-end gap-5 flex-grow">

          {/* Start Date */}
          <div className="relative w-48">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Start Date
            </label>
            <FaCalendarAlt className="absolute left-3 top-8 text-gray-400 text-sm" />
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 shadow-sm"
            />
          </div>

          {/* End Date */}
          <div className="relative w-48">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              End Date
            </label>
            <FaCalendarAlt className="absolute left-3 top-8 text-gray-400 text-sm" />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 shadow-sm"
            />
          </div>

          {/* Start Time */}
          <div className="relative w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Start Time
            </label>
            <FaClock className="absolute left-3 top-9 text-gray-400 text-sm" />
            <input
              type="time"
              name="startTime"
              value={filters.startTime}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 shadow-sm"
            />
          </div>

          {/* End Time */}
          <div className="relative w-40">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              End Time
            </label>
            <FaClock className="absolute left-3 top-9 text-gray-400 text-sm" />
            <input
              type="time"
              name="endTime"
              value={filters.endTime}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 shadow-sm"
            />
          </div>

          {/* Department Dropdown */}
          <Dropdown
            label="Department"
            value={filters.department}
            onChange={(v) => setFilters({ ...filters, department: v })}
            icon={<FaBuilding />}
            options={[
              { label: "All Departments", value: "" },
              ...departments.map((d) => ({
                label: d.department,
                value: d.department,
              })),
            ]}
            display={(v) => (v ? v : "All Departments")}
          />

          {/* User Dropdown */}
          <Dropdown
            label="User"
            value={filters.user}
            onChange={(v) => setFilters({ ...filters, user: v })}
            icon={<FaUser />}
            options={[
              { label: "All Users", value: "" },
              ...users.map((u) => ({
                label: `${u.name} (${u.agent_code})`,
                value: u.agent_code,
              })),
            ]}
            display={(v) =>
              v
                ? users.find((u) => u.agent_code === v)?.name || v
                : "All Users"
            }
          />
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => onApply(filters)}
            className="
              flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
              bg-gradient-to-r from-blue-500 to-cyan-500 text-white
              shadow-md hover:shadow-lg transition-all
            "
          >
            <FaFilter />
            Apply
          </button>

          <button
            onClick={handleClear}
            className="
              flex items-center border border-gray-300 gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
              bg-gray-100 hover:bg-gray-200 text-gray-700
              transition-all shadow-sm
            "
          >
            <FaTimes />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
