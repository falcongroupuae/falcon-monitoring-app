import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";

import {
  FaFilter,
  FaTimes,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { getMetaDepartments, getMetaUsers } from "../../api/commonApi";

export default function ReportFilters({ onApply }) {
  const [filters, setFilters] = useState({
    report: "events",
    agent_code: "",
    department: "",
    start_date: "",
    end_date: "",
  });

  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingDeps, setLoadingDeps] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const reportOptions = [
    { label: "Events", value: "events" },
    { label: "User Daily", value: "user-daily" },
    { label: "Department Summary", value: "department-summary" },
    { label: "User Productivity", value: "user-productivity" },
    { label: "User Top Sites", value: "user-top-sites" },
    { label: "User Top Apps", value: "user-top-apps" },
    { label: "User Overview", value: "user-overview" },
  ];

  useEffect(() => {
    loadDepartments();
  }, [filters.start_date, filters.end_date]);

  const loadDepartments = async () => {
    try {
      setLoadingDeps(true);
      const res = await getMetaDepartments({
        start_dt: filters.start_date || null,
        end_dt: filters.end_date || null,
      });
      setDepartments(res.data || []);
    } finally {
      setLoadingDeps(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filters.department]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await getMetaUsers({
        department: filters.department || null,
      });
      setUsers(res.data || []);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (!filters.agent_code || users.length === 0) return;

    const selectedUser = users.find(
      (u) => u.agent_code === filters.agent_code
    );

    if (
      selectedUser &&
      selectedUser.department &&
      selectedUser.department !== filters.department
    ) {
      setFilters((prev) => ({
        ...prev,
        department: selectedUser.department,
      }));
    }
  }, [filters.agent_code, users]);

  /* ---------------- DROPDOWN ---------------- */
  const Dropdown = ({ label, icon, options, value, onChange }) => (
    <div className="w-full md:w-64">
      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 py-2.5 pl-11 pr-10 text-left text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-100 shadow-sm transition-colors">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
            <span className="block truncate">
              {options.find((o) => o.value === value)?.label || "Select"}
            </span>
            <ChevronUpDownIcon className="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
          </Listbox.Button>

          <Transition as={Fragment}>
            <Listbox.Options className="absolute z-20 mt-2 w-full max-h-60 overflow-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
              {options.map((opt) => (
                <Listbox.Option key={opt.value} value={opt.value}>
                  {({ selected }) => (
                    <div
                      className={`px-4 py-2 cursor-pointer text-sm ${
                        selected
                          ? "bg-blue-100 dark:bg-blue-900/40 font-semibold"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      } text-gray-800 dark:text-gray-200`}
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

  const handleApply = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    onApply(cleanFilters);
  };

  const handleClear = () => {
    setFilters({
      report: "events",
      agent_code: "",
      department: "",
      start_date: "",
      end_date: "",
    });
  };

  const isUserReport = [
    "user-productivity",
    "user-top-sites",
    "user-top-apps",
    "user-overview",
  ].includes(filters.report);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 p-6 mb-6 transition-colors">
      <div className="flex flex-wrap gap-6 items-end">
        <Dropdown
          label="Report Type"
          icon={<FaFilter />}
          value={filters.report}
          onChange={(v) => setFilters({ ...filters, report: v })}
          options={reportOptions}
        />

        {isUserReport && (
          <Dropdown
            label="User"
            icon={<FaUser />}
            value={filters.agent_code}
            onChange={(v) => setFilters({ ...filters, agent_code: v })}
            options={[
              { label: loadingUsers ? "Loading..." : "All Users", value: "" },
              ...users.map((u) => ({
                label: `${u.name} (${u.agent_code})`,
                value: u.agent_code,
              })),
            ]}
          />
        )}

        <Dropdown
          label="Department"
          icon={<FaBuilding />}
          value={filters.department}
          onChange={(v) => setFilters({ ...filters, department: v })}
          options={[
            { label: loadingDeps ? "Loading..." : "All Departments", value: "" },
            ...departments.map((d) => ({
              label: d.department,
              value: d.department,
            })),
          ]}
        />

        {/* Start Date */}
        <div className="relative w-full md:w-48">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <FaCalendarAlt className="absolute left-3 top-[38px] text-gray-400" />
          <input
            type="datetime-local"
            value={filters.start_date}
            onChange={(e) =>
              setFilters({ ...filters, start_date: e.target.value })
            }
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-colors"
          />
        </div>

        {/* End Date */}
        <div className="relative w-full md:w-48">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <FaCalendarAlt className="absolute left-3 top-[38px] text-gray-400" />
          <input
            type="datetime-local"
            value={filters.end_date}
            onChange={(e) =>
              setFilters({ ...filters, end_date: e.target.value })
            }
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-colors"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md text-sm font-semibold"
          >
            <FaFilter /> Apply
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
          >
            <FaTimes /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}
