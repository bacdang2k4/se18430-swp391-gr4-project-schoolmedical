import { useEffect, useState } from "react";
import { 
  HeartIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilSquareIcon,
  UserIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ScaleIcon,
  EyeSlashIcon,
  SpeakerWaveIcon, // Thêm icon thay thế cho EarIcon
} from "@heroicons/react/24/outline";
import { 
  HeartIcon as HeartIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid
} from "@heroicons/react/24/solid";
import { getAllStudentsByParent, getHealthRecordById, updateHealthRecordById } from "../../api/axios";

function HealthRecordForm() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [healthDetail, setHealthDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [errorDetail, setErrorDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({
        allergy: "",
        chronic_disease: "",
        vision: "",
        hearing: "",
        medical_history: "",
        height: "",
        weight: ""
    });
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState(null);
    const [editSuccess, setEditSuccess] = useState(false);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    // Validation functions
    const validateWeight = (weight) => {
        if (!weight) return null;
        const numWeight = parseFloat(weight);
        if (isNaN(numWeight)) return "Cân nặng phải là số";
        if (numWeight < 1 || numWeight > 200) return "Cân nặng phải từ 1kg đến 200kg";
        return null;
    };

    const validateHeight = (height) => {
        if (!height) return null;
        const numHeight = parseFloat(height);
        if (isNaN(numHeight)) return "Chiều cao phải là số";
        if (numHeight < 50 || numHeight > 250) return "Chiều cao phải từ 50cm đến 250cm";
        return null;
    };

    const validateForm = () => {
        const weightError = validateWeight(editForm.weight);
        const heightError = validateHeight(editForm.height);
        
        if (weightError) {
            setEditError(weightError);
            return false;
        }
        if (heightError) {
            setEditError(heightError);
            return false;
        }
        return true;
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudentsByParent();
                setStudents(data.result || []);
            } catch (err) {
                console.error(err);
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

    const handleView = async (student) => {
        setHealthDetail(null);
        setErrorDetail(null);
        setLoadingDetail(true);
        setShowModal(true);
        try {
            const data = await getHealthRecordById(student.healthRecord.recordId);
            setHealthDetail(data.result);
        } catch (err) {
            console.error(err);
            setErrorDetail("Không thể tải chi tiết hồ sơ sức khỏe. Vui lòng thử lại.");
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleEdit = async (student) => {
        setEditError(null);
        setEditSuccess(false);
        setEditLoading(true);
        setShowEditModal(true);
        setEditId(student.healthRecord.recordId);
        try {
            const data = await getHealthRecordById(student.healthRecord.recordId);
            setEditForm({
                allergy: data.result.allergy || "",
                chronic_disease: data.result.chronic_disease || "",
                vision: data.result.vision || "",
                hearing: data.result.hearing || "",
                medical_history: data.result.medical_history || "",
                height: data.result.height || "",
                weight: data.result.weight || ""
            });
        } catch (err) {
            console.error(err);
            setEditError("Không thể tải dữ liệu hồ sơ để chỉnh sửa.");
        } finally {
            setEditLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setHealthDetail(null);
        setErrorDetail(null);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditError(null);
        setEditSuccess(false);
        setEditId(null);
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
        if (editError) setEditError(null);
        if (editSuccess) setEditSuccess(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }
        
        setEditLoading(true);
        setEditError(null);
        setEditSuccess(false);
        try {
            await updateHealthRecordById(editId, editForm);
            setEditSuccess(true);
            setTimeout(() => {
                setShowEditModal(false);
                if (showModal && healthDetail && healthDetail.recordId === editId) {
                    setLoadingDetail(true);
                    getHealthRecordById(editId).then(data => {
                        setHealthDetail(data.result);
                        setLoadingDetail(false);
                    }).catch(() => setLoadingDetail(false));
                }
            }, 1500);
        } catch (err) {
            console.error(err);
            setEditError("Cập nhật hồ sơ thất bại. Vui lòng thử lại.");
        } finally {
            setEditLoading(false);
        }
    };

    const getHealthStatus = (student) => {
        return student.healthRecord ? 'complete' : 'incomplete';
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'complete':
                return {
                    label: 'Đã có hồ sơ',
                    color: 'text-emerald-600',
                    bgColor: 'bg-emerald-50',
                    borderColor: 'border-emerald-200',
                    icon: CheckCircleIconSolid
                };
            case 'incomplete':
                return {
                    label: 'Chưa có hồ sơ',
                    color: 'text-amber-600',
                    bgColor: 'bg-amber-50',
                    borderColor: 'border-amber-200',
                    icon: ExclamationTriangleIconSolid
                };
            default:
                return {
                    label: 'Không xác định',
                    color: 'text-gray-600',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-200',
                    icon: ExclamationTriangleIcon
                };
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
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200/50 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <HeartIcon className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                            Hồ Sơ Sức Khỏe
                        </h1>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Theo dõi và quản lý thông tin sức khỏe của con em một cách chi tiết và khoa học
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
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 bg-gray-50"
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
                    <div className="space-y-4">
                        {filteredStudents.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserIcon className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Không tìm thấy học sinh</h3>
                                <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc kiểm tra lại thông tin.</p>
                            </div>
                        ) : (
                            filteredStudents.map((student) => {
                                const status = getHealthStatus(student);
                                const statusConfig = getStatusConfig(status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <div key={student.studentId} className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                                                        <UserIcon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-800">
                                                            {student.lastName} {student.firstName}
                                                        </h3>
                                                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
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
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
                                                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                                                        <span className={`text-sm font-medium ${statusConfig.color}`}>
                                                            {statusConfig.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleView(student)}
                                                            disabled={!student.healthRecord}
                                                            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <EyeIcon className="w-4 h-4" />
                                                            Xem hồ sơ
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(student)}
                                                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
                                                        >
                                                            <PencilSquareIcon className="w-4 h-4" />
                                                            Chỉnh sửa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* View Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}></div>
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-emerald-500 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <HeartIconSolid className="w-6 h-6 text-white" />
                                    <h2 className="text-xl font-bold text-white">Chi tiết hồ sơ sức khỏe</h2>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            
                            <div className="p-6">
                                {loadingDetail ? (
                                    <div className="text-center py-8">
                                        <ArrowPathIcon className="w-8 h-8 text-sky-500 animate-spin mx-auto mb-4" />
                                        <p className="text-gray-600">Đang tải chi tiết hồ sơ...</p>
                                    </div>
                                ) : errorDetail ? (
                                    <div className="text-center py-8">
                                        <ExclamationTriangleIcon className="w-8 h-8 text-red-500 mx-auto mb-4" />
                                        <p className="text-red-600">{errorDetail}</p>
                                    </div>
                                ) : healthDetail ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <IdentificationIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Mã hồ sơ</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.recordId}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <ExclamationTriangleIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Dị ứng</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.allergy || 'Chưa cập nhật'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <HeartIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Bệnh mãn tính</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.chronic_disease || 'Chưa cập nhật'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <EyeIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Thị lực</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.vision || 'Chưa cập nhật'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <SpeakerWaveIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Thính lực</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.hearing || 'Chưa cập nhật'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <ScaleIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Cân nặng</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.weight || 'Chưa cập nhật'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <ScaleIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Chiều cao</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.height || 'Chưa cập nhật'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                                                    <span className="font-medium text-gray-700">Tiền sử bệnh</span>
                                                </div>
                                                <p className="text-gray-800">{healthDetail.medical_history || 'Chưa cập nhật'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseEditModal}></div>
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <PencilSquareIcon className="w-6 h-6 text-white" />
                                    <h2 className="text-xl font-bold text-white">Chỉnh sửa hồ sơ sức khỏe</h2>
                                </div>
                                <button
                                    onClick={handleCloseEditModal}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            
                            <div className="p-6">
                                {editSuccess && (
                                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                                        <CheckCircleIconSolid className="w-6 h-6 text-emerald-600" />
                                        <div>
                                            <div className="font-medium text-emerald-800">Cập nhật thành công!</div>
                                            <div className="text-emerald-700 text-sm">Hồ sơ sức khỏe đã được cập nhật.</div>
                                        </div>
                                    </div>
                                )}

                                {editError && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                                        <ExclamationTriangleIconSolid className="w-6 h-6 text-red-600" />
                                        <div>
                                            <div className="font-medium text-red-800">Có lỗi xảy ra</div>
                                            <div className="text-red-700 text-sm">{editError}</div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleEditSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Dị ứng
                                            </label>
                                            <input
                                                type="text"
                                                name="allergy"
                                                value={editForm.allergy}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                                placeholder="Nhập thông tin dị ứng..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bệnh mãn tính
                                            </label>
                                            <input
                                                type="text"
                                                name="chronic_disease"
                                                value={editForm.chronic_disease}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                                placeholder="Nhập thông tin bệnh mãn tính..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Thị lực
                                            </label>
                                            <select
                                                name="vision"
                                                value={editForm.vision}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                            >
                                                <option value="">Chọn thị lực</option>
                                                {[...Array(10)].map((_, i) => (
                                                    <option key={i+1} value={i+1}>{i+1}/10</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Thính lực
                                            </label>
                                            <select
                                                name="hearing"
                                                value={editForm.hearing}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                            >
                                                <option value="">Chọn thính lực</option>
                                                {[...Array(10)].map((_, i) => (
                                                    <option key={i+1} value={i+1}>{i+1}/10</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cân nặng (kg)
                                            </label>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={editForm.weight}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                                placeholder="Nhập cân nặng..."
                                                step="0.1"
                                                min="1"
                                                max="200"
                                            />
                                            {editForm.weight && validateWeight(editForm.weight) && (
                                                <p className="text-red-500 text-sm mt-1">{validateWeight(editForm.weight)}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Chiều cao (cm)
                                            </label>
                                            <input
                                                type="number"
                                                name="height"
                                                value={editForm.height}
                                                onChange={handleEditChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                                placeholder="Nhập chiều cao..."
                                                step="0.1"
                                                min="50"
                                                max="250"
                                            />
                                            {editForm.height && validateHeight(editForm.height) && (
                                                <p className="text-red-500 text-sm mt-1">{validateHeight(editForm.height)}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tiền sử bệnh
                                        </label>
                                        <textarea
                                            name="medical_history"
                                            value={editForm.medical_history}
                                            onChange={handleEditChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                            placeholder="Nhập tiền sử bệnh..."
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseEditModal}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={editLoading}
                                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {editLoading ? (
                                                <>
                                                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                                    Đang lưu...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircleIcon className="w-4 h-4" />
                                                    Lưu thay đổi
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HealthRecordForm;