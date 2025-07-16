import React, { useEffect, useState } from "react";
import { 
  BeakerIcon,
  MagnifyingGlassIcon,
  UserIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import { 
  BeakerIcon as BeakerIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  ClockIcon as ClockIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid,
  XCircleIcon as XCircleIconSolid
} from "@heroicons/react/24/solid";
import { getMedicalSentHistory, getAllStudentsByParent, sendMedical } from "../../api/axios";

function MedicalSendForm() {
  const [history, setHistory] = useState([]);
  const [studentMap, setStudentMap] = useState({});
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    studentId: "",
    medicineName: "",
    usageInstructions: "",
    note: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showModal]);

  const filteredHistory = history.filter(item => {
    const medicine = item.medicineName?.toLowerCase() || "";
    const student = (studentMap[item.studentId] || "").toLowerCase();
    const searchText = search.toLowerCase();
    return medicine.includes(searchText) || student.includes(searchText);
  });

  const handleSendMedicine = async (e) => {
    e.preventDefault();
    if (!form.studentId) {
      setError("Vui lòng chọn học sinh!");
      return;
    }
    setSending(true);
    setError("");
    setSuccess(false);
    
    try {
      await sendMedical(form.studentId, {
        medicineName: form.medicineName,
        usageInstructions: form.usageInstructions,
        note: form.note,
      });
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setForm({
          studentId: "",
          medicineName: "",
          usageInstructions: "",
          note: "",
        });
        setSuccess(false);
        // Reload history
        setLoading(true);
        getMedicalSentHistory().then(historyRes => {
          setHistory(historyRes.result || []);
          setLoading(false);
        });
      }, 1500);
    } catch {
      setError("Gửi thuốc thất bại! Vui lòng thử lại.");
    } finally {
      setSending(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          label: "Chờ nhận",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          icon: ClockIconSolid
        };
      case "received":
        return {
          label: "Đã nhận",
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          icon: CheckCircleIconSolid
        };
      case "used":
        return {
          label: "Đã sử dụng",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          icon: BeakerIconSolid
        };
      default:
        return {
          label: status || "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          icon: ExclamationTriangleIconSolid
        };
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Không có';
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({
      studentId: "",
      medicineName: "",
      usageInstructions: "",
      note: "",
    });
    setError("");
    setSuccess(false);
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200/50 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <BeakerIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Gửi Thuốc
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Quản lý và theo dõi việc gửi thuốc cho con em tại trường học một cách an toàn và hiệu quả
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="w-5 h-5" />
              Gửi thuốc mới
            </button>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên thuốc hoặc tên học sinh..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
                <BeakerIcon className="w-4 h-4" />
                <span>Tìm thấy {filteredHistory.length} lượt gửi thuốc</span>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-4">
              {filteredHistory.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BeakerIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Chưa có lịch sử gửi thuốc</h3>
                  <p className="text-gray-600 mb-4">Bạn chưa gửi thuốc nào cho con em. Hãy bắt đầu bằng cách nhấn nút "Gửi thuốc mới" ở trên.</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Gửi thuốc đầu tiên
                  </button>
                </div>
              ) : (
                filteredHistory.map((item, idx) => {
                  const statusConfig = getStatusConfig(item.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div key={item.id} className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                              <BeakerIconSolid className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                {item.medicineName}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-1">
                                  <UserIcon className="w-4 h-4" />
                                  <span>{studentMap[item.studentId] || "Không rõ"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <IdentificationIcon className="w-4 h-4" />
                                  <span>{item.studentId}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">#{idx + 1}</div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
                              <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                              <span className={`text-sm font-medium ${statusConfig.color}`}>
                                {statusConfig.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                              <span className="font-medium text-gray-700 text-sm">Hướng dẫn sử dụng</span>
                            </div>
                            <p className="text-gray-800">{item.usageInstructions || item.description || 'Không có'}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                              <span className="font-medium text-gray-700 text-sm">Ngày gửi</span>
                            </div>
                            <p className="text-gray-800">{formatDateTime(item.sendDate)}</p>
                          </div>
                        </div>

                        {item.note && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <InformationCircleIcon className="w-5 h-5 text-blue-600" />
                              <span className="font-medium text-blue-700 text-sm">Ghi chú</span>
                            </div>
                            <p className="text-blue-800">{item.note}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Send Medicine Modal - Moved outside main container and improved */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
          style={{ margin: 0 }}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <PaperAirplaneIcon className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Gửi thuốc cho học sinh</h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                type="button"
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <CheckCircleIconSolid className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-emerald-800">Gửi thuốc thành công!</div>
                    <div className="text-emerald-700 text-sm">Thuốc đã được gửi đến y tá trường.</div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <XCircleIconSolid className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-red-800">Có lỗi xảy ra</div>
                    <div className="text-red-700 text-sm">{error}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSendMedicine} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn học sinh *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    value={form.studentId}
                    onChange={e => handleFormChange('studentId', e.target.value)}
                    required
                    disabled={sending}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên thuốc *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    value={form.medicineName}
                    onChange={e => handleFormChange('medicineName', e.target.value)}
                    placeholder="Nhập tên thuốc..."
                    required
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hướng dẫn sử dụng *
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                    value={form.usageInstructions}
                    onChange={e => handleFormChange('usageInstructions', e.target.value)}
                    placeholder="Ví dụ: Uống 1 viên sau bữa ăn, ngày 2 lần..."
                    rows={3}
                    required
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú thêm
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                    value={form.note}
                    onChange={e => handleFormChange('note', e.target.value)}
                    placeholder="Ghi chú thêm về thuốc hoặc tình trạng sức khỏe..."
                    rows={2}
                    disabled={sending}
                  />
                </div>

                {/* Safety Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">Lưu ý an toàn</h4>
                      <ul className="text-amber-700 text-sm space-y-1">
                        <li>• Chỉ gửi thuốc khi thực sự cần thiết</li>
                        <li>• Ghi rõ hướng dẫn sử dụng và liều lượng</li>
                        <li>• Kiểm tra hạn sử dụng trước khi gửi</li>
                        <li>• Thông báo với y tá về tình trạng dị ứng (nếu có)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={sending}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {sending ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-4 h-4" />
                        Gửi thuốc
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MedicalSendForm;