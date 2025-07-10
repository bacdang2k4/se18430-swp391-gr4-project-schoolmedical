"use client"

import { useState } from "react"
import {
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const medicalEvents = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    class: "6A1",
    eventType: "accident",
    title: "Té ngã trong sân chơi",
    description: "Học sinh bị té ngã khi chơi bóng đá, có vết thương nhỏ ở đầu gối",
    severity: "minor",
    status: "resolved",
    reportedBy: "Cô Lan - Giáo viên",
    handledBy: "Y tá Hoa",
    reportedAt: "2025-01-07 10:30",
    resolvedAt: "2025-01-07 11:00",
    treatment: "Rửa vết thương, băng bó, theo dõi",
    parentNotified: true,
  },
  {
    id: 2,
    studentName: "Trần Thị B",
    class: "7B2",
    eventType: "illness",
    title: "Sốt cao đột ngột",
    description: "Học sinh có biểu hiện sốt cao 39°C, đau đầu, mệt mỏi",
    severity: "moderate",
    status: "in_progress",
    reportedBy: "Thầy Nam - Giáo viên",
    handledBy: "Y tá Hoa",
    reportedAt: "2025-01-07 14:15",
    resolvedAt: null,
    treatment: "Đo nhiệt độ, cho uống thuốc hạ sốt, liên hệ phụ huynh",
    parentNotified: true,
  },
  {
    id: 3,
    studentName: "Lê Văn C",
    class: "8C1",
    eventType: "allergy",
    title: "Phản ứng dị ứng thực phẩm",
    description: "Học sinh có biểu hiện ngứa, nổi mẩn đỏ sau khi ăn trưa",
    severity: "moderate",
    status: "pending",
    reportedBy: "Cô Mai - Giáo viên",
    handledBy: null,
    reportedAt: "2025-01-07 13:45",
    resolvedAt: null,
    treatment: null,
    parentNotified: false,
  },
  {
    id: 4,
    studentName: "Phạm Thị D",
    class: "9A3",
    eventType: "emergency",
    title: "Khó thở do hen suyễn",
    description: "Học sinh có cơn hen suyễn cấp tính, khó thở, cần xử lý khẩn cấp",
    severity: "severe",
    status: "resolved",
    reportedBy: "Thầy Tùng - Giáo viên",
    handledBy: "Y tá Hoa",
    reportedAt: "2025-01-06 15:20",
    resolvedAt: "2025-01-06 16:30",
    treatment: "Sử dụng thuốc xịt, gọi cấp cứu, chuyển viện",
    parentNotified: true,
  },
]

const eventTypes = {
  accident: "Tai nạn",
  illness: "Ốm đau",
  allergy: "Dị ứng",
  emergency: "Khẩn cấp",
  other: "Khác",
}

const severityLabels = {
  minor: "Nhẹ",
  moderate: "Trung bình",
  severe: "Nặng",
}

const severityColors = {
  minor: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  severe: "bg-red-100 text-red-800",
}

const statusLabels = {
  pending: "Chờ xử lý",
  in_progress: "Đang xử lý",
  resolved: "Đã xử lý",
  referred: "Chuyển viện",
}

const statusColors = {
  pending: "bg-gray-100 text-gray-800",
  in_progress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  referred: "bg-purple-100 text-purple-800",
}

