"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  BellIcon, 
  UserCircleIcon, 
  ChevronDownIcon, 
  XMarkIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  HomeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline"
import { 
  BellIcon as BellIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  StarIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid"
import { useNavigate, useLocation } from "react-router-dom"
import logo from "../../images/logo-removebg.png"
import { logoutUser } from "../utils/auth"
import { getProfile } from "../api/axios"

// Modern color system
const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    900: '#0c4a6e'
  },
  success: {
    50: '#f0fdf4',
    500: '#10b981',
    600: '#059669'
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706'
  },
  danger: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626'
  },
  medical: {
    primary: '#0ea5e9',
    secondary: '#10b981',
    accent: '#8b5cf6'
  }
}

// Streamlined features by role
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

// Sample notifications
const sampleNotifications = [
  {
    id: 1,
    icon: ShieldCheckIcon,
    title: "Lịch tiêm chủng mới",
    desc: "Vaccine phòng cúm cho học sinh khối 6-7 vào ngày 15/06/2025",
    time: "2 giờ trước",
    isRead: false,
    priority: "high",
    category: "Tiêm chủng"
  },
  {
    id: 2,
    icon: HeartIcon,
    title: "Kết quả kiểm tra sức khỏe",
    desc: "Kết quả kiểm tra định kỳ đã có, vui lòng xem chi tiết",
    time: "1 ngày trước",
    isRead: false,
    priority: "medium",
    category: "Sức khỏe"
  },
  {
    id: 3,
    icon: ExclamationTriangleIcon,
    title: "Nhắc nhở uống thuốc",
    desc: "Thuốc dị ứng sẽ hết vào ngày mai, cần chuẩn bị thuốc mới",
    time: "2 ngày trước",
    isRead: true,
    priority: "low",
    category: "Thuốc"
  },
]

// Navigation items
const navItems = [
  { name: "Trang chủ", path: "/", icon: HomeIcon },
  { name: "Tài liệu", path: "/documents", icon: DocumentTextIcon },
  { name: "Blog", path: "/blog", icon: ChatBubbleLeftRightIcon },
  { name: "Liên hệ", path: "/contact", icon: PhoneIcon },
]

