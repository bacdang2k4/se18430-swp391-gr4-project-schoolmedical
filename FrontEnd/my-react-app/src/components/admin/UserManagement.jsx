"use client"

import { useState, useEffect } from "react"
import {
  UsersIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"
import { signupUser, deleteUser, getUserById, getAdminUserList } from "../../api/axios"

const roleLabels = {
  ADMIN: "Quản trị viên",
  NURSE: "Nhân viên y tế",
  PARENT: "Phụ huynh",
}

const roleColors = {
  ADMIN: "bg-red-100 text-red-800",
  NURSE: "bg-blue-100 text-blue-800",
  PARENT: "bg-green-100 text-green-800",
  STUDENT: "bg-yellow-100 text-yellow-800",
  MANAGER: "bg-purple-100 text-purple-800",
}

function UserManagement() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [_showEditModal, setShowEditModal] = useState(false)
  const [_selectedUser, setSelectedUser] = useState(null)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: "PARENT",
  });
  const [loading, setLoading] = useState(false);
  const [addUserError, setAddUserError] = useState("");
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getAdminUserList();
      setUsers(res.result || res);
    } catch {
      console.error("Lỗi khi lấy danh sách user:");
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const fullName = (firstName + " " + lastName).trim();
    const email = user.email || "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      firstName.toLowerCase().includes(search) ||
      lastName.toLowerCase().includes(search) ||
      fullName.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search);

    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" && user.enabled) ||
      (selectedStatus === "inactive" && !user.enabled);

    return matchesSearch && matchesRole && matchesStatus;
  })

  const _handleEdit = (user) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch {
        alert("Xóa người dùng thất bại!");
      }
    }
  }

  const _handleToggleStatus = (userId) => {
    console.log("Toggle status for user:", userId)
  }

  const handleViewUserDetail = async (userId) => {
    try {
      const user = await getUserById(userId);
      setUserDetail(user);
      setShowUserDetailModal(true);
    } catch {
      alert("Không thể lấy thông tin người dùng!");
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <UsersIcon className="w-8 h-8 text-blue-600" />
                  Quản lý người dùng
                </h1>
                <p className="text-gray-600 mt-1">Quản lý thông tin và quyền truy cập của tất cả người dùng</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Thêm người dùng
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
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Tất cả vai trò</option>
                {Object.entries(roleLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Kích hoạt</option>
                <option value="inactive">Chưa kích hoạt</option>
              </select>
              <div className="flex items-center text-sm text-gray-600">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Tìm thấy {filteredUsers.length} người dùng
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{(user.firstName || "") + " " + (user.lastName || "")}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}`}
                        >
                          {roleLabels[user.role]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.enabled ? "Kích hoạt" : "Chưa kích hoạt"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.createdAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewUserDetail(user.id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Xóa"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Hiển thị 1-{filteredUsers.length} của {users.length} người dùng
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Trước</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Sau</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white border border-blue-200 shadow-xl rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Thêm người dùng mới</h3>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setAddUserError("");
              // Kiểm tra mật khẩu hợp lệ
              const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password);
              if (!passwordValid) {
                setAddUserError("Mật khẩu phải có ít nhất 8 ký tự và chứa cả chữ cái lẫn số!");
                setLoading(false);
                return;
              }
              try {
                await signupUser(form);
                setShowAddModal(false);
                setForm({ firstName: "", lastName: "", phone: "", email: "", password: "", role: "PARENT" });
                fetchUsers();
              } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                  setAddUserError(err.response.data.message);
                } else {
                  setAddUserError("Thêm người dùng thất bại!");
                }
              } finally {
                setLoading(false);
              }
            }}>
              {addUserError && (
                <div className="text-red-600 text-sm mb-2">{addUserError}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  required
                >
                  {Object.entries(roleLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Đang thêm..." : "Thêm người dùng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserDetailModal && userDetail && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white border border-blue-200 shadow-xl rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Chi tiết người dùng</h3>
            <div className="space-y-3">
              <div><span className="font-medium">Họ:</span> {userDetail.lastName}</div>
              <div><span className="font-medium">Tên:</span> {userDetail.firstName}</div>
              <div><span className="font-medium">Email:</span> {userDetail.email}</div>
              <div><span className="font-medium">Số điện thoại:</span> {userDetail.phone}</div>
              <div><span className="font-medium">Vai trò:</span> {roleLabels[userDetail.role] || userDetail.role}</div>
              <div><span className="font-medium">Trạng thái:</span> {userDetail.enabled ? "Kích hoạt" : "Chưa kích hoạt"}</div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowUserDetailModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default UserManagement

