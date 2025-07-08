"use client"

import { useState } from "react"
import {
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const medicalHistory = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    class: "6A1",
    date: "2025-01-07",
    type: "medical_event",
    title: "Té ngã trong sân chơi",
    description: "Học sinh bị té ngã khi chơi bóng đá, có vết thương nhỏ ở đầu gối",
    handledBy: "Y tá Hoa",
    treatment: "Rửa vết thương, băng bó, theo dõi",
    outcome: "Khỏi hoàn toàn",
    followUp: "Không cần theo dõi thêm",
  },
  {
    id: 2,
    studentName: "Nguyễn Văn A",
    class: "6A1",
    date: "2024-12-15",
    type: "checkup",
    title: "Kiểm tra sức khỏe định kỳ",
    description: "Kiểm tra sức khỏe tổng quát học kỳ 1",
    handledBy: "BS. Nguyễn Văn B",
    treatment: "Không có vấn đề sức khỏe",
    outcome: "Sức khỏe tốt",
    followUp: "Kiểm tra định kỳ tiếp theo",
    height: 155,
    weight: 45,
    vision: "10/10",
    bloodPressure: "110/70",
  },
  {
    id: 3,
    studentName: "Trần Thị B",
    class: "8B2",
    date: "2025-01-05",
    type: "vaccination",
    title: "Tiêm vaccine HPV",
    description: "Tiêm vaccine HPV phòng chống ung thư cổ tử cung",
    handledBy: "Y tá Hoa",
    treatment: "Tiêm vaccine, theo dõi 30 phút",
    outcome: "Không có phản ứng phụ",
    followUp: "Tiêm mũi tiếp theo sau 6 tháng",
  },
  {
    id: 4,
    studentName: "Lê Văn C",
    class: "9C1",
    date: "2024-11-20",
    type: "medicine",
    title: "Sử dụng thuốc dị ứng",
    description: "Học sinh có phản ứng dị ứng thực phẩm, được cho uống thuốc",
    handledBy: "Y tá Mai",
    treatment: "Cho uống thuốc chống dị ứng, theo dõi",
    outcome: "Triệu chứng giảm sau 2 giờ",
    followUp: "Tránh thực phẩm gây dị ứng",
  },
  {
    id: 5,
    studentName: "Phạm Thị D",
    class: "9A3",
    date: "2024-10-10",
    type: "emergency",
    title: "Cấp cứu hen suyễn",
    description: "Học sinh có cơn hen suyễn cấp tính, khó thở",
    handledBy: "BS. Lê Thị E",
    treatment: "Sử dụng thuốc xịt, gọi cấp cứu, chuyển viện",
    outcome: "Ổn định sau điều trị",
    followUp: "Theo dõi định kỳ, mang theo thuốc xịt",
  },
]

const typeLabels = {
  medical_event: "Sự kiện y tế",
  checkup: "Kiểm tra sức khỏe",
  vaccination: "Tiêm chủng",
  medicine: "Sử dụng thuốc",
  emergency: "Cấp cứu",
}

const typeColors = {
  medical_event: "bg-orange-100 text-orange-800",
  checkup: "bg-blue-100 text-blue-800",
  vaccination: "bg-purple-100 text-purple-800",
  medicine: "bg-green-100 text-green-800",
  emergency: "bg-red-100 text-red-800",
}

function MedicalHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  // Get unique students for filter
  const students = [...new Set(medicalHistory.map((record) => record.studentName))].sort()

  const filteredHistory = medicalHistory.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = !selectedType || record.type === selectedType
    const matchesStudent = !selectedStudent || record.studentName === selectedStudent

    const recordDate = new Date(record.date)
    const matchesDateFrom = !dateFrom || recordDate >= new Date(dateFrom)
    const matchesDateTo = !dateTo || recordDate <= new Date(dateTo)

    return matchesSearch && matchesType && matchesStudent && matchesDateFrom && matchesDateTo
  })

  const handleViewDetail = (record) => {
    setSelectedRecord(record)
    setShowDetailModal(true)
  }

  const handleExportHistory = (studentName) => {
    console.log("Export history for:", studentName)
    // Implement export functionality
  }

  const getStudentHistory = (studentName) => {
    return medicalHistory.filter((record) => record.studentName === studentName)
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
                  <ClockIcon className="w-8 h-8 text-pink-600" />
                  Lịch sử y tế
                </h1>
                <p className="text-gray-600 mt-1">Theo dõi lịch sử y tế chi tiết của từng học sinh</p>
              </div>
              <button
                onClick={() => handleExportHistory("all")}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                Xuất báo cáo
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng hồ sơ</p>
                  <p className="text-2xl font-bold text-gray-900">{medicalHistory.length}</p>
                </div>
                <ClockIcon className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            {Object.entries(typeLabels).map(([type, label]) => (
              <div key={type} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {medicalHistory.filter((record) => record.type === type).length}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[type]}`}>
                    {type === "checkup" && <CalendarDaysIcon className="w-5 h-5" />}
                    {type === "vaccination" && <span className="text-sm font-bold">💉</span>}
                    {type === "medicine" && <span className="text-sm font-bold">💊</span>}
                    {type === "medical_event" && <span className="text-sm font-bold">🏥</span>}
                    {type === "emergency" && <span className="text-sm font-bold">🚨</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Tất cả học sinh</option>
                {students.map((student) => (
                  <option key={student} value={student}>
                    {student}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Tất cả loại</option>
                {Object.entries(typeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="Từ ngày"
              />
              <input
                type="date"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="Đến ngày"
              />
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {filteredHistory.length} hồ sơ
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học sinh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nội dung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người xử lý
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kết quả
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                          <div className="text-sm text-gray-500">Lớp {record.class}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[record.type]}`}
                        >
                          {typeLabels[record.type]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{record.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.handledBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.outcome}</div>
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
                          <button
                            onClick={() => handleExportHistory(record.studentName)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Xuất hồ sơ"
                          >
                            <DocumentArrowDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Summary Cards */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tóm tắt theo học sinh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.slice(0, 6).map((student) => {
                const studentRecords = getStudentHistory(student)
                const latestRecord = studentRecords[0]
                return (
                  <div key={student} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{student}</h3>
                          <p className="text-sm text-gray-500">{studentRecords.length} hồ sơ</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleExportHistory(student)}
                        className="text-pink-600 hover:text-pink-900 p-1"
                        title="Xuất hồ sơ"
                      >
                        <DocumentArrowDownIcon className="w-4 h-4" />
                      </button>
                    </div>
                    {latestRecord && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Gần nhất:</span>
                          <span className="text-sm text-gray-900">{latestRecord.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Loại:</span>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[latestRecord.type]}`}
                          >
                            {typeLabels[latestRecord.type]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 truncate">{latestRecord.title}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chi tiết hồ sơ y tế</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Học sinh</label>
                  <p className="text-sm text-gray-900">
                    {selectedRecord.studentName} - Lớp {selectedRecord.class}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngày</label>
                  <p className="text-sm text-gray-900">{selectedRecord.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[selectedRecord.type]}`}
                  >
                    {typeLabels[selectedRecord.type]}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Người xử lý</label>
                  <p className="text-sm text-gray-900">{selectedRecord.handledBy}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <p className="text-sm text-gray-900">{selectedRecord.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <p className="text-sm text-gray-900">{selectedRecord.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cách xử lý</label>
                <p className="text-sm text-gray-900">{selectedRecord.treatment}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kết quả</label>
                <p className="text-sm text-gray-900">{selectedRecord.outcome}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Theo dõi</label>
                <p className="text-sm text-gray-900">{selectedRecord.followUp}</p>
              </div>

              {/* Health metrics if available */}
              {selectedRecord.height && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chỉ số sức khỏe</label>
                  <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">Chiều cao</p>
                      <p className="text-sm font-semibold">{selectedRecord.height} cm</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Cân nặng</p>
                      <p className="text-sm font-semibold">{selectedRecord.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Thị lực</p>
                      <p className="text-sm font-semibold">{selectedRecord.vision}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Huyết áp</p>
                      <p className="text-sm font-semibold">{selectedRecord.bloodPressure}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Đóng
              </button>
              <button
                onClick={() => handleExportHistory(selectedRecord.studentName)}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Xuất hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default MedicalHistory