function HeaderForm() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // State management
  const [showNotifications, setShowNotifications] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState({ firstName: "", lastName: "", role: "" })
  
  // Refs
  const notificationRef = useRef(null)
  const featureRef = useRef(null)
  const accountRef = useRef(null)
  const searchRef = useRef(null)
  
  // Computed values
  const unreadCount = sampleNotifications.filter(n => !n.isRead).length
  const features = user.role && ROLE_FEATURES[user.role] ? ROLE_FEATURES[user.role] : []
  const isLoggedIn = user.firstName || user.lastName

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setUser({
          firstName: data.result.firstName || "",
          lastName: data.result.lastName || "",
          role: data.result.role || ""
        })
      } catch {
        setUser({ firstName: "", lastName: "", role: "" })
      }
    }
    fetchProfile()
  }, [])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccount(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (featureRef.current && !featureRef.current.contains(event.target)) {
        setShowFeatures(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto-focus search
  useEffect(() => {
    if (showSearch && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100)
    }
  }, [showSearch])

  // Handlers
  const handleFeatureClick = (feature) => {
    navigate(feature.path)
    setShowFeatures(false)
    setShowMobileMenu(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  const isActive = (path) => location.pathname === path

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/30'
      case 'medium': return 'border-l-amber-500 bg-amber-50/30'
      case 'low': return 'border-l-emerald-500 bg-emerald-50/30'
      default: return 'border-l-gray-300'
    }
  }

  return (
    <>
      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <img 
                    src={logo || "/placeholder.svg"} 
                    alt="Logo" 
                    className="w-6 h-6 object-contain filter brightness-0 invert" 
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Y TẾ HỌC ĐƯỜNG
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  FPT University HCM
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      active 
                        ? 'text-sky-600 bg-sky-50 shadow-sm' 
                        : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </button>
                )
              })}
              
              {/* Features Dropdown */}
              <div className="relative" ref={featureRef}>
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-sky-600 hover:bg-sky-50/50 transition-all duration-200"
                >
                  <SparklesIcon className="w-4 h-4" />
                  <span className="text-sm">Chức năng</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showFeatures ? 'rotate-180' : ''}`} />
                </button>
                
                {showFeatures && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">
                          Chức năng theo vai trò
                        </h4>
                        <p className="text-xs text-gray-500">
                          Truy cập nhanh các tính năng chính
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        {features.length > 0 ? features.map((feature, idx) => {
                          const Icon = feature.icon
                          return (
                            <button
                              key={idx}
                              onClick={() => handleFeatureClick(feature)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                            >
                              <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                                <Icon className={`w-5 h-5 ${feature.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-gray-800 group-hover:text-sky-600 transition-colors">
                                  {feature.title}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  {feature.description}
                                </div>
                              </div>
                            </button>
                          )
                        }) : (
                          <button
                            onClick={() => {
                              navigate("/login")
                              setShowFeatures(false)
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <UserCircleIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-700">
                                Đăng nhập để sử dụng
                              </div>
                              <div className="text-xs text-gray-500">
                                Truy cập đầy đủ tính năng
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              
              {/* Search */}
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-gray-500 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200"
                aria-label="Tìm kiếm"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-gray-500 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200"
                  aria-label="Thông báo"
                >
                  {unreadCount > 0 ? (
                    <BellIconSolid className="w-5 h-5 text-sky-600" />
                  ) : (
                    <BellIcon className="w-5 h-5" />
                  )}
                  
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">Thông báo</h4>
                        <span className="text-sm text-gray-500">
                          {unreadCount > 0 ? `${unreadCount} mới` : 'Không có mới'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {sampleNotifications.map((notification) => {
                        const Icon = notification.icon
                        return (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${
                              notification.isRead ? 'border-l-transparent' : getPriorityColor(notification.priority)
                            }`}
                          >
                            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-sky-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h5 className={`font-medium text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
                                  {notification.title}
                                </h5>
                                {notification.priority === 'high' && !notification.isRead && (
                                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium">
                                    Khẩn cấp
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                {notification.desc}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">{notification.time}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                                    {notification.category}
                                  </span>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Footer */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => {
                          navigate("/notifications")
                          setShowNotifications(false)
                        }}
                        className="w-full text-sky-600 text-sm font-medium hover:text-sky-700 transition-colors py-1"
                      >
                        Xem tất cả thông báo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Account */}
              <div className="relative" ref={accountRef}>
                {isLoggedIn ? (
                  <button
                    onClick={() => setShowAccount(!showAccount)}
                    className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-lg px-3 py-2 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <UserCircleIconSolid className="w-5 h-5" />
                    <div className="hidden sm:block text-left">
                      <div className="font-medium text-sm truncate max-w-20">
                        {user.lastName} {user.firstName}
                      </div>
                      <div className="text-xs opacity-80 capitalize">
                        {user.role?.toLowerCase()}
                      </div>
                    </div>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showAccount ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Đăng nhập
                  </button>
                )}

                {showAccount && isLoggedIn && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-lg mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <UserCircleIconSolid className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">
                            {user.lastName} {user.firstName}
                          </div>
                          <div className="text-xs text-gray-600 capitalize flex items-center gap-1">
                            <CheckBadgeIcon className="w-3 h-3 text-emerald-500" />
                            {user.role?.toLowerCase()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            navigate("/profile")
                            setShowAccount(false)
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 hover:text-sky-600 flex items-center gap-2"
                        >
                          <UserCircleIcon className="w-4 h-4" />
                          Hồ sơ cá nhân
                        </button>
                        
                        <hr className="my-2 border-gray-200" />
                        <button
                          onClick={() => logoutUser(navigate)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium text-red-600 flex items-center gap-2"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-sky-600 hover:bg-sky-50 transition-all duration-200"
                aria-label="Menu"
              >
                {showMobileMenu ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {/* Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path)
                      setShowMobileMenu(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      active 
                        ? 'text-sky-600 bg-sky-50' 
                        : 'text-gray-700 hover:text-sky-600 hover:bg-sky-50/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
              
              {/* Mobile Features */}
              <div className="pt-4 border-t border-gray-200">
                <p className="px-4 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Chức năng
                </p>
                <div className="space-y-1">
                  {features.length > 0 ? features.map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <button
                        key={idx}
                        onClick={() => handleFeatureClick(feature)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-sky-600"
                      >
                        <div className={`w-8 h-8 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${feature.color}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm">{feature.title}</div>
                          <div className="text-xs text-gray-500">{feature.description}</div>
                        </div>
                      </button>
                    )
                  }) : (
                    <button
                      onClick={() => {
                        navigate("/login")
                        setShowMobileMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-sky-600"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <UserCircleIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">Đăng nhập để sử dụng</div>
                        <div className="text-xs text-gray-500">Truy cập đầy đủ tính năng</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setShowSearch(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200/50 animate-in slide-in-from-top-4 duration-300">
            <form onSubmit={handleSearch} className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-5 h-5 text-white" />
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm thông tin y tế, tài liệu, blog..."
                  className="flex-1 bg-transparent border-none outline-none text-lg placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {/* Search Suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {['Tiêm chủng', 'Kiểm tra sức khỏe', 'Thuốc', 'Dinh dưỡng', 'An toàn'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-sm hover:bg-sky-100 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderForm