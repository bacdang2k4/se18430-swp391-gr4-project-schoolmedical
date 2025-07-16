"use client"

import { useState, useEffect } from "react"
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
import { getAdminMedicalEventList, getAllAdminStudents, deleteAdminMedicalEvent } from "../../api/axios"

const eventTypes = {
  accident: "Tai nạn",
  illness: "Ốm đau",
  allergy: "Dị ứng",
  emergency: "Khẩn cấp",
  other: "Khác",
}

// Thêm map type -> label
const eventTypeLabels = {
  accident: 'Tai nạn',
  illness: 'Ốm đau',
  allergy: 'Dị ứng',
  emergency: 'Khẩn cấp',
  other: 'Khác',
};

// Thêm map type -> màu sắc
const eventTypeColors = {
  accident: 'bg-orange-100 text-orange-800',
  illness: 'bg-green-100 text-green-800',
  allergy: 'bg-yellow-100 text-yellow-800',
  emergency: 'bg-red-100 text-red-800',
  other: 'bg-gray-100 text-gray-800',
};

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
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

function MedicalEvents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [medicalEvents, setMedicalEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        // Gọi song song 2 API
        const [eventRes, studentRes] = await Promise.all([
          getAdminMedicalEventList(),
          getAllAdminStudents()
        ])
        // Tạo map medicalEventId -> {studentName, className}
        const eventIdToStudent = {}
        ;(studentRes.result || []).forEach(student => {
          const studentName = `${student.lastName} ${student.firstName}`
          const className = student.classes?.name || ''
          ;(student.eventList || []).forEach(ev => {
            if (ev.medicalEventId) {
              eventIdToStudent[ev.medicalEventId] = {
                studentName,
                className
              }
            }
          })
        })
        // Map lại dữ liệu cho phù hợp với API mới và bổ sung tên học sinh, lớp
        const events = (eventRes.result || []).map(event => ({
          id: event.medicalEventId,
          title: event.medicalEventName,
          description: event.medicalEventDescription,
          reportedAt: event.medicalEventTime,
          eventType: event.type,
          nurseName: event.nurse ? `${event.nurse.lastName} ${event.nurse.firstName}` : '',
          usedMedicines: event.usedMedicines || [],
          studentName: eventIdToStudent[event.medicalEventId]?.studentName || '',
          className: eventIdToStudent[event.medicalEventId]?.className || '',
        }))
        setMedicalEvents(events)
      } catch {
        setError("Không thể tải danh sách sự kiện.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const filteredEvents = medicalEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.nurseName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || event.eventType === selectedType
    return matchesSearch && matchesType
  })

  const handleViewDetail = (event) => {
    setSelectedEvent(event)
    setShowDetailModal(true)
  }

  // Xóa sự kiện y tế
  const handleDeleteEvent = (eventId) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await deleteAdminMedicalEvent(eventId);
          setToast({ message: 'Xóa sự kiện thành công!', type: 'success' });
          // Reload danh sách
          setMedicalEvents(events => events.filter(e => e.id !== eventId));
        } catch {
          setToast({ message: 'Xóa sự kiện thất bại!', type: 'error' });
        }
      },
      title: 'Xác nhận xóa sự kiện',
      message: 'Bạn có chắc chắn muốn xóa sự kiện này?'
    });
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
                  <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
                  Quản lý sự kiện y tế
                </h1>
                <p className="text-gray-600 mt-1">Theo dõi và xử lý các sự kiện y tế trong trường</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
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
                  <p className="text-sm font-medium text-gray-600">Tai nạn</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {medicalEvents.filter((e) => e.eventType === "accident").length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ốm đau</p>
                  <p className="text-2xl font-bold text-green-600">
                    {medicalEvents.filter((e) => e.eventType === "illness").length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dị ứng</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {medicalEvents.filter((e) => e.eventType === "allergy").length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Khẩn cấp</p>
                  <p className="text-2xl font-bold text-red-600">
                    {medicalEvents.filter((e) => e.eventType === "emergency").length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
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
                      Tên sự kiện
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học sinh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lớp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người ghi nhận
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading && (
                    <tr>
                      <td colSpan="7" className="text-center py-8">Đang tải dữ liệu...</td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td colSpan="7" className="text-center text-red-500 py-8">{error}</td>
                    </tr>
                  )}
                  {filteredEvents.length === 0 && !loading && !error && (
                    <tr>
                      <td colSpan="7" className="text-center py-8">Không có sự kiện nào</td>
                    </tr>
                  )}
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.studentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.className}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${eventTypeColors[event.eventType] || 'bg-gray-100 text-gray-800'}`}>
                          {eventTypeLabels[event.eventType] || event.eventType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.reportedAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{event.nurseName}</div>
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
                         <button
                           onClick={() => handleDeleteEvent(event.id)}
                           className="text-red-600 hover:text-red-900 p-1"
                           title="Xóa sự kiện"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                           </svg>
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

      {/* Detail Modal */}
      {showDetailModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chi tiết sự kiện y tế</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên sự kiện</label>
                <p className="text-sm text-gray-900">{selectedEvent.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Học sinh</label>
                <p className="text-sm text-gray-900">{selectedEvent.studentName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lớp</label>
                <p className="text-sm text-gray-900">{selectedEvent.className}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <p className="text-sm text-gray-900">{selectedEvent.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loại</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${eventTypeColors[selectedEvent.eventType] || 'bg-gray-100 text-gray-800'}`}>
                  {eventTypeLabels[selectedEvent.eventType] || selectedEvent.eventType}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Thời gian</label>
                <p className="text-sm text-gray-900">{selectedEvent.reportedAt}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Người ghi nhận</label>
                <p className="text-sm text-gray-900">{selectedEvent.nurseName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Thuốc đã sử dụng</label>
                {selectedEvent.usedMedicines && selectedEvent.usedMedicines.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEvent.usedMedicines.map((um, i) => (
                      <div key={i} className="bg-white p-3 rounded border">
                        <div><b>Tên thuốc:</b> {um.medicine?.name || 'Không rõ'}</div>
                        <div><b>Loại:</b> {um.medicine?.type || 'Không rõ'}</div>
                        <div><b>Số lượng:</b> {um.quantityUsed || 0} {um.medicine?.unit || ''}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Không có thuốc nào được sử dụng</p>
                )}
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

export default MedicalEvents
