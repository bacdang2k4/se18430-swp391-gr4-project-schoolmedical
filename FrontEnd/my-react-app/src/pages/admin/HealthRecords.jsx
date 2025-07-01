"use client"

import { useState } from "react"
import {
  DocumentTextIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const healthRecords = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    class: "6A1",
    allergies: ["Đậu phộng", "Tôm cua"],
    chronicDiseases: ["Hen suyễn"],
    vision: "Bình thường",
    hearing: "Bình thường",
    vaccinations: "Đầy đủ",
    status: "approved",
    lastUpdated: "2025-01-05",
    parentName: "Nguyễn Thị B",
  },
  {
    id: 2,
    studentName: "Trần Thị C",
    class: "7B2",
    allergies: [],
    chronicDiseases: ["Tiểu đường type 1"],
    vision: "Cận thị nhẹ",
    hearing: "Bình thường",
    vaccinations: "Đầy đủ",
    status: "pending",
    lastUpdated: "2025-01-06",
    parentName: "Trần Văn D",
  },
  {
    id: 3,
    studentName: "Lê Văn E",
    class: "8C1",
    allergies: ["Sữa"],
    chronicDiseases: [],
    vision: "Bình thường",
    hearing: "Giảm thính nhẹ",
    vaccinations: "Thiếu vaccine cúm",
    status: "approved",
    lastUpdated: "2025-01-04",
    parentName: "Lê Thị F",
  },
  {
    id: 4,
    studentName: "Phạm Thị G",
    class: "9A3",
    allergies: ["Thuốc kháng sinh"],
    chronicDiseases: ["Dị ứng da"],
    vision: "Cận thị nặng",
    hearing: "Bình thường",
    vaccinations: "Đầy đủ",
    status: "approved",
    lastUpdated: "2025-01-03",
    parentName: "Phạm Văn H",
  },
]

function HealthRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  const classes = ["6A1", "6A2", "7B1", "7B2", "8C1", "8C2", "9A1", "9A2", "9A3"]

  const filteredRecords = healthRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.parentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = !selectedClass || record.class === selectedClass
    const matchesStatus = !selectedStatus || record.status === selectedStatus

    return matchesSearch && matchesClass && matchesStatus
  })

  const handleViewDetail = (record) => {
    setSelectedRecord(record)
    setShowDetailModal(true)
  }

  const handleApprove = (recordId) => {
    console.log("Approve record:", recordId)
  }

  const handleReject = (recordId) => {
    console.log("Reject record:", recordId)
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
                  <DocumentTextIcon className="w-8 h-8 text-green-600" />
                  Quản lý hồ sơ sức khỏe
                </h1>
                <p className="text-gray-600 mt-1">Quản lý hồ sơ sức khỏe của tất cả học sinh</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng hồ sơ</p>
                  <p className="text-2xl font-bold text-gray-900">{healthRecords.length}</p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Có dị ứng</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {healthRecords.filter((r) => r.allergies.length > 0).length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bệnh mãn tính</p>
                  <p className="text-2xl font-bold text-red-600">
                    {healthRecords.filter((r) => r.chronicDiseases.length > 0).length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {healthRecords.filter((r) => r.status === "pending").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên học sinh..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Tất cả lớp</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="approved">Đã duyệt</option>
                <option value="pending">Chờ duyệt</option>
              </select>
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {filteredRecords.length} hồ sơ
              </div>
            </div>
          </div>

          {/* Health Records Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học sinh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dị ứng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bệnh mãn tính
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thị lực/Thính lực
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
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                          <div className="text-sm text-gray-500">Lớp {record.class}</div>
                          <div className="text-xs text-gray-400">PH: {record.parentName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {record.allergies.length > 0 ? (
                            <div className="space-y-1">
                              {record.allergies.map((allergy, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-1"
                                >
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">Không có</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {record.chronicDiseases.length > 0 ? (
                            <div className="space-y-1">
                              {record.chronicDiseases.map((disease, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mr-1"
                                >
                                  {disease}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">Không có</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>👁️ {record.vision}</div>
                          <div>👂 {record.hearing}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            record.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {record.status === "approved" ? "Đã duyệt" : "Chờ duyệt"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewDetail(record)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          {record.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(record.id)}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Phê duyệt"
                              >
                                <CheckCircleIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(record.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Từ chối"
                              >
                                <ExclamationTriangleIcon className="w-4 h-4" />
                              </button>
                            </>
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

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chi tiết hồ sơ sức khỏe</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên học sinh</label>
                  <p className="text-sm text-gray-900">{selectedRecord.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lớp</label>
                  <p className="text-sm text-gray-900">{selectedRecord.class}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phụ huynh</label>
                <p className="text-sm text-gray-900">{selectedRecord.parentName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dị ứng</label>
                <p className="text-sm text-gray-900">
                  {selectedRecord.allergies.length > 0 ? selectedRecord.allergies.join(", ") : "Không có"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bệnh mãn tính</label>
                <p className="text-sm text-gray-900">
                  {selectedRecord.chronicDiseases.length > 0 ? selectedRecord.chronicDiseases.join(", ") : "Không có"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thị lực</label>
                  <p className="text-sm text-gray-900">{selectedRecord.vision}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thính lực</label>
                  <p className="text-sm text-gray-900">{selectedRecord.hearing}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tình trạng tiêm chủng</label>
                <p className="text-sm text-gray-900">{selectedRecord.vaccinations}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cập nhật lần cuối</label>
                <p className="text-sm text-gray-900">{selectedRecord.lastUpdated}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Đóng
              </button>
              {selectedRecord.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedRecord.id)
                      setShowDetailModal(false)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Phê duyệt
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedRecord.id)
                      setShowDetailModal(false)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Từ chối
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default HealthRecords
