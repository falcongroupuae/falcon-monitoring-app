import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartBar, FaUsers, FaBuilding, FaFileAlt, FaHistory, FaCog } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const menuItems = [
  { name: "Dashboard", icon: <MdSpaceDashboard />, path: "/" },
  { name: "Statistics", icon: <FaChartBar />, path: "/statistics" },
  { name: "Users", icon: <FaUsers />, path: "/users" },
  // { name: "Company", icon: <FaBuilding />, path: "/company" },
  { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
  // { name: "Activity", icon: <FaHistory />, path: "/activity" },
];

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  return (
    <div 
      className={`h-screen bg-gray-200 ${
        collapsed ? "w-20 " : "w-64"
      } transition-all duration-300 ease-in-out flex flex-col relative shadow-xl border-r border-gray-200`}
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
            <img 
              src="/falcon-group-name-black-logo.png" 
              alt="Falcon Logo" 
              className="h-8 w-auto object-contain"
            />
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
                group relative flex items-center  gap-4 py-3 px-4 rounded-md
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? "bg-gradient-to-r from-red-700 justify-start to-red-600 shadow-lg shadow-blue-200/50" 
                  : " hover:translate-x-3"
                }
              `}
            >
              {/* Active indicator */}
              {/* {isActive && (
                <div className="absolute right-4 animate-ping rounded-full top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-r-full"></div>
              )} */}
              
              {/* Icon */}
              <span 
                className={`text-xl transition-all duration-200 ${
                  isActive 
                    ? "text-white scale-110" 
                    : "text-gray-800 group-hover:text-red-600 group-hover:scale-110"
                }`}
              >
                {item.icon}
              </span>
              
              {/* Text */}
              {!collapsed && (
                <span 
                  className={`font-medium transition-all duration-200 ${
                    isActive ? "text-white" : "text-gray-800 group-hover:text-red-600"
                  }`}
                >
                  {item.name}
                </span>
              )}

              {/* Hover effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/0 group-hover:from-red-100/50 group-hover:to-red-100/50 rounded-xl transition-all duration-200"></div>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-6 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl border border-gray-700 z-50">
                  {item.name}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-800"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center p-3 rounded-xl  hover:bg-gray-100 transition-all duration-200 cursor-pointer ${collapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 flex items-center justify-center font-bold text-gray-800">
            <FaCog/>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 truncate">Falcon Group </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}