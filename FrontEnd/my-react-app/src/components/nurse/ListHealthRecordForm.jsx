import React, { useEffect, useState } from "react";
import { getNurseHealthRecordList } from "../../api/axios";

function ListHealthRecordForm() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getNurseHealthRecordList();
        setList(res.result || []);
      } catch {
        setList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lọc dữ liệu theo search
  const filteredList = list.filter(item => {
    const name = ((item.lastName || "") + " " + (item.firstName || "")).toLowerCase();
    const studentId = (item.studentId || "").toLowerCase();
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
          👨‍👩‍👧‍👦 Danh sách hồ sơ sức khỏe
          </h1>
          <p className="text-gray-600 mt-1">Lịch sử hồ sơ sức khỏe của học sinh</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mã học sinh..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex items-center text-sm text-gray-600">
              Tìm thấy {filteredList.length} hồ sơ sức khỏe
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới tính</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                  </tr>
                ) : filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">Không có dữ liệu</td>
                  </tr>
                ) : (
                  filteredList.map((item, idx) => (
                    <tr key={item.studentId} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{item.studentId || 'Không có'}</td>
                      <td className="px-6 py-4">{`${item.lastName || ''} ${item.firstName || ''}`.trim() || 'Không có'}</td>
                      <td className="px-6 py-4">{item.gender || 'Không có'}</td>
                      <td className="px-6 py-4">{item.dateOfBirth || 'Không có'}</td>
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
                <div><b>Mã học sinh:</b> {detail.studentId || 'Không có'}</div>
                <div><b>Họ tên:</b> {`${detail.lastName || ''} ${detail.firstName || ''}`.trim() || 'Không có'}</div>
                <div><b>Giới tính:</b> {detail.gender || 'Không có'}</div>
                <div><b>Ngày sinh:</b> {detail.dateOfBirth || 'Không có'}</div>
                {/* Thông tin sức khỏe */}
                <div><b>Dị ứng:</b> {detail.healthRecord?.allergy || 'Không có'}</div>
                <div><b>Bệnh mãn tính:</b> {detail.healthRecord?.chronic_disease || 'Không có'}</div>
                <div><b>Thị lực:</b> {detail.healthRecord?.vision || 'Chưa cập nhật'}</div>
                <div><b>Thính lực:</b> {detail.healthRecord?.hearing || 'Chưa cập nhật'}</div>
                <div><b>Cân nặng:</b> {detail.healthRecord?.weight || 'Chưa cập nhật'}</div>
                <div><b>Chiều cao:</b> {detail.healthRecord?.height || 'Chưa cập nhật'}</div>
                <div><b>Tiền sử bệnh:</b> {detail.healthRecord?.medical_history || 'Không có'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListHealthRecordForm;
