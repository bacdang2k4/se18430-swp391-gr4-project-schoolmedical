"use client"

import { useState } from "react"
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

const medicineData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Thuốc giảm đau",
    quantity: 150,
    unit: "viên",
    expiryDate: "2025-12-31",
    supplier: "Công ty Dược A",
    location: "Tủ thuốc A - Ngăn 1",
    status: "available",
    minStock: 50,
    price: 500,
  },
  {
    id: 2,
    name: "Betadine 10ml",
    category: "Thuốc sát trùng",
    quantity: 25,
    unit: "chai",
    expiryDate: "2025-06-15",
    supplier: "Công ty Dược B",
    location: "Tủ thuốc B - Ngăn 2",
    status: "low_stock",
    minStock: 30,
    price: 15000,
  },
  {
    id: 3,
    name: "Băng gạc vô trùng",
    category: "Vật tư y tế",
    quantity: 200,
    unit: "cuộn",
    expiryDate: "2026-03-20",
    supplier: "Công ty Vật tư C",
    location: "Tủ vật tư - Ngăn 1",
    status: "available",
    minStock: 100,
    price: 8000,
  },
  {
    id: 4,
    name: "Aspirin 100mg",
    category: "Thuốc tim mạch",
    quantity: 5,
    unit: "viên",
    expiryDate: "2025-02-28",
    supplier: "Công ty Dược A",
    location: "Tủ thuốc A - Ngăn 3",
    status: "expired_soon",
    minStock: 20,
    price: 800,
  },
]

const categories = ["Thuốc giảm đau", "Thuốc sát trùng", "Vật tư y tế", "Thuốc tim mạch", "Thuốc dị ứng"]

const statusLabels = {
  available: "Còn hàng",
  low_stock: "Sắp hết",
  out_of_stock: "Hết hàng",
  expired_soon: "Sắp hết hạn",
  expired: "Hết hạn",
}

const statusColors = {
  available: "bg-green-100 text-green-800",
  low_stock: "bg-yellow-100 text-yellow-800",
  out_of_stock: "bg-red-100 text-red-800",
  expired_soon: "bg-orange-100 text-orange-800",
  expired: "bg-red-100 text-red-800",
}

function MedicineManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUsageModal, setShowUsageModal] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  const filteredMedicine = medicineData.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || medicine.category === selectedCategory
    const matchesStatus = !selectedStatus || medicine.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine)
  }

  const handleDelete = (medicineId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thuốc này?")) {
      console.log("Delete medicine:", medicineId)
    }
  }

  const handleUsage = (medicine) => {
    setSelectedMedicine(medicine)
    setShowUsageModal(true)
  }

  const isExpiringSoon = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
                  <p className="text-sm font-medium text-gray-600">Sắp hết hàng</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {medicineData.filter((m) => m.status === "low_stock").length}
                  </p>
                </div>
                <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sắp hết hạn</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {medicineData.filter((m) => isExpiringSoon(m.expiryDate)).length}
                  </p>
                </div>
                <ClockIcon className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Còn hàng</p>
                  <p className="text-2xl font-bold text-green-600">
                    {medicineData.filter((m) => m.status === "available").length}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
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
                      Hạn sử dụng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMedicine.map((medicine) => (
                    <tr key={medicine.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                          <div className="text-sm text-gray-500">{medicine.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {medicine.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {medicine.quantity} {medicine.unit}
                        </div>
                        <div className="text-xs text-gray-500">Tối thiểu: {medicine.minStock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{medicine.expiryDate}</div>
                        {isExpiringSoon(medicine.expiryDate) && (
                          <div className="text-xs text-orange-600">⚠️ Sắp hết hạn</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[medicine.status]}`}
                        >
                          {statusLabels[medicine.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUsage(medicine)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Ghi nhận sử dụng"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(medicine)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Chỉnh sửa"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Thêm thuốc/vật tư mới</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên thuốc/vật tư</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="Nhập tên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                    <option value="viên">Viên</option>
                    <option value="chai">Chai</option>
                    <option value="cuộn">Cuộn</option>
                    <option value="hộp">Hộp</option>
                    <option value="gói">Gói</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho tối thiểu</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hạn sử dụng</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nhà cung cấp</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Nhập tên nhà cung cấp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí lưu trữ</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Ví dụ: Tủ thuốc A - Ngăn 1"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                  Thêm thuốc/vật tư
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Usage Modal */}
      {showUsageModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Ghi nhận sử dụng</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Thuốc/vật tư: {selectedMedicine.name}</p>
              <p className="text-sm text-gray-600">
                Số lượng hiện tại: {selectedMedicine.quantity} {selectedMedicine.unit}
              </p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng sử dụng</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="0"
                  max={selectedMedicine.quantity}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Học sinh</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Tên học sinh"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mục đích sử dụng</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Mô tả mục đích sử dụng"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUsageModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                  Ghi nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default MedicineManagement