function MedicalEvents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const filteredEvents = medicalEvents.filter((event) => {
    const matchesSearch =
      event.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || event.eventType === selectedType
    const matchesSeverity = !selectedSeverity || event.severity === selectedSeverity
    const matchesStatus = !selectedStatus || event.status === selectedStatus

    return matchesSearch && matchesType && matchesSeverity && matchesStatus
  })

  const handleViewDetail = (event) => {
    setSelectedEvent(event)
    setShowDetailModal(true)
  }

  const handleUpdateStatus = (eventId, newStatus) => {
    console.log("Update status:", eventId, newStatus)
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
                  <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
                  Quản lý sự kiện y tế
                </h1>
                <p className="text-gray-600 mt-1">Theo dõi và xử lý các sự kiện y tế trong trường</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Ghi nhận sự kiện
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng sự kiện</p>
                  <p className="text-2xl font-bold text-gray-900">{medicalEvents.length}</p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                  <p className="text-2xl font-bold text-red-600">
                    {medicalEvents.filter((e) => e.status === "pending").length}
                  </p>
                </div>
                <XCircleIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {medicalEvents.filter((e) => e.status === "in_progress").length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã xử lý</p>
                  <p className="text-2xl font-bold text-green-600">
                    {medicalEvents.filter((e) => e.status === "resolved").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Tất cả loại</option>
                {Object.entries(eventTypes).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
              >
                <option value="">Tất cả mức độ</option>
                {Object.entries(severityLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {filteredEvents.length} sự kiện
              </div>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học sinh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sự kiện
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mức độ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.studentName}</div>
                          <div className="text-sm text-gray-500">Lớp {event.class}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              {eventTypes[event.eventType]}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${severityColors[event.severity]}`}
                        >
                          {severityLabels[event.severity]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[event.status]}`}
                        >
                          {statusLabels[event.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.reportedAt}</div>
                        {event.resolvedAt && <div className="text-xs text-gray-500">Xử lý: {event.resolvedAt}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewDetail(event)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          {event.status === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(event.id, "in_progress")}
                              className="text-orange-600 hover:text-orange-900 p-1"
                              title="Bắt đầu xử lý"
                            >
                              <ExclamationTriangleIcon className="w-4 h-4" />
                            </button>
                          )}
                          {event.status === "in_progress" && (
                            <button
                              onClick={() => handleUpdateStatus(event.id, "resolved")}
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
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Ghi nhận sự kiện y tế</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên học sinh</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Nhập tên học sinh"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Ví dụ: 6A1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại sự kiện</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    {Object.entries(eventTypes).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mức độ nghiêm trọng</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    {Object.entries(severityLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề sự kiện</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Mô tả ngắn gọn sự kiện"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Mô tả chi tiết về sự kiện, triệu chứng, hoàn cảnh xảy ra..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Người báo cáo</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Tên và chức vụ người báo cáo"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  Ghi nhận sự kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chi tiết sự kiện y tế</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Học sinh</label>
                  <p className="text-sm text-gray-900">
                    {selectedEvent.studentName} - Lớp {selectedEvent.class}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại sự kiện</label>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {eventTypes[selectedEvent.eventType]}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <p className="text-sm text-gray-900">{selectedEvent.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <p className="text-sm text-gray-900">{selectedEvent.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mức độ nghiêm trọng</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${severityColors[selectedEvent.severity]}`}
                  >
                    {severityLabels[selectedEvent.severity]}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedEvent.status]}`}
                  >
                    {statusLabels[selectedEvent.status]}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Người báo cáo</label>
                  <p className="text-sm text-gray-900">{selectedEvent.reportedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Người xử lý</label>
                  <p className="text-sm text-gray-900">{selectedEvent.handledBy || "Chưa có"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thời gian báo cáo</label>
                  <p className="text-sm text-gray-900">{selectedEvent.reportedAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thời gian xử lý</label>
                  <p className="text-sm text-gray-900">{selectedEvent.resolvedAt || "Chưa xử lý"}</p>
                </div>
              </div>
              {selectedEvent.treatment && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cách xử lý</label>
                  <p className="text-sm text-gray-900">{selectedEvent.treatment}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Thông báo phụ huynh</label>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedEvent.parentNotified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedEvent.parentNotified ? "Đã thông báo" : "Chưa thông báo"}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Đóng
              </button>
              {selectedEvent.status === "pending" && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedEvent.id, "in_progress")
                    setShowDetailModal(false)
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Bắt đầu xử lý
                </button>
              )}
              {selectedEvent.status === "in_progress" && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedEvent.id, "resolved")
                    setShowDetailModal(false)
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Hoàn thành
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default MedicalEvents
