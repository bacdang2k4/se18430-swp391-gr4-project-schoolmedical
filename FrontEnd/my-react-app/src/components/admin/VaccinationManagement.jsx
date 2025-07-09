"use client"

import { useState } from "react"
import {
  ShieldCheckIcon,
  PlusIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const vaccinationData = [
  {
    id: 1,
    campaignName: "Tiêm chủng vaccine cúm mùa 2024-2025",
    vaccineType: "Vaccine cúm",
    targetGrades: ["6", "7", "8", "9"],
    scheduledDate: "2025-01-15",
    status: "scheduled",
    totalStudents: 450,
    registeredStudents: 380,
    completedStudents: 0,
    description: "Chiến dịch tiêm chủng vaccine cúm cho tất cả học sinh",
    requirements: "Học sinh khỏe mạnh, không sốt, không dị ứng vaccine",
    location: "Phòng y tế trường",
    medicalStaff: "BS. Nguyễn Văn A, Y tá Trần Thị B",
  },
  {
    id: 2,
    campaignName: "Tiêm vaccine HPV cho nữ sinh",
    vaccineType: "Vaccine HPV",
    targetGrades: ["8", "9"],
    scheduledDate: "2025-01-20",
    status: "in_progress",
    totalStudents: 120,
    registeredStudents: 95,
    completedStudents: 45,
    description: "Tiêm vaccine HPV phòng chống ung thư cổ tử cung",
    requirements: "Học sinh nữ, độ tuổi 13-15, có đồng ý của phụ huynh",
    location: "Phòng y tế trường",
    medicalStaff: "BS. Lê Thị C, Y tá Phạm Văn D",
  },
  {
    id: 3,
    campaignName: "Tiêm bổ sung vaccine DPT",
    vaccineType: "Vaccine DPT",
    targetGrades: ["6"],
    scheduledDate: "2024-12-20",
    status: "completed",
    totalStudents: 150,
    registeredStudents: 140,
    completedStudents: 135,
    description: "Tiêm bổ sung vaccine DPT cho học sinh lớp 6",
    requirements: "Học sinh thiếu mũi tiêm theo lịch tiêm chủng",
    location: "Phòng y tế trường",
    medicalStaff: "BS. Hoàng Văn E, Y tá Nguyễn Thị F",
  },
]

const studentVaccinations = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    class: "6A1",
    campaignId: 2,
    parentConsent: true,
    vaccinationDate: "2025-01-08",
    status: "completed",
    reaction: "Không có phản ứng",
    notes: "Tiêm thành công, theo dõi 30 phút",
  },
  {
    id: 2,
    studentName: "Trần Thị B",
    class: "8B2",
    campaignId: 2,
    parentConsent: true,
    vaccinationDate: null,
    status: "registered",
    reaction: null,
    notes: "Đã đăng ký, chờ tiêm",
  },
  {
    id: 3,
    studentName: "Lê Văn C",
    class: "9C1",
    campaignId: 2,
    parentConsent: false,
    vaccinationDate: null,
    status: "declined",
    reaction: null,
    notes: "Phụ huynh không đồng ý",
  },
]

const statusLabels = {
  scheduled: "Đã lên lịch",
  in_progress: "Đang tiến hành",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
}

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const studentStatusLabels = {
  registered: "Đã đăng ký",
  completed: "Đã tiêm",
  declined: "Từ chối",
  absent: "Vắng mặt",
}

const studentStatusColors = {
  registered: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  absent: "bg-gray-100 text-gray-800",
}

function VaccinationManagement() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredCampaigns = vaccinationData.filter((campaign) => {
    const matchesSearch = campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || campaign.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const filteredStudents = studentVaccinations.filter((student) => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || student.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleViewDetail = (campaign) => {
    console.log("View campaign detail:", campaign)
  }

  const handleUpdateStatus = (campaignId, newStatus) => {
    console.log("Update campaign status:", campaignId, newStatus)
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
                  <ShieldCheckIcon className="w-8 h-8 text-purple-600" />
                  Quản lý tiêm chủng
                </h1>
                <p className="text-gray-600 mt-1">Quản lý quy trình tiêm chủng tại trường</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Tạo chiến dịch tiêm chủng
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng chiến dịch</p>
                  <p className="text-2xl font-bold text-gray-900">{vaccinationData.length}</p>
                </div>
                <ShieldCheckIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đang tiến hành</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vaccinationData.filter((v) => v.status === "in_progress").length}
                  </p>
                </div>
                <ClockIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                  <p className="text-2xl font-bold text-green-600">
                    {vaccinationData.filter((v) => v.status === "completed").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tỷ lệ tiêm chủng</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (vaccinationData.reduce((sum, v) => sum + v.completedStudents, 0) /
                        vaccinationData.reduce((sum, v) => sum + v.totalStudents, 0)) *
                        100,
                    )}
                    %
                  </p>
                </div>
                <ShieldCheckIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("campaigns")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "campaigns"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Chiến dịch tiêm chủng
                </button>
                <button
                  onClick={() => setActiveTab("students")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "students"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Danh sách học sinh
                </button>
              </nav>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder={activeTab === "campaigns" ? "Tìm kiếm chiến dịch..." : "Tìm kiếm học sinh..."}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                {activeTab === "campaigns"
                  ? Object.entries(statusLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))
                  : Object.entries(studentStatusLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
              </select>
              <div></div>
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {activeTab === "campaigns" ? filteredCampaigns.length : filteredStudents.length}{" "}
                {activeTab === "campaigns" ? "chiến dịch" : "học sinh"}
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "campaigns" ? (
            /* Campaigns Table */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chiến dịch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loại vaccine
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày tiêm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tiến độ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{campaign.campaignName}</div>
                            <div className="text-sm text-gray-500">Khối: {campaign.targetGrades.join(", ")}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {campaign.vaccineType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.scheduledDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.completedStudents}/{campaign.registeredStudents} học sinh
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{
                                width: `${(campaign.completedStudents / campaign.registeredStudents) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[campaign.status]}`}
                          >
                            {statusLabels[campaign.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleViewDetail(campaign)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Xem chi tiết"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            {campaign.status === "scheduled" && (
                              <button
                                onClick={() => handleUpdateStatus(campaign.id, "in_progress")}
                                className="text-yellow-600 hover:text-yellow-900 p-1"
                                title="Bắt đầu tiêm"
                              >
                                <ClockIcon className="w-4 h-4" />
                              </button>
                            )}
                            {campaign.status === "in_progress" && (
                              <button
                                onClick={() => handleUpdateStatus(campaign.id, "completed")}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Hoàn thành"
                              >
                                <CheckCircleIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Students Table */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Học sinh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chiến dịch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đồng ý PH
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày tiêm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => {
                      const campaign = vaccinationData.find((c) => c.id === student.campaignId)
                      return (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                              <div className="text-sm text-gray-500">Lớp {student.class}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{campaign?.campaignName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                student.parentConsent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.parentConsent ? "Đã đồng ý" : "Chưa đồng ý"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.vaccinationDate || "Chưa tiêm"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${studentStatusColors[student.status]}`}
                            >
                              {studentStatusLabels[student.status]}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button className="text-blue-600 hover:text-blue-900 p-1" title="Xem chi tiết">
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              {student.status === "registered" && (
                                <button className="text-green-600 hover:text-green-900 p-1" title="Đánh dấu đã tiêm">
                                  <CheckCircleIcon className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Tạo chiến dịch tiêm chủng mới</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên chiến dịch</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Nhập tên chiến dịch"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại vaccine</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option value="vaccine_cum">Vaccine cúm</option>
                    <option value="vaccine_hpv">Vaccine HPV</option>
                    <option value="vaccine_dpt">Vaccine DPT</option>
                    <option value="vaccine_bcg">Vaccine BCG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày tiêm dự kiến</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Khối lớp đối tượng</label>
                <div className="grid grid-cols-4 gap-2">
                  {["6", "7", "8", "9"].map((grade) => (
                    <label key={grade} className="flex items-center">
                      <input type="checkbox" className="mr-2" value={grade} />
                      Khối {grade}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Mô tả về chiến dịch tiêm chủng"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yêu cầu</label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Các yêu cầu về sức khỏe, điều kiện tiêm chủng"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Địa điểm tiêm chủng"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhân viên y tế</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Danh sách nhân viên y tế"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Tạo chiến dịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default VaccinationManagement
