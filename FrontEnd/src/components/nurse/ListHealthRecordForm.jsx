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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Danh sách hồ sơ sức khỏe
              </h1>
              <p className="text-gray-600 text-lg">Lịch sử hồ sơ sức khỏe của học sinh</p>
            </div>
          </div>
        </div>

        {/* Enhanced Search/Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mã học sinh..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">Tìm thấy {filteredList.length} hồ sơ sức khỏe</span>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Danh sách hồ sơ sức khỏe
            </h2>
          </div>
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
                    <tr key={item.studentId} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{item.studentId || 'Không có'}</td>
                      <td className="px-6 py-4">{`${item.lastName || ''} ${item.firstName || ''}`.trim() || 'Không có'}</td>
                      <td className="px-6 py-4">{item.gender || 'Không có'}</td>
                      <td className="px-6 py-4">{item.dateOfBirth || 'Không có'}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium transition-colors duration-200"
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

        {/* Enhanced Detail Modal */}
        {showModal && detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Chi tiết hồ sơ sức khỏe</h2>
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
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900">Thông tin học sinh</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-medium">Mã học sinh:</span>
                        <span className="text-blue-900">{detail.studentId || 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-medium">Họ tên:</span>
                        <span className="text-blue-900">{`${detail.lastName || ''} ${detail.firstName || ''}`.trim() || 'Không có'}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-medium">Giới tính:</span>
                        <span className="text-blue-900">{detail.gender || 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 font-medium">Ngày sinh:</span>
                        <span className="text-blue-900">{detail.dateOfBirth || 'Không có'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Health Info */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-900">Thông tin sức khỏe</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Dị ứng:</span>
                        <span className="text-green-900">{detail.healthRecord?.allergy || 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Bệnh mãn tính:</span>
                        <span className="text-green-900">{detail.healthRecord?.chronic_disease || 'Không có'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Tiền sử bệnh:</span>
                        <span className="text-green-900">{detail.healthRecord?.medical_history || 'Không có'}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Thị lực:</span>
                        <span className="text-green-900">{detail.healthRecord?.vision || 'Chưa cập nhật'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Thính lực:</span>
                        <span className="text-green-900">{detail.healthRecord?.hearing || 'Chưa cập nhật'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Cân nặng:</span>
                        <span className="text-green-900">{detail.healthRecord?.weight || 'Chưa cập nhật'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 font-medium">Chiều cao:</span>
                        <span className="text-green-900">{detail.healthRecord?.height || 'Chưa cập nhật'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListHealthRecordForm;
