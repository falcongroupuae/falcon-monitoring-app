import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaBuilding,
  FaFileAlt,
  FaHistory,
  FaCog,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const menuItems = [
  { name: "Dashboard", icon: <MdSpaceDashboard />, path: "/" },
  { name: "Statistics", icon: <FaChartBar />, path: "/statistics" },
  { name: "Users", icon: <FaUsers />, path: "/users" },
  { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
];

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  return (
    <div
      className={`h-screen bg-gray-200 dark:bg-gray-900/70 ${
        collapsed ? "w-20 " : "w-64"
      } transition-all duration-300 ease-in-out flex flex-col relative shadow-xl border-r border-gray-200 dark:border-gray-800`}
    >
      {/* Header */}
      <div className="flex items-center justify-center p-4 gap-3">
        <div className={`flex items-center gap-3 ${collapsed ? "" : "flex-1"}`}>
          <img
            src="/icon.png"
            alt="Falcon Icon"
            className="w-10 h-10 object-contain flex-shrink-0"
          />
          {!collapsed && (
            <>
              <img
                src="/falcon-group-name-black-logo.png"
                alt="Falcon Logo"
                className="h-8 w-auto object-contain block dark:hidden"
              />

              <img
                src="/falcon-group-name-white-logo.png"
                alt="Falcon Logo"
                className="h-8 w-auto object-contain hidden dark:block"
              />
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                group relative flex items-center gap-4 py-3 px-4 rounded-md
                transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-gradient-to-r from-red-700 to-red-600 justify-start shadow-lg shadow-red-500/30"
                    : "hover:translate-x-3"
                }
              `}
            >
              {/* Icon */}
              <span
                className={`text-xl transition-all duration-200 ${
                  isActive
                    ? "text-white scale-110"
                    : "text-gray-800 dark:text-gray-300 group-hover:text-red-600 group-hover:scale-110"
                }`}
              >
                {item.icon}
              </span>

              {/* Text */}
              {!collapsed && (
                <span
                  className={`font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-800 dark:text-gray-300 group-hover:text--red-600 dark:group-hover:text-white"
                  }`}
                >
                  {item.name}
                </span>
              )}

              {/* Hover background */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/0 group-hover:from-red-100/50 group-hover:to-red-100/50 dark:group-hover:from-red-900/30 dark:group-hover:to-red-900/30 rounded-xl transition-all duration-200"></div>
              )}

              {/* Tooltip (collapsed only) */}
              {collapsed && (
                <div className="absolute left-full ml-6 px-3 py-2 bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-100 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl border border-gray-700 z-50">
                  {item.name}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-800 dark:border-r-gray-700"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
