import React, { useEffect, useState } from "react";
import { getMedicalSentHistory, getAllStudentsByParent, sendMedical } from "../../api/axios";

function MedicalSendForm() {
  const [history, setHistory] = useState([]);
  const [studentMap, setStudentMap] = useState({});
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    studentId: "",
    medicineName: "",
    usageInstructions: "",
    note: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, studentsRes] = await Promise.all([
          getMedicalSentHistory(),
          getAllStudentsByParent(),
        ]);
        setHistory(historyRes.result || []);
        setStudents(studentsRes.result || []);
        const map = {};
        (studentsRes.result || []).forEach(student => {
          map[student.studentId] = student.lastName + " " + student.firstName;
        });
        setStudentMap(map);
      } catch {
        setHistory([]);
        setStudentMap({});
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lọc dữ liệu theo search
  const filteredHistory = history.filter(item => {
    const medicine = item.medicineName?.toLowerCase() || "";
    const student = (studentMap[item.studentId] || "").toLowerCase();
    const searchText = search.toLowerCase();
    return medicine.includes(searchText) || student.includes(searchText);
  });

  // Xử lý gửi thuốc
  const handleSendMedicine = async (e) => {
    e.preventDefault();
    if (!form.studentId) {
      alert("Vui lòng chọn học sinh!");
      return;
    }
    setSending(true);
    try {
      await sendMedical(form.studentId, {
        medicineName: form.medicineName,
        usageInstructions: form.usageInstructions,
        note: form.note,
      });
      alert("Gửi thuốc thành công!");
      setShowModal(false);
      setForm({
        studentId: "",
        medicineName: "",
        usageInstructions: "",
        note: "",
      });
      // Reload history
      setLoading(true);
      const historyRes = await getMedicalSentHistory();
      setHistory(historyRes.result || []);
    } catch {
      alert("Gửi thuốc thất bại!");
    } finally {
      setSending(false);
      setLoading(false);
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
                💊 Gửi thuốc cho học sinh
              </h1>
              <p className="text-gray-600 mt-1">Quản lý lịch sử gửi thuốc và gửi thuốc mới cho học sinh</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              + Gửi thuốc
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên thuốc hoặc tên học sinh..."
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex items-center text-sm text-gray-600">
              Tìm thấy {filteredHistory.length} lượt gửi thuốc
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên thuốc</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HDSD</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">Không có dữ liệu</td>
                  </tr>
                ) : (
                  filteredHistory.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">{item.studentId}</td>
                      <td className="px-6 py-4">{studentMap[item.studentId] || "Không rõ"}</td>
                      <td className="px-6 py-4">{item.medicineName}</td>
                      <td className="px-6 py-4">{item.usageInstructions || item.description}</td>
                      <td className="px-6 py-4">{item.note}</td>
                      <td className="px-6 py-4">{new Date(item.sendDate).toLocaleString()}</td>
                      <td className="px-6 py-4 font-semibold" style={{
                        color: item.status === "pending" ? "orange" : item.status === "received" ? "green" : "red",
                        textTransform: "capitalize"
                      }}>
                        {item.status === "pending" ? "Chờ nhận" : item.status === "received" ? "Đã nhận" : "Đã sử dụng"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal gửi thuốc */}
        {showModal && (
          <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white border border-blue-200 shadow-xl rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Gửi thuốc cho học sinh</h3>
              <form className="space-y-4" onSubmit={handleSendMedicine}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chọn học sinh</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={form.studentId}
                    onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))}
                    required
                  >
                    <option value="">-- Chọn học sinh --</option>
                    {students.map(stu => (
                      <option key={stu.studentId} value={stu.studentId}>
                        {stu.lastName + " " + stu.firstName} ({stu.studentId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên thuốc</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={form.medicineName}
                    onChange={e => setForm(f => ({ ...f, medicineName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hướng dẫn sử dụng</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={form.usageInstructions}
                    onChange={e => setForm(f => ({ ...f, usageInstructions: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={form.note}
                    onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={sending}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={sending}
                  >
                    {sending ? "Đang gửi..." : "Gửi thuốc"}
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

export default MedicalSendForm;