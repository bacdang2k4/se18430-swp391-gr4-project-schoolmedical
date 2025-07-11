import React, { useEffect, useState } from "react";
import { getNurseMedicineList, getNurseMedicalEventList } from "../../api/axios";
import api from "../../api/axios";

function WarehouseForm() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState(null); // 'add' | 'take'
  const [editValue, setEditValue] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'history'

  // Lịch sử sử dụng thuốc
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNurseMedicineList();
      setItems(data.result || []);
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách vật tư y tế!");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setLoadingHistory(true);
    setErrorHistory(null);
    try {
      const res = await getNurseMedicalEventList();
      const result = res.result || [];
      // Map phẳng từng lần sử dụng thuốc
      const flat = [];
      result.forEach(event => {
        const eventName = event.medicalEventName;
        const eventTime = event.medicalEventTime;
        const nurseName = event.nurse ? `${event.nurse.lastName} ${event.nurse.firstName}` : "";
        const studentName = event.fullName || event.studentName || "";
        (event.usedMedicines || []).forEach(um => {
          flat.push({
            medicineName: um.medicine?.name || "",
            quantityUsed: um.quantityUsed,
            unit: um.medicine?.unit || "",
            eventTime,
            eventName,
            studentName,
            nurseName,
          });
        });
      });
      setHistory(flat);
    } catch (err) {
      console.error(err);
      setErrorHistory("Không thể tải lịch sử sử dụng thuốc!");
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (activeTab === "list") fetchData();
    if (activeTab === "history") fetchHistory();
  }, [activeTab]);

  // Tự động ẩn message sau 2.5s
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Lọc theo tên thuốc
  const filteredItems = items.filter(item =>
    (item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // Hàm cập nhật số lượng
  const handleUpdate = async (id, type, currentQuantity) => {
    const value = Number(editValue);
    const current = Number(currentQuantity);
    if (!editValue || isNaN(value) || value <= 0) {
      setMessage("Vui lòng nhập số lượng hợp lệ!");
      setMessageType("error");
      return;
    }
    let newQuantity = current;
    if (type === 'add') {
      newQuantity = current + value;
    } else if (type === 'take') {
      if (value > current) {
        setMessage("Không thể lấy vượt quá số lượng hiện có!");
        setMessageType("error");
        return;
      }
      newQuantity = current - value;
    }
    setUpdating(true);
    try {
      await api.put(`/v1/nurse/medicine/${id}`, { quantity: newQuantity });
      setEditId(null);
      setEditType(null);
      setEditValue("");
      setMessage("Cập nhật thành công!");
      setMessageType("success");
      await fetchData();
    } catch (err) {
      console.error(err);
      setMessage("Cập nhật thất bại!");
      setMessageType("error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 min-w-[180px] bg-white rounded-xl shadow border border-gray-200 p-6 h-fit sticky top-6 self-start">
          <div className="flex flex-col gap-2">
            <button
              className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
              onClick={() => setActiveTab('list')}
            >
              📦 Danh sách thuốc/vật tư
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
              onClick={() => setActiveTab('history')}
            >
              🕑 Lịch sử sử dụng thuốc
            </button>
          </div>
        </aside>
        {/* Main content */}
        <div className="flex-1">
          {/* Message */}
          {message && (
            <div className={`mb-4 px-4 py-3 rounded text-center font-semibold ${messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              {message}
            </div>
          )}
          {activeTab === 'list' && (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  📦 Danh sách vật tư y tế
                </h1>
                <p className="text-gray-600 mt-1">Tồn kho thuốc và vật tư y tế</p>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên thuốc..."
                      className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3 flex items-center text-sm text-gray-600">
                    Tìm thấy {filteredItems.length} vật tư
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn vị</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-gray-500">Đang tải dữ liệu...</td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-red-500">{error}</td>
                        </tr>
                      ) : filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-gray-500">Không có vật tư nào</td>
                        </tr>
                      ) : (
                        filteredItems.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-blue-50">
                            <td className="px-6 py-4">{idx + 1}</td>
                            <td className="px-6 py-4 font-medium">{item.name}</td>
                            <td className="px-6 py-4">{item.quantity}</td>
                            <td className="px-6 py-4">{item.type}</td>
                            <td className="px-6 py-4">{item.unit}</td>
                            <td className="px-6 py-4 text-center">
                              {editId === item.id ? (
                                <>
                                  <input
                                    type="number"
                                    className="border rounded px-2 py-1 w-24 mb-2"
                                    value={editValue}
                                    min="1"
                                    onChange={e => setEditValue(e.target.value)}
                                    disabled={updating}
                                  />
                                  <div className="flex gap-2 justify-center">
                                    <button
                                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                                      onClick={() => handleUpdate(item.id, editType, item.quantity)}
                                      disabled={updating}
                                    >
                                      Lưu
                                    </button>
                                    <button
                                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs"
                                      onClick={() => { setEditId(null); setEditType(null); setEditValue(""); }}
                                      disabled={updating}
                                    >
                                      Hủy
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="flex gap-2 justify-center">
                                  <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                                    onClick={() => { setEditId(item.id); setEditType('add'); setEditValue(""); }}
                                  >
                                    Thêm thuốc
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                                    onClick={() => { setEditId(item.id); setEditType('take'); setEditValue(""); }}
                                  >
                                    Lấy thuốc
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {activeTab === 'history' && (
            <>
              {/* Header giống danh sách vật tư */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  🕑 Lịch sử sử dụng thuốc
                </h1>
                <p className="text-gray-600 mt-1">Tất cả lần sử dụng thuốc/vật tư trong các sự kiện y tế</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {loadingHistory ? (
                <div className="text-center text-gray-500 py-8">Đang tải dữ liệu...</div>
              ) : errorHistory ? (
                <div className="text-center text-red-500 py-8">{errorHistory}</div>
              ) : history.length === 0 ? (
                <div className="text-center text-gray-500 py-8">Không có lịch sử sử dụng thuốc</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên thuốc</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn vị</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sử dụng</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sự kiện y tế</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Y tá</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {history.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50">
                          <td className="px-4 py-2">{idx + 1}</td>
                          <td className="px-4 py-2 font-medium">{row.medicineName}</td>
                          <td className="px-4 py-2">{row.quantityUsed}</td>
                          <td className="px-4 py-2">{row.unit}</td>
                          <td className="px-4 py-2">{row.eventTime}</td>
                          <td className="px-4 py-2">{row.eventName}</td>
                          <td className="px-4 py-2">{row.nurseName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WarehouseForm;