"use client"

import React, { useState, useRef } from "react"
import { BellIcon, UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import logo from "../../images/logo-removebg.png"
import { logout } from "../utils/auth"
import { getProfile } from "../api/axios"

// Cấu hình features cho từng role
const FEATURES_BY_ROLE = {
  PARENT: [
    { icon: "👨‍👩‍👧‍👦", title: "Hồ sơ sức khỏe" },
    { icon: "💊", title: "Gửi thuốc" },
    { icon: "🚨", title: "Xem sự kiện y tế" },
    { icon: "💉", title: "Xem lịch tiêm chủng" },
    { icon: "🩺", title: "Lịch kiểm tra y tế định kỳ" },
  ],
  NURSE: [
    { icon: "👨‍👩‍👧‍👦", title: "Xem hồ sơ sức khỏe học sinh" },
    { icon: "💊", title: "Quản lý thuốc gửi thuốc từ phụ huynh" },
    { icon: "🚨", title: "Xử lý sự kiện y tế" },
    { icon: "💉", title: "Quản lý tiêm chủng" },
    { icon: "🩺", title: "Quản lý kiểm tra y tế định kỳ" },
  ],
  // Thêm các role khác nếu cần
};

const DEFAULT_FEATURES = [
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
]

function HeaderForm() {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showFeatureDropdown, setShowFeatureDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const featureDropdownRef = useRef(null)
  const unreadCount = notifications.length
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const accountDropdownRef = useRef(null)
  const [role, setRole] = useState("")

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setFirstName(data.result.firstName || "")
        setLastName(data.result.lastName || "")
        setRole(data.result.role || "")
      } catch {
        setFirstName("")
        setLastName("")
        setRole("")
      }
    }
    fetchProfile()
    // Đóng dropdown khi click ra ngoài
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Đổi sự kiện của dropdown thông báo (chuông)
  const handleDropdownToggle = () => setShowDropdown((v) => !v)

  // Đổi sự kiện của dropdown chức năng
  const handleFeatureDropdownToggle = () => setShowFeatureDropdown((v) => !v)

  // Tùy biến features theo role
  const features = React.useMemo(() => {
    if (role && FEATURES_BY_ROLE[role]) {
      return FEATURES_BY_ROLE[role];
    }
    return DEFAULT_FEATURES;
  }, [role]);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 flex items-center px-4 py-2 z-30 sticky top-0">
      {/* Logo + Tên trường */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <div className="bg-gradient-to-br from-white-500 to-indigo-200 rounded-xl p-2 flex items-center justify-center">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="w-10 h-10 object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-gray-800 tracking-tight">Y TẾ HỌC</span>
          <span className="text-xl font-bold text-gray-800 tracking-tight">ĐƯỜNG</span>
          <span className="text-xs text-gray-500 font-medium">FPT University HCM</span>
        </div>
      </div>
      {/* Menu */}
      <nav className="flex-1 flex justify-center gap-8 md:gap-10">
        <a href="/" className="text-gray-700 font-semibold hover:text-blue-600 transition">
          Trang chủ
        </a>
        <div className="relative" ref={featureDropdownRef}>
          <button
            className="flex items-center gap-1 text-gray-700 font-semibold hover:text-blue-600 transition focus:outline-none"
            onClick={handleFeatureDropdownToggle}
            type="button"
          >
            Chức năng <ChevronDownIcon className="w-4 h-4" />
          </button>
          {showFeatureDropdown && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in">
              <ul className="py-2">
                {features.map((f, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-blue-50 flex items-center gap-2 cursor-pointer text-gray-700 font-medium"
                    onClick={() => {
                      //Parent features
                      if (f.title === "Hồ sơ sức khỏe") {
                        navigate("/parent/health-record")
                        setShowFeatureDropdown(false)
                      }
                      if (f.title === "Gửi thuốc") {
                        navigate("/parent/medical-send-history")
                        setShowFeatureDropdown(false)
                      }
                      if (f.title === "Xem sự kiện y tế") {
                        navigate("/parent/medical-event")
                        setShowFeatureDropdown(false)
                      }
                      if (f.title === "Xem lịch tiêm chủng") {
                        navigate("/parent/medical-vaccine")
                        setShowFeatureDropdown(false)
                      }
                      if (f.title === "Lịch kiểm tra y tế định kỳ") {
                        navigate("/parent/medical-checkup")
                        setShowFeatureDropdown(false)
                      }

                      //Nurse features
                      if (f.title === "Quản lý thuốc gửi thuốc từ phụ huynh") {
                        navigate("/nurse/medical-send-history")
                        setShowFeatureDropdown(false)
                      }
                      
                    }}
                  >
                    <span className="text-lg">{f.icon}</span> {f.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a href="/documents" className="text-gray-700 font-semibold hover:text-blue-600 transition">
          Tài liệu
        </a>
        <a href="/blog" className="text-gray-700 font-semibold hover:text-blue-600 transition">
          Blog
        </a>
        <a href="/contact" className="text-gray-700 font-semibold hover:text-blue-600 transition">
          Liên hệ
        </a>
      </nav>
      {/* Notification + User */}
      <div className="flex items-center gap-4 min-w-[220px] justify-end relative">
        {/* Bell with badge */}
        <div className="relative" ref={dropdownRef}>
          <button className="relative focus:outline-none" onClick={handleDropdownToggle} aria-label="Thông báo">
            <BellIcon className="w-8 h-8 text-yellow-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          {/* Dropdown */}
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fade-in"
              style={{ minWidth: "320px" }}
            >
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-bold text-gray-800 mb-1">Thông báo</h4>
                <p className="text-gray-500 text-sm">Bạn có {unreadCount} thông báo mới</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-start px-4 py-3 border-b border-gray-50 hover:bg-blue-50 cursor-pointer group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg text-white ${n.color}`}
                    >
                      {n.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 text-sm mb-1">{n.title}</h5>
                      <p className="text-gray-600 text-xs mb-1">{n.desc}</p>
                      <span className="text-gray-400 text-xs">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-3 text-center border-t border-gray-100">
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
                  Xem tất cả thông báo
                </a>
              </div>
            </div>
          )}
        </div>
        {/* User */}
        <div className="relative" ref={accountDropdownRef}>
          <button
            className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl px-4 py-2 gap-2 shadow-md focus:outline-none"
            onClick={() => setShowAccountDropdown((v) => !v)}
            type="button"
          >
            <UserCircleIcon className="w-8 h-8 text-white" />
            <div className="flex flex-col text-white font-semibold text-base leading-tight">
              <span>{lastName + " " + firstName || "Account"}</span>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-white" />
          </button>
          {showAccountDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in">
              <ul className="py-2">
                {lastName || firstName ? (
                  <>
                    <li>
                      <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 font-medium">
                        Xem profile
                      </a>
                    </li>
                    <li>
                      <a href="/change-password" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 font-medium">
                        Đổi mật khẩu
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 font-medium"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 font-medium">
                      Đăng nhập
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderForm
