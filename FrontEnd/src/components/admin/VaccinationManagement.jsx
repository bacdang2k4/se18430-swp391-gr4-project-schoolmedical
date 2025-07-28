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
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"
import { createAdminVaccinationEvent, getAdminVaccinationList, sendAdminNotification, finishAdminVaccination, editAdminVaccination, deleteAdminVaccination, getAdminVaccinationParticipants, getRRejectAdminVaccination } from "../../api/axios";

import { useEffect } from "react";

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

function VaccinationManagement() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    eventDate: "",
    description: "",
  });
  const [vaccinationList, setVaccinationList] = useState([]);
  const [editModal, setEditModal] = useState({ open: false, id: null, eventDate: '', description: '' });
  const [participantsModal, setParticipantsModal] = useState({ open: false, campaignId: null, participants: [], type: '' });

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
    const fetchVaccinations = async () => {
      try {
        const data = await getAdminVaccinationList();
        setVaccinationList(Array.isArray(data.result) ? data.result : data);
      } catch {
        setVaccinationList([]);
      }
    };
    fetchVaccinations();
  }, []);

  const reloadVaccinations = async () => {
    try {
      const data = await getAdminVaccinationList();
      setVaccinationList(Array.isArray(data.result) ? data.result : data);
    } catch {
      setVaccinationList([]);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate date is not in the past
    if (form.eventDate && new Date(form.eventDate) < new Date()) {
      setToast({ message: 'Không thể chọn ngày trong quá khứ!', type: 'error' });
      return;
    }
    
    try {
      await createAdminVaccinationEvent(form);
      setShowAddModal(false);
      setToast({ message: 'Tạo chiến dịch thành công!', type: 'success' });
      reloadVaccinations();
    } catch {
      setToast({ message: 'Tạo chiến dịch thất bại!', type: 'error' });
    }
  };

  const handleSendNotification = (id) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await sendAdminNotification(id);
          setToast({ message: 'Gửi thông báo thành công!', type: 'success' });
        } catch {
          setToast({ message: 'Gửi thông báo thất bại!', type: 'error' });
        }
      },
      title: 'Xác nhận gửi thông báo',
      message: 'Bạn có chắc chắn muốn gửi thông báo cho chiến dịch này?'
    });
  };

  const handleFinishVaccination = (id) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await finishAdminVaccination(id);
          setToast({ message: "Đã chuyển trạng thái sự kiện thành 'Kết thúc'!", type: 'success' });
          reloadVaccinations();
        } catch {
          setToast({ message: 'Chuyển trạng thái thất bại!', type: 'error' });
        }
      },
      title: 'Xác nhận kết thúc sự kiện',
      message: 'Bạn có chắc chắn muốn chuyển trạng thái sự kiện này thành Kết thúc?'
    });
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
    
    // Validate date is not in the past
    if (editModal.eventDate && new Date(editModal.eventDate) < new Date()) {
      setToast({ message: 'Không thể chọn ngày trong quá khứ!', type: 'error' });
      return;
    }
    
    try {
      await editAdminVaccination(editModal.id, {
        eventDate: editModal.eventDate,
        description: editModal.description,
      });
      setToast({ message: 'Cập nhật sự kiện thành công!', type: 'success' });
      closeEditModal();
      reloadVaccinations();
    } catch {
      setToast({ message: 'Cập nhật sự kiện thất bại!', type: 'error' });
    }
  };

  const handleDeleteVaccination = (id) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await deleteAdminVaccination(id);
          setToast({ message: 'Xóa sự kiện thành công!', type: 'success' });
          reloadVaccinations();
        } catch {
          setToast({ message: 'Xóa sự kiện thất bại!', type: 'error' });
        }
      },
      title: 'Xác nhận xóa sự kiện',
      message: 'Bạn có chắc chắn muốn xóa sự kiện này?'
    });
  };

  const handleViewParticipants = async (campaignId) => {
    try {
      const data = await getAdminVaccinationParticipants(campaignId);
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
      const data = await getRRejectAdminVaccination(campaignId);
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

  const filteredCampaigns = vaccinationList.filter((campaign) => {
    const matchesSearch = (campaign.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || campaign.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Thêm hàm map status
  const mapStatusLabel = (status) => {
    switch (status) {
      case "setup":
        return "Đã lên lịch";
      case "isgoing":
        return "Đang tiến hành";
      case "finished":
        return "Kết thúc";
      default:
        return status;
    }
  };

  // Thêm hàm lấy class màu cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "setup":
        return "bg-blue-100 text-blue-800";
      case "isgoing":
        return "bg-yellow-100 text-yellow-800";
      case "finished":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                  <p className="text-2xl font-bold text-gray-900">{vaccinationList.length}</p>
                </div>
                <ShieldCheckIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Kết thúc</p>
                  <p className="text-2xl font-bold text-green-600">
                    {vaccinationList.filter((v) => v.status === "finished").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đang tiến hành</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vaccinationList.filter((v) => v.status === "isgoing").length}
                  </p>
                </div>
                <ClockIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã lên lịch</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {vaccinationList.filter((v) => v.status === "setup").length}
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
                  placeholder={activeTab === "campaigns" ? "Tìm kiếm chiến dịch..." : "Tìm kiếm chiến dịch..."}
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
                {Object.entries({ setup: 'Đã lên lịch', isgoing: 'Đang tiến hành', finished: 'Kết thúc' }).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <div></div>
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {activeTab === "campaigns" ? filteredCampaigns.length : filteredCampaigns.length}{" "}
                {activeTab === "campaigns" ? "chiến dịch" : "chiến dịch"}
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
                        Tên sự kiện
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loại sự kiện
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày diễn ra
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mô tả
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {campaign.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.eventDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                            {mapStatusLabel(campaign.status) || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSendNotification(campaign.id)}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Gửi thông báo"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6 4.5A9 9 0 11.75 12a9 9 0 0117.25 6.5z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => openEditModal(campaign)}
                              className="text-yellow-600 hover:text-yellow-900 p-1"
                              title="Sửa sự kiện"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 113.02 2.92L7.5 18.793 3 19.5l.707-4.5L16.862 3.487z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteVaccination(campaign.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Xóa sự kiện"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            {campaign.status !== "finished" && (
                              <button
                                onClick={() => handleFinishVaccination(campaign.id)}
                                className="text-gray-600 hover:text-gray-900 p-1 border border-gray-300 rounded"
                                title="Chuyển trạng thái thành 'Kết thúc'"
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
            /* Students Table - Now shows campaigns with participant/rejection buttons */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên chiến dịch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loại sự kiện
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày diễn ra
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
                          <div className="text-sm text-gray-500">{campaign.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {campaign.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.eventDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                            {mapStatusLabel(campaign.status) || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleViewParticipants(campaign.id)}
                              className="text-green-600 hover:text-green-900 p-2 border border-green-300 rounded-lg flex items-center gap-1"
                              title="Xem danh sách tham gia"
                            >
                              <UsersIcon className="w-4 h-4" />
                              <span className="text-xs">Tham gia</span>
                            </button>
                            <button
                              onClick={() => handleViewRejections(campaign.id)}
                              className="text-red-600 hover:text-red-900 p-2 border border-red-300 rounded-lg flex items-center gap-1"
                              title="Xem danh sách từ chối"
                            >
                              <XCircleIcon className="w-4 h-4" />
                              <span className="text-xs">Từ chối</span>
                            </button>
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
            <h3 className="text-lg font-semibold mb-4">Tạo sự kiện mới</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sự kiện</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Nhập tên sự kiện"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại sự kiện</label>
                <input
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Nhập loại sự kiện"
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
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
                {form.eventDate && new Date(form.eventDate) < new Date() && (
                  <p className="text-red-500 text-sm mt-1">Không thể chọn ngày trong quá khứ</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Mô tả sự kiện"
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
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Tạo sự kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Sửa sự kiện</h3>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày diễn ra</label>
                <input
                  type="date"
                  name="eventDate"
                  value={editModal.eventDate}
                  onChange={handleEditChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
                {editModal.eventDate && new Date(editModal.eventDate) < new Date() && (
                  <p className="text-red-500 text-sm mt-1">Không thể chọn ngày trong quá khứ</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  rows={3}
                  value={editModal.description}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học sinh
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lớp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phụ huynh
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày gửi
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
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
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.consent === 'Accepted' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.consent === 'Accepted' ? 'Đã đồng ý' : 'Từ chối'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Tổng cộng: {participantsModal.participants.length} học sinh
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default VaccinationManagement
