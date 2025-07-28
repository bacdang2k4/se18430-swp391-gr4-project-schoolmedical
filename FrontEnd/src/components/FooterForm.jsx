import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  SparklesIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { getProfile } from "../api/axios";

// Role-based features (copy from HeaderForm.jsx for consistency)
const ROLE_FEATURES = {
  PARENT: [
    { 
      icon: HeartIcon, 
      title: "Hồ sơ sức khỏe", 
      path: "/parent/health-record", 
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      description: "Theo dõi sức khỏe con em"
    },
    { 
      icon: SparklesIcon, 
      title: "Gửi thuốc", 
      path: "/parent/medical-send-history", 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Đăng ký gửi thuốc"
    },
    { 
      icon: ShieldCheckIcon, 
      title: "Tiêm chủng", 
      path: "/parent/medical-vaccine", 
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      description: "Lịch tiêm chủng"
    },
    { 
      icon: ClockIcon, 
      title: "Kiểm tra y tế", 
      path: "/parent/health-checkup", 
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Lịch khám định kỳ"
    },
    { 
      icon: CalendarDaysIcon, 
      title: "Sự kiện y tế", 
      path: "/parent/event-in-school", 
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      description: "Xem sự kiện y tế trong trường"
    },
  ],
  NURSE: [
    { 
      icon: HeartIcon, 
      title: "Hồ sơ học sinh", 
      path: "/nurse/list-health-records", 
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      description: "Quản lý hồ sơ sức khỏe"
    },
    { 
      icon: SparklesIcon, 
      title: "Quản lý thuốc", 
      path: "/nurse/list-medical-send", 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Xử lý thuốc từ phụ huynh"
    },
    { 
      icon: ShieldCheckIcon, 
      title: "Tiêm chủng", 
      path: "/nurse/vaccination", 
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      description: "Quản lý tiêm chủng"
    },
    { 
      icon: ClockIcon, 
      title: "Kiểm tra y tế", 
      path: "/nurse/health-checkup", 
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Quản lý kiểm tra sức khỏe"
    },
    { 
      icon: CalendarDaysIcon, 
      title: "Sự kiện y tế", 
      path: "/nurse/event-in-school", 
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      description: "Quản lý sự kiện y tế"
    },
    { 
      icon: DocumentTextIcon, 
      title: "Kho vật tư", 
      path: "/nurse/warehouse", 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Quản lý vật tư y tế"
    },
  ],
  ADMIN: [
    { 
      icon: Cog6ToothIcon, 
      title: "Dashboard", 
      path: "/admin/dashboard", 
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Quản trị hệ thống"
    },
  ]
}

function FooterForm() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("PARENT");

  // Fetch user profile to get role
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUserRole(data.result.role || "PARENT");
      } catch {
        setUserRole("PARENT");
      }
    };
    fetchProfile();
  }, []);

  const features = userRole && ROLE_FEATURES[userRole] ? ROLE_FEATURES[userRole] : ROLE_FEATURES.PARENT;

  const handleFeatureClick = (feature) => {
    navigate(feature.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* School Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  Y TẾ HỌC ĐƯỜNG
                </h3>
                <p className="text-xs text-gray-400">FPT University HCM</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Hệ thống quản lý y tế học đường thông minh, đảm bảo sức khỏe toàn diện cho học sinh với công nghệ hiện đại và quy trình chuyên nghiệp.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <PhoneIcon className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <EnvelopeIcon className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <MapPinIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links - Role-based */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-sky-400" />
              Chức năng chính
            </h4>
            <div className="space-y-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleFeatureClick(feature)}
                    className="flex items-center gap-3 text-gray-300 hover:text-sky-400 transition-colors duration-300 group w-full text-left"
                  >
                    <div className="w-2 h-2 bg-sky-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span>{feature.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-emerald-400" />
              Tài nguyên
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => {
                  navigate("/blog");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors duration-300 group w-full text-left"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span>Blog chia sẻ</span>
              </button>
              <button
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors duration-300 group w-full text-left"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span>Liên hệ hỗ trợ</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-purple-400" />
              Liên hệ
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Điện thoại</p>
                  <p className="text-white font-medium">0352437611</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <EnvelopeIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">bacddse180351@fpt.edu.vn</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Địa chỉ</p>
                  <p className="text-white font-medium">FPT University HCMC</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Giờ làm việc</p>
                  <p className="text-white font-medium">7:00 - 17:00 (T2-T6)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 Hệ thống quản lý y tế học đường - FPT University HCM. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={() => {
                  navigate("/privacy");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
              >
                Chính sách bảo mật
              </button>
              <button
                onClick={() => {
                  navigate("/terms");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
              >
                Điều khoản sử dụng
              </button>
              <button
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
              >
                Liên hệ
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterForm;