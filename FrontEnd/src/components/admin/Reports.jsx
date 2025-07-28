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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import AdminLayout from "../../components/AdminLayout"
import { getUserReport, getHealthOverviewReport, getMedicalEventReport, getVaccinationReport, getCheckupReport, getMedicineUsageReport } from "../../api/axios"

const reportTypes = [
  {
    id: "health_overview",
    title: "Báo cáo tổng quan sức khỏe",
    description: "Thống kê tổng quan về tình hình sức khỏe học sinh",
    icon: ClipboardDocumentCheckIcon,
    color: "bg-blue-500",
  },
  {
    id: "medical_events",
    title: "Báo cáo sự kiện y tế",
    description: "Thống kê các sự kiện y tế trong khoảng thời gian",
    icon: ExclamationTriangleIcon,
    color: "bg-orange-500",
  },
  {
    id: "vaccination",
    title: "Báo cáo tiêm chủng",
    description: "Tình hình tiêm chủng và các chiến dịch",
    icon: ShieldCheckIcon,
    color: "bg-purple-500",
  },
  {
    id: "medicine_usage",
    title: "Báo cáo sử dụng thuốc",
    description: "Thống kê việc sử dụng thuốc và vật tư y tế",
    icon: BeakerIcon,
    color: "bg-green-500",
  },
  {
    id: "checkup_results",
    title: "Báo cáo kiểm tra sức khỏe",
    description: "Kết quả các đợt kiểm tra sức khỏe định kỳ",
    icon: ClipboardDocumentCheckIcon,
    color: "bg-indigo-500",
  },
  {
    id: "user_activity",
    title: "Báo cáo hoạt động người dùng",
    description: "Thống kê hoạt động của người dùng hệ thống",
    icon: UsersIcon,
    color: "bg-pink-500",
  },
]



function Reports() {

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
    console.log("Generating report:", reportType)
    // Implement report generation logic
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ChartBarIcon className="w-8 h-8 text-red-600" />
                Báo cáo và thống kê
              </h1>
              <p className="text-gray-600 mt-1">Xem các báo cáo chi tiết</p>
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



          {/* Pie Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Medical Events Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Phân bố sự kiện y tế</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={medicalEventReport ? [
                        { name: "Tai nạn", value: medicalEventReport.accidents },
                        { name: "Đau ốm", value: medicalEventReport.illnesses },
                        { name: "Dị ứng", value: medicalEventReport.allergicReactions },
                        { name: "Khẩn cấp", value: medicalEventReport.emergencies }
                      ] : []}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {medicalEventReport ? [
                        <Cell key="cell-0" fill="#ef4444" />,
                        <Cell key="cell-1" fill="#3b82f6" />,
                        <Cell key="cell-2" fill="#f59e0b" />,
                        <Cell key="cell-3" fill="#dc2626" />
                      ] : []}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Health Status Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Tình trạng sức khỏe học sinh</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthOverview ? [
                        { name: "Khỏe mạnh", value: healthOverview.totalStudents - healthOverview.studentsWithAllergies - healthOverview.studentsWithChronicDiseases },
                        { name: "Có dị ứng", value: healthOverview.studentsWithAllergies },
                        { name: "Bệnh mãn tính", value: healthOverview.studentsWithChronicDiseases }
                      ] : []}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {healthOverview ? [
                        <Cell key="cell-0" fill="#10b981" />,
                        <Cell key="cell-1" fill="#f59e0b" />,
                        <Cell key="cell-2" fill="#ef4444" />
                      ] : []}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Activity Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Hoạt động người dùng</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userReport ? [
                        { name: "Đang hoạt động", value: userReport.activeUsers },
                        { name: "Chưa kích hoạt", value: userReport.inactiveUsers }
                      ] : []}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {userReport ? [
                        <Cell key="cell-0" fill="#10b981" />,
                        <Cell key="cell-1" fill="#6b7280" />
                      ] : []}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Medicine Usage Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Tình trạng sử dụng thuốc</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={medicineUsageReport ? [
                        { name: "Đã dùng", value: medicineUsageReport.usedCount },
                        { name: "Đang chờ nhận", value: medicineUsageReport.pendingCount },
                        { name: "Đã nhận, chưa sử dụng", value: medicineUsageReport.receivedCount }
                      ] : []}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {medicineUsageReport ? [
                        <Cell key="cell-0" fill="#10b981" />,
                        <Cell key="cell-1" fill="#f59e0b" />,
                        <Cell key="cell-2" fill="#3b82f6" />
                      ] : []}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>


        </div>
      </div>
    </AdminLayout>
  )
}

export default Reports
