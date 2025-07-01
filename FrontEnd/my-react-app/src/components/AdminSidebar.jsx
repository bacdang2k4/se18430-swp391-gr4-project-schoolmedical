"use client"

import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CogIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import logo from "../../images/logo-removebg.png"
import { getProfile } from "../api/axios"

const menuItems = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    path: "/dashboard",
    color: "text-blue-600",
  },
  {
    title: "Quản lý người dùng",
    icon: UsersIcon,
    path: "/admin/users",
    color: "text-blue-600",
  },
  {
    title: "Hồ sơ sức khỏe",
    icon: DocumentTextIcon,
    path: "/admin/health-records",
    color: "text-green-600",
  },
  {
    title: "Quản lý nội dung",
    icon: DocumentTextIcon,
    path: "/admin/content",
    color: "text-teal-600",
  },
  {
    title: "Quản lý thuốc",
    icon: BeakerIcon,
    path: "/admin/medicines",
    color: "text-cyan-600",
  },
  {
    title: "Sự kiện y tế",
    icon: ExclamationTriangleIcon,
    path: "/admin/medical-events",
    color: "text-orange-600",
  },
  {
    title: "Tiêm chủng",
    icon: ShieldCheckIcon,
    path: "/admin/vaccinations",
    color: "text-purple-600",
  },
  {
    title: "Kiểm tra y tế",
    icon: ClipboardDocumentCheckIcon,
    path: "/admin/medical-checkups",
    color: "text-indigo-600",
  },
  {
    title: "Lịch sử y tế",
    icon: ClockIcon,
    path: "/admin/medical-history",
    color: "text-pink-600",
  },
  {
    title: "Hệ thống",
    icon: CogIcon,
    path: "/admin/system",
    color: "text-gray-600",
  },
  {
    title: "Báo cáo",
    icon: ChartBarIcon,
    path: "/admin/reports",
    color: "text-red-600",
  },
]

function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setFirstName(data.result.firstName || "")
        setLastName(data.result.lastName || "")
      } catch {
        setFirstName("")
        setLastName("")
      }
    }
    fetchProfile()
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button onClick={toggleMobile} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md">
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobile} />}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 
          ${isCollapsed ? "w-16" : "w-64"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-2">
                <img src={logo || "/placeholder.svg"} alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-gray-800">Admin Panel</span>
                <span className="text-xs text-gray-500">Y tế học đường</span>
              </div>
            </div>
          )}

          {/* Collapse button - Desktop only */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Close button - Mobile only */}
          <button onClick={toggleMobile} className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                    title={isCollapsed ? item.title : ""}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : item.color}`} />
                    {!isCollapsed && <span className="font-medium text-sm">{item.title}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {(lastName || firstName) ? (lastName[0] || firstName[0] || "A") : "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {(lastName || firstName) ? `${lastName} ${firstName}` : "Admin User"}
                </p>
                {/* Nếu có email trong profile thì hiển thị, không thì để trống hoặc mặc định */}
                {/* <p className="text-xs text-gray-500 truncate">{email || "admin@school.edu.vn"}</p> */}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {(lastName || firstName) ? (lastName[0] || firstName[0] || "A") : "A"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
