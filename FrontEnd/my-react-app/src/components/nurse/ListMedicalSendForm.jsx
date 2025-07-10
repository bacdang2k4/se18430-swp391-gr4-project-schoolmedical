import React, { useEffect, useState } from "react";
import { getNurseMedicalSentList, approveMedicalSend, setUse } from "../../api/axios";

function ListMedicalSendForm() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getNurseMedicalSentList();
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
    const medicine = item.medicineName?.toLowerCase() || "";
    const student = item.studentId?.toLowerCase() || "";
    const searchText = search.toLowerCase();
    return medicine.includes(searchText) || student.includes(searchText);
  });

  // Xác nhận đã nhận thuốc
  const handleApprove = async (item) => {
    if (!window.confirm("Xác nhận đã nhận thuốc cho đơn này?")) return;
    try {
      await approveMedicalSend(item.id);
      alert(`Đã nhận thuốc cho đơn ở id ${item.id} và học sinh có mã số ${item.studentId}`);
      setLoading(true);
      const res = await getNurseMedicalSentList();
      setList(res.result || []);
    } catch {
      alert("Xác nhận thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // Xác nhận đã sử dụng thuốc
  const handleSetUse = async (item) => {
    if (!window.confirm("Xác nhận học sinh đã sử dụng thuốc này?")) return;
    try {
      await setUse(item.id);
      alert(`Đã xác nhận sử dụng thuốc cho đơn ở id ${item.id} và học sinh có mã số ${item.studentId}`);
      setLoading(true);
      const res = await getNurseMedicalSentList();
      setList(res.result || []);
    } catch {
      alert("Xác nhận thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            💊 Danh sách gửi thuốc
          </h1>
          <p className="text-gray-600 mt-1">Lịch sử gửi thuốc của y tế</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên thuốc hoặc mã học sinh..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex items-center text-sm text-gray-600">
              Tìm thấy {filteredList.length} lượt gửi thuốc
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên thuốc</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                  </tr>
                ) : filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">Không có dữ liệu</td>
                  </tr>
                ) : (
                  filteredList.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{item.studentId}</td>
                      <td className="px-6 py-4">{item.medicineName}</td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4">{item.note}</td>
                      <td className="px-6 py-4">{new Date(item.sendDate).toLocaleString()}</td>
                      <td className="px-6 py-4 font-semibold text-center" style={{
                        color: item.status === "pending" ? "orange" : item.status === "received" ? "green" : item.status === "used" ? "blue" : "red",
                        textTransform: "capitalize"
                      }}>
                        {item.status === "pending"
                          ? "Chờ nhận"
                          : item.status === "received"
                          ? "Đã nhận"
                          : item.status === "used"
                          ? "Đã sử dụng"
                          : ""}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.status === "pending" && (
                          <button
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                            onClick={() => handleApprove(item)}
                          >
                            Xác nhận đã nhận
                          </button>
                        )}
                        {item.status === "received" && (
                          <button
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                            onClick={() => handleSetUse(item)}
                          >
                            Xác nhận đã sử dụng
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
      </div>
    </div>
  );
}

export default ListMedicalSendForm;
