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
import { createAdminVaccinationEvent, getAdminVaccinationList, sendAdminNotification, finishAdminVaccination, editAdminVaccination, deleteAdminVaccination } from "../../api/axios";

import { useEffect } from "react";

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
    try {
      await createAdminVaccinationEvent(form);
      setShowAddModal(false);
      reloadVaccinations();
      // TODO: reload data or show success message
    } catch {
      alert("Tạo chiến dịch thất bại!");
    }
  };

  const handleSendNotification = async (id) => {
    try {
      await sendAdminNotification(id);
      alert("Gửi thông báo thành công!");
    } catch {
      alert("Gửi thông báo thất bại!");
    }
  };

  const handleFinishVaccination = async (id) => {
    try {
      await finishAdminVaccination(id);
      alert("Đã chuyển trạng thái sự kiện thành 'Kết thúc'!");
      reloadVaccinations();
    } catch {
      alert("Chuyển trạng thái thất bại!");
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
    try {
      await editAdminVaccination(editModal.id, {
        eventDate: editModal.eventDate,
        description: editModal.description,
      });
      alert('Cập nhật sự kiện thành công!');
      closeEditModal();
      reloadVaccinations();
    } catch {
      alert('Cập nhật sự kiện thất bại!');
    }
  };

  const handleDeleteVaccination = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      try {
        await deleteAdminVaccination(id);
        alert("Xóa sự kiện thành công!");
        reloadVaccinations();
      } catch {
        alert("Xóa sự kiện thất bại!");
      }
    }
  };

  const filteredCampaigns = vaccinationList.filter((campaign) => {
    const matchesSearch = (campaign.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || campaign.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredStudents = studentVaccinations.filter((student) => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || student.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const handleViewDetail = (campaign) => {
    console.log("View campaign detail:", campaign)
  }

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
                  <p className="text-sm font-medium text-gray-600">Đang tiến hành</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vaccinationList.filter((v) => v.status === "in_progress").length}
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
                    {vaccinationList.filter((v) => v.status === "completed").length}
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
                      (vaccinationList.reduce((sum, v) => sum + v.completedStudents, 0) /
                        vaccinationList.reduce((sum, v) => sum + v.totalStudents, 0)) *
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
                  ? Object.entries({ setup: 'Đã lên lịch', isgoing: 'Đang tiến hành', finished: 'Kết thúc' }).map(([key, label]) => (
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
                              onClick={() => handleViewDetail(campaign)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Xem chi tiết"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
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
                      const campaign = vaccinationList.find((c) => c.id === student.campaignId)
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

      {showAddModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
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
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
    </AdminLayout>
  )
}

export default VaccinationManagement
