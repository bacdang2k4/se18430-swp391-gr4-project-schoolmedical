"use client"

import { useState, useEffect } from "react"
import { UsersIcon, DocumentTextIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"

const stats = [
  {
    title: "Tổng số người dùng",
    value: "1,247",
    change: "+12%",
    color: "bg-blue-500",
    icon: UsersIcon,
  },
  {
    title: "Hồ sơ sức khỏe",
    value: "1,156",
    change: "+8%",
    color: "bg-green-500",
    icon: DocumentTextIcon,
  },
  {
    title: "Sự kiện y tế (tháng)",
    value: "23",
    change: "-15%",
    color: "bg-yellow-500",
    icon: ExclamationTriangleIcon,
  },
  {
    title: "Tỷ lệ tiêm chủng",
    value: "98.5%",
    change: "+2%",
    color: "bg-purple-500",
    icon: ShieldCheckIcon,
  },
]

const recentActivities = [
  {
    user: "Nguyễn Văn A",
    action: "đã thêm hồ sơ sức khỏe cho học sinh Trần Thị B",
    time: "2 phút trước",
    type: "create",
  },
  {
    user: "Lê Thị C",
    action: "đã cập nhật thông tin tiêm chủng",
    time: "15 phút trước",
    type: "update",
  },
  {
    user: "Phạm Văn D",
    action: "đã ghi nhận sự kiện y tế khẩn cấp",
    time: "1 giờ trước",
    type: "alert",
  },
  {
    user: "Hoàng Thị E",
    action: "đã hoàn thành kiểm tra y tế định kỳ",
    time: "2 giờ trước",
    type: "complete",
  },
]

const upcomingTasks = [
  {
    title: "Kiểm tra y tế định kỳ lớp 6A",
    dueDate: "2025-01-10",
    priority: "high",
    status: "pending",
  },
  {
    title: "Tiêm chủng vaccine cúm",
    dueDate: "2025-01-12",
    priority: "medium",
    status: "in-progress",
  },
  {
    title: "Cập nhật hồ sơ sức khỏe mới",
    dueDate: "2025-01-15",
    priority: "low",
    status: "pending",
  },
]

function DashboardForm() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Quản Trị</h1>
              <p className="text-gray-600 mt-1">Chào mừng bạn đến với hệ thống quản lý y tế học đường</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Thời gian hiện tại</p>
              <p className="text-lg font-semibold text-gray-900">{currentTime.toLocaleString("vi-VN")}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} so với tháng trước
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Hoạt động gần đây</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "create"
                          ? "bg-green-500"
                          : activity.type === "update"
                            ? "bg-blue-500"
                            : activity.type === "alert"
                              ? "bg-red-500"
                              : "bg-purple-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Nhiệm vụ sắp tới</h2>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">Hạn: {task.dueDate}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            task.status === "pending" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {task.status === "pending" ? "Chờ xử lý" : "Đang thực hiện"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Thống kê nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600 mt-1">Học sinh có dị ứng</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">89</div>
              <div className="text-sm text-gray-600 mt-1">Học sinh cần theo dõi đặc biệt</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600 mt-1">Sự kiện y tế tuần này</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">98.5%</div>
              <div className="text-sm text-gray-600 mt-1">Tỷ lệ tiêm chủng đầy đủ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardForm
