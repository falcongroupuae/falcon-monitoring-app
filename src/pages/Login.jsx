import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "/src/assets/images/login_bg.jpg";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (loggedIn) navigate("/", { replace: true });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (email === "admin@falcongroup.com" && password === "Falcon@2025") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/", { replace: true });
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        {/* Left Image Section */}
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
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
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="admin@falcongroup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                    {/* Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3  text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="mt-4 text-sm text-red-500 text-center">
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform 
                    bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
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
