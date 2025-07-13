import React, { useEffect, useState } from "react";
import { getNurseCheckupEventList, getNurseCheckupParticipants, updateNurseCheckupRecord } from "../../api/axios";

function HealthCheckupForm() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recordTarget, setRecordTarget] = useState(null); // {item, record}
  const [recordForm, setRecordForm] = useState({ vision: "", hearing: "", weight: "", height: "" });
  const [recordLoading, setRecordLoading] = useState(false);
  const [recordError, setRecordError] = useState("");

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

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const res = await getNurseCheckupEventList();
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
      const res = await getNurseCheckupParticipants(event.id);
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

  // Hiển thị modal ghi nhận kết quả kiểm tra sức khỏe
  const handleShowRecordModal = (item, record) => {
    setRecordTarget({ item, record });
    setRecordForm({
      vision: record?.vision || "",
      hearing: record?.hearing || "",
      weight: record?.weight || "",
      height: record?.height || ""
    });
    setRecordError("");
    setShowRecordModal(true);
  };

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    if (!recordForm.vision || !recordForm.hearing || !recordForm.weight || !recordForm.height) {
      setRecordError("Vui lòng nhập đầy đủ các trường");
      return;
    }
    if (!recordTarget?.record?.id) {
      setRecordError("Không tìm thấy record để cập nhật. Vui lòng kiểm tra lại dữ liệu học sinh.");
      return;
    }
    setRecordLoading(true);
    setRecordError("");
    try {
      await updateNurseCheckupRecord(recordTarget.record.id, recordForm);
      setShowRecordModal(false);
      if (selectedEvent) handleShowParticipants(selectedEvent);
    } catch {
      setRecordError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setRecordLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            🩺 Danh sách sự kiện kiểm tra sức khỏe
          </h1>
          <p className="text-gray-600 mt-1">Chọn sự kiện để xem danh sách học sinh tham gia</p>
        </div>

        {/* Danh sách sự kiện */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sự kiện</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tổ chức</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Xem danh sách học sinh</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loadingEvents ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">Không có sự kiện kiểm tra sức khỏe</td>
                  </tr>
                ) : (
                  events.map((event, idx) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{event.name}</td>
                      <td className="px-6 py-4">{event.type}</td>
                      <td className="px-6 py-4">{event.eventDate}</td>
                      <td className="px-6 py-4">{event.description}</td>
                      <td className="px-6 py-4">{mapStatusLabel(event.status)}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                          onClick={() => handleShowParticipants(event)}
                        >
                          Xem danh sách học sinh
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Danh sách học sinh tham gia sự kiện đã chọn */}
        {selectedEvent && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-4 font-semibold text-blue-700 text-lg">
              Danh sách học sinh tham gia sự kiện: {selectedEvent.name}
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mã học sinh..."
                className="w-full mb-4 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã học sinh</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên học sinh</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới tính</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái đồng ý</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Chi tiết</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi nhận kết quả</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loadingParticipants ? (
                      <tr>
                        <td colSpan={9} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                      </tr>
                    ) : filteredList.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-8 text-gray-500">Không có học sinh tham gia</td>
                      </tr>
                    ) : (
                      filteredList.map((item, idx) => {
                        // Tìm record đúng với sự kiện đang chọn trong listCheckupResult
                        const record = (item.student.listCheckupResult || []).find(
                          r => r.event && r.event.id === selectedEvent.id
                        );
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">{idx + 1}</td>
                            <td className="px-6 py-4">{item.student.studentId || 'Không có'}</td>
                            <td className="px-6 py-4">{`${item.student.lastName || ''} ${item.student.firstName || ''}`.trim() || 'Không có'}</td>
                            <td className="px-6 py-4">{item.student.classes?.name || 'Không có'}</td>
                            <td className="px-6 py-4">{item.student.gender === "MALE" ? "Nam" : item.student.gender === "FEMALE" ? "Nữ" : 'Không có'}</td>
                            <td className="px-6 py-4">{item.student.dateOfBirth || 'Không có'}</td>
                            <td className="px-6 py-4">{item.consent || 'Không có'}</td>
                            <td className="px-6 py-4 text-center">
                              <button
                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                                onClick={() => handleShowDetail(item)}
                              >
                                Xem chi tiết
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                                onClick={() => handleShowRecordModal(item, record)}
                              >
                                Ghi nhận kết quả
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal chi tiết */}
        {showModal && detail && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h2 className="text-lg font-bold mb-4">Chi tiết học sinh tham gia kiểm tra sức khỏe</h2>
              <div className="space-y-2">
                <div><b>Mã học sinh:</b> {detail.student.studentId || 'Không có'}</div>
                <div><b>Họ tên:</b> {`${detail.student.lastName || ''} ${detail.student.firstName || ''}`.trim() || 'Không có'}</div>
                <div><b>Lớp:</b> {detail.student.classes?.name || 'Không có'}</div>
                <div><b>Giới tính:</b> {detail.student.gender === "MALE" ? "Nam" : detail.student.gender === "FEMALE" ? "Nữ" : 'Không có'}</div>
                <div><b>Ngày sinh:</b> {detail.student.dateOfBirth || 'Không có'}</div>
                <div><b>Trạng thái đồng ý:</b> {detail.consent || 'Không có'}</div>
                {/* Thông tin phụ huynh */}
                <div><b>Phụ huynh:</b> {detail.parent ? `${detail.parent.lastName || ''} ${detail.parent.firstName || ''}`.trim() : 'Không có'}</div>
                <div><b>Số điện thoại:</b> {detail.parent?.phone || 'Không có'}</div>
                <div><b>Email:</b> {detail.parent?.email || 'Không có'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal ghi nhận kết quả kiểm tra sức khỏe */}
        {showRecordModal && recordTarget && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowRecordModal(false)}
              >
                ×
              </button>
              <h2 className="text-lg font-bold mb-4">Ghi nhận kết quả kiểm tra sức khỏe</h2>
              <form onSubmit={handleRecordSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Thị lực (vision) <span className="text-red-500">*</span></label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={recordForm.vision}
                    onChange={e => setRecordForm({ ...recordForm, vision: e.target.value })}
                    required
                  >
                    <option value="">Chưa ghi nhận</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Thính lực (hearing) <span className="text-red-500">*</span></label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={recordForm.hearing}
                    onChange={e => setRecordForm({ ...recordForm, hearing: e.target.value })}
                    required
                  >
                    <option value="">Chưa ghi nhận</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Cân nặng (weight) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={recordForm.weight}
                    onChange={e => setRecordForm({ ...recordForm, weight: e.target.value })}
                    required
                    placeholder="Chưa ghi nhận"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Chiều cao (height) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={recordForm.height}
                    onChange={e => setRecordForm({ ...recordForm, height: e.target.value })}
                    required
                    placeholder="Chưa ghi nhận"
                  />
                </div>
                {recordError && <div className="text-red-500 text-sm">{recordError}</div>}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setShowRecordModal(false)}
                    disabled={recordLoading}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    disabled={recordLoading}
                  >
                    {recordLoading ? "Đang lưu..." : "Lưu kết quả"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthCheckupForm;