"use client"

import { useState, useEffect } from "react"
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/outline"
import { createNurseBlog, getBlogList, getProfile, updateNurseBlog, deleteNurseBlog } from "../api/axios";

// Hàm lấy role từ localStorage (giả sử lưu ở localStorage, có thể thay đổi nếu dùng context/auth khác)
function getTokenRole() {
  return (localStorage.getItem('role') || '').toUpperCase();
}

function BlogForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPost, setSelectedPost] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newBlog, setNewBlog] = useState({ title: "", content: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [myProfile, setMyProfile] = useState(null)
  const [activeTab, setActiveTab] = useState("all") // "all" or "my"
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [editForm, setEditForm] = useState({ title: "", content: "" })
  const [isEditing, setIsEditing] = useState(false)
  const [editMessage, setEditMessage] = useState("")

  useEffect(() => {
    fetchBlogs();
  }, [])

  // Reusable fetchBlogs function
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Fetch blog posts
      const blogRes = await getBlogList();
      setBlogPosts(blogRes.result || []);

      // Fetch nurse profile if they are a nurse
      if (getTokenRole() === 'NURSE') {
        try {
          const profileRes = await getProfile();
          setMyProfile(profileRes.result);
        } catch (profileError) {
          console.error("Error fetching profile:", profileError);
        }
      }
    } catch {
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on active tab and search
  const filteredPosts = blogPosts
    .filter(post => {
      if (activeTab === "my" && myProfile) {
        // Show all posts authored by the current nurse, regardless of status
        return post.author?.id === myProfile.id || post.author?.email === myProfile.email;
      }
      // For 'all' tab, only show accepted posts
      return post.status === 'accepted';
    })
    .filter((post) => {
      const matchesSearch =
        (post.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (post.content?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      return matchesSearch
    })

  // Handle edit button click
  const handleEditClick = (e, post) => {
    e.stopPropagation(); // Prevent opening the detail modal
    setEditingPost(post);
    setEditForm({
      title: post.title || "",
      content: post.content || ""
    });
    setShowEditModal(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    setEditMessage("");
    
    try {
      await updateNurseBlog(editingPost.post_id || editingPost.id, {
        title: editForm.title,
        content: editForm.content,
      });
      
      setEditMessage("Cập nhật bài viết thành công!");
      
      // Reload the blog list from backend
      await fetchBlogs();
      setTimeout(() => {
        setShowEditModal(false);
        setEditingPost(null);
        setEditForm({ title: "", content: "" });
        setEditMessage("");
      }, 1200);
    } catch {
      setEditMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsEditing(false);
    }
  };

  // Handle add blog success - refresh the list
  const handleAddSuccess = () => {
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white py-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200">
            Blog Y Tế Học Đường
          </h1>
          <p className="text-2xl md:text-3xl mb-10 max-w-3xl mx-auto font-light text-white/90 drop-shadow">
            Chia sẻ kiến thức, kinh nghiệm và những câu chuyện về sức khỏe học đường
          </p>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mt-8">
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-5 top-1/2 transform -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-14 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 bg-white/90 shadow-md placeholder:text-indigo-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="w-full">
          {/* Header with tabs and add button */}
          <div className="flex justify-between items-center mb-6">
            {/* Tabs for nurses */}
            {getTokenRole() === 'NURSE' && (
              <div className="flex space-x-2">
                <button
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === "all"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  Tất cả bài viết
                </button>
                <button
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === "my"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveTab("my")}
                >
                  Bài viết của tôi
                </button>
              </div>
            )}
            
            {/* Add button */}
            {getTokenRole() === 'NURSE' && (
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-7 py-3 rounded-full font-bold shadow-md hover:from-blue-600 hover:to-purple-600 transition-all text-lg"
                onClick={() => setShowAddModal(true)}
              >
                + Thêm bài viết
              </button>
            )}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            {loading ? (
              <div className="col-span-3 text-center text-gray-500 py-12 text-lg">Đang tải...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-12 text-lg">
                {activeTab === "my" ? "Bạn chưa có bài viết nào" : "Không có bài viết"}
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.post_id || post.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.04] transition-all duration-300 group cursor-pointer border border-gray-100 relative"
                  onClick={() => setSelectedPost(post)}
                  style={{ minHeight: 260 }}
                >
                  {/* Status badge for 'my posts' tab */}
                  {getTokenRole() === 'NURSE' && activeTab === "my" && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full z-10
                        ${post.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          post.status === 'waiting' || post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          post.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'}`}
                    >
                      {post.status === 'accepted' ? 'Đã duyệt' :
                       post.status === 'waiting' || post.status === 'pending' ? 'Chờ duyệt' :
                       post.status === 'rejected' ? 'Từ chối' : post.status}
                    </span>
                  )}
                  {/* Edit button for nurse's own posts */}
                  {getTokenRole() === 'NURSE' && 
                   activeTab === "my" && 
                   (post.author?.id === myProfile?.id || post.author?.email === myProfile?.email) && (
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      <button
                        onClick={(e) => handleEditClick(e, post)}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                        title="Sửa bài viết"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) return;
                          try {
                            await deleteNurseBlog(post.post_id || post.id);
                            await fetchBlogs();
                          } catch {
                            alert('Xóa bài viết thất bại!');
                          }
                        }}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        title="Xóa bài viết"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-lg min-h-[60px]">{post.content}</p>
                    <div className="flex items-center justify-between text-base text-gray-500 mb-4">
                      <span>{post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div>
                        <p className="font-semibold text-gray-800">{post.author ? `${post.author.lastName || ''} ${post.author.firstName || ''}`.trim() : ""}</p>
                        <p className="text-xs text-gray-400">{post.author?.email || ""}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-8">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-10 text-gray-700 p-2 rounded-full hover:bg-opacity-20 transition-colors text-xl"
            >
              ×
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
              <div>
                <p className="font-semibold text-gray-800">{selectedPost.author ? `${selectedPost.author.lastName || ''} ${selectedPost.author.firstName || ''}`.trim() : ""}</p>
                <p className="text-xs text-gray-400">{selectedPost.author?.email || ""}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedPost.createdAt ? new Date(selectedPost.createdAt).toLocaleString() : ""}</p>
              </div>
            </div>
            <div className="prose max-w-none text-gray-700 text-lg whitespace-pre-line">
              {selectedPost.content}
            </div>
          </div>
        </div>
      )}

      {/* Add Blog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setShowAddModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Thêm bài viết mới</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitMessage("");
                try {
                  await createNurseBlog({
                    title: newBlog.title,
                    content: newBlog.content,
                  });
                  setSubmitMessage("Thêm bài viết thành công!");
                  setTimeout(() => {
                    setShowAddModal(false);
                    setNewBlog({ title: "", content: "" });
                    setSubmitMessage("");
                    handleAddSuccess(); // Refresh the list
                  }, 1200);
                } catch {
                  setSubmitMessage("Có lỗi xảy ra. Vui lòng thử lại.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block font-semibold mb-1">Tiêu đề</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newBlog.title}
                  onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1">Nội dung</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newBlog.content}
                  onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                  required
                />
              </div>
              {submitMessage && (
                <div className="mb-4 text-center text-green-600 font-semibold">{submitMessage}</div>
              )}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : "Thêm bài viết"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.2)'}}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => {
                setShowEditModal(false);
                setEditingPost(null);
                setEditForm({ title: "", content: "" });
                setEditMessage("");
              }}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Sửa bài viết</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Tiêu đề</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.title}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1">Nội dung</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editForm.content}
                  onChange={e => setEditForm({ ...editForm, content: e.target.value })}
                  required
                />
              </div>
              {editMessage && (
                <div className="mb-4 text-center text-green-600 font-semibold">{editMessage}</div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                disabled={isEditing}
              >
                {isEditing ? "Đang cập nhật..." : "Cập nhật bài viết"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogForm