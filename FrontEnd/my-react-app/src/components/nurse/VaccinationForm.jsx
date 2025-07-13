import React, { useEffect, useState } from "react";
import { getNurseVaccinationList, getNurseEventParticipants } from "../../api/axios";

function VaccinationForm() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(null);

  // Lấy danh sách sự kiện tiêm chủng khi vào trang
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

  // Khi chọn sự kiện, lấy danh sách học sinh tham gia
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

  // Lọc theo tên hoặc mã học sinh
  const filteredList = participants.filter(item => {
    const name = ((item.student.lastName || "") + " " + (item.student.firstName || "")).toLowerCase();
    const studentId = (item.student.studentId || "").toLowerCase();
    const searchText = search.toLowerCase();
    return name.includes(searchText) || studentId.includes(searchText);
  });

  // Hiển thị modal chi tiết
  const handleShowDetail = (item) => {
    setDetail(item);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            💉 Danh sách sự kiện tiêm chủng
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
                    <td colSpan={7} className="text-center py-8 text-gray-500">Không có sự kiện tiêm chủng</td>
                  </tr>
                ) : (
                  events.map((event, idx) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{event.name}</td>
                      <td className="px-6 py-4">{event.type}</td>
                      <td className="px-6 py-4">{event.eventDate}</td>
                      <td className="px-6 py-4">{event.description}</td>
                      <td className="px-6 py-4">{event.status}</td>
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
                className="w-full mb-4 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loadingParticipants ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                      </tr>
                    ) : filteredList.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-gray-500">Không có học sinh tham gia</td>
                      </tr>
                    ) : (
                      filteredList.map((item, idx) => (
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
                        </tr>
                      ))
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
              <h2 className="text-lg font-bold mb-4">Chi tiết học sinh tham gia tiêm chủng</h2>
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
      </div>
    </div>
  );
}

export default VaccinationForm;