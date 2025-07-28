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
import { 
  getVaccinationReport, 
  getAdminUserList,
  getAdminHealthRecordList,
  getAdminMedicalEventList,
  getAdminVaccinationList,
  getAdminCheckupEventList
} from "../api/axios"

function DashboardForm() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalHealthRecords: 0,
    totalMedicalEvents: 0,
    vaccinationRate: 0,
    recentActivities: [],
    upcomingTasks: []
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Helper function to format time ago
  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMs = now - date
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) return "Vừa xong"
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    return `${diffInDays} ngày trước`
  }

  // Helper function to generate recent activities from ongoing and completed events
  const generateRecentActivities = (vaccinations, checkups) => {
    const activities = []

    // Add ongoing and completed vaccinations
    const recentVaccinations = vaccinations.filter(vaccination => 
      vaccination.status === 'isgoing' || vaccination.status === 'finished' || vaccination.status === 'completed' || vaccination.status === 'done'
    ).slice(0, 3) // Limit to 3 most recent

    recentVaccinations.forEach((vaccination) => {
      const isOngoing = vaccination.status === 'isgoing'
      activities.push({
        id: `vaccination-${vaccination.id}`,
        user: vaccination.assignedNurse || "Y tá",
        action: isOngoing ? "đang tiến hành tiêm chủng" : "đã hoàn thành tiêm chủng",
        time: getTimeAgo(vaccination.eventDate || vaccination.updatedAt),
        type: isOngoing ? "ongoing" : "complete",
        avatar: "💉",
        details: `${vaccination.name} - ${vaccination.description || 'Tiêm chủng định kỳ'}`
      })
    })

    // Add ongoing and completed checkups
    const recentCheckups = checkups.filter(checkup => 
      checkup.status === 'isgoing' || checkup.status === 'finished' || checkup.status === 'completed' || checkup.status === 'done'
    ).slice(0, 3) // Limit to 3 most recent

    recentCheckups.forEach((checkup) => {
      const isOngoing = checkup.status === 'isgoing'
      activities.push({
        id: `checkup-${checkup.id}`,
        user: checkup.assignedDoctor || "Bác sĩ",
        action: isOngoing ? "đang tiến hành kiểm tra sức khỏe" : "đã hoàn thành kiểm tra sức khỏe",
        time: getTimeAgo(checkup.eventDate || checkup.updatedAt),
        type: isOngoing ? "ongoing" : "complete",
        avatar: "🩺",
        details: `${checkup.name} - ${checkup.description || 'Kiểm tra sức khỏe định kỳ'}`
      })
    })

    // Sort by time (most recent first) and limit to 5 activities
    return activities
      .sort((a, b) => {
        const timeA = a.time.includes('phút') ? parseInt(a.time) : 
                     a.time.includes('giờ') ? parseInt(a.time) * 60 : 
                     parseInt(a.time) * 1440
        const timeB = b.time.includes('phút') ? parseInt(b.time) : 
                     b.time.includes('giờ') ? parseInt(b.time) * 60 : 
                     parseInt(b.time) * 1440
        return timeA - timeB
      })
      .slice(0, 5)
  }

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch all data in parallel
        const [
          userListResponse,
          healthRecordsResponse,
          medicalEventsResponse,
          vaccinationResponse,
          vaccinationReportResponse,
          checkupResponse
        ] = await Promise.all([
          getAdminUserList(),
          getAdminHealthRecordList(),
          getAdminMedicalEventList(),
          getAdminVaccinationList(),
          getVaccinationReport(),
          getAdminCheckupEventList()
        ])

        const users = userListResponse.result || []
        const healthRecords = healthRecordsResponse.result || []
        const medicalEvents = medicalEventsResponse.result || []
        const vaccinations = vaccinationResponse.result || []
        const checkups = checkupResponse.result || []
        const vaccinationReport = vaccinationReportResponse.result || vaccinationReportResponse

        // Calculate statistics
        const totalUsers = users.length
        const totalHealthRecords = healthRecords.length
        const totalMedicalEvents = medicalEvents.length
        const vaccinationRate = vaccinationReport?.vaccinationRate || 0

        // Generate recent activities from completed events
        const recentActivities = generateRecentActivities(vaccinations, checkups)

        // Get upcoming tasks from scheduled vaccination and checkup events only
        const upcomingVaccinations = vaccinations.filter(vaccination => 
          vaccination.status === 'setup'
        ).map(vaccination => ({
          id: vaccination.id,
          title: `Tiêm chủng ${vaccination.name}`,
          dueDate: vaccination.eventDate,
          status: 'scheduled',
          assignee: vaccination.assignedNurse || 'Chưa phân công',
          icon: '💉',
          type: 'vaccination'
        }))

        const upcomingCheckups = checkups.filter(checkup => 
          checkup.status === 'setup'
        ).map(checkup => ({
          id: checkup.id,
          title: `Kiểm tra sức khỏe ${checkup.name}`,
          dueDate: checkup.eventDate,
          status: 'scheduled',
          assignee: checkup.assignedDoctor || 'Chưa phân công',
          icon: '🩺',
          type: 'checkup'
        }))

        const allUpcomingTasks = [...upcomingVaccinations, ...upcomingCheckups]
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 4) // Limit to 4 tasks

        setDashboardData({
          totalUsers,
          totalHealthRecords,
          totalMedicalEvents,
          vaccinationRate,
          recentActivities,
          upcomingTasks: allUpcomingTasks
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Chào buổi sáng"
    if (hour < 18) return "Chào buổi chiều"
    return "Chào buổi tối"
  }



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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                  <div className="w-32 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            [
              {
                title: "Tổng số người dùng",
                value: dashboardData.totalUsers.toLocaleString(),
                change: "",
                trend: "up",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
                icon: UsersIcon,
                description: "Tổng số người dùng trong hệ thống",
                link: "/admin/user-management"
              },
              {
                title: "Hồ sơ sức khỏe",
                value: dashboardData.totalHealthRecords.toLocaleString(),
                change: "",
                trend: "up",
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100",
                icon: DocumentTextIcon,
                description: "Tổng số hồ sơ sức khỏe",
                link: "/admin/health-records"
              },
              {
                title: "Sự kiện y tế (tháng)",
                value: dashboardData.totalMedicalEvents.toString(),
                change: "",
                trend: "up",
                color: "from-yellow-500 to-yellow-600",
                bgColor: "from-yellow-50 to-yellow-100",
                icon: ExclamationTriangleIcon,
                description: "Tổng số sự kiện y tế",
                link: "/admin/medical-events"
              },
              {
                title: "Tỷ lệ tiêm chủng",
                value: `${dashboardData.vaccinationRate}%`,
                change: "",
                trend: "up",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100",
                icon: ShieldCheckIcon,
                description: "Tỷ lệ tiêm chủng hiện tại",
                link: "/admin/vaccinations"
              }
            ].map((stat, index) => (
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
            ))
          )}
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
                {dashboardData.recentActivities.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Không có hoạt động gần đây
                  </div>
                ) : (
                  dashboardData.recentActivities.map((activity) => (
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
                      activity.type === "complete" ? "bg-purple-500" :
                      activity.type === "ongoing" ? "bg-yellow-500" :
                      "bg-gray-500"
                    }`}></div>
                    </div>
                  ))
                )}
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
                
              </div>
              
              <div className="space-y-4">
                {dashboardData.upcomingTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Không có nhiệm vụ sắp tới
                  </div>
                ) : (
                  dashboardData.upcomingTasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start gap-3">
                        <div className="text-xl">{task.icon}</div>
                        
                        <div className="flex-1">
                                                  <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {task.title}
                          </h3>
                        </div>
                        
                        
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">
                            Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                          </span>
                          <span className="font-medium text-purple-600">
                            Đã lên lịch
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                Xem tất cả nhiệm vụ
              </button>
            </div>
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
                onClick={() => navigate("/admin/vaccinations")}
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