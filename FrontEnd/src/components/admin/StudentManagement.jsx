"use client"

import { useState, useEffect } from "react"
import {
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../AdminLayout"
import { getAdminUserList, addAdminStudent, deleteAdminStudent, updateAdminStudent } from "../../api/axios"

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

// Confirm Modal component
function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Huỷ</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

function StudentManagement() {
  const [students, setStudents] = useState([])
  const [parents, setParents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [addForm, setAddForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    gender: "MALE",
    dateOfBirth: "",
    classID: "",
    parentID: ""
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    gender: "MALE",
    dateOfBirth: ""
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [_selectedStudent, setSelectedStudent] = useState(null);
  const [_form, _setForm] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    grade: "",
    parentEmail: "",
    parentPhone: "",
  })
  const [_loading, _setLoading] = useState(false)
  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'success' });
  // Confirm modal state
  const [confirm, setConfirm] = useState({ open: false, action: null, title: '', message: '' });

  // Toast auto close
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ ...toast, message: '' }), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getAdminUserList();
        const users = usersRes.result || usersRes;
        const parentUsers = users.filter(u => u.role === "PARENT");
        setParents(parentUsers);
        const allStudents = [];
        parentUsers.forEach(parent => {
          (parent.students || []).forEach(student => {
            allStudents.push({
              ...student,
              parentName: `${parent.firstName} ${parent.lastName}`,
              parentEmail: parent.email,
              parentPhone: parent.phone,
            });
          });
        });
        setStudents(allStudents);
      } catch {
        setStudents([]);
        console.error("Lỗi khi lấy dữ liệu!");
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter((student) => {
    const firstName = student.firstName || ""
    const lastName = student.lastName || ""
    const fullName = (firstName + " " + lastName).trim()
    const studentId = student.studentId || ""
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      firstName.toLowerCase().includes(search) ||
      lastName.toLowerCase().includes(search) ||
      fullName.toLowerCase().includes(search) ||
      studentId.toLowerCase().includes(search)

    const matchesGrade = !selectedGrade || (student.classes && student.classes.id === selectedGrade)
    return matchesSearch && matchesGrade
  })

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditForm({
      studentId: student.studentId,
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender || "MALE",
      dateOfBirth: student.dateOfBirth ? student.dateOfBirth.slice(0, 10) : ""
    });
    setEditError("");
    setShowEditModal(true);
  };

  // Xử lý submit thêm học sinh
  const handleAddStudent = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError("");
    try {
      await addAdminStudent(addForm);
      setShowAddModal(false);
      setAddForm({
        studentId: "",
        firstName: "",
        lastName: "",
        gender: "MALE",
        dateOfBirth: "",
        classID: "",
        parentID: ""
      });
      setToast({ message: 'Thêm học sinh thành công!', type: 'success' });
      // Reload danh sách
      const usersRes = await getAdminUserList();
      const users = usersRes.result || usersRes;
      const parentUsers = users.filter(u => u.role === "PARENT");
      setParents(parentUsers);
      const allStudents = [];
      parentUsers.forEach(parent => {
        (parent.students || []).forEach(student => {
          allStudents.push({
            ...student,
            parentName: `${parent.firstName} ${parent.lastName}`,
            parentEmail: parent.email,
            parentPhone: parent.phone,
          });
        });
      });
      setStudents(allStudents);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setAddError(err.response.data.message);
        setToast({ message: err.response.data.message, type: 'error' });
      } else {
        setAddError("Thêm học sinh thất bại!");
        setToast({ message: 'Thêm học sinh thất bại!', type: 'error' });
      }
    } finally {
      setAddLoading(false);
    }
  };

  // Xử lý xóa học sinh
  const handleDeleteStudent = (studentId) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await deleteAdminStudent(studentId);
          setToast({ message: 'Xóa học sinh thành công!', type: 'success' });
          // Reload danh sách
          const usersRes = await getAdminUserList();
          const users = usersRes.result || usersRes;
          const parentUsers = users.filter(u => u.role === "PARENT");
          setParents(parentUsers);
          const allStudents = [];
          parentUsers.forEach(parent => {
            (parent.students || []).forEach(student => {
              allStudents.push({
                ...student,
                parentName: `${parent.firstName} ${parent.lastName}`,
                parentEmail: parent.email,
                parentPhone: parent.phone,
              });
            });
          });
          setStudents(allStudents);
        } catch {
          setToast({ message: 'Xóa học sinh thất bại!', type: 'error' });
        }
      },
      title: 'Xác nhận xóa học sinh',
      message: 'Bạn có chắc chắn muốn xóa học sinh này?'
    });
  };

  // Xử lý submit sửa học sinh
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      await updateAdminStudent(editForm.studentId, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        gender: editForm.gender,
        dateOfBirth: editForm.dateOfBirth
      });
      setShowEditModal(false);
      setSelectedStudent(null);
      setToast({ message: 'Cập nhật học sinh thành công!', type: 'success' });
      // Reload danh sách
      const usersRes = await getAdminUserList();
      const users = usersRes.result || usersRes;
      const parentUsers = users.filter(u => u.role === "PARENT");
      setParents(parentUsers);
      const allStudents = [];
      parentUsers.forEach(parent => {
        (parent.students || []).forEach(student => {
          allStudents.push({
            ...student,
            parentName: `${parent.firstName} ${parent.lastName}`,
            parentEmail: parent.email,
            parentPhone: parent.phone,
          });
        });
      });
      setStudents(allStudents);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setEditError(err.response.data.message);
        setToast({ message: err.response.data.message, type: 'error' });
      } else {
        setEditError("Sửa học sinh thất bại!");
        setToast({ message: 'Sửa học sinh thất bại!', type: 'error' });
      }
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, message: '' })} />
      {/* Confirm modal */}
      <ConfirmModal
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        onConfirm={async () => {
          if (confirm.action) await confirm.action();
        }}
        onCancel={() => setConfirm({ ...confirm, open: false })}
      />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <UserGroupIcon className="w-8 h-8 text-blue-600" />
                  Quản lý học sinh
                </h1>
                <p className="text-gray-600 mt-1">Quản lý thông tin và hồ sơ của tất cả học sinh</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Thêm học sinh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc mã học sinh..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="">Tất cả khối lớp</option>
                <option value="10">Lớp 10</option>
                <option value="11">Lớp 11</option>
                <option value="12">Lớp 12</option>
              </select>
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {filteredStudents.length} học sinh
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học sinh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã học sinh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khối lớp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phụ huynh
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {(student.firstName || "") + " " + (student.lastName || "")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.studentId || "Chưa có mã"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                             {student.classes?.name || "Chưa xác định"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.parentName || "Chưa có thông tin"}</div>
                          <div className="text-sm text-gray-500">{student.parentPhone || "Chưa có số điện thoại"}</div>
                          <div className="text-sm text-gray-500">{student.parentEmail || "Chưa có email"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(student)}
                              className="text-indigo-600 hover:text-indigo-900 p-1"
                              title="Chỉnh sửa"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.studentId)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Xóa"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <UserGroupIcon className="w-12 h-12 text-gray-300 mb-4" />
                          <p className="text-lg font-medium">Chưa có học sinh nào</p>
                          <p className="text-sm">Bắt đầu bằng cách thêm học sinh mới</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal thêm học sinh */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white border border-blue-200 shadow-xl rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Thêm học sinh mới</h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
              {addError && <div className="text-red-600 text-sm">{addError}</div>}
              <div>
                <label className="block text-sm font-medium mb-1">Mã học sinh</label>
                <input type="text" className="w-full border rounded px-3 py-2" required
                  value={addForm.studentId}
                  onChange={e => setAddForm(f => ({ ...f, studentId: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Họ</label>
                  <input type="text" className="w-full border rounded px-3 py-2" required
                    value={addForm.lastName}
                    onChange={e => setAddForm(f => ({ ...f, lastName: e.target.value }))}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Tên</label>
                  <input type="text" className="w-full border rounded px-3 py-2" required
                    value={addForm.firstName}
                    onChange={e => setAddForm(f => ({ ...f, firstName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Giới tính</label>
                  <select className="w-full border rounded px-3 py-2" required
                    value={addForm.gender}
                    onChange={e => setAddForm(f => ({ ...f, gender: e.target.value }))}
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                  <input type="date" className="w-full border rounded px-3 py-2" required
                    value={addForm.dateOfBirth}
                    onChange={e => setAddForm(f => ({ ...f, dateOfBirth: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Khối/lớp</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    required
                    value={addForm.classID}
                    onChange={e => setAddForm(f => ({ ...f, classID: e.target.value }))}
                  >
                    <option value="">Chọn lớp...</option>
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Phụ huynh</label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    required
                    value={addForm.parentID}
                    onChange={e => setAddForm(f => ({ ...f, parentID: e.target.value }))}
                  >
                    <option value="">Chọn phụ huynh...</option>
                    {parents.map(parent => (
                      <option key={parent.id} value={parent.id}>
                        {parent.firstName} {parent.lastName} ({parent.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowAddModal(false)} disabled={addLoading}>
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={addLoading}>
                  {addLoading ? "Đang thêm..." : "Thêm học sinh"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal sửa học sinh */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white border border-blue-200 shadow-xl rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Sửa thông tin học sinh</h2>
            <form onSubmit={handleUpdateStudent} className="space-y-4">
              {editError && <div className="text-red-600 text-sm">{editError}</div>}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Họ</label>
                  <input type="text" className="w-full border rounded px-3 py-2" required
                    value={editForm.lastName}
                    onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Tên</label>
                  <input type="text" className="w-full border rounded px-3 py-2" required
                    value={editForm.firstName}
                    onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Giới tính</label>
                  <select className="w-full border rounded px-3 py-2" required
                    value={editForm.gender}
                    onChange={e => setEditForm(f => ({ ...f, gender: e.target.value }))}
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                  <input type="date" className="w-full border rounded px-3 py-2" required
                    value={editForm.dateOfBirth}
                    onChange={e => setEditForm(f => ({ ...f, dateOfBirth: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowEditModal(false)} disabled={editLoading}>
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={editLoading}>
                  {editLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default StudentManagement