"use client"

import { useState } from "react"
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline"

const blogPosts = [
  {
    id: 1,
    title: "10 Mẹo Giữ Gìn Sức Khỏe Cho Học Sinh Trong Mùa Thi",
    excerpt: "Những lời khuyên thiết thực giúp các em học sinh duy trì sức khỏe tốt nhất trong giai đoạn ôn thi căng thẳng...",
    content: "Mùa thi cử là thời điểm căng thẳng nhất trong năm học. Để giúp các em có thể vượt qua kỳ thi một cách tốt nhất, việc chăm sóc sức khỏe là vô cùng quan trọng...",
    author: "BS. Nguyễn Thị Lan",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishDate: "2025-01-15",
    category: "Sức khỏe học đường",
    tags: ["sức khỏe", "học tập", "thi cử", "stress"],
    image: "/placeholder.svg?height=300&width=500",
    views: 1250,
    likes: 89,
    comments: 23,
    readTime: "8 phút đọc",
    featured: true,
  },
  {
    id: 2,
    title: "Chế Độ Dinh Dưỡng Cân Bằng Cho Trẻ Em Tuổi Học Đường",
    excerpt: "Hướng dẫn chi tiết về cách xây dựng thực đơn dinh dưỡng khoa học cho trẻ em từ 6-18 tuổi...",
    content: "Dinh dưỡng đóng vai trò quan trọng trong sự phát triển của trẻ em. Một chế độ ăn cân bằng sẽ giúp trẻ phát triển toàn diện...",
    author: "TS. Trần Văn Minh",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishDate: "2025-01-12",
    category: "Dinh dưỡng",
    tags: ["dinh dưỡng", "trẻ em", "phát triển", "thực đơn"],
    image: "/placeholder.svg?height=300&width=500",
    views: 980,
    likes: 67,
    comments: 15,
    readTime: "6 phút đọc",
    featured: false,
  },
  {
    id: 3,
    title: "Phòng Chống Cận Thị Ở Trẻ Em: Những Điều Cần Biết",
    excerpt: "Tỷ lệ cận thị ở trẻ em ngày càng tăng cao. Làm thế nào để bảo vệ đôi mắt của con em chúng ta?",
    content: "Cận thị đang trở thành vấn đề nghiêm trọng ở trẻ em hiện nay. Việc sử dụng thiết bị điện tử quá nhiều và thiếu hoạt động ngoài trời...",
    author: "BS. Lê Thị Hoa",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishDate: "2025-01-10",
    category: "Thị lực",
    tags: ["cận thị", "mắt", "phòng chống", "trẻ em"],
    image: "/placeholder.svg?height=300&width=500",
    views: 756,
    likes: 45,
    comments: 12,
    readTime: "5 phút đọc",
    featured: false,
  },
  {
    id: 4,
    title: "Xử Lý Khi Trẻ Bị Sốt Tại Trường: Quy Trình Chuẩn",
    excerpt: "Hướng dẫn chi tiết các bước xử lý khi học sinh bị sốt trong giờ học để đảm bảo an toàn...",
    content: "Sốt là triệu chứng phổ biến ở trẻ em. Khi trẻ bị sốt tại trường, việc xử lý đúng cách và kịp thời là rất quan trọng...",
    author: "Y tá Phạm Thị Mai",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishDate: "2025-01-08",
    category: "Cấp cứu",
    tags: ["sốt", "cấp cứu", "xử lý", "an toàn"],
    image: "/placeholder.svg?height=300&width=500",
    views: 1100,
    likes: 78,
    comments: 19,
    readTime: "7 phút đọc",
    featured: true,
  },
  {
    id: 5,
    title: "Tầm Quan Trọng Của Hoạt Động Thể Chất Đối Với Học Sinh",
    excerpt: "Tập thể dục không chỉ giúp cải thiện sức khỏe mà còn nâng cao khả năng học tập của trẻ...",
    content: "Hoạt động thể chất đều đặn mang lại nhiều lợi ích cho sức khỏe và tinh thần của học sinh...",
    author: "ThS. Hoàng Văn Nam",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishDate: "2025-01-05",
    category: "Thể chất",
    tags: ["thể dục", "sức khỏe", "học tập", "phát triển"],
    image: "/placeholder.svg?height=300&width=500",
    views: 890,
    likes: 56,
    comments: 14,
    readTime: "6 phút đọc",
    featured: false,
  },
  {
    id: 6,
    title: "Chăm Sóc Răng Miệng Cho Trẻ Em: Hướng Dẫn Từ A-Z",
    excerpt: "Hướng dẫn chi tiết về cách chăm sóc răng miệng đúng cách cho trẻ em từ nhỏ...",
    content: "Răng miệng khỏe mạnh là nền tảng cho sức khỏe tổng thể. Việc chăm sóc răng miệng từ nhỏ sẽ giúp trẻ có hàm răng đẹp...",
    author: "BS. Nha khoa Vũ Thị Lan",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    publishDate: "2025-01-03",
    category: "Nha khoa",
    tags: ["răng miệng", "chăm sóc", "trẻ em", "nha khoa"],
    image: "/placeholder.svg?height=300&width=500",
    views: 654,
    likes: 42,
    comments: 8,
    readTime: "5 phút đọc",
    featured: false,
  },
]

const categories = [
  "Tất cả",
  "Sức khỏe học đường",
  "Dinh dưỡng",
  "Thị lực",
  "Cấp cứu",
  "Thể chất",
  "Nha khoa",
  "Tâm lý",
  "Phòng chống dịch bệnh",
]

const popularTags = [
  "sức khỏe",
  "dinh dưỡng",
  "trẻ em",
  "học tập",
  "phòng chống",
  "chăm sóc",
  "phát triển",
  "an toàn",
  "cấp cứu",
  "tâm lý",
]

function BlogForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedPost, setSelectedPost] = useState(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "Tất cả" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog Y Tế Học Đường</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Chia sẻ kiến thức, kinh nghiệm và những câu chuyện về sức khỏe học đường
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <span className="text-yellow-500">⭐</span>
                  Bài viết nổi bật
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          ⭐ Nổi bật
                        </div>
                        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <EyeIcon className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <HeartIcon className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ChatBubbleLeftIcon className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          <span className="text-blue-600 font-medium">{post.readTime}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.authorAvatar || "/placeholder.svg"}
                              alt={post.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-800">{post.author}</p>
                              <p className="text-xs text-gray-500">{post.publishDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <EyeIcon className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HeartIcon className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                      <span className="text-blue-600 font-medium">{post.readTime}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar || "/placeholder.svg"}
                        alt={post.author}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.publishDate}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                Xem thêm bài viết
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TagIcon className="w-5 h-5 text-blue-600" />
                  Thẻ phổ biến
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      className="bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Bài viết gần đây</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="flex gap-3 cursor-pointer group"
                      onClick={() => setSelectedPost(post)}
                    >
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{post.publishDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Đăng ký nhận tin</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Nhận thông báo về những bài viết mới nhất về sức khỏe học đường
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button className="w-full bg-white text-blue-600 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedPost.image || "/placeholder.svg"}
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {selectedPost.category}
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>
              
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedPost.authorAvatar || "/placeholder.svg"}
                    alt={selectedPost.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{selectedPost.author}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{selectedPost.publishDate}</span>
                      </div>
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                    <HeartIcon className="w-5 h-5" />
                    <span>{selectedPost.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedPost.content}</p>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogForm