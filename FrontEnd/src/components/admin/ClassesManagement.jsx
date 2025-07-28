"use client"

import { useState, useEffect } from "react"
import {
  BuildingOfficeIcon,
  PlusIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"
import { getAdminClassList, createAdminClass, getAdminClassDetail } from "../../api/axios"

// Toast component
function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      onClick={onClose}
      role="alert"
    >
      {message}
    </div>
  );
}

// Confirm Modal component
function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Huỷ</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

function ClassesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showStudentsModal, setShowStudentsModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [students, setStudents] = useState([])
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [classStudentsCount, setClassStudentsCount] = useState({})
  const [form, setForm] = useState({
    id: "",
    name: ""
  })

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });
  // Confirm modal state
  const [confirm, setConfirm] = useState({ open: false, action: null, title: '', message: '' });

  // Toast auto close
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ ...toast, message: '' }), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchClasses = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getAdminClassList()
      const classesList = response.result || []
      setClasses(classesList)
      
      // Fetch students count for each class
      const studentsCountPromises = classesList.map(async (cls) => {
        try {
          const studentsResponse = await getAdminClassDetail(cls.id)
          const studentsList = studentsResponse.result || []
          return { classId: cls.id, count: studentsList.length }
        } catch (error) {
          console.error(`Error fetching students for class ${cls.id}:`, error)
          return { classId: cls.id, count: 0 }
        }
      })
      
      const studentsCounts = await Promise.all(studentsCountPromises)
      const countMap = {}
      studentsCounts.forEach(({ classId, count }) => {
        countMap[classId] = count
      })
      setClassStudentsCount(countMap)
    } catch {
      setError("Không thể tải danh sách lớp học.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.grade?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleViewStudents = async (cls) => {
    setSelectedClass(cls)
    setShowStudentsModal(true)
    setLoadingStudents(true)
    try {
      const response = await getAdminClassDetail(cls.id)
      const studentsList = response.result || []
      setStudents(studentsList)
    } catch (error) {
      console.error('Error fetching students:', error)
      setToast({ message: 'Lỗi khi tải danh sách học sinh!', type: 'error' })
    } finally {
      setLoadingStudents(false)
    }
  }

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Handle add class
  const handleAddClass = async () => {
    try {
      if (!form.id.trim() || !form.name.trim()) {
        setToast({ message: 'Vui lòng nhập đầy đủ thông tin!', type: 'error' })
        return
      }

      await createAdminClass(form)
      setToast({ message: 'Thêm lớp học thành công!', type: 'success' })
      setShowAddModal(false)
      setForm({ id: "", name: "" })
      fetchClasses()
    } catch (error) {
      console.error('Error adding class:', error)
      setToast({ message: 'Thêm lớp học thất bại!', type: 'error' })
    }
  }



  return (
    <AdminLayout>
      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
      {/* Confirm modal */}
      <ConfirmModal
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        onConfirm={async () => {
          if (confirm.action) await confirm.action();
        }}
        onCancel={() => setConfirm({ ...confirm, open: false })}
      />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <BuildingOfficeIcon className="w-8 h-8 text-emerald-600" />
                  Quản lý lớp học
                </h1>
                <p className="text-gray-600 mt-1">Quản lý danh sách lớp học và thông tin chi tiết</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="w-5 h-5" />
                Thêm lớp học
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng số lớp</p>
                  <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
                </div>
                <BuildingOfficeIcon className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm lớp học..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {filteredClasses.length} lớp học
              </div>
            </div>
          </div>

          {/* Classes Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên lớp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số học sinh
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
                  {loading && (
                    <tr>
                      <td colSpan="4" className="text-center py-8">Đang tải dữ liệu...</td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td colSpan="4" className="text-center text-red-500 py-8">{error}</td>
                    </tr>
                  )}
                  {filteredClasses.length === 0 && !loading && !error && (
                    <tr>
                      <td colSpan="4" className="text-center py-8">Không có lớp học nào</td>
                    </tr>
                  )}
                  {filteredClasses.map((cls) => (
                    <tr key={cls.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                            <BuildingOfficeIcon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{cls.name}</div>
                            <div className="text-sm text-gray-500">ID: {cls.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <AcademicCapIcon className="w-4 h-4 text-purple-500 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {classStudentsCount[cls.id] !== undefined 
                                ? classStudentsCount[cls.id]
                                : '0'
                              }
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          classStudentsCount[cls.id] !== undefined && classStudentsCount[cls.id] > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {classStudentsCount[cls.id] !== undefined && classStudentsCount[cls.id] > 0
                            ? 'Có học sinh'
                            : 'Chưa có học sinh'
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewStudents(cls)}
                            className="text-purple-600 hover:text-purple-900 p-1"
                            title="Xem danh sách học sinh"
                          >
                            <AcademicCapIcon className="w-4 h-4" />
                          </button>
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

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Thêm lớp học mới</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID lớp học *
                </label>
                <input
                  type="text"
                  name="id"
                  value={form.id}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Nhập ID lớp học..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên lớp học *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Nhập tên lớp học..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                onClick={handleAddClass}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Thêm lớp học
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Students Modal */}
      {showStudentsModal && selectedClass && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Danh sách học sinh - {selectedClass.name}
              </h3>
              <button
                onClick={() => setShowStudentsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {loadingStudents ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="ml-3 text-gray-500">Đang tải danh sách học sinh...</span>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Không có học sinh nào trong lớp này
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Học sinh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giới tính
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày sinh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chiều cao
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cân nặng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dị ứng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.studentId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.lastName} {student.firstName}
                            </div>
                            <div className="text-sm text-gray-500">ID: {student.studentId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.gender === 'MALE' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                          }`}>
                            {student.gender === 'MALE' ? 'Nam' : 'Nữ'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(student.dateOfBirth).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.healthRecord?.height || 'N/A'} cm
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.healthRecord?.weight || 'N/A'} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.healthRecord?.allergy || 'Không có'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}


    </AdminLayout>
  )
}

export default ClassesManagement