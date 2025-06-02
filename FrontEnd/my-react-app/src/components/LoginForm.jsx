import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../public/images/background-login.png";
import api from "../api/axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/v1/auth/login", {
        email,
        password,
      });

      const { token, refreshToken, enabled } = response.data.result;

      if (enabled === true) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/dashboard");
      } 
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      
      navigate("/verify", { state: { email } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 xl:px-16">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-center font-serif font-semibold text-gray-800 mb-1">
              SCHOOL MEDICAL SYSTEM
            </h1>
            <p className="text-gray-600 text-xl text-center font-serif">
              System
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-medium text-center text-blue-600 mb-6">
              Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              ©2025 SWP391 Group 4 All Rights Reserved
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:flex flex-1 h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center w-full h-full">
          <div className="relative w-full h-full">
            <img
              src={bg}
              alt="Doctor"
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
