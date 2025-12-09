import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { loginApi } from "../api/authApi"; // ✅ real API
import { toast } from "react-hot-toast";
import loginBg from "/src/assets/images/login_bg.jpg";

export default function Login() {
  const [username, setUsername] = useState("");       // keeps same UI field
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!username || !password) {
    toast.error("Please enter username and password.");
    return;
  }

  const toastId = toast.loading("Signing in...");

  try {
    const data = await loginApi({
      username,
      password,
    });

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);

    toast.success("Login successful!", { id: toastId });

    navigate("/", { replace: true });
  } catch (err) {
    const status = err.response?.status;

    let message = "Server error. Please try again.";

    if (status === 401) {
      message = "Invalid username or password.";
    } else if (status === 422) {
      message = "Invalid login request.";
    }

    toast.error(message, { id: toastId });
    setError(message); // ✅ keeps inline error too (optional)
  }
};


  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        {/* Left Image Section */}
        <div
          className="hidden relative bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${loginBg})` }}
        >
          <div className="flex items-center h-full px-20 bg-black/30">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Falcon Group Of Companies
              </h2>
              <p className="max-w-xl mt-3 text-white">
                Welcome to Falcon Monitoring Dashboard. Manage your company
                insights and reports securely.
              </p>
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-[12px] text-gray-200">
            Developed by <span className="font-bold">Muhammed Mushraf</span> &{" "}
            <span className="font-bold">Ansil Rahman</span>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <img
                  src="/falcon-logo.png"
                  alt="Falcon Icon"
                  className="w-32 object-contain flex-shrink-0"
                />
              </div>
              <p className="mt-3 text-gray-500">
                Sign in to access your dashboard
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                {/* Email field (acts as username) */}
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="admin1"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md 
                      focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* Password */}
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                    <span className="text-sm text-gray-400 cursor-pointer hover:underline">
                      Forgot password?
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md 
                       focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 text-sm text-red-500 text-center">
                    {error}
                  </p>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform 
                    bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Contact Admin
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
