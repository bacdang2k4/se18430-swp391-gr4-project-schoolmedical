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
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import AdminLayout from "../../components/AdminLayout"
import { getBlogList, getBlogDetail, acceptAdminBlog, rejectAdminBlog } from "../../api/axios"

const categories = ["Tài liệu", "Blog", "Hình ảnh", "Video", "Thông báo"]

// Hàm format ngày giờ
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'Không có';
  
  try {
    const date = new Date(dateTimeString);
    
    // Kiểm tra xem date có hợp lệ không
    if (isNaN(date.getTime())) {
      return 'Ngày không hợp lệ';
    }
    
    // Format: "16/07/2025 08:03"
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return 'Ngày không hợp lệ';
  }
};

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
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [blogList, setBlogList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailBlog, setDetailBlog] = useState(null)
  const [actionLoadingId, setActionLoadingId] = useState(null)
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
                    
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading && (
                    <tr>
                      <td colSpan="6" className="text-center py-8">Đang tải dữ liệu...</td>
                    </tr>
                  )}
                  {filteredBlogs.length === 0 && !loading && (
                    <tr>
                      <td colSpan="6" className="text-center py-8">Không có blog nào</td>
                    </tr>
                  )}
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.post_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{blog.author ? `${blog.author.lastName || ''} ${blog.author.firstName || ''}`.trim() : 'Không có'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          blog.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          blog.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                          blog.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {blog.status === 'accepted' ? 'Đã duyệt' : blog.status === 'waiting' ? 'Chờ duyệt' : blog.status === 'rejected' ? 'Không duyệt' : blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDateTime(blog.createdAt)}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={async () => {
                              setShowDetailModal(true)
                              try {
                                const res = await getBlogDetail(blog.post_id)
                                setDetailBlog(res.result)
                              } catch {
                                setDetailBlog(null)
                              } finally {
                                // setLoadingDetail(false) // Removed as per edit hint
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Xem chi tiết"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          {blog.status === 'waiting' && (
                            <>
                              <button
                                onClick={() => {
                                  setConfirm({
                                    open: true,
                                    action: async () => {
                                      setConfirm({ ...confirm, open: false });
                                      setActionLoadingId(blog.post_id);
                                      try {
                                        await acceptAdminBlog(blog.post_id);
                                        setToast({ message: 'Duyệt blog thành công!', type: 'success' });
                                        // Reload danh sách blog
                                        const res = await getBlogList();
                                        setBlogList(res.result || []);
                                      } catch {
                                        setToast({ message: 'Duyệt blog thất bại!', type: 'error' });
                                      } finally {
                                        setActionLoadingId(null);
                                      }
                                    },
                                    title: 'Xác nhận duyệt blog',
                                    message: 'Bạn có chắc chắn muốn duyệt blog này?'
                                  });
                                }}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Duyệt blog"
                                disabled={actionLoadingId === blog.post_id}
                              >
                                <CheckCircleIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setConfirm({
                                    open: true,
                                    action: async () => {
                                      setConfirm({ ...confirm, open: false });
                                      setActionLoadingId(blog.post_id);
                                      try {
                                        await rejectAdminBlog(blog.post_id);
                                        setToast({ message: 'Đã chuyển blog sang trạng thái không duyệt!', type: 'success' });
                                        // Reload danh sách blog
                                        const res = await getBlogList();
                                        setBlogList(res.result || []);
                                      } catch {
                                        setToast({ message: 'Không duyệt blog thất bại!', type: 'error' });
                                      } finally {
                                        setActionLoadingId(null);
                                      }
                                    },
                                    title: 'Xác nhận không duyệt blog',
                                    message: 'Bạn có chắc chắn muốn chuyển blog này sang trạng thái không duyệt?'
                                  });
                                }}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Không duyệt blog"
                                disabled={actionLoadingId === blog.post_id}
                              >
                                <XCircleIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
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

      {/* Blog Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Chi tiết blog</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <p className="text-sm text-gray-900">{detailBlog?.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                <p className="text-sm text-gray-900 whitespace-pre-line">{detailBlog?.content}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
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

export default ContentManagement
