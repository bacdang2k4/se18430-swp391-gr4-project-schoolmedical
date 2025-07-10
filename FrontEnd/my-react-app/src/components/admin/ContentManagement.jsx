"use client"

import { useState } from "react"
import {
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CloudArrowUpIcon,
  PhotoIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"

const contentData = [
  {
    id: 1,
    title: "Hướng dẫn chăm sóc sức khỏe học đường",
    type: "document",
    category: "Tài liệu",
    author: "BS. Nguyễn Văn A",
    status: "published",
    createdAt: "2025-01-05",
    views: 245,
    fileSize: "2.5 MB",
  },
  {
    id: 2,
    title: "Phòng chống dịch bệnh trong trường học",
    type: "blog",
    category: "Blog",
    author: "Y tá Trần Thị B",
    status: "draft",
    createdAt: "2025-01-06",
    views: 0,
    fileSize: null,
  },
  {
    id: 3,
    title: "Poster tuyên truyền dinh dưỡng",
    type: "image",
    category: "Hình ảnh",
    author: "Admin",
    status: "published",
    createdAt: "2025-01-04",
    views: 156,
    fileSize: "1.8 MB",
  },
  {
    id: 4,
    title: "Video hướng dẫn sơ cứu cơ bản",
    type: "video",
    category: "Video",
    author: "BS. Lê Văn C",
    status: "pending",
    createdAt: "2025-01-03",
    views: 89,
    fileSize: "45.2 MB",
  },
]

const categories = ["Tài liệu", "Blog", "Hình ảnh", "Video", "Thông báo"]
const statuses = ["published", "draft", "pending", "archived"]

const statusLabels = {
  published: "Đã xuất bản",
  draft: "Bản nháp",
  pending: "Chờ duyệt",
  archived: "Lưu trữ",
}

const statusColors = {
  published: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  archived: "bg-red-100 text-red-800",
}

const typeIcons = {
  document: DocumentIcon,
  blog: DocumentTextIcon,
  image: PhotoIcon,
  video: PhotoIcon,
}

function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredContent = contentData.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || content.category === selectedCategory
    const matchesStatus = !selectedStatus || content.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEdit = (content) => {
    console.log("Edit content:", content)
  }

  const handleDelete = (contentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nội dung này?")) {
      console.log("Delete content:", contentId)
    }
  }

  const handlePublish = (contentId) => {
    console.log("Publish content:", contentId)
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
                  <DocumentTextIcon className="w-8 h-8 text-teal-600" />
                  Quản lý nội dung
                </h1>
                <p className="text-gray-600 mt-1">Quản lý tài liệu, blog và nội dung trang chủ</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Thêm nội dung
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng nội dung</p>
                  <p className="text-2xl font-bold text-gray-900">{contentData.length}</p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-teal-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã xuất bản</p>
                  <p className="text-2xl font-bold text-green-600">
                    {contentData.filter((c) => c.status === "published").length}
                  </p>
                </div>
                <EyeIcon className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {contentData.filter((c) => c.status === "pending").length}
                  </p>
                </div>
                <CloudArrowUpIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng lượt xem</p>
                  <p className="text-2xl font-bold text-blue-600">{contentData.reduce((sum, c) => sum + c.views, 0)}</p>
                </div>
                <EyeIcon className="w-8 h-8 text-blue-500" />
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
                  placeholder="Tìm kiếm nội dung..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
              <div className="flex items-center text-sm text-gray-600">Tìm thấy {filteredContent.length} nội dung</div>
            </div>
          </div>

          {/* Content Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nội dung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tác giả
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lượt xem
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContent.map((content) => {
                    const IconComponent = typeIcons[content.type]
                    return (
                      <tr key={content.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <IconComponent className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{content.title}</div>
                              <div className="text-sm text-gray-500">
                                {content.fileSize && `${content.fileSize} • `}
                                {content.createdAt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {content.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{content.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[content.status]}`}
                          >
                            {statusLabels[content.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{content.views}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(content)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Chỉnh sửa"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            {content.status === "pending" && (
                              <button
                                onClick={() => handlePublish(content.id)}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Xuất bản"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(content.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Xóa"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Content Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Thêm nội dung mới</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập tiêu đề"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại nội dung</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                    <option value="document">Tài liệu</option>
                    <option value="blog">Blog</option>
                    <option value="image">Hình ảnh</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập mô tả nội dung"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tải lên file</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Kéo thả file hoặc click để chọn</p>
                  <input type="file" className="hidden" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                  Thêm nội dung
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ContentManagement
