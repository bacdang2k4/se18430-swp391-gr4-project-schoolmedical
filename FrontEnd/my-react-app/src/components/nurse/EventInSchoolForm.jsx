import React, { useEffect, useState } from "react";
import { getNurseStudentList, getNurseMedicineList, createNurseMedicalEvent } from "../../api/axios";

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

  // Debug: Log medicines and filtered medicines
  console.log("All medicines:", medicines);
  console.log("Filtered medicines:", filteredMedicines);
  console.log("Medicine search term:", medicineSearchTerm);
  console.log("Show medicine dropdown:", showMedicineDropdown);
  console.log("Active medicine index:", activeMedicineIndex);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate medicine quantities
    const quantityErrors = validateMedicineQuantities();
    if (quantityErrors.length > 0) {
      alert('Lỗi số lượng thuốc:\n' + quantityErrors.join('\n'));
      return;
    }
    if (!addForm.studentId) {
      alert('Vui lòng chọn học sinh!');
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
      alert('Tạo sự kiện thành công!');
      handleCloseAddModal();
      fetchEvents(); // Load lại danh sách sự kiện
    } catch (err) {
      console.error('Lỗi khi tạo sự kiện:', err);
      alert('Có lỗi khi tạo sự kiện!');
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
    { key: 'accident', label: 'Tai nạn' },
    { key: 'illness', label: 'Ốm đau' },
    { key: 'allergy', label: 'Dị ứng' },
    { key: 'emergency', label: 'Khẩn cấp' },
    { key: 'other', label: 'Khác' },
  ];

  // Thêm map type -> label
  const eventTypeLabels = {
    accident: 'Tai nạn',
    illness: 'Ốm đau',
    allergy: 'Dị ứng',
    emergency: 'Khẩn cấp',
    other: 'Khác',
  };

    return (
    <div className="p-6">
      {/* Header section with icon, title, subtitle */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          {/* Icon thuốc */}
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-orange-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <rect x="3" y="8" width="18" height="8" rx="4" fill="#fff" stroke="none"/>
              <rect x="3" y="8" width="18" height="8" rx="4"/>
              <path d="M7 8v8" />
            </svg>
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900">Danh sách sự kiện y tế</h1>
        </div>
        <div className="text-gray-500 text-base ml-12">Lịch sử sự kiện y tế của học sinh</div>
      </div>

      {/* Search Section in card */}
      <div className="bg-white rounded-2xl shadow border p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              id="search"
              placeholder="Tìm kiếm theo tên học sinh, mã học sinh, lớp, tên sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base pr-10 bg-gray-50"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-gray-500 text-base min-w-max">
              Tìm thấy {filteredEvents.length} sự kiện
            </div>
            <button
              className="px-4 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition flex items-center gap-2"
              onClick={() => setShowAddModal(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sự kiện y tế
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <ul className="space-y-4 mt-6">
          {[1, 2, 3].map((i) => (
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
          {filteredEvents.length === 0 ? (
            <li className="border rounded-lg p-8 shadow-sm text-center text-gray-500">
              {searchTerm ? `Không tìm thấy sự kiện nào phù hợp với "${searchTerm}"` : 'Không có sự kiện y tế nào.'}
            </li>
          ) : filteredEvents.map((event, idx) => (
            <li key={event.medicalEventId || idx} className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div><b>Mã học sinh:</b> {event.studentId}</div>
                  <div><b>Họ tên:</b> {event.fullName}</div>
                  <div><b>Lớp:</b> {event.className}</div>
                  <div><b>Giới tính:</b> {event.gender}</div>
                  <div><b>Ngày sinh:</b> {event.dateOfBirth}</div>
                  <div><b>Tên sự kiện:</b> {event.medicalEventName || 'Không có'}</div>
                </div>
                <div className="mt-2">
                  <b>Mô tả:</b> {event.medicalEventDescription || 'Không có'}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  <b>Thời gian:</b> {event.medicalEventTime || 'Không có'} | 
                  <b> Loại:</b> {event.type || 'Không có'}
                </div>
              </div>
              <div className="flex gap-2 md:flex-col md:gap-2">
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                  onClick={() => handleView(event)}
                >
                  Xem chi tiết
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal hiển thị chi tiết sự kiện */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Nền mờ */}
          <div className="absolute inset-0 backdrop-blur-xs bg-white/10" onClick={handleCloseModal}></div>
          {/* Nội dung modal */}
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl z-10 animate-fade-in flex flex-col max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={handleCloseModal}
              aria-label="Đóng"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Chi tiết sự kiện y tế</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin học sinh */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin học sinh</h3>
                <div className="space-y-2">
                  <div><b>Mã học sinh:</b> {selectedEvent.studentId}</div>
                  <div><b>Họ tên:</b> {selectedEvent.fullName}</div>
                  <div><b>Lớp:</b> {selectedEvent.className}</div>
                  <div><b>Giới tính:</b> {selectedEvent.gender}</div>
                  <div><b>Ngày sinh:</b> {selectedEvent.dateOfBirth}</div>
                </div>
              </div>

              {/* Thông tin sự kiện */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin sự kiện</h3>
                <div className="space-y-2">
                  <div><b>Tên sự kiện:</b> {selectedEvent.medicalEventName || 'Không có'}</div>
                  <div><b>Loại:</b> {eventTypeLabels[selectedEvent.type] || selectedEvent.type || 'Không có'}</div>
                  <div><b>Thời gian:</b> {selectedEvent.medicalEventTime || 'Không có'}</div>
                  <div><b>Người ghi nhận:</b> {selectedEvent.nurse ? `${selectedEvent.nurse.lastName || ''} ${selectedEvent.nurse.firstName || ''}`.trim() || 'Không có' : 'Không có'}</div>
                </div>
              </div>
            </div>

            {/* Mô tả */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Mô tả sự kiện</h3>
              <p className="text-gray-700">{selectedEvent.medicalEventDescription || 'Không có mô tả'}</p>
            </div>

            {/* Thuốc đã dùng */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Thuốc đã sử dụng</h3>
              {(selectedEvent.usedMedicines && selectedEvent.usedMedicines.length > 0) ? (
                <div className="space-y-2">
                  {selectedEvent.usedMedicines.map((um, i) => (
                    <div key={i} className="bg-white p-3 rounded border">
                      <div><b>Tên thuốc:</b> {um.medicine?.name || 'Không rõ'}</div>
                      <div><b>Loại:</b> {um.medicine?.type || 'Không rõ'}</div>
                      <div><b>Số lượng:</b> {um.quantityUsed || 0} {um.medicine?.unit || ''}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Không có thuốc nào được sử dụng</p>
              )}
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
                          <div className="text-sm text-gray-600">Lớp: {student.classes?.name || 'Không có'}</div>
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
              {/* REMOVE THESE LINES (since setAddLoading and setAddError are not used yet) */}
              {/* {addError && <div className="text-red-500 mb-2">{addError}</div>} */}
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400" onClick={handleCloseAddModal}>Hủy</button>
                <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700">Lưu sự kiện</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventInSchoolForm;