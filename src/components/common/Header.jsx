import { useState, useEffect } from "react";
import profileImg from "../../assets/falcon-img.jpeg";
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

  // 🔹 Dark mode state: localStorage + system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;

    // fallback to system preference
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // 🔹 Sync .dark class on <html> and persist setting
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="h-18 bg-gray-200 dark:bg-gray-900/70 sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section - Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2.5 rounded-lg transition-colors duration-200 group hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Toggle sidebar"
          >
            <FaBarsStaggered className="text-gray-800 dark:text-gray-100 group-hover:text-red-600 text-lg transition-colors" />
          </button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* 🌙 Dark mode toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <MdOutlineNightlight
              className={`text-lg transition-colors ${
                darkMode
                  ? "text-yellow-300"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            />
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 py-1.5 transition-colors duration-200"
            >
              <img
                src={profileImg}
                alt="Falcon Icon"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Admin Falcon
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  admin@falcongroup.com
                </p>
              </div>
              <FaChevronDown
                className={`text-gray-400 dark:text-gray-300 text-xs transition-transform ${
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
                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                  <div className="p-2 border-gray-200 dark:border-gray-700">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
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
