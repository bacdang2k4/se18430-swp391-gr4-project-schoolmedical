import React, { useEffect, useState } from "react";
import { getNurseStudentList, getNurseMedicineList, createNurseMedicalEvent } from "../../api/axios";

// Toast component
function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      onClick={onClose}
      role="alert"
    >
      {message}
    </div>
  );
}

function EventInSchoolForm() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New state for students and medicines
  const [students, setStudents] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [medicineSearchTerm, setMedicineSearchTerm] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
  const [activeMedicineIndex, setActiveMedicineIndex] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [addForm, setAddForm] = useState({
    studentId: '',
    medicalEventName: '',
    medicalEventDescription: '',
    type: '',
    medicineList: [{ medicineId: '', quantityUsed: '', medicineName: '', medicineData: null }],
  });

  // Đặt fetchEvents ra ngoài useEffect
  const fetchEvents = async () => {
    try {
      const data = await getNurseStudentList();
      const allEvents = [];
      (data.result || []).forEach(student => {
        (student.eventList || []).forEach(event => {
          allEvents.push({
            studentId: student.studentId,
            fullName: `${student.lastName} ${student.firstName}`,
            className: student.classes?.name || 'Không có',
            gender: student.gender,
            dateOfBirth: student.dateOfBirth,
            ...event
          });
        });
      });
      // Sắp xếp theo thời gian thêm
      allEvents.sort((a, b) => {
        if (!a.medicalEventTime) return 1;
        if (!b.medicalEventTime) return -1;
        return new Date(b.medicalEventTime) - new Date(a.medicalEventTime);
      });
      setEvents(allEvents);
      setFilteredEvents(allEvents);
      setStudents(data.result || []);
    } catch {
      setError("Không thể tải danh sách sự kiện.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch medicines data
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getNurseMedicineList();
        console.log("Medicines data:", data);
        setMedicines(data.result || []);
      } catch (error) {
        console.error("Không thể tải danh sách thuốc:", error);
      }
    };
    fetchMedicines();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchLower = studentSearchTerm.toLowerCase();
    const fullName = `${student.lastName || ''} ${student.firstName || ''}`.toLowerCase();
    return (
      student.studentId?.toLowerCase().includes(searchLower) ||
      fullName.includes(searchLower) ||
      student.classes?.name?.toLowerCase().includes(searchLower)
    );
  });

  // Filter medicines based on search term
  const filteredMedicines = medicineSearchTerm.trim() === ""
    ? medicines
    : medicines.filter(medicine => {
        const searchLower = medicineSearchTerm.toLowerCase();
        return (
          medicine.name?.toLowerCase().includes(searchLower) ||
          medicine.type?.toLowerCase().includes(searchLower) ||
          medicine.medicineId?.toLowerCase().includes(searchLower)
        );
      });

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => {
        const searchLower = searchTerm.toLowerCase();
        return (
          event.studentId?.toLowerCase().includes(searchLower) ||
          event.fullName?.toLowerCase().includes(searchLower) ||
          event.className?.toLowerCase().includes(searchLower) ||
          event.medicalEventName?.toLowerCase().includes(searchLower) ||
          event.medicalEventDescription?.toLowerCase().includes(searchLower) ||
          event.type?.toLowerCase().includes(searchLower)
        );
      });
      setFilteredEvents(filtered);
    }
  }, [searchTerm, events]);

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  // Handler functions for student and medicine selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setAddForm(prev => ({ ...prev, studentId: student.studentId }));
    setStudentSearchTerm(`${student.lastName} ${student.firstName}`);
    setShowStudentDropdown(false);
  };

  const handleMedicineSelect = (medicine, index) => {
    const updatedMedicineList = [...addForm.medicineList];
    updatedMedicineList[index] = { 
      medicineId: medicine.id, 
      quantityUsed: updatedMedicineList[index]?.quantityUsed || '',
      medicineName: medicine.name,
      medicineData: medicine
    };
    setAddForm(prev => ({ ...prev, medicineList: updatedMedicineList }));
    setMedicineSearchTerm('');
    setShowMedicineDropdown(false);
    setActiveMedicineIndex(null);
  };

  const handleAddMedicine = () => {
    setAddForm(prev => ({
      ...prev,
      medicineList: [...prev.medicineList, { medicineId: '', quantityUsed: '', medicineName: '', medicineData: null }]
    }));
  };

  const handleRemoveMedicine = (index) => {
    setAddForm(prev => ({
      ...prev,
      medicineList: prev.medicineList.filter((_, i) => i !== index)
    }));
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setAddForm({
      studentId: '',
      medicalEventName: '',
      medicalEventDescription: '',
      type: '',
      medicineList: [{ medicineId: '', quantityUsed: '', medicineName: '', medicineData: null }],
    });
    setSelectedStudent(null);
    setStudentSearchTerm('');
    setMedicineSearchTerm('');
    setShowStudentDropdown(false);
    setShowMedicineDropdown(false);
    setActiveMedicineIndex(null);
  };

  // Validation function
  const validateMedicineQuantities = () => {
    const errors = [];
    addForm.medicineList.forEach((med) => {
      if (med.medicineData && med.quantityUsed) {
        const requestedQuantity = parseInt(med.quantityUsed);
        const availableQuantity = med.medicineData.quantity;
        if (requestedQuantity > availableQuantity) {
          errors.push(`${med.medicineName}: Yêu cầu ${requestedQuantity} nhưng chỉ có ${availableQuantity} ${med.medicineData.unit}`);
        }
      }
    });
    return errors;
  };

  const handleRemoveStudent = () => {
    setSelectedStudent(null);
    setAddForm(prev => ({ ...prev, studentId: "" }));
    setStudentSearchTerm("");
  };
  
  const handleRemoveMedicineChoice = (idx) => {
    setAddForm(prev => ({
      ...prev,
      medicineList: prev.medicineList.map((m, i) => i === idx ? { medicineId: '', quantityUsed: '', medicineName: '', medicineData: null } : m)
    }));
  };

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });
  // Toast auto close
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ ...toast, message: '' }), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate medicine quantities
    const quantityErrors = validateMedicineQuantities();
    if (quantityErrors.length > 0) {
      setToast({ message: 'Lỗi số lượng thuốc: ' + quantityErrors.join(' | '), type: 'error' });
      return;
    }
    if (!addForm.studentId) {
      setToast({ message: 'Vui lòng chọn học sinh!', type: 'error' });
      return;
    }

    // Chuẩn bị dữ liệu gửi API
    const payload = {
      medicalEventName: addForm.medicalEventName,
      medicalEventDescription: addForm.medicalEventDescription,
      type: addForm.type,
      medicineList: addForm.medicineList
        .filter(med => med.medicineId && med.quantityUsed)
        .map(med => ({
          medicineId: Number(med.medicineId),
          quantityUsed: Number(med.quantityUsed)
        }))
    };
    try {
      await createNurseMedicalEvent(addForm.studentId, payload);
      setToast({ message: 'Tạo sự kiện thành công!', type: 'success' });
      handleCloseAddModal();
      fetchEvents(); // Load lại danh sách sự kiện
    } catch (err) {
      console.error('Lỗi khi tạo sự kiện:', err);
      setToast({ message: 'Có lỗi khi tạo sự kiện!', type: 'error' });
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showStudentDropdown && !event.target.closest('.student-dropdown')) {
        setShowStudentDropdown(false);
      }
      if (showMedicineDropdown && !event.target.closest('.medicine-dropdown')) {
        setShowMedicineDropdown(false);
        setMedicineSearchTerm('');
        setActiveMedicineIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStudentDropdown, showMedicineDropdown]);

  // Thêm constant cho loại sự kiện
  const eventTypes = [
    { key: 'accident', label: 'Tai nạn', color: 'bg-red-100 text-red-800', icon: '⚠️' },
    { key: 'illness', label: 'Ốm đau', color: 'bg-yellow-100 text-yellow-800', icon: '🤒' },
    { key: 'allergy', label: 'Dị ứng', color: 'bg-orange-100 text-orange-800', icon: '🤧' },
    { key: 'emergency', label: 'Khẩn cấp', color: 'bg-red-100 text-red-800', icon: '🚨' },
    { key: 'other', label: 'Khác', color: 'bg-gray-100 text-gray-800', icon: '📋' },
  ];

  const getEventTypeInfo = (type) => {
    return eventTypes.find(et => et.key === type) || { label: type, color: 'bg-gray-100 text-gray-800', icon: '📋' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-6">
      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Sự kiện y tế
              </h1>
              <p className="text-gray-600 text-lg">Quản lý và theo dõi các sự kiện y tế của học sinh</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng sự kiện</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Khẩn cấp</p>
                  <p className="text-2xl font-bold text-red-600">
                    {events.filter(e => e.type === 'emergency').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hôm nay</p>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter(e => {
                      const today = new Date().toDateString();
                      const eventDate = new Date(e.medicalEventTime).toDateString();
                      return eventDate === today;
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên học sinh, mã học sinh, lớp, tên sự kiện..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-gray-50 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">{filteredEvents.length} kết quả</span>
                </div>
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm sự kiện
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Loading State */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-24 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">Có lỗi xảy ra</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Enhanced Events List */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'Không tìm thấy kết quả' : 'Chưa có sự kiện y tế'}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm 
                      ? `Không tìm thấy sự kiện nào phù hợp với "${searchTerm}"`
                      : 'Chưa có sự kiện y tế nào được ghi nhận'
                    }
                  </p>
                </div>
              ) : (
                filteredEvents.map((event, idx) => {
                  const typeInfo = getEventTypeInfo(event.type);
                  return (
                    <div key={event.medicalEventId || idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 group">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Student Avatar and Basic Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {event.fullName?.charAt(0) || 'N'}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 truncate">{event.fullName}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                                {typeInfo.icon} {typeInfo.label}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {event.studentId}
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {event.className}
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {event.dateOfBirth}
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                {event.medicalEventTime ? new Date(event.medicalEventTime).toLocaleString('vi-VN') : 'Không có'}
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <p className="text-sm text-gray-900 font-medium">{event.medicalEventName || 'Không có tên'}</p>
                              <p className="text-sm text-gray-600 line-clamp-2">{event.medicalEventDescription || 'Không có mô tả'}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleView(event)}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 group-hover:shadow-md"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Enhanced Detail Modal */}
          {showModal && selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal}></div>
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Chi tiết sự kiện y tế</h2>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Student and Event Info Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Student Info */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-blue-900">Thông tin học sinh</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Mã học sinh:</span>
                          <span className="text-blue-900">{selectedEvent.studentId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Họ tên:</span>
                          <span className="text-blue-900">{selectedEvent.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Lớp:</span>
                          <span className="text-blue-900">{selectedEvent.className}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Giới tính:</span>
                          <span className="text-blue-900">{selectedEvent.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Ngày sinh:</span>
                          <span className="text-blue-900">{selectedEvent.dateOfBirth}</span>
                        </div>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-green-900">Thông tin sự kiện</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-700 font-medium">Tên sự kiện:</span>
                          <span className="text-green-900">{selectedEvent.medicalEventName || 'Không có'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700 font-medium">Loại:</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getEventTypeInfo(selectedEvent.type).color}`}>
                            {getEventTypeInfo(selectedEvent.type).icon} {getEventTypeInfo(selectedEvent.type).label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 font-medium">Thời gian:</span>
                          <span className="text-green-900">{selectedEvent.medicalEventTime ? new Date(selectedEvent.medicalEventTime).toLocaleString('vi-VN') : 'Không có'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 font-medium">Người ghi nhận:</span>
                          <span className="text-green-900">{selectedEvent.nurse ? `${selectedEvent.nurse.lastName || ''} ${selectedEvent.nurse.firstName || ''}`.trim() || 'Không có' : 'Không có'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Mô tả sự kiện</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{selectedEvent.medicalEventDescription || 'Không có mô tả'}</p>
                  </div>

                  {/* Medicines Used */}
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 01-1.022-.547M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-purple-900">Thuốc đã sử dụng</h3>
                    </div>
                    {(selectedEvent.usedMedicines && selectedEvent.usedMedicines.length > 0) ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedEvent.usedMedicines.map((um, i) => (
                          <div key={i} className="bg-white rounded-lg p-4 border border-purple-200">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-xs font-bold">{i + 1}</span>
                              </div>
                              <h4 className="font-semibold text-purple-900">{um.medicine?.name || 'Không rõ'}</h4>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-purple-700">Loại:</span>
                                <span className="text-purple-900">{um.medicine?.type || 'Không rõ'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-700">Số lượng:</span>
                                <span className="text-purple-900 font-medium">{um.quantityUsed || 0} {um.medicine?.unit || ''}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <p className="text-gray-500">Không có thuốc nào được sử dụng</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal thêm sự kiện y tế */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 backdrop-blur-xs bg-white/10" onClick={handleCloseAddModal}></div>
              <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl z-10 animate-fade-in flex flex-col max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
                  onClick={handleCloseAddModal}
                  aria-label="Đóng"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold mb-6 text-green-700">Thêm sự kiện y tế mới</h2>
                <form onSubmit={handleSubmit}>
                  {/* Chọn học sinh */}
                  <div className="mb-4 relative student-dropdown">
                    <label className="block font-semibold mb-1">Học sinh</label>
                    <input 
                      type="text" 
                      className="w-full border rounded px-3 py-2" 
                      placeholder="Tìm kiếm học sinh..." 
                      value={studentSearchTerm}
                      onChange={(e) => {
                        setStudentSearchTerm(e.target.value);
                        setShowStudentDropdown(true);
                      }}
                      onFocus={() => setShowStudentDropdown(true)}
                    />
                    {selectedStudent && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm flex items-center justify-between">
                        <div>
                          <strong>Đã chọn:</strong> {selectedStudent.studentId} - {selectedStudent.lastName} {selectedStudent.firstName}<br/>
                          <span className="text-gray-600">Lớp: {selectedStudent.classes?.name || 'Không có'}</span>
                        </div>
                        <button type="button" className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200" onClick={handleRemoveStudent}>Bỏ chọn</button>
                      </div>
                    )}
                    {showStudentDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student) => (
                            <div
                              key={student.studentId}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                              onClick={() => handleStudentSelect(student)}
                            >
                              <div className="font-medium">{student.studentId} - {student.lastName} {student.firstName}</div>
                              <div className="text-sm text-gray-600">
                                Lớp: {student.classes?.name || 'Không có'}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">Không tìm thấy học sinh</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Tên sự kiện</label>
                    <input type="text" className="w-full border rounded px-3 py-2" value={addForm.medicalEventName} onChange={e => setAddForm(f => ({...f, medicalEventName: e.target.value}))} />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Mô tả</label>
                    <textarea className="w-full border rounded px-3 py-2" value={addForm.medicalEventDescription} onChange={e => setAddForm(f => ({...f, medicalEventDescription: e.target.value}))} />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Loại sự kiện</label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={addForm.type}
                      onChange={e => setAddForm(f => ({...f, type: e.target.value}))}
                      required
                    >
                      <option value="">Chọn loại sự kiện</option>
                      {eventTypes.map(ev => (
                        <option key={ev.key} value={ev.key}>{ev.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Thuốc đã sử dụng</label>
                    {addForm.medicineList.map((med, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="flex gap-2 mb-2 relative medicine-dropdown">
                          <div className="flex-1 relative">
                            <input 
                              type="text" 
                              className="w-full border rounded px-2 py-1" 
                              placeholder="Tìm kiếm thuốc..." 
                              value={med.medicineName || ''}
                              onChange={(e) => {
                                const newMedicineList = [...addForm.medicineList];
                                newMedicineList[idx] = { ...newMedicineList[idx], medicineName: e.target.value };
                                setAddForm(prev => ({ ...prev, medicineList: newMedicineList }));
                                setMedicineSearchTerm(e.target.value);
                                setShowMedicineDropdown(true);
                                setActiveMedicineIndex(idx);
                              }}
                              onFocus={() => {
                                setShowMedicineDropdown(true);
                                setActiveMedicineIndex(idx);
                              }}
                            />
                            {showMedicineDropdown && activeMedicineIndex === idx && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {filteredMedicines.length > 0 ? (
                                  filteredMedicines.map((medicine) => (
                                    <div
                                      key={medicine.medicineId}
                                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                                      onClick={() => handleMedicineSelect(medicine, idx)}
                                    >
                                      <div className="font-medium">{medicine.name}</div>
                                      <div className="text-sm text-gray-600">
                                        Loại: {medicine.type} | Đơn vị: {medicine.unit} | Tồn kho: {medicine.quantity}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="px-4 py-2 text-gray-500">Không tìm thấy thuốc</div>
                                )}
                              </div>
                            )}
                          </div>
                          <input 
                            type="number" 
                            className={`border rounded px-2 py-1 w-24 ${med.medicineData && med.quantityUsed && parseInt(med.quantityUsed) > med.medicineData.quantity ? 'border-red-500 bg-red-50' : ''}`}
                            placeholder="Số lượng" 
                            value={med.quantityUsed} 
                            min="1"
                            max={med.medicineData ? med.medicineData.quantity : undefined}
                            onChange={e => {
                              const val = e.target.value;
                              setAddForm(f => ({...f, medicineList: f.medicineList.map((m, i) => i === idx ? {...m, quantityUsed: val} : m)}));
                            }} 
                          />
                          <button 
                            type="button" 
                            className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                            onClick={() => handleRemoveMedicineChoice(idx)}
                          >Bỏ chọn</button>
                          {addForm.medicineList.length > 1 && (
                            <button 
                              type="button" 
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              onClick={() => handleRemoveMedicine(idx)}
                            >
                              ×
                            </button>
                          )}
                        </div>
                        {med.medicineName && (
                          <div className="ml-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                            <div><strong>Đã chọn:</strong> {med.medicineName}</div>
                            {med.medicineData && (
                              <div className="text-gray-600">Số lượng có sẵn: {med.medicineData.quantity} {med.medicineData.unit}</div>
                            )}
                            {med.quantityUsed && (
                              <div className="text-gray-600">Số lượng sử dụng: {med.quantityUsed}</div>
                            )}
                            {med.medicineData && med.quantityUsed && parseInt(med.quantityUsed) > med.medicineData.quantity && (
                              <div className="text-red-600 font-semibold mt-1">
                                ⚠️ Số lượng vượt quá tồn kho! (Tối đa: {med.medicineData.quantity})
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    <button type="button" className="text-blue-600 mt-1" onClick={handleAddMedicine}>+ Thêm thuốc</button>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400" onClick={handleCloseAddModal}>Hủy</button>
                    <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700">Lưu sự kiện</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventInSchoolForm;