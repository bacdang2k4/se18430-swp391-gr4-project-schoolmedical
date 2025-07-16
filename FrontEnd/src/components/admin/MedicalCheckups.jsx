"use client"

import { useState, useEffect } from "react"
import {
  ClipboardDocumentCheckIcon,
  PlusIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  BellIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../AdminLayout"
import { getAdminCheckupEventList, sendAdminCheckupNotification, createAdminCheckupEvent, editAdminCheckupEvent, markFinishCheckupAdmin, getAdminCheckupParticipants, getAdminCheckupRejectList, sendAdminCheckupResultNotification } from "../../api/axios"

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



const statusLabels = {
  setup: "Đã lên lịch",
  isgoing: "Đang diễn ra",
  finished: "Hoàn thành",
};

const statusColors = {
  setup: "bg-blue-100 text-blue-800",
  isgoing: "bg-yellow-100 text-yellow-800",
  finished: "bg-green-100 text-green-800",
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
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

function MedicalCheckups() {
  const [checkupCampaigns, setCheckupCampaigns] = useState([])
  const [activeTab, setActiveTab] = useState("campaigns")
  const [searchTerm, setSearchTerm] = useState("")

  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm] = useState({
    name: "",
    type: "",
    eventDate: "",
    description: "",
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, id: null, eventDate: '', description: '' });
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [participantsModal, setParticipantsModal] = useState({ open: false, campaignId: null, participants: [], type: '' });
  const [sendingResultId, setSendingResultId] = useState(null);

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
    const fetchData = async () => {
      try {
        const res = await getAdminCheckupEventList();
        setCheckupCampaigns(res.result || []);
      } catch {
        setToast({ message: 'Lỗi khi lấy danh sách sự kiện kiểm tra sức khỏe', type: 'error' });
      }
    };
    fetchData();
  }, []);

  const filteredCampaigns = checkupCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || campaign.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const filteredStudents = studentCheckups.filter((student) => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || student.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleSendNotification = (id) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await sendAdminCheckupNotification(id);
          setToast({ message: 'Gửi thông báo thành công!', type: 'success' });
          const res = await getAdminCheckupEventList();
          setCheckupCampaigns(res.result || []);
        } catch (error) {
          setToast({ message: 'Gửi thông báo thất bại! ' + (error?.response?.data?.message || error.message || ''), type: 'error' });
        }
      },
      title: 'Xác nhận gửi thông báo',
      message: 'Bạn có chắc chắn muốn gửi thông báo cho đợt kiểm tra này?'
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCheckup = async (e) => {
    e.preventDefault();
    setLoadingCreate(true);
    try {
      await createAdminCheckupEvent(form);
      setShowAddModal(false);
      setForm({ name: "", type: "", eventDate: "", description: "" });
      const res = await getAdminCheckupEventList();
      setCheckupCampaigns(res.result || []);
      setToast({ message: 'Tạo đợt kiểm tra thành công!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Tạo đợt kiểm tra thất bại!' + (err?.response?.data?.message ? `\n${err.response.data.message}` : ''), type: 'error' });
    } finally {
      setLoadingCreate(false);
    }
  };

  const openEditModal = (campaign) => {
    setEditModal({
      open: true,
      id: campaign.id,
      eventDate: campaign.eventDate || '',
      description: campaign.description || '',
    });
  };

  const closeEditModal = () => {
    setEditModal({ open: false, id: null, eventDate: '', description: '' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditModal((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);
    try {
      await editAdminCheckupEvent(editModal.id, {
        eventDate: editModal.eventDate,
        description: editModal.description,
      });
      setToast({ message: 'Cập nhật đợt kiểm tra thành công!', type: 'success' });
      closeEditModal();
      const res = await getAdminCheckupEventList();
      setCheckupCampaigns(res.result || []);
    } catch {
      setToast({ message: 'Cập nhật đợt kiểm tra thất bại!', type: 'error' });
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleFinishCheckup = (id) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await markFinishCheckupAdmin(id);
          setToast({ message: "Đã chuyển trạng thái đợt kiểm tra thành 'Hoàn thành'!", type: 'success' });
          const res = await getAdminCheckupEventList();
          setCheckupCampaigns(res.result || []);
        } catch {
          setToast({ message: 'Chuyển trạng thái thất bại!', type: 'error' });
        }
      },
      title: 'Xác nhận hoàn thành',
      message: 'Bạn có chắc chắn muốn chuyển trạng thái đợt kiểm tra này thành Hoàn thành?'
    });
  };

  // Handlers for participants/rejections
  const handleViewParticipants = async (campaignId) => {
    try {
      const data = await getAdminCheckupParticipants(campaignId);
      setParticipantsModal({
        open: true,
        campaignId,
        participants: Array.isArray(data.result) ? data.result : [],
        type: 'participants'
      });
    } catch {
      setToast({ message: 'Không thể tải danh sách tham gia!', type: 'error' });
    }
  };

  const handleViewRejections = async (campaignId) => {
    try {
      const data = await getAdminCheckupRejectList(campaignId);
      setParticipantsModal({
        open: true,
        campaignId,
        participants: Array.isArray(data.result) ? data.result : [],
        type: 'rejections'
      });
    } catch {
      setToast({ message: 'Không thể tải danh sách từ chối!', type: 'error' });
    }
  };

  const closeParticipantsModal = () => {
    setParticipantsModal({ open: false, campaignId: null, participants: [], type: '' });
  };

  // Handler to send result notification
  const handleSendResultNotification = async (campaignId) => {
    setSendingResultId(campaignId);
    try {
      await sendAdminCheckupResultNotification(campaignId);
      setToast({ message: 'Đã gửi thông báo kết quả về cho phụ huynh!', type: 'success' });
    } catch {
      setToast({ message: 'Gửi thông báo kết quả thất bại!', type: 'error' });
    } finally {
      setSendingResultId(null);
    }
  };

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
                  <p className="text-sm font-medium text-gray-600">Đã lên lịch</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {checkupCampaigns.filter((c) => c.status === "setup").length}
                  </p>
                </div>
                <ClockIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đang diễn ra</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {checkupCampaigns.filter((c) => c.status === "isgoing").length}
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
                    {checkupCampaigns.filter((c) => c.status === "finished").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                {activeTab === "campaigns"
                  ? Object.entries({ setup: 'Đã lên lịch', isgoing: 'Đang diễn ra', finished: 'Hoàn thành' }).map(([key, label]) => (
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
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.description || ""}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {campaign.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {campaign.eventDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[campaign.status]}`}
                          >
                            {statusLabels[campaign.status] || campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSendNotification(campaign.id)}
                              className="text-indigo-600 hover:text-indigo-900 p-1"
                              title="Gửi thông báo cho phụ huynh"
                            >
                              <BellIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(campaign)}
                              className="text-yellow-600 hover:text-yellow-900 p-1"
                              title="Sửa đợt kiểm tra"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 113.02 2.92L7.5 18.793 3 19.5l.707-4.5L16.862 3.487z" />
                              </svg>
                            </button>
                            {campaign.status !== "finished" && (
                              <button
                                onClick={() => handleFinishCheckup(campaign.id)}
                                className="text-gray-600 hover:text-gray-900 p-1 border border-gray-300 rounded"
                                title="Chuyển trạng thái thành 'Hoàn thành'"
                              >
                                <CheckCircleIcon className="w-5 h-5" />
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
            /* Results Table: List events, with actions to view participants/rejections */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đợt kiểm tra</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.description || ""}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{campaign.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{campaign.eventDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[campaign.status]}`}>{statusLabels[campaign.status] || campaign.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleViewParticipants(campaign.id)}
                              className="text-green-600 hover:text-green-900 p-2 border border-green-300 rounded-lg flex items-center gap-1"
                              title="Xem danh sách tham gia"
                            >
                              <UserGroupIcon className="w-4 h-4" />
                              <span className="text-xs">Tham gia</span>
                            </button>
                            <button
                              onClick={() => handleViewRejections(campaign.id)}
                              className="text-red-600 hover:text-red-900 p-2 border border-red-300 rounded-lg flex items-center gap-1"
                              title="Xem danh sách từ chối"
                            >
                              <span className="text-xs">Từ chối</span>
                            </button>
                            {campaign.status === 'finished' && (
                              <button
                                onClick={() => handleSendResultNotification(campaign.id)}
                                className={`text-blue-600 hover:text-blue-900 p-2 border border-blue-300 rounded-lg flex items-center gap-1 ${sendingResultId === campaign.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                title="Gửi thông báo kết quả về cho phụ huynh"
                                disabled={sendingResultId === campaign.id}
                              >
                                <BellIcon className="w-4 h-4" />
                                <span className="text-xs">Gửi kết quả</span>
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
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Tạo đợt kiểm tra y tế mới</h3>
            <form className="space-y-4" onSubmit={handleCreateCheckup}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đợt kiểm tra</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nhập tên đợt kiểm tra"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại kiểm tra</label>
                <input
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nhập loại kiểm tra"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày diễn ra</label>
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mô tả về đợt kiểm tra"
                  rows={2}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loadingCreate}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  disabled={loadingCreate}
                >
                  {loadingCreate ? "Đang tạo..." : "Tạo đợt kiểm tra"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Removed showResultModal and selectedStudent */}

      {editModal.open && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Sửa đợt kiểm tra</h3>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày diễn ra</label>
                <input
                  type="date"
                  name="eventDate"
                  value={editModal.eventDate}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  rows={3}
                  value={editModal.description}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loadingEdit}
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" disabled={loadingEdit}>
                  {loadingEdit ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirm.open && (
        <ConfirmModal
          open={confirm.open}
          title={confirm.title}
          message={confirm.message}
          onConfirm={confirm.action}
          onCancel={() => setConfirm({ ...confirm, open: false })}
        />
      )}

      {/* Participants/Rejections Modal */}
      {participantsModal.open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {participantsModal.type === 'participants' ? 'Danh sách học sinh tham gia' : 'Danh sách học sinh từ chối'}
              </h3>
              <button
                onClick={closeParticipantsModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học sinh</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phụ huynh</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {participantsModal.participants.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.student?.firstName} {item.student?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">ID: {item.student?.studentId}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.student?.classes?.name}
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.parent?.firstName} {item.parent?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{item.parent?.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.sendDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.consent === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.consent === 'Accepted' ? 'Đã đồng ý' : 'Từ chối'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-600">Tổng cộng: {participantsModal.participants.length} học sinh</div>
          </div>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
    </AdminLayout>
  )
}

export default MedicalCheckups
