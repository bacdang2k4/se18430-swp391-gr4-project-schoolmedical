import { useEffect, useState } from "react";
import { getAllStudentsByParent, getHealthRecordById, updateHealthRecordById } from "../../api/axios";

function HealthRecordForm() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [healthDetail, setHealthDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [errorDetail, setErrorDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // Modal edit
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
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudentsByParent();
                setStudents(data.result || []);
            } catch (err) {
                console.error(err); // log error for debugging
                setError("Không thể tải danh sách học sinh.");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    // Lọc dữ liệu theo search
    const filteredStudents = students.filter(student => {
        const name = (student.lastName + " " + student.firstName).toLowerCase();
        const id = (student.studentId || "").toLowerCase();
        const searchText = search.toLowerCase();
        return name.includes(searchText) || id.includes(searchText);
    });

    // Xử lý khi bấm nút xem hồ sơ
    const handleView = async (student) => {
        setHealthDetail(null);
        setErrorDetail(null);
        setLoadingDetail(true);
        setShowModal(true);
        try {
            const data = await getHealthRecordById(student.healthRecord.recordId);
            setHealthDetail(data.result);
        } catch (err) {
            console.error(err); // log error for debugging
            setErrorDetail("Không thể tải chi tiết hồ sơ sức khỏe.");
        } finally {
            setLoadingDetail(false);
        }
    };

    // Xử lý khi bấm nút sửa hồ sơ
    const handleEdit = async (student) => {
        setEditError(null);
        setEditLoading(true);
        setShowEditModal(true);
        setEditId(student.healthRecord.recordId);
        try {
            // Lấy dữ liệu hiện tại để prefill
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
            setEditError("Không thể tải dữ liệu hồ sơ để sửa.");
        } finally {
            setEditLoading(false);
        }
    };

    // Đóng modal xem
    const handleCloseModal = () => {
        setShowModal(false);
        setHealthDetail(null);
        setErrorDetail(null);
    };

    // Đóng modal sửa
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditError(null);
        setEditId(null);
    };

    // Xử lý thay đổi form
    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    // Submit form sửa
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError(null);
        try {
            await updateHealthRecordById(editId, editForm);
            setShowEditModal(false);
            // Sau khi update, reload lại chi tiết nếu đang xem
            if (showModal && healthDetail && healthDetail.recordId === editId) {
                setLoadingDetail(true);
                try {
                    const data = await getHealthRecordById(editId);
                    setHealthDetail(data.result);
                } catch (err) {
                    console.error(err);
                }
                setLoadingDetail(false);
            }
        } catch (err) {
            console.error(err);
            setEditError("Cập nhật hồ sơ thất bại.");
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-orange-400">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <rect x="3" y="8" width="18" height="8" rx="4" fill="#fff" stroke="none"/>
                                <rect x="3" y="8" width="18" height="8" rx="4"/>
                                <path d="M7 8v8" />
                            </svg>
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900">Danh sách hồ sơ sức khỏe</h1>
                    </div>
                    <div className="text-gray-500 text-base ml-12">Lịch sử hồ sơ sức khỏe của học sinh</div>
                </div>

                {/* Search Section in card */}
                <div className="bg-white rounded-2xl shadow border p-6 mb-8 max-w-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên học sinh hoặc mã học sinh..."
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base pr-10 bg-gray-50"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-gray-500 text-base min-w-max">
                            Tìm thấy {filteredStudents.length} học sinh
                        </div>
                    </div>
                </div>

                {loading && (
                    <ul className="space-y-4 mt-6">
                        {[1, 2].map((i) => (
                            <li key={i} className="border rounded-lg p-4 shadow-sm animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            </li>
                        ))}
                    </ul>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <ul className="space-y-4 mt-6">
                        {filteredStudents.map((student) => (
                            <li key={student.studentId} className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <div><b>Mã số sinh viên:</b> {student.studentId}</div>
                                    <div><b>Họ tên:</b> {student.lastName} {student.firstName}</div>
                                    <div><b>Giới tính:</b> {student.gender}</div>
                                    <div><b>Ngày sinh:</b> {student.dateOfBirth}</div>
                                    <div><b>Trạng thái hồ sơ:</b> {student.healthRecord ? "Đã có hồ sơ sức khỏe" : "Chưa có hồ sơ sức khỏe"}</div>
                                </div>
                                <div className="flex gap-2 md:flex-col md:gap-2">
                                    <button
                                        className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500`}
                                        onClick={() => handleView(student)}
                                        disabled={!student.healthRecord}
                                    >
                                        Xem hồ sơ
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 transition"
                                        onClick={() => handleEdit(student)}
                                    >
                                        Sửa hồ sơ
                                    </button>
                                </div>
                            </li>
                        ))}
                        {filteredStudents.length === 0 && <li>Không có học sinh nào.</li>}
                    </ul>
                )}
                {/* Modal hiển thị chi tiết hồ sơ */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Nền mờ */}
                        <div className="absolute inset-0 backdrop-blur-xs bg-white/10" onClick={handleCloseModal}></div>
                        {/* Nội dung modal */}
                        <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg z-10 animate-fade-in flex flex-col">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
                                onClick={handleCloseModal}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-blue-700">Chi tiết hồ sơ sức khỏe</h2>
                            {loadingDetail && <div>Đang tải chi tiết hồ sơ...</div>}
                            {errorDetail && <div className="text-red-500">{errorDetail}</div>}
                            {healthDetail && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><b>Mã hồ sơ:</b> {healthDetail.recordId}</div>
                                    <div><b>Dị ứng:</b> {healthDetail.allergy || 'Chưa cập nhật'}</div>
                                    <div><b>Bệnh mãn tính:</b> {healthDetail.chronic_disease || 'Chưa cập nhật'}</div>
                                    <div><b>Thị lực:</b> {healthDetail.vision || 'Chưa cập nhật'}</div>
                                    <div><b>Thính lực:</b> {healthDetail.hearing || 'Chưa cập nhật'}</div>
                                    <div><b>Cân nặng:</b> {healthDetail.weight || 'Chưa cập nhật'}</div>
                                    <div><b>Chiều cao:</b> {healthDetail.height || 'Chưa cập nhật'}</div>
                                    <div><b>Tiền sử bệnh:</b> {healthDetail.medical_history || 'Chưa cập nhật'}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* Modal sửa hồ sơ */}
                {showEditModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 backdrop-blur-xs bg-white/10" onClick={handleCloseEditModal}></div>
                        <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg z-10 animate-fade-in flex flex-col">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
                                onClick={handleCloseEditModal}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-yellow-600">Sửa hồ sơ sức khỏe</h2>
                            {editLoading && <div>Đang tải...</div>}
                            {editError && <div className="text-red-500 mb-2">{editError}</div>}
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label className="font-semibold">Dị ứng:</label>
                                    <input type="text" name="allergy" value={editForm.allergy} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                                </div>
                                <div>
                                    <label className="font-semibold">Bệnh mãn tính:</label>
                                    <input type="text" name="chronic_disease" value={editForm.chronic_disease} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                                </div>
                                <div>
                                    <label className="font-semibold">Thị lực:</label>
                                    <select name="vision" value={editForm.vision} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1">
                                        <option value="">Chọn thị lực</option>
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i+1} value={i+1}>{i+1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold">Thính lực:</label>
                                    <select name="hearing" value={editForm.hearing} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1">
                                        <option value="">Chọn thính lực</option>
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i+1} value={i+1}>{i+1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold">Tiền sử bệnh:</label>
                                    <input type="text" name="medical_history" value={editForm.medical_history} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                                </div>
                                <div>
                                    <label className="font-semibold">Cân nặng:</label>
                                    <input type="text" name="weight" value={editForm.weight} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                                </div>
                                <div>
                                    <label className="font-semibold">Chiều cao:</label>
                                    <input type="text" name="height" value={editForm.height} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button type="button" onClick={handleCloseEditModal} className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400">Hủy</button>
                                    <button type="submit" disabled={editLoading} className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 disabled:opacity-60">Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HealthRecordForm;