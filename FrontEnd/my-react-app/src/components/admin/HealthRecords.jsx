"use client"

import { useState, useEffect } from "react"
import {
  DocumentTextIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"
import { getAdminHealthRecordList } from "../../api/axios"

function HealthRecords() {
  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [loading, setLoading] = useState(true)

  const classes = ["6A1", "6A2", "7B1", "7B2", "8C1", "8C2", "9A1", "9A2", "9A3"]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getAdminHealthRecordList()
        setList(res.result || [])
      } catch {
        setList([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Lọc dữ liệu theo search và filters
  const filteredRecords = list.filter((record) => {
    const name = ((record.lastName || "") + " " + (record.firstName || "")).toLowerCase()
    const studentId = (record.studentId || "").toLowerCase()
    const searchText = searchTerm.toLowerCase()
    
    const matchesSearch = name.includes(searchText) || studentId.includes(searchText)
    const matchesClass = !selectedClass || record.class === selectedClass

    return matchesSearch && matchesClass
  })

  // Tính toán stats
  const totalRecords = list.length
  const recordsWithAllergies = list.filter(record => 
    record.healthRecord?.allergy && record.healthRecord.allergy.trim() !== "" && record.healthRecord.allergy !== "Không có"
  ).length
  const recordsWithChronicDiseases = list.filter(record => 
    record.healthRecord?.chronic_disease && record.healthRecord.chronic_disease.trim() !== "" && record.healthRecord.chronic_disease !== "Không có"
  ).length

  const handleViewDetail = (record) => {
    setSelectedRecord(record)
    setShowDetailModal(true)
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng hồ sơ</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRecords}</p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Có dị ứng</p>
                  <p className="text-2xl font-bold text-orange-600">{recordsWithAllergies}</p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bệnh mãn tính</p>
                  <p className="text-2xl font-bold text-red-600">{recordsWithChronicDiseases}</p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cân nặng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chiều cao</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                    </tr>
                  ) : filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">Không có dữ liệu</td>
                    </tr>
                  ) : (
                    filteredRecords.map((record) => (
                      <tr key={record.studentId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {`${record.lastName || ''} ${record.firstName || ''}`.trim() || 'Không có'}
                            </div>
                            <div className="text-sm text-gray-500">Mã: {record.studentId || 'Không có'}</div>
                            <div className="text-xs text-gray-400">Giới tính: {record.gender || 'Không có'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {record.healthRecord?.allergy && record.healthRecord.allergy.trim() !== "" && record.healthRecord.allergy !== "Không có" ? (
                              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                {record.healthRecord.allergy}
                              </span>
                            ) : (
                              <span className="text-gray-400">Không có</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {record.healthRecord?.chronic_disease && record.healthRecord.chronic_disease.trim() !== "" && record.healthRecord.chronic_disease !== "Không có" ? (
                              <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                {record.healthRecord.chronic_disease}
                              </span>
                            ) : (
                              <span className="text-gray-400">Không có</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div>👁️ {record.healthRecord?.vision || 'Chưa cập nhật'}</div>
                            <div>👂 {record.healthRecord?.hearing || 'Chưa cập nhật'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {record.healthRecord?.weight && record.healthRecord.weight !== '' ? (
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {record.healthRecord.weight}
                              </span>
                            ) : (
                              <span className="text-gray-400">Chưa cập nhật</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {record.healthRecord?.height && record.healthRecord.height !== '' ? (
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {record.healthRecord.height}
                              </span>
                            ) : (
                              <span className="text-gray-400">Chưa cập nhật</span>
                            )}
                          </div>
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
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chi tiết hồ sơ sức khỏe</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên học sinh</label>
                  <p className="text-sm text-gray-900">
                    {`${selectedRecord.lastName || ''} ${selectedRecord.firstName || ''}`.trim() || 'Không có'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mã học sinh</label>
                  <p className="text-sm text-gray-900">{selectedRecord.studentId || 'Không có'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                  <p className="text-sm text-gray-900">{selectedRecord.gender || 'Không có'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                  <p className="text-sm text-gray-900">{selectedRecord.dateOfBirth || 'Không có'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dị ứng</label>
                <p className="text-sm text-gray-900">
                  {selectedRecord.healthRecord?.allergy || 'Không có'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bệnh mãn tính</label>
                <p className="text-sm text-gray-900">
                  {selectedRecord.healthRecord?.chronic_disease || 'Không có'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thị lực</label>
                  <p className="text-sm text-gray-900">{selectedRecord.healthRecord?.vision || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thính lực</label>
                  <p className="text-sm text-gray-900">{selectedRecord.healthRecord?.hearing || 'Chưa cập nhật'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cân nặng</label>
                  <p className="text-sm text-gray-900">{selectedRecord.healthRecord?.weight || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Chiều cao</label>
                  <p className="text-sm text-gray-900">{selectedRecord.healthRecord?.height || 'Chưa cập nhật'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiền sử bệnh</label>
                <p className="text-sm text-gray-900">{selectedRecord.healthRecord?.medical_history || 'Không có'}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default HealthRecords
