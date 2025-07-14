"use client"

import { useState, useEffect } from "react"
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
import { getBlogList, getBlogDetail, acceptAdminBlog, rejectAdminBlog } from "../../api/axios"

const categories = ["Tài liệu", "Blog", "Hình ảnh", "Video", "Thông báo"]

function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [blogList, setBlogList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailBlog, setDetailBlog] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const res = await getBlogList()
        setBlogList(res.result || [])
      } catch {
        setBlogList([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  // Lọc blog theo search và trạng thái
  const filteredBlogs = blogList.filter((blog) => {
    const matchesSearch = (blog.title?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || blog.status === selectedStatus
    return matchesSearch && matchesStatus
  })

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
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng nội dung</p>
                  <p className="text-2xl font-bold text-gray-900">{blogList.length}</p>
                </div>
                <DocumentTextIcon className="w-8 h-8 text-teal-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã xuất bản</p>
                  <p className="text-2xl font-bold text-green-600">
                    {blogList.filter((c) => c.status === "accepted").length}
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
                    {blogList.filter((c) => c.status === "waiting").length}
                  </p>
                </div>
                <CloudArrowUpIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Không duyệt</p>
                  <p className="text-2xl font-bold text-red-600">{blogList.filter((c) => c.status === "rejected").length}</p>
                </div>
                <TrashIcon className="w-8 h-8 text-red-500" />
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
                  placeholder="Tìm kiếm blog..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="accepted">Đã duyệt</option>
                <option value="waiting">Chờ duyệt</option>
                <option value="rejected">Không duyệt</option>
              </select>
              <div className="flex items-center text-sm text-gray-600">Tìm thấy {filteredBlogs.length} blog</div>
            </div>
          </div>

          {/* Blog Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-8 text-gray-500">Đang tải...</td></tr>
                  ) : filteredBlogs.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-8 text-gray-500">Không có blog</td></tr>
                  ) : (
                    filteredBlogs.map((blog) => (
                      <tr key={blog.post_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate whitespace-nowrap overflow-hidden" title={blog.title}>{blog.title}</td>
                        <td className="px-6 py-4 max-w-[120px] truncate whitespace-nowrap overflow-hidden" title={blog.author ? `${blog.author.lastName || ''} ${blog.author.firstName || ''}`.trim() : ''}>{blog.author ? `${blog.author.lastName || ''} ${blog.author.firstName || ''}`.trim() : ''}</td>
                        <td className="px-6 py-4 max-w-[100px] truncate whitespace-nowrap overflow-hidden" title={
                          blog.status === 'accepted' ? 'Đã duyệt' : blog.status === 'waiting' ? 'Chờ duyệt' : blog.status === 'rejected' ? 'Không duyệt' : blog.status
                        }>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            blog.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            blog.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                            blog.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {blog.status === 'accepted' ? 'Đã duyệt' : blog.status === 'waiting' ? 'Chờ duyệt' : blog.status === 'rejected' ? 'Không duyệt' : blog.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-[140px] truncate whitespace-nowrap overflow-hidden" title={blog.createdAt ? new Date(blog.createdAt).toLocaleString() : ''}>{blog.createdAt ? new Date(blog.createdAt).toLocaleString() : ''}</td>
                        <td className="px-6 py-4 text-gray-700 max-w-[200px] truncate whitespace-nowrap overflow-hidden" title={blog.content}>{blog.content}</td>
                        <td className="px-6 py-4">
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                            onClick={async () => {
                              setLoadingDetail(true)
                              setShowDetailModal(true)
                              try {
                                const res = await getBlogDetail(blog.post_id)
                                setDetailBlog(res.result)
                              } catch {
                                setDetailBlog(null)
                              } finally {
                                setLoadingDetail(false)
                              }
                            }}
                          >
                            Xem chi tiết
                          </button>
                          {blog.status === 'waiting' && (
                            <div className="flex gap-2 mt-2">
                              <button
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs disabled:opacity-60"
                                disabled={actionLoadingId === blog.post_id}
                                onClick={async () => {
                                  setActionLoadingId(blog.post_id)
                                  try {
                                    await acceptAdminBlog(blog.post_id)
                                    // Reload danh sách blog
                                    const res = await getBlogList()
                                    setBlogList(res.result || [])
                                  } finally {
                                    setActionLoadingId(null)
                                  }
                                }}
                              >
                                {actionLoadingId === blog.post_id ? 'Đang duyệt...' : 'Duyệt'}
                              </button>
                              <button
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs disabled:opacity-60"
                                disabled={actionLoadingId === blog.post_id}
                                onClick={async () => {
                                  setActionLoadingId(blog.post_id)
                                  try {
                                    await rejectAdminBlog(blog.post_id)
                                    // Reload danh sách blog
                                    const res = await getBlogList()
                                    setBlogList(res.result || [])
                                  } finally {
                                    setActionLoadingId(null)
                                  }
                                }}
                              >
                                {actionLoadingId === blog.post_id ? 'Đang xử lý...' : 'Không duyệt'}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
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

      {/* Blog Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-8">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-10 text-gray-700 p-2 rounded-full hover:bg-opacity-20 transition-colors text-xl"
            >
              ×
            </button>
            {loadingDetail ? (
              <div className="text-center text-gray-500 py-12 text-lg">Đang tải...</div>
            ) : detailBlog ? (
              <>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{detailBlog.title}</h1>
                <div className="mb-4 text-sm text-gray-500">Cập nhật: {detailBlog.updatedAt ? new Date(detailBlog.updatedAt).toLocaleString() : ''}</div>
                <div className="prose max-w-none text-gray-700 text-lg whitespace-pre-line">
                  {detailBlog.content}
                </div>
              </>
            ) : (
              <div className="text-center text-red-500 py-12 text-lg">Không tìm thấy blog</div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ContentManagement
