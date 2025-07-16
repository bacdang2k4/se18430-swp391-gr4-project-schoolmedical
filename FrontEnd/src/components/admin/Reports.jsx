"use client"

import { useState, useEffect } from "react"
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
import { getUserReport, getHealthOverviewReport, getMedicalEventReport, getVaccinationReport, getCheckupReport, getMedicineUsageReport } from "../../api/axios"

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
  const [dateFrom, setDateFrom] = useState("2024-01-01")
  const [dateTo, setDateTo] = useState("2024-12-31")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [userReport, setUserReport] = useState(null)
  const [userReportLoading, setUserReportLoading] = useState(false)
  const [userReportError, setUserReportError] = useState(null)
  const [healthOverview, setHealthOverview] = useState(null)
  const [healthOverviewLoading, setHealthOverviewLoading] = useState(false)
  const [healthOverviewError, setHealthOverviewError] = useState(null)
  const [medicalEventReport, setMedicalEventReport] = useState(null)
  const [medicalEventLoading, setMedicalEventLoading] = useState(false)
  const [medicalEventError, setMedicalEventError] = useState(null)
  const [vaccinationReport, setVaccinationReport] = useState(null)
  const [vaccinationLoading, setVaccinationLoading] = useState(false)
  const [vaccinationError, setVaccinationError] = useState(null)
  const [checkupReport, setCheckupReport] = useState(null)
  const [checkupLoading, setCheckupLoading] = useState(false)
  const [checkupError, setCheckupError] = useState(null)
  const [medicineUsageReport, setMedicineUsageReport] = useState(null)
  const [medicineUsageLoading, setMedicineUsageLoading] = useState(false)
  const [medicineUsageError, setMedicineUsageError] = useState(null)

  useEffect(() => {
    setUserReportLoading(true)
    getUserReport()
      .then((data) => {
        setUserReport(data.result || data)
        setUserReportLoading(false)
      })
      .catch(() => {
        setUserReportError("Không thể lấy báo cáo user")
        setUserReportLoading(false)
      })
  }, [])

  useEffect(() => {
    setHealthOverviewLoading(true)
    getHealthOverviewReport()
      .then((data) => {
        setHealthOverview(data.result || data)
        setHealthOverviewLoading(false)
      })
      .catch(() => {
        setHealthOverviewError("Không thể lấy báo cáo sức khỏe")
        setHealthOverviewLoading(false)
      })
  }, [])

  useEffect(() => {
    setMedicalEventLoading(true)
    getMedicalEventReport()
      .then((data) => {
        setMedicalEventReport(data.result || data)
        setMedicalEventLoading(false)
      })
      .catch(() => {
        setMedicalEventError("Không thể lấy báo cáo sự kiện y tế")
        setMedicalEventLoading(false)
      })
  }, [])

  useEffect(() => {
    setVaccinationLoading(true)
    getVaccinationReport()
      .then((data) => {
        setVaccinationReport(data.result || data)
        setVaccinationLoading(false)
      })
      .catch(() => {
        setVaccinationError("Không thể lấy báo cáo tiêm chủng")
        setVaccinationLoading(false)
      })
  }, [])

  useEffect(() => {
    setCheckupLoading(true)
    getCheckupReport()
      .then((data) => {
        setCheckupReport(data.result || data)
        setCheckupLoading(false)
      })
      .catch(() => {
        setCheckupError("Không thể lấy báo cáo kiểm tra sức khỏe")
        setCheckupLoading(false)
      })
  }, [])

  useEffect(() => {
    setMedicineUsageLoading(true)
    getMedicineUsageReport()
      .then((data) => {
        setMedicineUsageReport(data.result || data)
        setMedicineUsageLoading(false)
      })
      .catch(() => {
        setMedicineUsageError("Không thể lấy báo cáo sử dụng thuốc")
        setMedicineUsageLoading(false)
      })
  }, [])

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
            {reportTypes.map((report) => {
              if (report.id === "health_overview") {
                // Nếu là báo cáo tổng quan sức khỏe, dùng dữ liệu từ API
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    // onClick bỏ modal, không làm gì
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
                      {healthOverviewLoading && <div className="text-gray-500 text-sm">Đang tải...</div>}
                      {healthOverviewError && <div className="text-red-500 text-sm">{healthOverviewError}</div>}
                      {healthOverview && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tổng số học sinh:</span>
                            <span className="font-semibold">{healthOverview.totalStudents}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Có dị ứng:</span>
                            <span className="font-semibold">{healthOverview.studentsWithAllergies}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Bệnh mãn tính:</span>
                            <span className="font-semibold">{healthOverview.studentsWithChronicDiseases}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Chiều cao TB:</span>
                            <span className="font-semibold">{healthOverview.averageHeight}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Cân nặng TB:</span>
                            <span className="font-semibold">{healthOverview.averageWeight}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              if (report.id === "medical_events") {
                // Nếu là báo cáo sự kiện y tế, dùng dữ liệu từ API
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    // onClick bỏ modal, không làm gì
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
                      {medicalEventLoading && <div className="text-gray-500 text-sm">Đang tải...</div>}
                      {medicalEventError && <div className="text-red-500 text-sm">{medicalEventError}</div>}
                      {medicalEventReport && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tổng số sự kiện:</span>
                            <span className="font-semibold">{medicalEventReport.totalEvents}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tai nạn:</span>
                            <span className="font-semibold">{medicalEventReport.accidents}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Đau ốm:</span>
                            <span className="font-semibold">{medicalEventReport.illnesses}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Dị ứng:</span>
                            <span className="font-semibold">{medicalEventReport.allergicReactions}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Khẩn cấp:</span>
                            <span className="font-semibold">{medicalEventReport.emergencies}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              if (report.id === "vaccination") {
                // Nếu là báo cáo tiêm chủng, dùng dữ liệu từ API
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    // onClick bỏ modal, không làm gì
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
                      {vaccinationLoading && <div className="text-gray-500 text-sm">Đang tải...</div>}
                      {vaccinationError && <div className="text-red-500 text-sm">{vaccinationError}</div>}
                      {vaccinationReport && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tổng số chiến dịch:</span>
                            <span className="font-semibold">{vaccinationReport.totalCampaigns}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Chiến dịch đã hoàn thành:</span>
                            <span className="font-semibold">{vaccinationReport.completedCampaigns}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Học sinh đã tiêm:</span>
                            <span className="font-semibold">{vaccinationReport.studentsVaccinated}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tỷ lệ tiêm chủng (%):</span>
                            <span className="font-semibold">{vaccinationReport.vaccinationRate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Chờ tiêm:</span>
                            <span className="font-semibold">{vaccinationReport.pendingVaccinations}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              if (report.id === "checkup_results") {
                // Nếu là báo cáo kiểm tra sức khỏe, dùng dữ liệu từ API
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    // onClick bỏ modal, không làm gì
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
                      {checkupLoading && <div className="text-gray-500 text-sm">Đang tải...</div>}
                      {checkupError && <div className="text-red-500 text-sm">{checkupError}</div>}
                      {checkupReport && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tổng số đợt kiểm tra:</span>
                            <span className="font-semibold">{checkupReport.totalCheckups}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Học sinh đã kiểm tra:</span>
                            <span className="font-semibold">{checkupReport.studentsChecked}</span>
                          </div>
                          {checkupReport.abnormalResults !== undefined && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Kết quả bất thường:</span>
                              <span className="font-semibold">{checkupReport.abnormalResults}</span>
                            </div>
                          )}
                          {checkupReport.followUpRequired !== undefined && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Cần theo dõi:</span>
                              <span className="font-semibold">{checkupReport.followUpRequired}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Chiều cao TB:</span>
                            <span className="font-semibold">{checkupReport.averageHeight}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Cân nặng TB:</span>
                            <span className="font-semibold">{checkupReport.averageWeight}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              if (report.id === "medicine_usage") {
                // Nếu là báo cáo sử dụng thuốc, dùng dữ liệu từ API
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    // onClick bỏ modal, không làm gì
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
                      {medicineUsageLoading && <div className="text-gray-500 text-sm">Đang tải...</div>}
                      {medicineUsageError && <div className="text-red-500 text-sm">{medicineUsageError}</div>}
                      {medicineUsageReport && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Số lượt gửi thuốc:</span>
                            <span className="font-semibold">{medicineUsageReport.medicinesUsed}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Đã dùng:</span>
                            <span className="font-semibold">{medicineUsageReport.usedCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Đang chờ nhận:</span>
                            <span className="font-semibold">{medicineUsageReport.pendingCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Đã nhận, chưa sử dụng:</span>
                            <span className="font-semibold">{medicineUsageReport.receivedCount}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              if (report.id === "user_activity") {
                // Nếu là báo cáo user, dùng dữ liệu từ API
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    // onClick bỏ modal, không làm gì
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
                      {userReportLoading && <div className="text-gray-500 text-sm">Đang tải...</div>}
                      {userReportError && <div className="text-red-500 text-sm">{userReportError}</div>}
                      {userReport && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tổng số người dùng:</span>
                            <span className="font-semibold">{userReport.totalUsers}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Đang hoạt động:</span>
                            <span className="font-semibold">{userReport.activeUsers}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Chưa kích hoạt:</span>
                            <span className="font-semibold">{userReport.inactiveUsers}</span>
                          </div>
                          {userReport.roleStats && Object.entries(userReport.roleStats).map(([role, count]) => (
                            <div key={role} className="flex justify-between text-sm">
                              <span className="text-gray-600">{role}:</span>
                              <span className="font-semibold">{count}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )
              }
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  // onClick bỏ modal, không làm gì
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
              )
            })}
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
    </AdminLayout>
  )
}

export default Reports
