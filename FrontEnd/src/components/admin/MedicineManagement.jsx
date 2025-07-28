"use client"

import { useState, useEffect } from "react"
import {
  BeakerIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"
import { getAdminMedicineList, createAdminMedicine, deleteAdminMedicine } from "../../api/axios"

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
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

function MedicineManagement() {
  const [medicineData, setMedicineData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  // Xóa state showUsageModal và selectedMedicine
  const [addForm, setAddForm] = useState({ name: "", type: "", quantity: "", unit: "" })
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState("")
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
      setLoading(true)
      setError(null)
      try {
        const res = await getAdminMedicineList()
        // API trả về { code, message, result: [...] }
        setMedicineData(res.result || [])
      } catch {
        setError("Không thể tải danh sách thuốc.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Tạo categories động từ dữ liệu API
  const categories = Array.from(new Set(medicineData.map(m => m.type))).filter(Boolean)

  const filteredMedicine = medicineData.filter((medicine) => {
    const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || medicine.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Xóa hàm handleEdit và handleUsage vì không còn dùng

  const handleDelete = (medicineId) => {
    setConfirm({
      open: true,
      action: async () => {
        setConfirm({ ...confirm, open: false });
        try {
          await deleteAdminMedicine(medicineId);
          setToast({ message: 'Xóa thuốc thành công!', type: 'success' });
          // Reload list
          setLoading(true);
          const res = await getAdminMedicineList();
          setMedicineData(res.result || []);
          setLoading(false);
        } catch {
          setToast({ message: 'Xóa thuốc thất bại!', type: 'error' });
        }
      },
      title: 'Xác nhận xóa thuốc',
      message: 'Bạn có chắc chắn muốn xóa thuốc này?'
    });
  }

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
                  <BeakerIcon className="w-8 h-8 text-cyan-600" />
                  Quản lý thuốc và vật tư y tế
                </h1>
                <p className="text-gray-600 mt-1">Quản lý kho thuốc và vật tư y tế</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Thêm thuốc/vật tư
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng mặt hàng</p>
                  <p className="text-2xl font-bold text-gray-900">{medicineData.length}</p>
                </div>
                <BeakerIcon className="w-8 h-8 text-cyan-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Thuốc</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {medicineData.filter((m) => m.type === "Thuốc").length}
                  </p>
                </div>
                <BeakerIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vật tư</p>
                  <p className="text-2xl font-bold text-green-600">
                    {medicineData.filter((m) => m.type === "Vật tư").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thuốc/vật tư..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="flex items-center text-sm text-gray-600">Tìm thấy {filteredMedicine.length} mặt hàng</div>
            </div>
          </div>

          {/* Medicine Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên thuốc/vật tư
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đơn vị
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading && (
                    <tr>
                      <td colSpan="5" className="text-center py-8">Đang tải dữ liệu...</td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td colSpan="5" className="text-center text-red-500 py-8">{error}</td>
                    </tr>
                  )}
                  {filteredMedicine.length === 0 && !loading && !error && (
                    <tr>
                      <td colSpan="5" className="text-center py-8">Không có thuốc/vật tư nào</td>
                    </tr>
                  )}
                  {filteredMedicine.map((medicine) => (
                    <tr key={medicine.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {medicine.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {medicine.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{medicine.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleDelete(medicine.id)}
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
        </div>
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-cyan-200 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Thêm thuốc/vật tư mới</h3>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              setAddLoading(true);
              setAddError("");
              if (!addForm.name || !addForm.type || !addForm.quantity || !addForm.unit) {
                setAddError("Vui lòng nhập đầy đủ thông tin!");
                setToast({ message: 'Vui lòng nhập đầy đủ thông tin!', type: 'error' });
                setAddLoading(false);
                return;
              }
              if (isNaN(Number(addForm.quantity)) || Number(addForm.quantity) < 0) {
                setAddError("Số lượng phải là số không âm!");
                setToast({ message: 'Số lượng phải là số không âm!', type: 'error' });
                setAddLoading(false);
                return;
              }
              try {
                await createAdminMedicine({
                  name: addForm.name,
                  type: addForm.type,
                  quantity: Number(addForm.quantity),
                  unit: addForm.unit
                });
                setShowAddModal(false);
                setAddForm({ name: "", type: "", quantity: "", unit: "" });
                setAddError("");
                setAddLoading(false);
                setToast({ message: 'Thêm thuốc thành công!', type: 'success' });
                // Reload list
                setLoading(true);
                const res = await getAdminMedicineList();
                setMedicineData(res.result || []);
                setLoading(false);
              } catch {
                setAddError("Thêm thuốc thất bại!");
                setToast({ message: 'Thêm thuốc thất bại!', type: 'error' });
                setAddLoading(false);
              }
            }}>
              {addError && <div className="text-red-600 text-sm mb-2">{addError}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên thuốc/vật tư</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="Nhập tên"
                    value={addForm.name}
                    onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    value={addForm.type}
                    onChange={e => setAddForm({ ...addForm, type: e.target.value })}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Thuốc">Thuốc</option>
                    <option value="Vật tư">Vật tư</option>
                    {categories
                      .filter(category => category !== "Thuốc" && category !== "Vật tư")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="0"
                    value={addForm.quantity}
                    onChange={e => setAddForm({ ...addForm, quantity: e.target.value })}
                    min={0}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="Nhập đơn vị"
                    value={addForm.unit}
                    onChange={e => setAddForm({ ...addForm, unit: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={addLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                  disabled={addLoading}
                >
                  {addLoading ? "Đang thêm..." : "Thêm thuốc/vật tư"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Usage Modal */}
      {/* Xóa state showUsageModal và selectedMedicine */}
      {/* Xóa state showUsageModal và selectedMedicine */}
    </AdminLayout>
  )
}

export default MedicineManagement
