import React, { useEffect, useState } from "react";
import { getParentCheckupForms, acceptParentCheckup, rejectParentCheckup } from "../../api/axios";

function HealthCheckupForm() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loadingId, setLoadingId] = useState(null); // loading cho từng dòng

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await getParentCheckupForms();
      setForms(res.result || []);
    } catch {
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    setLoadingId(id + "-accept");
    try {
      await acceptParentCheckup(id);
      await fetchList();
    } finally {
      setLoadingId(null);
    }
  };
  const handleReject = async (id) => {
    setLoadingId(id + "-reject");
    try {
      await rejectParentCheckup(id);
      await fetchList();
    } finally {
      setLoadingId(null);
    }
  };

  const filteredForms = forms.filter(item => {
    const name = ((item.student?.lastName || "") + " " + (item.student?.firstName || "")).toLowerCase();
    const studentId = (item.student?.studentId || "").toLowerCase();
    const eventName = (item.checkUp?.name || "").toLowerCase();
    const className = (item.student?.classes?.name || "").toLowerCase();
    const searchText = search.toLowerCase();
    return name.includes(searchText) || studentId.includes(searchText) || eventName.includes(searchText) || className.includes(searchText);
  });

  const handleShowDetail = (item) => {
    setDetail(item);
    setShowModal(true);
  };

  // Map trạng thái consent
  const mapConsent = (consent) => {
    if (!consent) return "Không có";
    switch (consent.toLowerCase()) {
      case "pending": return "Chờ xác nhận";
      case "accepted": return "Đồng ý";
      case "reject": return "Từ chối";
      default: return consent;
    }
  };

  // Map trạng thái sự kiện
  const mapStatusLabel = (status) => {
    switch ((status || '').toLowerCase()) {
      case "setup":
        return "Đang lên lịch";
      case "isgoing":
        return "Đang diễn ra";
      case "finished":
        return "Kết thúc";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                🩺 Danh sách kiểm tra sức khỏe
              </h1>
              <p className="text-gray-600 mt-1">Lịch sử kiểm tra sức khỏe của học sinh</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, mã học sinh, lớp hoặc sự kiện..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex items-center text-sm text-gray-600">
              Tìm thấy {filteredForms.length} lượt kiểm tra
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sự kiện</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sự kiện</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái đồng ý</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phụ huynh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái sự kiện</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                  </tr>
                ) : filteredForms.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-gray-500">Không có dữ liệu</td>
                  </tr>
                ) : (
                  filteredForms.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{item.student?.studentId || 'Không có'}</td>
                      <td className="px-6 py-4">{`${item.student?.lastName || ''} ${item.student?.firstName || ''}`.trim() || 'Không có'}</td>
                      <td className="px-6 py-4">{item.student?.classes?.name || 'Không có'}</td>
                      <td className="px-6 py-4">{item.student?.gender || 'Không có'}</td>
                      <td className="px-6 py-4">{item.student?.dateOfBirth || 'Không có'}</td>
                      <td className="px-6 py-4">{item.checkUp?.name || 'Không có'}</td>
                      <td className="px-6 py-4">{item.checkUp?.eventDate || 'Không có'}</td>
                      <td className="px-6 py-4">
                        {item.consent?.toLowerCase() === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                              onClick={() => handleAccept(item.id)}
                              disabled={loadingId === item.id + "-accept" || loadingId === item.id + "-reject"}
                            >
                              {loadingId === item.id + "-accept" ? "Đang xác nhận..." : "Đồng ý"}
                            </button>
                            <button
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                              onClick={() => handleReject(item.id)}
                              disabled={loadingId === item.id + "-accept" || loadingId === item.id + "-reject"}
                            >
                              {loadingId === item.id + "-reject" ? "Đang từ chối..." : "Không đồng ý"}
                            </button>
                          </div>
                        ) : (
                          <span className="font-semibold" style={{ color: item.consent?.toLowerCase() === "accepted" ? "green" : item.consent?.toLowerCase() === "reject" ? "red" : "gray" }}>
                            {mapConsent(item.consent)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.sendDate || 'Không có'}</td>
                      <td className="px-6 py-4">{`${item.parent?.lastName || ''} ${item.parent?.firstName || ''}`.trim() || 'Không có'}</td>
                      <td className="px-6 py-4">{mapStatusLabel(item.checkUp?.status) || 'Không có'}</td>
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
              <h2 className="text-lg font-bold mb-4">Chi tiết hồ sơ sức khỏe</h2>
              <div className="space-y-2">
                <div><b>Mã học sinh:</b> {detail.student?.studentId || 'Không có'}</div>
                <div><b>Họ tên:</b> {`${detail.student?.lastName || ''} ${detail.student?.firstName || ''}`.trim() || 'Không có'}</div>
                <div><b>Dị ứng:</b> {detail.student?.healthRecord?.allergy || 'Chưa cập nhật'}</div>
                <div><b>Bệnh mãn tính:</b> {detail.student?.healthRecord?.chronic_disease || 'Chưa cập nhật'}</div>
                <div><b>Thị lực:</b> {detail.student?.healthRecord?.vision || 'Chưa cập nhật'}</div>
                <div><b>Thính lực:</b> {detail.student?.healthRecord?.hearing || 'Chưa cập nhật'}</div>
                <div><b>Cân nặng:</b> {detail.student?.healthRecord?.weight || 'Chưa cập nhật'}</div>
                <div><b>Chiều cao:</b> {detail.student?.healthRecord?.height || 'Chưa cập nhật'}</div>
                <div><b>Tiền sử bệnh:</b> {detail.student?.healthRecord?.medical_history || 'Chưa cập nhật'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthCheckupForm;