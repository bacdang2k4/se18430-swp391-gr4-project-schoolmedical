import React, { useState, useRef, useEffect } from "react";
import { BellIcon, UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import logo from "../../public/images/logo-removebg.png";

const FEATURES = [
  { icon: "👨‍👩‍👧‍👦", title: "Hồ sơ sức khỏe" },
  { icon: "💊", title: "Quản lý thuốc" },
  { icon: "🚨", title: "Xử lý sự kiện y tế" },
  { icon: "💉", title: "Tiêm chủng" },
  { icon: "🩺", title: "Kiểm tra y tế định kỳ" },
  { icon: "📊", title: "Báo cáo & Thống kê" },
];

const notifications = [
  {
    icon: "💉",
    title: "Thông báo tiêm chủng",
    desc: "Lịch tiêm vaccine phòng cúm cho học sinh khối 6-7 vào ngày 10/06/2025",
    time: "2 giờ trước",
    color: "bg-cyan-400 bg-gradient-to-br from-cyan-400 to-cyan-600",
  },
  {
    icon: "🩺",
    title: "Kết quả kiểm tra sức khỏe",
    desc: "Kết quả kiểm tra sức khỏe định kỳ của con bạn đã có. Vui lòng xem chi tiết.",
    time: "1 ngày trước",
    color: "bg-green-400 bg-gradient-to-br from-green-300 to-green-600",
  },
  {
    icon: "⚠️",
    title: "Nhắc nhở uống thuốc",
    desc: "Nhắc nhở: Thuốc dị ứng của em Nguyễn Văn A sẽ hết vào ngày mai",
    time: "2 ngày trước",
    color: "bg-yellow-400 bg-gradient-to-br from-yellow-300 to-orange-400",
  },
];

function HeaderForm() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeatureDropdown, setShowFeatureDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const featureDropdownRef = useRef(null);
  const unreadCount = notifications.length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (featureDropdownRef.current && !featureDropdownRef.current.contains(event.target)) {
        setShowFeatureDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFeatureMouseEnter = () => setShowFeatureDropdown(true);
  const handleFeatureMouseLeave = () => setShowFeatureDropdown(false);
  const handleFeatureClick = () => setShowFeatureDropdown((v) => !v);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 flex items-center px-4 py-2 z-30 sticky top-0">
      {/* Logo + Tên trường */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-2 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-gray-800 tracking-tight">Y TẾ HỌC</span>
          <span className="text-xl font-extrabold text-gray-800 tracking-tight">ĐƯỜNG</span>
          <span className="text-xs text-gray-500 font-medium">Trường THCS Nguyễn Du</span>
        </div>
      </div>
      {/* Menu */}
      <nav className="flex-1 flex justify-center gap-8 md:gap-10">
        <a href="#home" className="text-gray-700 font-semibold hover:text-blue-600 transition">Trang chủ</a>
        <div
          className="relative"
          ref={featureDropdownRef}
          onMouseEnter={handleFeatureMouseEnter}
          onMouseLeave={handleFeatureMouseLeave}
        >
          <button
            className="flex items-center gap-1 text-gray-700 font-semibold hover:text-blue-600 transition focus:outline-none"
            onClick={handleFeatureClick}
            type="button"
          >
            Chức năng <ChevronDownIcon className="w-4 h-4" />
          </button>
          {showFeatureDropdown && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in">
              <ul className="py-2">
                {FEATURES.map((f, idx) => (
                  <li key={idx} className="px-4 py-2 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                    <span className="text-lg">{f.icon}</span> {f.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a href="#documents" className="text-gray-700 font-semibold hover:text-blue-600 transition">Tài liệu</a>
        <a href="#blog" className="text-gray-700 font-semibold hover:text-blue-600 transition">Blog</a>
        <a href="#contact" className="text-gray-700 font-semibold hover:text-blue-600 transition">Liên hệ</a>
      </nav>
      {/* Notification + User */}
      <div className="flex items-center gap-4 min-w-[220px] justify-end relative">
        {/* Bell with badge */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="relative focus:outline-none"
            onClick={() => setShowDropdown((v) => !v)}
            aria-label="Thông báo"
          >
            <BellIcon className="w-8 h-8 text-yellow-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in" style={{minWidth: '320px'}}>
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-bold text-gray-800 mb-1">Thông báo</h4>
                <p className="text-gray-500 text-sm">Bạn có {unreadCount} thông báo mới</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n, idx) => (
                  <div key={idx} className="flex gap-3 items-start px-4 py-3 border-b border-gray-50 hover:bg-blue-50 cursor-pointer group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg text-white ${n.color}`}>{n.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 text-sm mb-1">{n.title}</h5>
                      <p className="text-gray-600 text-xs mb-1">{n.desc}</p>
                      <span className="text-gray-400 text-xs">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-3 text-center border-t border-gray-100">
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Xem tất cả thông báo</a>
              </div>
            </div>
          )}
        </div>
        {/* User */}
        <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl px-4 py-2 gap-2 shadow-md">
          <UserCircleIcon className="w-8 h-8 text-white" />
          <div className="flex flex-col text-white font-semibold text-base leading-tight">
            <span>Acount</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderForm;
