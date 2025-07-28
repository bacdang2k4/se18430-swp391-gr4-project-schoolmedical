import React, { useEffect, useState } from "react";
import { 
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  UserIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  XMarkIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  HeartIcon,
  ScaleIcon,
  EyeSlashIcon,
  SpeakerWaveIcon, // Thêm icon thay thế cho EarIcon
} from "@heroicons/react/24/outline";
import { 
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  XCircleIcon as XCircleIconSolid,
  ClockIcon as ClockIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid
} from "@heroicons/react/24/solid";
import { getParentCheckupForms, acceptParentCheckup, rejectParentCheckup } from "../../api/axios";

function HealthCheckupForm() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

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

  const getConsentConfig = (consent) => {
    switch (consent?.toLowerCase()) {
      case "pending":
        return {
          label: "Chờ xác nhận",
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          icon: ClockIconSolid
        };
      case "accepted":
        return {
          label: "Đã đồng ý",
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          icon: CheckCircleIconSolid
        };
      case "reject":
        return {
          label: "Đã từ chối",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          icon: XCircleIconSolid
        };
      default:
        return {
          label: "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          icon: ExclamationTriangleIconSolid
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "setup":
        return {
          label: "Đang lên lịch",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200"
        };
      case "isgoing":
        return {
          label: "Đang diễn ra",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200"
        };
      case "finished":
        return {
          label: "Đã kết thúc",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200"
        };
      default:
        return {
          label: status || "Không xác định",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200"
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Không có';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
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
            <div className="flex gap-2">
              <div className="h-9 bg-gray-200 rounded w-20"></div>
              <div className="h-9 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200/50 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Kiểm Tra Sức Khỏe
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Quản lý và theo dõi lịch kiểm tra sức khỏe định kỳ của con em tại trường học
          </p>
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
                placeholder="Tìm kiếm theo tên, mã học sinh, lớp hoặc sự kiện..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
              <ClipboardDocumentCheckIcon className="w-4 h-4" />
              <span>Tìm thấy {filteredForms.length} lượt kiểm tra</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-4">
            {filteredForms.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardDocumentCheckIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Không có dữ liệu</h3>
                <p className="text-gray-600">Chưa có lịch kiểm tra sức khỏe nào được tìm thấy.</p>
              </div>
            ) : (
              filteredForms.map((item, idx) => {
                const consentConfig = getConsentConfig(item.consent);
                const statusConfig = getStatusConfig(item.event?.status);
                const ConsentIcon = consentConfig.icon;

                return (
                  <div key={item.id} className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {`${item.student?.lastName || ''} ${item.student?.firstName || ''}`.trim() || 'Không có tên'}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <IdentificationIcon className="w-4 h-4" />
                                <span>{item.student?.studentId || 'Không có'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DocumentTextIcon className="w-4 h-4" />
                                <span>{item.student?.classes?.name || 'Không có lớp'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <UserIcon className="w-4 h-4" />
                                <span>{item.student?.gender || 'Không có'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">STT: {idx + 1}</div>
                          <button
                            onClick={() => handleShowDetail(item)}
                            className="flex items-center gap-2 px-3 py-1 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
                          >
                            <EyeIcon className="w-4 h-4" />
                            Chi tiết
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardDocumentCheckIconSolid className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700 text-sm">Sự kiện</span>
                          </div>
                          <p className="text-gray-800 font-semibold">{item.event?.name || 'Không có'}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700 text-sm">Ngày sinh</span>
                          </div>
                          <p className="text-gray-800">{formatDate(item.student?.dateOfBirth)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700 text-sm">Ngày sự kiện</span>
                          </div>
                          <p className="text-gray-800">{formatDate(item.event?.eventDate)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700 text-sm">Ngày gửi</span>
                          </div>
                          <p className="text-gray-800">{formatDate(item.sendDate)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-full border ${consentConfig.bgColor} ${consentConfig.borderColor}`}>
                            <ConsentIcon className={`w-4 h-4 ${consentConfig.color}`} />
                            <span className={`text-sm font-medium ${consentConfig.color}`}>
                              {consentConfig.label}
                            </span>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
                            <ClockIcon className={`w-4 h-4 ${statusConfig.color}`} />
                            <span className={`text-sm font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Phụ huynh:</span> {`${item.parent?.lastName || ''} ${item.parent?.firstName || ''}`.trim() || 'Không có'}
                          </div>
                        </div>
                        
                        {item.consent?.toLowerCase() === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAccept(item.id)}
                              disabled={loadingId === item.id + "-accept" || loadingId === item.id + "-reject"}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loadingId === item.id + "-accept" ? (
                                <>
                                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                  Đang xử lý...
                                </>
                              ) : (
                                <>
                                  <CheckCircleIcon className="w-4 h-4" />
                                  Đồng ý
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              disabled={loadingId === item.id + "-accept" || loadingId === item.id + "-reject"}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loadingId === item.id + "-reject" ? (
                                <>
                                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                  Đang xử lý...
                                </>
                              ) : (
                                <>
                                  <XCircleIcon className="w-4 h-4" />
                                  Từ chối
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Detail Modal */}
        {showModal && detail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HeartIcon className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">Chi tiết hồ sơ sức khỏe</h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <IdentificationIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Mã học sinh</span>
                      </div>
                      <p className="text-gray-800">{detail.student?.studentId || 'Không có'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <UserIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Họ tên</span>
                      </div>
                      <p className="text-gray-800">{`${detail.student?.lastName || ''} ${detail.student?.firstName || ''}`.trim() || 'Không có'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Dị ứng</span>
                      </div>
                      <p className="text-gray-800">{detail.student?.healthRecord?.allergy || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <HeartIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Bệnh mãn tính</span>
                      </div>
                      <p className="text-gray-800">{detail.student?.healthRecord?.chronic_disease || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <EyeIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Thị lực</span>
                      </div>
                      <p className="text-gray-800">{detail.student?.healthRecord?.vision || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <SpeakerWaveIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Thính lực</span>
                      </div>
                      <p className="text-gray-800">{detail.student?.healthRecord?.hearing || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ScaleIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Cân nặng</span>
                      </div>
                      <p className="text-gray-800">{detail.student?.healthRecord?.weight || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ScaleIcon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Chiều cao</span>
                      </div>
                      <p className="text-gray-800">{detail.student?.healthRecord?.height || 'Chưa cập nhật'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-700">Tiền sử bệnh</span>
                    </div>
                    <p className="text-gray-800">{detail.student?.healthRecord?.medical_history || 'Chưa cập nhật'}</p>
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

export default HealthCheckupForm;