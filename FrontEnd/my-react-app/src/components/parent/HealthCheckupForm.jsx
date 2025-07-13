import React, { useEffect, useState } from "react";

function HealthCheckupForm() {
  // Dữ liệu mẫu
  const mockForms = [
    {
      id: 1,
      student: {
        lastName: "Nguyen",
        firstName: "An",
        classes: { name: "10A1" },
        results: [
          { id: 101, event: { id: 11 }, conclusion: "Bình thường", note: "Không vấn đề" }
        ]
      },
      event: {
        id: 11,
        name: "Khám sức khỏe đầu năm",
        eventDate: "2024-08-01",
        status: "finished"
      },
      consent: "Accepted",
      sendDate: "2024-07-20",
      parent: { lastName: "Tran", firstName: "Binh" }
    },
    {
      id: 2,
      student: {
        lastName: "Le",
        firstName: "Bao",
        classes: { name: "10A2" },
        results: []
      },
      event: {
        id: 12,
        name: "Khám sức khỏe giữa kỳ",
        eventDate: "2024-10-01",
        status: "isgoing"
      },
      consent: "Pending",
      sendDate: "2024-09-20",
      parent: { lastName: "Tran", firstName: "Binh" }
    }
  ];

  // Dữ liệu kết quả mẫu
  const mockResults = {
    101: { conclusion: "Bình thường", note: "Không vấn đề sức khỏe" }
  };

  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");
  const [resultModal, setResultModal] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [resultError, setResultError] = useState("");

  useEffect(() => {
    // Không gọi API, chỉ set dữ liệu mẫu
    setForms(mockForms);
  }, []);

  const handleShowResult = async (id) => {
    setResultLoading(true);
    setResultError("");
    setResultData(null);
    setResultModal(true);
    // Không gọi API, chỉ lấy từ mockResults
    setTimeout(() => {
      if (mockResults[id]) {
        setResultData(mockResults[id]);
      } else {
        setResultError("Không thể lấy kết quả. Vui lòng thử lại.");
      }
      setResultLoading(false);
    }, 500);
  };

  const filteredForms = forms.filter(item => {
    const student = (item.student?.lastName + " " + item.student?.firstName).toLowerCase();
    const eventName = (item.event?.name || "").toLowerCase();
    const className = (item.student?.classes?.name || "").toLowerCase();
    const searchText = search.toLowerCase();
    return student.includes(searchText) || eventName.includes(searchText) || className.includes(searchText);
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                🩺 Danh sách đăng ký kiểm tra sức khỏe
              </h1>
              <p className="text-gray-600 mt-1">Xem lịch sử kiểm tra sức khỏe cho học sinh</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên học sinh, lớp hoặc sự kiện..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-border-transparent"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex items-center text-sm text-gray-600">
              Tìm thấy {filteredForms.length} lượt đăng ký
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học sinh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sự kiện</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sự kiện</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái đồng ý</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phụ huynh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái sự kiện</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kết quả kiểm tra</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredForms.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-gray-500">Không có dữ liệu</td>
                  </tr>
                ) : (
                  filteredForms.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{item.student?.lastName} {item.student?.firstName}</td>
                      <td className="px-6 py-4">{item.student?.classes?.name}</td>
                      <td className="px-6 py-4">{item.event?.name}</td>
                      <td className="px-6 py-4">{item.event?.eventDate}</td>
                      <td className="px-6 py-4 font-semibold" style={{
                        color: item.consent?.toLowerCase() === "pending" ? "orange" : item.consent?.toLowerCase() === "accepted" ? "green" : "red",
                        textTransform: "capitalize"
                      }}>
                        {item.consent?.toLowerCase() === "pending" ? "Chờ xác nhận" : item.consent?.toLowerCase() === "accepted" ? "Đồng ý" : item.consent?.toLowerCase() === "rejected" ? "Từ chối" : item.consent}
                      </td>
                      <td className="px-6 py-4">{item.sendDate}</td>
                      <td className="px-6 py-4">{item.parent?.lastName} {item.parent?.firstName}</td>
                      <td className="px-6 py-4 font-semibold" style={{
                        color: item.event?.status === "isgoing" ? "blue" : item.event?.status === "finished" ? "green" : "gray",
                        textTransform: "capitalize"
                      }}>
                        {item.event?.status === "isgoing" ? "Đang diễn ra" :
                         item.event?.status === "finished" ? "Đã kết thúc" :
                         item.event?.status}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.consent?.toLowerCase() === "accepted" && item.student?.results?.find(r => r.event?.id === item.event?.id) && (
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            onClick={() => {
                              const result = item.student?.results?.find(r => r.event?.id === item.event?.id);
                              if (result) handleShowResult(result.id);
                            }}
                            disabled={resultLoading}
                          >
                            Xem kết quả
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal kết quả kiểm tra */}
        {resultModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setResultModal(false)}
              >
                ×
              </button>
              <h2 className="text-lg font-bold mb-4">Kết quả kiểm tra sức khỏe</h2>
              {resultLoading ? (
                <div>Đang tải kết quả...</div>
              ) : resultError ? (
                <div className="text-red-500">{resultError}</div>
              ) : resultData ? (
                <div className="space-y-2">
                  {/* Hiển thị các trường kết quả kiểm tra sức khỏe ở đây */}
                  <div><b>Kết luận:</b> {resultData.conclusion || 'Không có'}</div>
                  <div><b>Ghi chú:</b> {resultData.note || 'Không có'}</div>
                </div>
              ) : (
                <div>Không có dữ liệu kết quả.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthCheckupForm;