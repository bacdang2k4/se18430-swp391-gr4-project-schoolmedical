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
import { getAdminCheckupEventList, sendAdminCheckupNotification, createAdminCheckupEvent, editAdminCheckupEvent, markFinishCheckupAdmin } from "../../api/axios"

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

const studentStatusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  absent: "bg-red-100 text-red-800",
  rescheduled: "bg-yellow-100 text-yellow-800",
}

function MedicalCheckups() {
  const [checkupCampaigns, setCheckupCampaigns] = useState([])
  const [activeTab, setActiveTab] = useState("campaigns")
  const [searchTerm, setSearchTerm] = useState("")

  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [form, setForm] = useState({
    name: "",
    type: "",
    eventDate: "",
    description: "",
  });
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, id: null, eventDate: '', description: '' });
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminCheckupEventList();
        // Nếu API trả về { code, result: [...] }
        setCheckupCampaigns(res.result || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện kiểm tra sức khỏe:", error);
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

  const handleViewResult = (student) => {
    setSelectedStudent(student)
    setShowResultModal(true)
  }

  const handleSendNotification = async (id) => {
    try {
      await sendAdminCheckupNotification(id);
      alert("Gửi thông báo thành công!");
      // Reload lại danh sách đợt kiểm tra
      const res = await getAdminCheckupEventList();
      setCheckupCampaigns(res.result || []);
    } catch (error) {
      alert("Gửi thông báo thất bại! " + (error?.response?.data?.message || error.message || ""));
    }
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
      // Refresh list
      const res = await getAdminCheckupEventList();
      setCheckupCampaigns(res.result || []);
    } catch (err) {
      alert("Tạo đợt kiểm tra thất bại!" + (err?.response?.data?.message ? `\n${err.response.data.message}` : ""));
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
      alert('Cập nhật đợt kiểm tra thành công!');
      closeEditModal();
      // Refresh list
      const res = await getAdminCheckupEventList();
      setCheckupCampaigns(res.result || []);
    } catch {
      alert('Cập nhật đợt kiểm tra thất bại!');
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleFinishCheckup = async (id) => {
    try {
      await markFinishCheckupAdmin(id);
      alert("Đã chuyển trạng thái đợt kiểm tra thành 'Hoàn thành'!");
      // Refresh list
      const res = await getAdminCheckupEventList();
      setCheckupCampaigns(res.result || []);
    } catch {
      alert("Chuyển trạng thái thất bại!");
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
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
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

      {/* Result Detail Modal */}
      {showResultModal && selectedStudent && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
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

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
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
    </AdminLayout>
  )
}

export default MedicalCheckups
