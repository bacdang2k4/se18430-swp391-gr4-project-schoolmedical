import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  EyeIcon, 
  EyeSlashIcon, 
  LockClosedIcon, 
  UserIcon,
  ShieldCheckIcon,
  HeartIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import bg from "../../images/background-login.png";
import api from "../api/axios";
import { setTokens, removeTokens } from "../utils/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Xóa token cũ trước khi đăng nhập mới
    removeTokens();
    setIsLoading(true);
    setErrorMsg(""); // Reset lỗi trước khi login
    
    try {
      const response = await api.post("/v1/auth/login", {
        email,
        password,
      });

      const { token, refreshToken, enabled, role } = response.data.result;

      if (enabled === true) {
        setTokens(token, refreshToken);
        localStorage.setItem('role', role);
        
        // Remember me functionality
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        console.error("Account is not enabled.");
        navigate("/verify", { state: { email } });
      }
    } catch (error) {
      // Lấy message từ API nếu có
      const apiMsg = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setErrorMsg(apiMsg);
      console.error("Login error:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const features = [
    {
      icon: HeartIcon,
      title: "Quản lý sức khỏe",
      desc: "Theo dõi toàn diện"
    },
    {
      icon: ShieldCheckIcon,
      title: "Bảo mật cao",
      desc: "Dữ liệu được mã hóa"
    },
    {
      icon: AcademicCapIcon,
      title: "Dễ sử dụng",
      desc: "Giao diện thân thiện"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm mx-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
            </div>
            <p className="text-gray-700 mt-4 font-medium">Đang đăng nhập...</p>
            <p className="text-gray-500 text-sm mt-1">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      )}
      
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-12">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <HeartIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hệ thống Y tế Học đường
            </h1>
            <p className="text-gray-600 text-lg">
              Quản lý sức khỏe thông minh
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Chào mừng trở lại
              </h2>
              <p className="text-gray-600">
                Đăng nhập để tiếp tục sử dụng hệ thống
              </p>
            </div>

            {/* Success Message */}
            {location.state?.verified && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Xác thực thành công!</p>
                  <p className="text-green-600 text-sm">Vui lòng đăng nhập để tiếp tục.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Đăng nhập thất bại</p>
                  <p className="text-red-600 text-sm">{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => navigate("/forgot-password")}
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">hoặc</span>
                </div>
              </div>

              {/* Home Page Button */}
              <button
                type="button"
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 font-semibold border border-gray-200"
                onClick={() => navigate('/')}
              >
                Về trang chủ
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-2">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              ©2025 SWP391 Group 4. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-10"></div>
        <img
          src={bg}
          alt="Medical professionals"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Chăm sóc sức khỏe học sinh
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Hệ thống quản lý y tế hiện đại, đảm bảo sức khỏe toàn diện cho học sinh với công nghệ tiên tiến
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-8 h-8 text-white" />
                  <div className="text-left">
                    <h3 className="font-semibold">Bảo mật tuyệt đối</h3>
                    <p className="text-sm opacity-80">Dữ liệu được mã hóa và bảo vệ</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <HeartIcon className="w-8 h-8 text-white" />
                  <div className="text-left">
                    <h3 className="font-semibold">Chăm sóc 24/7</h3>
                    <p className="text-sm opacity-80">Hỗ trợ y tế liên tục</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}