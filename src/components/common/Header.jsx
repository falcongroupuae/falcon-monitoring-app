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

          {/* Settings */}
          {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <MdOutlineNightlight className="text-gray-600 text-lg" />
          </button> */}

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
                  {/* <div className="p-4 border-b flex gap-2 border-gray-200">
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
                  </div> */}
                  {/* <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaUser className="text-gray-500" />
                      Edit Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaCog className="text-gray-500" />
                      Account Setting
                    </button>
                  </div> */}
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
