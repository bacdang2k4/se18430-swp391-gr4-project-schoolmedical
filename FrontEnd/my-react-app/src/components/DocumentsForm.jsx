"use client"

import { useState } from "react"
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  StarIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline"

const documents = [
  {
    id: 1,
    title: "Hướng dẫn chăm sóc sức khỏe học đường toàn diện",
    description: "Tài liệu chi tiết về các biện pháp chăm sóc sức khỏe học sinh từ A-Z, bao gồm dinh dưỡng, vệ sinh, phòng chống bệnh tật.",
    category: "Hướng dẫn chăm sóc",
    type: "PDF",
    size: "2.5 MB",
    pages: 45,
    author: "Bộ Y tế",
    publishDate: "2025-01-10",
    downloadCount: 1250,
    rating: 4.8,
    tags: ["chăm sóc sức khỏe", "học đường", "hướng dẫn"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: true,
    language: "Tiếng Việt",
  },
  {
    id: 2,
    title: "Phòng chống dịch bệnh trong trường học",
    description: "Quy trình và biện pháp phòng chống các bệnh truyền nhiễm phổ biến trong môi trường học đường.",
    category: "Phòng chống dịch bệnh",
    type: "PDF",
    size: "1.8 MB",
    pages: 32,
    author: "Trung tâm Kiểm soát Bệnh tật",
    publishDate: "2025-01-08",
    downloadCount: 890,
    rating: 4.6,
    tags: ["phòng chống", "dịch bệnh", "trường học"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: false,
    language: "Tiếng Việt",
  },
  {
    id: 3,
    title: "Chế độ dinh dưỡng cân bằng cho trẻ em",
    description: "Hướng dẫn xây dựng thực đơn dinh dưỡng khoa học cho trẻ em tuổi học đường, đảm bảo phát triển toàn diện.",
    category: "Dinh dưỡng",
    type: "PDF",
    size: "3.2 MB",
    pages: 58,
    author: "Viện Dinh dưỡng Quốc gia",
    publishDate: "2025-01-05",
    downloadCount: 1100,
    rating: 4.9,
    tags: ["dinh dưỡng", "trẻ em", "thực đơn"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: true,
    language: "Tiếng Việt",
  },
  {
    id: 4,
    title: "An toàn thực phẩm trong bếp ăn trường học",
    description: "Quy định và hướng dẫn đảm bảo an toàn thực phẩm trong các bếp ăn tập thể tại trường học.",
    category: "An toàn thực phẩm",
    type: "PDF",
    size: "2.1 MB",
    pages: 38,
    author: "Cục An toàn Thực phẩm",
    publishDate: "2025-01-03",
    downloadCount: 756,
    rating: 4.5,
    tags: ["an toàn", "thực phẩm", "bếp ăn"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: false,
    language: "Tiếng Việt",
  },
  {
    id: 5,
    title: "Sơ cứu cơ bản trong trường học",
    description: "Hướng dẫn các kỹ năng sơ cứu cơ bản mà giáo viên và nhân viên y tế cần biết để xử lý tình huống khẩn cấp.",
    category: "Sơ cứu",
    type: "PDF",
    size: "4.1 MB",
    pages: 72,
    author: "Hội Chữ thập đỏ Việt Nam",
    publishDate: "2024-12-28",
    downloadCount: 1350,
    rating: 4.7,
    tags: ["sơ cứu", "khẩn cấp", "kỹ năng"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: true,
    language: "Tiếng Việt",
  },
  {
    id: 6,
    title: "Chăm sóc sức khỏe tâm lý học sinh",
    description: "Hướng dẫn nhận biết và hỗ trợ các vấn đề sức khỏe tâm lý phổ biến ở học sinh các cấp.",
    category: "Sức khỏe tâm lý",
    type: "PDF",
    size: "2.8 MB",
    pages: 51,
    author: "Viện Sức khỏe Tâm thần",
    publishDate: "2024-12-25",
    downloadCount: 920,
    rating: 4.6,
    tags: ["tâm lý", "sức khỏe", "học sinh"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: false,
    language: "Tiếng Việt",
  },
  {
    id: 7,
    title: "Vệ sinh môi trường trường học",
    description: "Tiêu chuẩn và quy trình duy trì vệ sinh môi trường trong khuôn viên trường học để bảo vệ sức khỏe học sinh.",
    category: "Vệ sinh môi trường",
    type: "PDF",
    size: "1.9 MB",
    pages: 35,
    author: "Bộ Tài nguyên và Môi trường",
    publishDate: "2024-12-20",
    downloadCount: 680,
    rating: 4.4,
    tags: ["vệ sinh", "môi trường", "trường học"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: false,
    language: "Tiếng Việt",
  },
  {
    id: 8,
    title: "Quản lý thuốc và vật tư y tế",
    description: "Hướng dẫn quản lý, bảo quản và sử dụng thuốc cũng như các vật tư y tế trong phòng y tế trường học.",
    category: "Quản lý y tế",
    type: "PDF",
    size: "2.3 MB",
    pages: 42,
    author: "Cục Quản lý Dược",
    publishDate: "2024-12-18",
    downloadCount: 540,
    rating: 4.3,
    tags: ["quản lý", "thuốc", "vật tư y tế"],
    thumbnail: "/placeholder.svg?height=200&width=150",
    featured: false,
    language: "Tiếng Việt",
  },
]

const categories = [
  "Tất cả",
  "Hướng dẫn chăm sóc",
  "Phòng chống dịch bệnh",
  "Dinh dưỡng",
  "An toàn thực phẩm",
  "Sơ cứu",
  "Sức khỏe tâm lý",
  "Vệ sinh môi trường",
  "Quản lý y tế",
]

const popularTags = [
  "chăm sóc sức khỏe",
  "phòng chống",
  "dinh dưỡng",
  "an toàn",
  "sơ cứu",
  "tâm lý",
  "vệ sinh",
  "quản lý",
]

function DocumentsForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedDocument, setSelectedDocument] = useState(null)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "Tất cả" || doc.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publishDate) - new Date(a.publishDate)
      case "oldest":
        return new Date(a.publishDate) - new Date(b.publishDate)
      case "popular":
        return b.downloadCount - a.downloadCount
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const featuredDocuments = documents.filter((doc) => doc.featured)

  const handleDownload = (document) => {
    console.log("Downloading:", document.title)
    // Simulate download
    alert(`Đang tải xuống: ${document.title}`)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Thư viện tài liệu</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Kho tài liệu chuyên môn về y tế học đường, được biên soạn bởi các chuyên gia hàng đầu
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-green-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Documents */}
        {featuredDocuments.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span className="text-yellow-500">⭐</span>
              Tài liệu nổi bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={doc.thumbnail || "/placeholder.svg"}
                      alt={doc.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Nổi bật
                    </div>
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      {doc.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{doc.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{doc.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{doc.publishDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(doc.rating)}</div>
                        <span className="text-sm text-gray-600">({doc.rating})</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {doc.downloadCount} lượt tải
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {doc.size} • {doc.pages} trang
                      </div>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Tải xuống
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FunnelIcon className="w-5 h-5 text-green-600" />
                  Danh mục
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TagIcon className="w-5 h-5 text-green-600" />
                  Thẻ phổ biến
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      className="bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Thống kê</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tài liệu:</span>
                    <span className="font-bold text-green-600">{documents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lượt tải:</span>
                    <span className="font-bold text-green-600">
                      {documents.reduce((sum, doc) => sum + doc.downloadCount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đánh giá TB:</span>
                    <span className="font-bold text-green-600">
                      {(documents.reduce((sum, doc) => sum + doc.rating, 0) / documents.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Sort */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Sắp xếp theo:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="popular">Phổ biến nhất</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="name">Tên A-Z</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Hiển thị:</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-green-100 text-green-600" : "text-gray-400"}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-green-100 text-green-600" : "text-gray-400"}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Tìm thấy {sortedDocuments.length} tài liệu
              </div>
            </div>

            {/* Documents Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "space-y-6"}>
              {sortedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <img
                      src={doc.thumbnail || "/placeholder.svg"}
                      alt={doc.title}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-48"
                      }`}
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      {doc.type}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2 flex-1">
                        {doc.title}
                      </h3>
                      <button
                        onClick={() => setSelectedDocument(doc)}
                        className="ml-4 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{doc.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doc.tags.slice(0, 3).map((tag) => (
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
                          <UserIcon className="w-4 h-4" />
                          <span>{doc.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{doc.publishDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(doc.rating)}</div>
                        <span className="text-sm text-gray-600">({doc.rating})</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {doc.downloadCount} lượt tải
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {doc.size} • {doc.pages} trang
                      </div>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Tải xuống
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
                Xem thêm tài liệu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedDocument.thumbnail || "/placeholder.svg"}
                alt={selectedDocument.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedDocument(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {selectedDocument.type}
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedDocument.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Tác giả:</span>
                    <span className="font-medium">{selectedDocument.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Ngày xuất bản:</span>
                    <span className="font-medium">{selectedDocument.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Số trang:</span>
                    <span className="font-medium">{selectedDocument.pages} trang</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Kích thước:</span>
                    <span className="font-medium">{selectedDocument.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Lượt tải:</span>
                    <span className="font-medium">{selectedDocument.downloadCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Đánh giá:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(selectedDocument.rating)}</div>
                      <span className="font-medium">({selectedDocument.rating})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Mô tả</h3>
                <p className="text-gray-700 leading-relaxed">{selectedDocument.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Thẻ</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => handleDownload(selectedDocument)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  Tải xuống tài liệu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentsForm