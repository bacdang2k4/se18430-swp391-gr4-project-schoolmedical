"use client"

import { useState } from "react"
import {
  ClipboardDocumentCheckIcon,
  PlusIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const checkupCampaigns = [
  {
    id: 1,
    name: "Kiểm tra sức khỏe định kỳ học kỳ 1",
    type: "periodic",
    targetGrades: ["6", "7", "8", "9"],
    scheduledDate: "2025-01-20",
    endDate: "2025-01-25",
    status: "scheduled",
    totalStudents: 450,
    completedStudents: 0,
    location: "Phòng y tế trường",
    medicalStaff: "BS. Nguyễn Văn A, Y tá Trần Thị B",
    checkupItems: ["Chiều cao", "Cân nặng", "Thị lực", "Thính lực", "Răng miệng", "Tim mạch"],
  },
  {
    id: 2,
    name: "Kiểm tra thị lực chuyên sâu",
    type: "specialized",
    targetGrades: ["8", "9"],
    scheduledDate: "2025-01-15",
    endDate: "2025-01-16",
    status: "in_progress",
    totalStudents: 180,
    completedStudents: 95,
    location: "Phòng khám mắt",
    medicalStaff: "BS. Lê Thị C - Chuyên khoa mắt",
    checkupItems: ["Đo thị lực", "Khám tật khúc xạ", "Kiểm tra màu sắc", "Áp lực mắt"],
  },
  {
    id: 3,
    name: "Kiểm tra sức khỏe tuyển sinh",
    type: "entrance",
    targetGrades: ["6"],
    scheduledDate: "2024-08-15",
    endDate: "2024-08-20",
    status: "completed",
    totalStudents: 120,
    completedStudents: 120,
    location: "Phòng y tế trường",
    medicalStaff: "BS. Hoàng Văn D, Y tá Phạm Thị E",
    checkupItems: ["Khám tổng quát", "Xét nghiệm máu", "Chụp X-quang", "Tiêm chủng"],
  },
]

const studentCheckups = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    class: "6A1",
    campaignId: 2,
    checkupDate: "2025-01-15",
    status: "completed",
    height: 155,
    weight: 45,
    vision: "10/10",
    hearing: "Bình thường",
    bloodPressure: "110/70",
    heartRate: 75,
    notes: "Sức khỏe tốt, không có vấn đề gì",
    recommendations: "Duy trì chế độ ăn uống và tập thể dục",
  },
  {
    id: 2,
    studentName: "Trần Thị B",
    class: "8B2",
    campaignId: 2,
    checkupDate: "2025-01-15",
    status: "completed",
    height: 160,
    weight: 48,
    vision: "8/10",
    hearing: "Bình thường",
    bloodPressure: "105/65",
    heartRate: 72,
    notes: "Thị lực giảm nhẹ",
    recommendations: "Nên đeo kính cận thị, hạn chế sử dụng thiết bị điện tử",
  },
  {
    id: 3,
    studentName: "Lê Văn C",
    class: "9C1",
    campaignId: 1,
    checkupDate: null,
    status: "scheduled",
    height: null,
    weight: null,
    vision: null,
    hearing: null,
    bloodPressure: null,
    heartRate: null,
    notes: null,
    recommendations: null,
  },
]

const checkupTypes = {
  periodic: "Định kỳ",
  specialized: "Chuyên khoa",
  entrance: "Tuyển sinh",
  emergency: "Khẩn cấp",
}

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
  scheduled: "Chờ khám",
  completed: "Đã khám",
  absent: "Vắng mặt",
  rescheduled: "Hoãn lại",
}

const studentStatusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  absent: "bg-red-100 text-red-800",
  rescheduled: "bg-yellow-100 text-yellow-800",
}

function MedicalCheckups() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const filteredCampaigns = checkupCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || campaign.type === selectedType
    const matchesStatus = !selectedStatus || campaign.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const filteredStudents = studentCheckups.filter((student) => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || student.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleViewDetail = (campaign) => {
    console.log("View campaign detail:", campaign)
  }

  const handleViewResult = (student) => {
    setSelectedStudent(student)
    setShowResultModal(true)
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
                  <ClipboardDocumentCheckIcon className="w-8 h-8 text-indigo-600" />
                  Quản lý kiểm tra y tế
                </h1>
                <p className="text-gray-600 mt-1">Tổ chức và theo dõi các đợt kiểm tra sức khỏe</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Tạo đợt kiểm tra
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng đợt kiểm tra</p>
                  <p className="text-2xl font-bold text-gray-900">{checkupCampaigns.length}</p>
                </div>
                <ClipboardDocumentCheckIcon className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đang tiến hành</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {checkupCampaigns.filter((c) => c.status === "in_progress").length}
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
                    {checkupCampaigns.filter((c) => c.status === "completed").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Học sinh đã khám</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {checkupCampaigns.reduce((sum, c) => sum + c.completedStudents, 0)}
                  </p>
                </div>
                <UserGroupIcon className="w-8 h-8 text-blue-500" />
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
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Đợt kiểm tra
                </button>
                <button
                  onClick={() => setActiveTab("results")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "results"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Kết quả khám
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
                  placeholder={activeTab === "campaigns" ? "Tìm kiếm đợt kiểm tra..." : "Tìm kiếm học sinh..."}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {activeTab === "campaigns" && (
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Tất cả loại</option>
                  {Object.entries(checkupTypes).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              )}
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {activeTab === "campaigns" ? filteredCampaigns.length : filteredStudents.length}{" "}
                {activeTab === "campaigns" ? "đợt kiểm tra" : "kết quả"}
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
                        Đợt kiểm tra
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loại
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời gian
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
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">Khối: {campaign.targetGrades.join(", ")}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {checkupTypes[campaign.type]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.scheduledDate} - {campaign.endDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.completedStudents}/{campaign.totalStudents} học sinh
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{
                                width: `${(campaign.completedStudents / campaign.totalStudents) * 100}%`,
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
                                title="Bắt đầu kiểm tra"
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
            /* Results Table */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Học sinh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đợt kiểm tra
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày khám
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chỉ số cơ bản
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
                      const campaign = checkupCampaigns.find((c) => c.id === student.campaignId)
                      return (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                              <div className="text-sm text-gray-500">Lớp {student.class}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{campaign?.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.checkupDate || "Chưa khám"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {student.height ? (
                              <div className="text-sm text-gray-900">
                                <div>Cao: {student.height}cm</div>
                                <div>Nặng: {student.weight}kg</div>
                                <div>Thị lực: {student.vision}</div>
                              </div>
                            ) : (
                              <span className="text-gray-400">Chưa có kết quả</span>
                            )}
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
                              <button
                                onClick={() => handleViewResult(student)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Xem kết quả"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              {student.status === "scheduled" && (
                                <button className="text-green-600 hover:text-green-900 p-1" title="Nhập kết quả">
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
            <h3 className="text-lg font-semibold mb-4">Tạo đợt kiểm tra y tế mới</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đợt kiểm tra</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nhập tên đợt kiểm tra"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại kiểm tra</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                    {Object.entries(checkupTypes).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Địa điểm kiểm tra"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Khối lớp đối tượng</label>
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
                <label className="block text-sm font-medium text-gray-700">Hạng mục kiểm tra</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Chiều cao", "Cân nặng", "Thị lực", "Thính lực", "Răng miệng", "Tim mạch", "Huyết áp", "BMI"].map(
                    (item) => (
                      <label key={item} className="flex items-center">
                        <input type="checkbox" className="mr-2" value={item} />
                        {item}
                      </label>
                    ),
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nhân viên y tế</label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Danh sách nhân viên y tế tham gia"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Tạo đợt kiểm tra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Detail Modal */}
      {showResultModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Kết quả kiểm tra sức khỏe</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Học sinh</label>
                  <p className="text-sm text-gray-900">
                    {selectedStudent.studentName} - Lớp {selectedStudent.class}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngày khám</label>
                  <p className="text-sm text-gray-900">{selectedStudent.checkupDate || "Chưa khám"}</p>
                </div>
              </div>

              {selectedStudent.height && (
                <>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Chiều cao</label>
                      <p className="text-sm text-gray-900">{selectedStudent.height} cm</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cân nặng</label>
                      <p className="text-sm text-gray-900">{selectedStudent.weight} kg</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">BMI</label>
                      <p className="text-sm text-gray-900">
                        {(selectedStudent.weight / (selectedStudent.height / 100) ** 2 || 0).toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nhịp tim</label>
                      <p className="text-sm text-gray-900">{selectedStudent.heartRate} bpm</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Thị lực</label>
                      <p className="text-sm text-gray-900">{selectedStudent.vision}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Thính lực</label>
                      <p className="text-sm text-gray-900">{selectedStudent.hearing}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Huyết áp</label>
                      <p className="text-sm text-gray-900">{selectedStudent.bloodPressure} mmHg</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                    <p className="text-sm text-gray-900">{selectedStudent.notes}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Khuyến nghị</label>
                    <p className="text-sm text-gray-900">{selectedStudent.recommendations}</p>
                  </div>
                </>
              )}

              {!selectedStudent.height && (
                <div className="text-center py-8">
                  <ClipboardDocumentCheckIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có kết quả kiểm tra</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowResultModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Đóng
              </button>
              {selectedStudent.status === "scheduled" && (
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Nhập kết quả
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default MedicalCheckups
