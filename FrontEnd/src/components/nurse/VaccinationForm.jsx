import { useEffect, useState } from "react";
import { getNurseVaccinationList, getNurseEventParticipants, updateNurseEventRecord } from "../../api/axios";

function VaccinationForm() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recordTarget, setRecordTarget] = useState(null);
  const [recordForm, setRecordForm] = useState({ vaccine: "", note: "" });
  const [recordLoading, setRecordLoading] = useState(false);
  const [recordError, setRecordError] = useState("");

  const mapStatusLabel = (status) => {
    const statusMap = {
      "setup": { label: "Đã lên lịch", color: "bg-blue-100 text-blue-800", icon: "📅" },
      "isgoing": { label: "Đang tiến hành", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
      "finished": { label: "Kết thúc", color: "bg-green-100 text-green-800", icon: "✅" }
    };
    return statusMap[status] || { label: status, color: "bg-gray-100 text-gray-800", icon: "❓" };
  };

  const getConsentStatus = (consent) => {
    const consentMap = {
      "APPROVED": { label: "Đã đồng ý", color: "bg-green-100 text-green-800", icon: "✅" },
      "REJECTED": { label: "Từ chối", color: "bg-red-100 text-red-800", icon: "❌" },
      "PENDING": { label: "Chờ phản hồi", color: "bg-yellow-100 text-yellow-800", icon: "⏳" }
    };
    return consentMap[consent] || { label: consent || "Không có", color: "bg-gray-100 text-gray-800", icon: "❓" };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const res = await getNurseVaccinationList();
        setEvents(res.result || []);
      } catch {
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  const handleShowParticipants = async (event) => {
    setSelectedEvent(event);
    setLoadingParticipants(true);
    setParticipants([]);
    setSearch("");
    try {
      const res = await getNurseEventParticipants(event.id);
      setParticipants(res.result || []);
    } catch {
      setParticipants([]);
    } finally {
      setLoadingParticipants(false);
    }
  };

  const filteredList = participants.filter(item => {
    const name = ((item.student.lastName || "") + " " + (item.student.firstName || "")).toLowerCase();
    const studentId = (item.student.studentId || "").toLowerCase();
    const searchText = search.toLowerCase();
    return name.includes(searchText) || studentId.includes(searchText);
  });

  const handleShowDetail = (item) => {
    setDetail(item);
    setShowModal(true);
  };

  const handleShowRecordModal = (item, record) => {
    setRecordTarget({ item, record });
    setRecordForm({
      vaccine: record?.vaccine || "",
      note: record?.note || ""
    });
    setRecordError("");
    setShowRecordModal(true);
  };

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    if (!recordForm.vaccine) {
      setRecordError("Vui lòng nhập tên vaccine");
      return;
    }
    setRecordLoading(true);
    setRecordError("");
    try {
      await updateNurseEventRecord(recordTarget.record.id, recordForm);
      setShowRecordModal(false);
      if (selectedEvent) handleShowParticipants(selectedEvent);
    } catch {
      setRecordError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setRecordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Tiêm chủng
              </h1>
              <p className="text-gray-600 text-lg">Quản lý các chiến dịch tiêm chủng cho học sinh</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng chiến dịch</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đang tiến hành</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {events.filter(e => e.status === 'isgoing').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hoàn thành</p>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter(e => e.status === 'finished').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Học sinh tham gia</p>
                  <p className="text-2xl font-bold text-blue-600">{participants.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Events List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Danh sách chiến dịch tiêm chủng
            </h2>
          </div>

          {loadingEvents ? (
            <div className="p-8">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="text-gray-600">Đang tải dữ liệu...</span>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có chiến dịch</h3>
              <p className="text-gray-600">Chưa có chiến dịch tiêm chủng nào được tạo</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên chiến dịch</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tổ chức</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event, idx) => {
                    const statusInfo = mapStatusLabel(event.status);
                    return (
                      <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idx + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {event.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.eventDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{event.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <span>{statusInfo.icon}</span>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleShowParticipants(event)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            Xem học sinh
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Enhanced Participants List */}
        {selectedEvent && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  Học sinh tham gia: {selectedEvent.name}
                </h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Enhanced Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc mã học sinh..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm font-medium">Tìm thấy {filteredList.length} học sinh</span>
                </div>
              </div>

              {loadingParticipants ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Đang tải danh sách học sinh...</span>
                </div>
              ) : filteredList.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {search ? 'Không tìm thấy học sinh' : 'Chưa có học sinh tham gia'}
                  </h3>
                  <p className="text-gray-600">
                    {search 
                      ? `Không tìm thấy học sinh nào phù hợp với "${search}"`
                      : 'Chưa có học sinh nào tham gia chiến dịch này'
                    }
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học sinh</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông tin</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái đồng ý</th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredList.map((item, idx) => {
                        const record = (item.student.results || []).find(
                          r => r.event && r.event.id === selectedEvent.id
                        );
                        const consentInfo = getConsentStatus(item.consent);
                        const hasRecord = record && record.vaccine;
                        
                        return (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idx + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                                  {item.student.firstName?.charAt(0) || 'N'}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {`${item.student.lastName || ''} ${item.student.firstName || ''}`.trim() || 'Không có'}
                                  </div>
                                  <div className="text-sm text-gray-500">{item.student.studentId || 'Không có'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {item.student.classes?.name || 'Không có'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  {item.student.gender === "MALE" ? "Nam" : item.student.gender === "FEMALE" ? "Nữ" : 'Không có'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {item.student.dateOfBirth || 'Không có'}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${consentInfo.color}`}>
                                <span>{consentInfo.icon}</span>
                                {consentInfo.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleShowDetail(item)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Chi tiết
                                </button>
                                <button
                                  onClick={() => record && handleShowRecordModal(item, record)}
                                  disabled={!record}
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 ${
                                    !record 
                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                      : hasRecord 
                                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                  }`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                  {hasRecord ? 'Cập nhật' : 'Ghi nhận'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Detail Modal */}
        {showModal && detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Chi tiết học sinh</h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Student Info */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900">Thông tin học sinh</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Mã học sinh:</span>
                        <span className="text-green-900">{detail.student.studentId || 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Họ tên:</span>
                        <span className="text-green-900">{`${detail.student.lastName || ''} ${detail.student.firstName || ''}`.trim() || 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Lớp:</span>
                        <span className="text-green-900">{detail.student.classes?.name || 'Không có'}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Giới tính:</span>
                        <span className="text-green-900">{detail.student.gender === "MALE" ? "Nam" : detail.student.gender === "FEMALE" ? "Nữ" : 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Ngày sinh:</span>
                        <span className="text-green-900">{detail.student.dateOfBirth || 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Trạng thái:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getConsentStatus(detail.consent).color}`}>
                          {getConsentStatus(detail.consent).icon} {getConsentStatus(detail.consent).label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parent Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900">Thông tin phụ huynh</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700 font-medium">Họ tên:</span>
                      <span className="text-blue-900">{detail.parent ? `${detail.parent.lastName || ''} ${detail.parent.firstName || ''}`.trim() : 'Không có'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 font-medium">Số điện thoại:</span>
                      <span className="text-blue-900">{detail.parent?.phone || 'Không có'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 font-medium">Email:</span>
                      <span className="text-blue-900">{detail.parent?.email || 'Không có'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Record Modal */}
        {showRecordModal && recordTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowRecordModal(false)}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Ghi nhận tiêm chủng</h2>
                  </div>
                  <button
                    onClick={() => setShowRecordModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Student Info Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      {recordTarget.item.student.firstName?.charAt(0) || 'N'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {`${recordTarget.item.student.lastName || ''} ${recordTarget.item.student.firstName || ''}`.trim()}
                      </div>
                      <div className="text-sm text-gray-500">{recordTarget.item.student.studentId}</div>
                    </div>
                  </div>
                </div>

                {/* Record Form */}
                <form onSubmit={handleRecordSubmit}>
                  <div className="flex items-center gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">Tên vaccine:</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={recordForm.vaccine}
                        onChange={e => setRecordForm({ ...recordForm, vaccine: e.target.value })}
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">Ghi chú:</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={recordForm.note}
                        onChange={e => setRecordForm({ ...recordForm, note: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {recordLoading ? "Đang lưu..." : "Lưu"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaccinationForm;