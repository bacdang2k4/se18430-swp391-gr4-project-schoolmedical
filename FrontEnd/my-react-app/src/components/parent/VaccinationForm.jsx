import React, { useEffect, useState } from "react";
import { getParentEventForms, acceptParentEvent, rejectParentEvent, getParentVaccinationResult } from "../../api/axios";

function VaccinationForm() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [resultModal, setResultModal] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [resultError, setResultError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getParentEventForms();
        setForms(res.result || []);
      } catch {
        setForms([]);
      }
    };
    fetchData();
  }, []);

  const handleAccept = async (id) => {
    setLoadingId(id + "-accept");
    try {
      await acceptParentEvent(id);
      // reload
      const res = await getParentEventForms();
      setForms(res.result || []);
    } finally {
      setLoadingId(null);
    }
  };
  const handleReject = async (id) => {
    setLoadingId(id + "-reject");
    try {
      await rejectParentEvent(id);
      // reload
      const res = await getParentEventForms();
      setForms(res.result || []);
    } finally {
      setLoadingId(null);
    }
  };

  const handleShowResult = async (id) => {
    setResultLoading(true);
    setResultError("");
    setResultData(null);
    setResultModal(true);
    try {
      const res = await getParentVaccinationResult(id);
      setResultData(res.result || null);
    } catch {
      setResultError("Không thể lấy kết quả. Vui lòng thử lại.");
    } finally {
      setResultLoading(false);
    }
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
                💉 Danh sách đăng ký tiêm chủng
              </h1>
              <p className="text-gray-600 mt-1">Xem lịch sử đăng ký tiêm chủng cho học sinh</p>
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
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kết quả tiêm</th>
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
                              {loadingId === item.id + "-reject" ? "Đang từ chối..." : "Từ chối"}
                            </button>
                          </div>
                        ) : item.consent?.toLowerCase() === "accepted" ? "Đồng ý" : item.consent?.toLowerCase() === "rejected" ? "Từ chối" : item.consent}
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

       {/* Modal kết quả tiêm */}
       {resultModal && (
         <div className="fixed inset-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
             <button
               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
               onClick={() => setResultModal(false)}
             >
               ×
             </button>
             <h2 className="text-lg font-bold mb-4">Kết quả tiêm chủng</h2>
             {resultLoading ? (
               <div>Đang tải kết quả...</div>
             ) : resultError ? (
               <div className="text-red-500">{resultError}</div>
             ) : resultData ? (
               <div className="space-y-2">
                 <div><b>Tên vaccine:</b> {resultData.vaccine || 'Không có'}</div>
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

export default VaccinationForm;
