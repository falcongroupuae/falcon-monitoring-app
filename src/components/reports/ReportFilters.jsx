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
import { getMetaDepartments } from "../../api/commonApi"; // <-- your API

export default function ReportFilters({ onApply }) {
  const [filters, setFilters] = useState({
    report: "events",
    agent_code: "",
    department: "",
    start_date: "",
    end_date: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loadingDeps, setLoadingDeps] = useState(false);

  const reportOptions = [
    { label: "Events", value: "events" },
    { label: "User Daily", value: "user-daily" },
    { label: "Department Summary", value: "department-summary" },
    { label: "User Productivity", value: "user-productivity" },
    { label: "User Top Sites", value: "user-top-sites" },
    { label: "User Top Apps", value: "user-top-apps" },
    { label: "User Overview", value: "user-overview" },
  ];

  /* ---------------------------------------------------
   * Load Departments dynamically from /meta/departments
   * --------------------------------------------------- */
  useEffect(() => {
    loadDepartments();
  }, [filters.start_date, filters.end_date]);

  const loadDepartments = async () => {
    try {
      setLoadingDeps(true);

      const start_dt = filters.start_date || null;
      const end_dt = filters.end_date || null;

      const res = await getMetaDepartments({ start_dt, end_dt });

      setDepartments(res.data || []);
    } catch (err) {
      console.error("Failed to load departments:", err);
      setDepartments([]);
    } finally {
      setLoadingDeps(false);
    }
  };

  /* ---------------------- Dropdown ---------------------- */
  const Dropdown = ({ label, icon, options, value, onChange }) => (
    <div className="w-full md:w-64">
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-50 hover:bg-gray-100 py-2.5 pl-11 pr-10 text-left text-sm border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
              {icon}
            </span>

            <span className="block truncate">
              {options.find((o) => o.value === value)?.label || "Select"}
            </span>

            <ChevronUpDownIcon className="absolute right-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 text-sm">
              {options.map((opt) => (
                <Listbox.Option key={opt.value} value={opt.value}>
                  {({ selected }) => (
                    <div
                      className={`cursor-pointer select-none px-4 py-2 rounded-lg ${
                        selected ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
                      }`}
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

  /* ---------------------- Clear / Apply ---------------------- */

  const handleApply = () => {
    onApply(filters);
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">CSV Report Filters</h2>

      <div className="flex flex-wrap gap-6 items-end">
        {/* Report Type */}
        <Dropdown
          label="Report Type"
          icon={<FaFilter />}
          value={filters.report}
          onChange={(v) => setFilters({ ...filters, report: v })}
          options={reportOptions}
        />

        {/* Agent Code → only for per-user reports */}
        {isUserReport && (
          <div className="relative w-full md:w-64">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Agent Code
            </label>
            <FaUser className="absolute left-3 top-[38px] text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="DESKTOP-00-57"
              value={filters.agent_code}
              onChange={(e) =>
                setFilters({ ...filters, agent_code: e.target.value })
              }
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 shadow-sm"
            />
          </div>
        )}

        {/* Department (loaded dynamically) */}
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
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Start Date
          </label>
          <FaCalendarAlt className="absolute left-3 top-[38px] text-gray-400 text-sm" />
          <input
            type="datetime-local"
            value={filters.start_date}
            onChange={(e) =>
              setFilters({ ...filters, start_date: e.target.value })
            }
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 shadow-sm"
          />
        </div>

        {/* End Date */}
        <div className="relative w-full md:w-48">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            End Date
          </label>
          <FaCalendarAlt className="absolute left-3 top-[38px] text-gray-400 text-sm" />
          <input
            type="datetime-local"
            value={filters.end_date}
            onChange={(e) =>
              setFilters({ ...filters, end_date: e.target.value })
            }
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 shadow-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg text-sm font-semibold"
          >
            <FaFilter /> Apply
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm text-sm font-medium"
          >
            <FaTimes /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}
