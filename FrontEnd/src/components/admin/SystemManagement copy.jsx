"use client"

import { useState } from "react"
import {
  CogIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const systemStats = {
  totalUsers: 1247,
  activeUsers: 1156,
  totalStorage: "2.5 GB",
  usedStorage: "1.8 GB",
  uptime: "99.9%",
  lastBackup: "2025-01-07 02:00",
  systemVersion: "v2.1.0",
  databaseSize: "450 MB",
}

const systemLogs = [
  {
    id: 1,
    timestamp: "2025-01-07 14:30:25",
    level: "info",
    module: "Authentication",
    message: "User login successful: admin@school.edu.vn",
    details: "IP: 192.168.1.100, Browser: Chrome",
  },
  {
    id: 2,
    timestamp: "2025-01-07 14:25:10",
    level: "warning",
    module: "Database",
    message: "Database connection timeout, retrying...",
    details: "Connection pool: 8/10 active connections",
  },
  {
    id: 3,
    timestamp: "2025-01-07 14:20:05",
    level: "error",
    module: "File Upload",
    message: "Failed to upload file: document.pdf",
    details: "Error: File size exceeds limit (10MB)",
  },
  {
    id: 4,
    timestamp: "2025-01-07 14:15:30",
    level: "info",
    module: "Backup",
    message: "Automatic backup completed successfully",
    details: "Backup size: 450MB, Duration: 2m 30s",
  },
]

const backupHistory = [
  {
    id: 1,
    date: "2025-01-07 02:00",
    type: "automatic",
    status: "success",
    size: "450 MB",
    duration: "2m 30s",
    location: "Cloud Storage",
  },
  {
    id: 2,
    date: "2025-01-06 02:00",
    type: "automatic",
    status: "success",
    size: "448 MB",
    duration: "2m 25s",
    location: "Cloud Storage",
  },
  {
    id: 3,
    date: "2025-01-05 02:00",
    type: "automatic",
    status: "failed",
    size: "0 MB",
    duration: "0s",
    location: "Cloud Storage",
    error: "Network timeout",
  },
  {
    id: 4,
    date: "2025-01-04 15:30",
    type: "manual",
    status: "success",
    size: "445 MB",
    duration: "2m 15s",
    location: "Local Storage",
  },
]

const logLevels = {
  info: { color: "bg-blue-100 text-blue-800", icon: "ℹ️" },
  warning: { color: "bg-yellow-100 text-yellow-800", icon: "⚠️" },
  error: { color: "bg-red-100 text-red-800", icon: "❌" },
  success: { color: "bg-green-100 text-green-800", icon: "✅" },
}

function SystemManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showBackupModal, setShowBackupModal] = useState(false)

  const handleBackup = () => {
    console.log("Starting manual backup...")
    setShowBackupModal(false)
  }

  const handleClearLogs = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tất cả logs?")) {
      console.log("Clearing system logs...")
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <CogIcon className="w-8 h-8 text-gray-600" />
                  Quản lý hệ thống
                </h1>
                <p className="text-gray-600 mt-1">Giám sát và cấu hình hệ thống</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBackupModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <CloudArrowUpIcon className="w-5 h-5" />
                  Sao lưu ngay
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "overview", label: "Tổng quan", icon: ChartBarIcon },
                  { id: "logs", label: "Nhật ký hệ thống", icon: DocumentTextIcon },
                  { id: "backup", label: "Sao lưu", icon: CloudArrowUpIcon },
                  { id: "users", label: "Người dùng", icon: UserGroupIcon },
                  { id: "security", label: "Bảo mật", icon: ShieldCheckIcon },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "border-gray-500 text-gray-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* System Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                      <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
                    </div>
                    <UserGroupIcon className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                      <p className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</p>
                    </div>
                    <CheckCircleIcon className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Dung lượng sử dụng</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {systemStats.usedStorage}/{systemStats.totalStorage}
                      </p>
                    </div>
                    <DatabaseIcon className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Uptime</p>
                      <p className="text-2xl font-bold text-purple-600">{systemStats.uptime}</p>
                    </div>
                    <ChartBarIcon className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Thông tin hệ thống</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Phiên bản</p>
                    <p className="text-lg font-semibold text-gray-900">{systemStats.systemVersion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Kích thước CSDL</p>
                    <p className="text-lg font-semibold text-gray-900">{systemStats.databaseSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sao lưu cuối</p>
                    <p className="text-lg font-semibold text-gray-900">{systemStats.lastBackup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trạng thái</p>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Hoạt động bình thường
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Thao tác nhanh</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                    <CloudArrowUpIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">Sao lưu dữ liệu</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                    <DatabaseIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">Tối ưu CSDL</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                    <DocumentTextIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">Xem logs</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Nhật ký hệ thống</h3>
                <button
                  onClick={handleClearLogs}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Xóa logs
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mức độ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Module
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thông điệp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chi tiết
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {systemLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.timestamp}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${logLevels[log.level].color}`}
                            >
                              {logLevels[log.level].icon} {log.level.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.module}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "backup" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Lịch sử sao lưu</h3>
                <button
                  onClick={() => setShowBackupModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <CloudArrowUpIcon className="w-5 h-5" />
                  Sao lưu ngay
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kích thước
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vị trí
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {backupHistory.map((backup) => (
                        <tr key={backup.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{backup.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                backup.type === "automatic"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {backup.type === "automatic" ? "Tự động" : "Thủ công"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                backup.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {backup.status === "success" ? "Thành công" : "Thất bại"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{backup.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{backup.duration}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{backup.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Quản lý người dùng hệ thống</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold mb-4">Phiên đăng nhập</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Đang online:</span>
                      <span className="text-sm font-semibold text-green-600">45 người</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hôm nay:</span>
                      <span className="text-sm font-semibold">156 lượt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tuần này:</span>
                      <span className="text-sm font-semibold">892 lượt</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold mb-4">Phân quyền</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Admin:</span>
                      <span className="text-sm font-semibold">5 người</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Y tế:</span>
                      <span className="text-sm font-semibold">12 người</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phụ huynh:</span>
                      <span className="text-sm font-semibold">1,230 người</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold mb-4">Bảo mật</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Đăng nhập thất bại:</span>
                      <span className="text-sm font-semibold text-red-600">3 lần</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tài khoản khóa:</span>
                      <span className="text-sm font-semibold">0 tài khoản</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">2FA kích hoạt:</span>
                      <span className="text-sm font-semibold text-green-600">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Cài đặt bảo mật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold mb-4">Chính sách mật khẩu</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Độ dài tối thiểu</span>
                      <span className="text-sm font-semibold">8 ký tự</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Yêu cầu ký tự đặc biệt</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Bật
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hết hạn sau</span>
                      <span className="text-sm font-semibold">90 ngày</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="font-semibold mb-4">Xác thực 2 yếu tố</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Bắt buộc cho Admin</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Bật
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Khuyến khích cho tất cả</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Bật
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tỷ lệ sử dụng</span>
                      <span className="text-sm font-semibold">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Sao lưu dữ liệu</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại sao lưu</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="full">Sao lưu đầy đủ</option>
                  <option value="incremental">Sao lưu tăng dần</option>
                  <option value="database">Chỉ cơ sở dữ liệu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí lưu trữ</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="cloud">Cloud Storage</option>
                  <option value="local">Local Storage</option>
                  <option value="both">Cả hai</option>
                </select>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-sm text-yellow-800">
                      Quá trình sao lưu có thể mất vài phút. Hệ thống sẽ tiếp tục hoạt động bình thường.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button onClick={handleBackup} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Bắt đầu sao lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default SystemManagement
