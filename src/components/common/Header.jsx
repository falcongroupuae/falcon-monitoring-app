import { useState } from "react";
import {
  FaBell,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineNightlight } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login", { replace: true });
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, title: "New user registered", time: "5 min ago", unread: true },
    { id: 2, title: "Report generated", time: "1 hour ago", unread: true },
    {
      id: 3,
      title: "System update completed",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-18 bg-gray-200 sticky top-0 z-50 ">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section - Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2.5  rounded-lg transition-colors duration-200 group"
            title="Toggle sidebar"
          >
            <FaBarsStaggered className="text-gray-800 group-hover:text-red-600 text-lg transition-colors" />
          </button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaBell className="text-gray-600 text-lg" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsNotificationOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 font-medium">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <MdOutlineNightlight className="text-gray-600 text-lg" />
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors duration-200"
            >
              <img
                src="/src/assets/images/profile.jpg"
                alt="Falcon Icon"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">Admin Falcon</p>
                <p className="text-xs text-gray-500">admin@falcongroup.com</p>
              </div>
              <FaChevronDown
                className={`text-gray-400 text-xs transition-transform ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsUserMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                  <div className="p-4 border-b flex gap-2 border-gray-200">
                    <div>
                      <img
                        src="/src/assets/images/profile.jpg"
                        alt="Falcon Icon"
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Admin Falcon
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        admin@falcongroup.com
                      </p>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaUser className="text-gray-500" />
                      Edit Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaCog className="text-gray-500" />
                      Account Setting
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
