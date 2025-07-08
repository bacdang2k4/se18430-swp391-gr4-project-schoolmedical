"use client"

import { useState } from "react"
import {
  ChartBarIcon,
  DocumentArrowDownIcon,
  CalendarDaysIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const reportTypes = [
  {
    id: "health_overview",
    title: "Báo cáo tổng quan sức khỏe",
    description: "Thống kê tổng quan về tình hình sức khỏe học sinh",
    icon: ClipboardDocumentCheckIcon,
    color: "bg-blue-500",
    data: {
      totalStudents: 1247,
      healthyStudents: 1156,
      studentsWithAllergies: 89,
      studentsWithChronicDiseases: 45,
      vaccinationRate: 98.5,
    },
  },
  {
    id: "medical_events",
    title: "Báo cáo sự kiện y tế",
    description: "Thống kê các sự kiện y tế trong khoảng thời gian",
    icon: ExclamationTriangleIcon,
    color: "bg-orange-500",
    data: {
      totalEvents: 156,
      accidents: 45,
      illnesses: 67,
      allergicReactions: 23,
      emergencies: 21,
    },
  },
  {
    id: "vaccination",
    title: "Báo cáo tiêm chủng",
    description: "Tình hình tiêm chủng và các chiến dịch",
    icon: ShieldCheckIcon,
    color: "bg-purple-500",
    data: {
      totalCampaigns: 8,
      completedCampaigns: 6,
      studentsVaccinated: 1189,
      vaccinationRate: 95.3,
      pendingVaccinations: 58,
    },
  },
  {
    id: "medicine_usage",
    title: "Báo cáo sử dụng thuốc",
    description: "Thống kê việc sử dụng thuốc và vật tư y tế",
    icon: BeakerIcon,
    color: "bg-green-500",
    data: {
      totalMedicines: 45,
      medicinesUsed: 234,
      lowStockItems: 8,
      expiredItems: 2,
      totalValue: 15600000,
    },
  },
  {
    id: "checkup_results",
    title: "Báo cáo kiểm tra sức khỏe",
    description: "Kết quả các đợt kiểm tra sức khỏe định kỳ",
    icon: ClipboardDocumentCheckIcon,
    color: "bg-indigo-500",
    data: {
      totalCheckups: 12,
      studentsChecked: 1156,
      abnormalResults: 67,
      followUpRequired: 23,
      averageHeight: 155.2,
      averageWeight: 45.8,
    },
  },
  {
    id: "user_activity",
    title: "Báo cáo hoạt động người dùng",
    description: "Thống kê hoạt động của người dùng hệ thống",
    icon: UsersIcon,
    color: "bg-pink-500",
    data: {
      totalUsers: 1247,
      activeUsers: 1156,
      loginSessions: 2345,
      averageSessionTime: "25 phút",
      mostActiveTime: "8:00 - 10:00",
    },
  },
]

const monthlyData = [
  { month: "T1", events: 12, checkups: 450, vaccinations: 120 },
  { month: "T2", events: 8, checkups: 0, vaccinations: 89 },
  { month: "T3", events: 15, checkups: 0, vaccinations: 156 },
  { month: "T4", events: 10, checkups: 0, vaccinations: 78 },
  { month: "T5", events: 18, checkups: 0, vaccinations: 234 },
  { month: "T6", events: 14, checkups: 0, vaccinations: 167 },
  { month: "T7", events: 9, checkups: 0, vaccinations: 89 },
  { month: "T8", events: 11, checkups: 450, vaccinations: 145 },
  { month: "T9", events: 16, checkups: 0, vaccinations: 123 },
  { month: "T10", events: 13, checkups: 0, vaccinations: 178 },
  { month: "T11", events: 7, checkups: 0, vaccinations: 98 },
  { month: "T12", events: 19, checkups: 450, vaccinations: 156 },
]

function Reports() {
  const [selectedReport, setSelectedReport] = useState(null)
  const [dateFrom, setDateFrom] = useState("2024-01-01")
  const [dateTo, setDateTo] = useState("2024-12-31")
  const [reportFormat, setReportFormat] = useState("pdf")

  const handleGenerateReport = (reportType) => {
    console.log("Generating report:", reportType, { dateFrom, dateTo, reportFormat })
    // Implement report generation logic
  }

  const handleExportData = (format) => {
    console.log("Exporting data in format:", format)
    // Implement export logic
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
                  <ChartBarIcon className="w-8 h-8 text-red-600" />
                  Báo cáo và thống kê
                </h1>
                <p className="text-gray-600 mt-1">Tạo và xuất các báo cáo chi tiết</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleExportData("excel")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  Xuất Excel
                </button>
                <button
                  onClick={() => handleExportData("pdf")}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  Xuất PDF
                </button>
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Khoảng thời gian:</span>
              </div>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <span className="text-gray-500">đến</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <select
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>

          {/* Report Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center`}>
                    <report.icon className="w-6 h-6 text-white" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGenerateReport(report.id)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <DocumentArrowDownIcon className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <div className="space-y-2">
                  {Object.entries(report.data)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                        </span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold mb-6">Biểu đồ thống kê theo tháng</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col gap-1 mb-2">
                    {/* Events bar */}
                    <div
                      className="bg-red-500 rounded-t"
                      style={{ height: `${(data.events / 20) * 100}px` }}
                      title={`Sự kiện: ${data.events}`}
                    ></div>
                    {/* Checkups bar */}
                    <div
                      className="bg-blue-500"
                      style={{ height: `${(data.checkups / 500) * 100}px` }}
                      title={`Kiểm tra: ${data.checkups}`}
                    ></div>
                    {/* Vaccinations bar */}
                    <div
                      className="bg-purple-500 rounded-b"
                      style={{ height: `${(data.vaccinations / 250) * 100}px` }}
                      title={`Tiêm chủng: ${data.vaccinations}`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Sự kiện y tế</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Kiểm tra sức khỏe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-sm text-gray-600">Tiêm chủng</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng báo cáo</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <ChartBarIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Báo cáo tháng này</p>
                  <p className="text-2xl font-bold text-blue-600">23</p>
                </div>
                <CalendarDaysIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tự động hóa</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <DocumentArrowDownIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lượt tải xuống</p>
                  <p className="text-2xl font-bold text-purple-600">89</p>
                </div>
                <UsersIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{selectedReport.title}</h3>
              <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {Object.entries(selectedReport.data).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 capitalize mb-1">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </p>
                  <p className="text-xl font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Thông tin báo cáo</h4>
              <p className="text-sm text-blue-800">{selectedReport.description}</p>
              <p className="text-sm text-blue-700 mt-2">
                Khoảng thời gian: {dateFrom} đến {dateTo}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  handleGenerateReport(selectedReport.id)
                  setSelectedReport(null)
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Tạo báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default Reports
