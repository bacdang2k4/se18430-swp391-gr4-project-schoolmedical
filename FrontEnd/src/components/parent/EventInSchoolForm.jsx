import { useEffect, useState } from "react";
import { 
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  UserIcon,
  IdentificationIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  BeakerIcon,
  HeartIcon,
  ShieldExclamationIcon,
  EllipsisHorizontalIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { 
  CalendarDaysIcon as CalendarDaysIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid
} from "@heroicons/react/24/solid";
import { getAllStudentsByParent } from "../../api/axios";

function EventInSchoolForm() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudentsByParent();
        setStudents(data.result || []);
      } catch {
        setError("Không thể tải danh sách học sinh. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const name = (student.lastName + " " + student.firstName).toLowerCase();
    const id = (student.studentId || "").toLowerCase();
    const searchText = search.toLowerCase();
    return name.includes(searchText) || id.includes(searchText);
  });

  const eventTypeConfig = {
    accident: {
      label: 'Tai nạn',
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    illness: {
      label: 'Ốm đau',
      icon: HeartIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    allergy: {
      label: 'Dị ứng',
      icon: ShieldExclamationIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    emergency: {
      label: 'Khẩn cấp',
      icon: ExclamationTriangleIconSolid,
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-300'
    },
    other: {
      label: 'Khác',
      icon: EllipsisHorizontalIcon,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  };

  const getEventTypeConfig = (type) => {
    return eventTypeConfig[type] || eventTypeConfig.other;
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'Không có';
    return new Date(dateTime).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200/50 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
              <CalendarDaysIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Sự Kiện Y Tế
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Theo dõi lịch sử các sự kiện y tế của con em tại trường học một cách chi tiết và kịp thời
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
                placeholder="Tìm kiếm theo tên học sinh hoặc mã số sinh viên..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 bg-gray-50"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
              <UserIcon className="w-4 h-4" />
              <span>Tìm thấy {filteredStudents.length} học sinh</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-xl border border-red-200/50 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredStudents.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Không tìm thấy học sinh</h3>
                <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc kiểm tra lại thông tin.</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div key={student.studentId} className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  {/* Student Header */}
                  <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">
                          {student.lastName} {student.firstName}
                        </h3>
                        <div className="flex items-center gap-4 text-white/80 text-sm mt-1">
                          <div className="flex items-center gap-1">
                            <IdentificationIcon className="w-4 h-4" />
                            <span>{student.studentId}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="w-4 h-4" />
                            <span>{student.dateOfBirth}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-4 h-4" />
                            <span>{student.gender}</span>
                          </div>
                          {student.classes?.name && (
                            <div className="flex items-center gap-1">
                              <DocumentTextIcon className="w-4 h-4" />
                              <span>{student.classes.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Events Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CalendarDaysIconSolid className="w-6 h-6 text-rose-600" />
                      <h4 className="text-lg font-semibold text-gray-800">Lịch sử sự kiện y tế</h4>
                    </div>

                    {student.eventList && student.eventList.length > 0 ? (
                      <div className="space-y-4">
                        {student.eventList.map((event, idx) => {
                          const typeConfig = getEventTypeConfig(event.type);
                          const TypeIcon = typeConfig.icon;

                          return (
                            <div key={event.medicalEventId || idx} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                              <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg ${typeConfig.bgColor} border ${typeConfig.borderColor} flex items-center justify-center flex-shrink-0`}>
                                  <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                      <h5 className="font-semibold text-gray-800 text-lg">
                                        {event.medicalEventName || 'Không có tên'}
                                      </h5>
                                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} ${typeConfig.color} border ${typeConfig.borderColor} mt-1`}>
                                        <TypeIcon className="w-3 h-3" />
                                        {typeConfig.label}
                                      </div>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>{formatDateTime(event.medicalEventTime)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <DocumentTextIcon className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-700">Mô tả</span>
                                      </div>
                                      <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3">
                                        {event.medicalEventDescription || 'Không có mô tả'}
                                      </p>
                                    </div>

                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <BeakerIcon className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-700">Thuốc đã sử dụng</span>
                                      </div>
                                      {event.usedMedicines && event.usedMedicines.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                          {event.usedMedicines.map((medicine, i) => (
                                            <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                              <div className="font-medium text-blue-800 text-sm">
                                                {medicine.medicine?.name || 'Không rõ tên'}
                                              </div>
                                              <div className="text-blue-600 text-xs mt-1">
                                                {medicine.medicine?.type && (
                                                  <span className="mr-2">Loại: {medicine.medicine.type}</span>
                                                )}
                                                <span>
                                                  Số lượng: {medicine.quantityUsed || 0} {medicine.medicine?.unit || ''}
                                                </span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="text-gray-500 text-sm bg-gray-50 rounded-lg p-3 italic">
                                          Không có thuốc nào được sử dụng
                                        </div>
                                      )}
                                    </div>

                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <UserIcon className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-700">Người ghi nhận</span>
                                      </div>
                                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                                        <span className="text-emerald-800 font-medium text-sm">
                                          {event.nurse ? 
                                            `${event.nurse.lastName || ''} ${event.nurse.firstName || ''}`.trim() || 'Không có thông tin' 
                                            : 'Không có thông tin'
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CalendarDaysIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Chưa có sự kiện y tế</h4>
                        <p className="text-gray-600">Học sinh này chưa có sự kiện y tế nào được ghi nhận.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventInSchoolForm;