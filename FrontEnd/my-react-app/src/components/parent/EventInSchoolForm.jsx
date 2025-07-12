import { useEffect, useState } from "react";
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
            <h1 className="text-3xl font-extrabold text-gray-900">Sự kiện y tế của học sinh</h1>
          </div>
          <div className="text-gray-500 text-base ml-12">Lịch sử các sự kiện y tế của con bạn tại trường</div>
        </div>

        {/* Search Section in card */}
        <div className="bg-white rounded-2xl shadow border p-6 mb-8 max-w-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên học sinh hoặc mã số sinh viên..."
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
              <li key={student.studentId} className="border rounded-lg p-4 shadow-sm flex flex-col gap-4">
                <div>
                  <div><b>Mã số sinh viên:</b> {student.studentId}</div>
                  <div><b>Họ tên:</b> {student.lastName} {student.firstName}</div>
                  <div><b>Giới tính:</b> {student.gender}</div>
                  <div><b>Ngày sinh:</b> {student.dateOfBirth}</div>
                  <div><b>Lớp:</b> {student.classes?.name || 'Không có'}</div>
                </div>
                <div>
                  <b>Sự kiện y tế:</b>
                  {(student.eventList && student.eventList.length > 0) ? (
                    <div className="overflow-x-auto mt-2">
                      <table className="min-w-full border text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 border">Tên sự kiện</th>
                            <th className="px-3 py-2 border">Mô tả</th>
                            <th className="px-3 py-2 border">Thời gian</th>
                            <th className="px-3 py-2 border">Loại</th>
                            <th className="px-3 py-2 border">Thuốc đã dùng</th>
                            <th className="px-3 py-2 border">Người ghi nhận</th>
                          </tr>
                        </thead>
                        <tbody>
                          {student.eventList.map((event, idx) => (
                            <tr key={event.medicalEventId || idx} className="hover:bg-gray-100">
                              <td className="px-3 py-2 border">{event.medicalEventName || 'Không có'}</td>
                              <td className="px-3 py-2 border">{event.medicalEventDescription || 'Không có'}</td>
                              <td className="px-3 py-2 border">{event.medicalEventTime || 'Không có'}</td>
                              <td className="px-3 py-2 border">{eventTypeLabels[event.type] || event.type || 'Không có'}</td>
                              <td className="px-3 py-2 border">
                                <ul className="list-disc pl-4">
                                  {(event.usedMedicines && event.usedMedicines.length > 0) ? event.usedMedicines.map((um, i) => (
                                    <li key={i}>
                                      {um.medicine?.name || 'Không rõ'} - {um.medicine?.type || ''} - {um.quantityUsed || 0} {um.medicine?.unit || ''}
                                    </li>
                                  )) : <li>Không có</li>}
                                </ul>
                              </td>
                              <td className="px-3 py-2 border">{event.nurse ? `${event.nurse.lastName || ''} ${event.nurse.firstName || ''}`.trim() || 'Không có' : 'Không có'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : <div className="text-gray-500 mt-2">Không có sự kiện y tế nào.</div>}
                </div>
              </li>
            ))}
            {filteredStudents.length === 0 && <li>Không có học sinh nào.</li>}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EventInSchoolForm;