"use client"

import { useState, useEffect } from "react"
import { 
  UsersIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ArrowRightIcon,
  HeartIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

const stats = [
  {
    title: "Tổng số người dùng",
    value: "1,247",
    change: "+12%",
    trend: "up",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    icon: UsersIcon,
    description: "Tăng 150 người dùng mới",
    link: "/admin/user-management"
  },
  {
    title: "Hồ sơ sức khỏe",
    value: "1,156",
    change: "+8%",
    trend: "up",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
    icon: DocumentTextIcon,
    description: "92 hồ sơ được cập nhật",
    link: "/admin/health-records"
  },
  {
    title: "Sự kiện y tế (tháng)",
    value: "23",
    change: "-15%",
    trend: "down",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "from-yellow-50 to-yellow-100",
    icon: ExclamationTriangleIcon,
    description: "Giảm 4 sự kiện so với tháng trước",
    link: "/admin/medical-events"
  },
  {
    title: "Tỷ lệ tiêm chủng",
    value: "98.5%",
    change: "+2%",
    trend: "up",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    icon: ShieldCheckIcon,
    description: "Tăng 2.5% so với quý trước",
    link: "/admin/vaccination-management"
  },
]

const recentActivities = [
  {
    id: 1,
    user: "BS. Nguyễn Thị Lan",
    action: "đã thêm hồ sơ sức khỏe cho học sinh Trần Văn Minh",
    time: "2 phút trước",
    type: "create",
    avatar: "👩‍⚕️",
    details: "Lớp 6A - Khám sức khỏe định kỳ"
  },
  {
    id: 2,
    user: "Y tá Lê Thị Hoa",
    action: "đã cập nhật thông tin tiêm chủng vaccine cúm",
    time: "15 phút trước",
    type: "update",
    avatar: "👩‍⚕️",
    details: "Batch #VF2025-001"
  },
  {
    id: 3,
    user: "BS. Phạm Văn Nam",
    action: "đã xử lý sự kiện y tế khẩn cấp",
    time: "1 giờ trước",
    type: "alert",
    avatar: "👨‍⚕️",
    details: "Học sinh bị ngất tại lớp 8B"
  },
  {
    id: 4,
    user: "Y tá Hoàng Thị Mai",
    action: "đã hoàn thành kiểm tra y tế định kỳ",
    time: "2 giờ trước",
    type: "complete",
    avatar: "👩‍⚕️",
    details: "Lớp 7C - 35/35 học sinh"
  },
  {
    id: 5,
    user: "Admin System",
    action: "đã tạo báo cáo thống kê tháng 1",
    time: "3 giờ trước",
    type: "system",
    avatar: "🤖",
    details: "Báo cáo tự động hàng tháng"
  },
]

const upcomingTasks = [
  {
    id: 1,
    title: "Kiểm tra y tế định kỳ lớp 6A",
    dueDate: "2025-01-10",
    priority: "high",
    status: "pending",
    assignee: "BS. Nguyễn Thị Lan",
    progress: 0,
    icon: "🩺"
  },
  {
    id: 2,
    title: "Tiêm chủng vaccine cúm - Khối 7",
    dueDate: "2025-01-12",
    priority: "medium",
    status: "in-progress",
    assignee: "Y tá Lê Thị Hoa",
    progress: 65,
    icon: "💉"
  },
  {
    id: 3,
    title: "Cập nhật hồ sơ sức khỏe mới",
    dueDate: "2025-01-15",
    priority: "low",
    status: "pending",
    assignee: "Y tá Hoàng Thị Mai",
    progress: 0,
    icon: "📋"
  },
  {
    id: 4,
    title: "Đào tạo sơ cứu cho giáo viên",
    dueDate: "2025-01-18",
    priority: "medium",
    status: "scheduled",
    assignee: "BS. Phạm Văn Nam",
    progress: 25,
    icon: "🎓"
  },
]

const quickStats = [
  {
    title: "Học sinh có dị ứng",
    value: "156",
    icon: "⚠️",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    title: "Cần theo dõi đặc biệt",
    value: "89",
    icon: "👁️",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    title: "Sự kiện tuần này",
    value: "12",
    icon: "📅",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    title: "Tỷ lệ tiêm chủng",
    value: "98.5%",
    icon: "✅",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
]

const notifications = [
  {
    id: 1,
    title: "Lịch tiêm chủng sắp tới",
    message: "Có 45 học sinh cần tiêm vaccine cúm trong tuần này",
    type: "info",
    time: "10 phút trước",
    read: false
  },
  {
    id: 2,
    title: "Cảnh báo dị ứng",
    message: "Học sinh Nguyễn Văn A (6B) có phản ứng dị ứng với thuốc",
    type: "warning",
    time: "1 giờ trước",
    read: false
  },
  {
    id: 3,
    title: "Báo cáo hoàn thành",
    message: "Báo cáo thống kê tháng 12 đã được tạo thành công",
    type: "success",
    time: "2 giờ trước",
    read: true
  },
]

function DashboardForm() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Chào buổi sáng"
    if (hour < 18) return "Chào buổi chiều"
    return "Chào buổi tối"
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard Quản Trị</h1>
                  <p className="text-gray-600">{getGreeting()}, chào mừng bạn đến với hệ thống</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Period Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm này</option>
              </select>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <BellIcon className="w-6 h-6 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Thông báo</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'info' ? 'bg-blue-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                              <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                              <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Xem tất cả thông báo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Time */}
              <div className="text-right bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <ClockIcon className="w-4 h-4" />
                  <span>Thời gian hiện tại</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {currentTime.toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={() => navigate(stat.link)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>

              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Xem chi tiết</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <SparklesIcon className="w-6 h-6 text-blue-600" />
                  Hoạt động gần đây
                </h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  Xem tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="text-2xl">{activity.avatar}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-900">
                            <span className="font-semibold text-blue-600">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === "create" ? "bg-green-500" :
                      activity.type === "update" ? "bg-blue-500" :
                      activity.type === "alert" ? "bg-red-500" :
                      activity.type === "complete" ? "bg-purple-500" :
                      "bg-gray-500"
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-green-600" />
                  Nhiệm vụ sắp tới
                </h2>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Thêm mới
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start gap-3">
                      <div className="text-xl">{task.icon}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {task.title}
                          </h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
                            task.priority === "high" ? "bg-red-100 text-red-800" :
                            task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {task.priority === "high" ? "Cao" : 
                             task.priority === "medium" ? "TB" : "Thấp"}
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-2">
                          Phụ trách: {task.assignee}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">
                            Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                          </span>
                          <span className={`font-medium ${
                            task.status === "pending" ? "text-gray-600" :
                            task.status === "in-progress" ? "text-blue-600" :
                            task.status === "scheduled" ? "text-purple-600" :
                            "text-green-600"
                          }`}>
                            {task.status === "pending" ? "Chờ xử lý" :
                             task.status === "in-progress" ? "Đang thực hiện" :
                             task.status === "scheduled" ? "Đã lên lịch" :
                             "Hoàn thành"}
                          </span>
                        </div>
                        
                        {task.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-500">Tiến độ</span>
                              <span className="font-medium text-gray-700">{task.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                Xem tất cả nhiệm vụ
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
              Thống kê nhanh
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Cập nhật:</span>
              <span className="text-sm font-medium text-gray-700">
                {currentTime.toLocaleTimeString('vi-VN')}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Thao tác nhanh</h2>
              <p className="opacity-90">Truy cập nhanh các chức năng thường dùng</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/admin/health-records")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <HeartIcon className="w-5 h-5" />
                Hồ sơ sức khỏe
              </button>
              <button
                onClick={() => navigate("/admin/medical-events")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <ExclamationTriangleIcon className="w-5 h-5" />
                Sự kiện y tế
              </button>
              <button
                onClick={() => navigate("/admin/vaccination-management")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <ShieldCheckIcon className="w-5 h-5" />
                Tiêm chủng
              </button>
              <button
                onClick={() => navigate("/admin/reports")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <ChartBarIcon className="w-5 h-5" />
                Báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardForm