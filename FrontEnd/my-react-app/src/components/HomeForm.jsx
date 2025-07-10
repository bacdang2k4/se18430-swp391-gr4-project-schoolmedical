"use client"

import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, UserIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import banner1 from "../../images/banner1.jpg"

const bannerSlides = [
  {
    id: 1,
    image: banner1,
    title: "FPT University",
    description: "D1 Long Thạnh Mỹ, Khu công nghệ cao, TP. Thủ Đức, TP.HCM",
    ctaText: "Thông tin chi tiết",
    ctaLink: "/infomation",
    // Đổi gradient nền cho dịu và hợp ảnh trường
    bgColor: "from-blue-400 via-green-200 to-white",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=1400",
    title: "Kiểm tra sức khỏe định kỳ",
    description:
      "Lịch kiểm tra sức khỏe học kỳ 2 cho tất cả học sinh từ ngày 15/01/2025. Đảm bảo sức khỏe toàn diện cho con em.",
    ctaText: "Xem lịch",
    ctaLink: "/medical-checkup",
    bgColor: "from-green-600 to-emerald-700",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=1400",
    title: "Hướng dẫn dinh dưỡng học đường",
    description:
      "Tài liệu mới về chế độ dinh dưỡng cân bằng cho học sinh phát triển toàn diện. Được biên soạn bởi chuyên gia dinh dưỡng.",
    ctaText: "Tải tài liệu",
    ctaLink: "/documents",
    bgColor: "from-orange-600 to-red-700",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=400&width=1400",
    title: "Phòng chống dịch bệnh mùa đông",
    description:
      "Các biện pháp phòng ngừa cúm và bệnh hô hấp trong mùa lạnh. Hướng dẫn chi tiết từ Bộ Y tế và chuyên gia.",
    ctaText: "Tìm hiểu thêm",
    ctaLink: "/health-tips",
    bgColor: "from-purple-600 to-pink-700",
  },
]

const newsArticles = [
  {
    id: 1,
    title: "Hướng dẫn phòng chống cúm mùa cho học sinh",
    summary:
      "Các biện pháp hiệu quả để phòng ngừa cúm mùa trong môi trường học đường, bao gồm vệ sinh cá nhân và tăng cường sức đề kháng.",
    image: "/placeholder.svg?height=200&width=300",
    author: "BS. Nguyễn Thị Lan",
    date: "15/01/2025",
    category: "Sức khỏe",
    readTime: "5 phút đọc",
    isHot: true,
  },
  {
    id: 2,
    title: "Chế độ dinh dưỡng cân bằng cho trẻ em tuổi học đường",
    summary:
      "Menu dinh dưỡng khoa học giúp trẻ phát triển toàn diện về thể chất và trí tuệ, được khuyến nghị bởi chuyên gia dinh dưỡng.",
    image: "/placeholder.svg?height=200&width=300",
    author: "TS. Trần Văn Minh",
    date: "12/01/2025",
    category: "Dinh dưỡng",
    readTime: "7 phút đọc",
    isHot: false,
  },
  {
    id: 3,
    title: "Tầm quan trọng của việc kiểm tra thị lực định kỳ",
    summary:
      "Phát hiện sớm các vấn đề về mắt ở trẻ em để có biện pháp can thiệp kịp thời, bảo vệ thị lực cho tương lai.",
    image: "/placeholder.svg?height=200&width=300",
    author: "BS. Lê Thị Hoa",
    date: "10/01/2025",
    category: "Khám sức khỏe",
    readTime: "4 phút đọc",
    isHot: false,
  },
  {
    id: 4,
    title: "Cách xử lý khi trẻ bị sốt tại trường học",
    summary: "Quy trình chuẩn để xử lý tình huống trẻ bị sốt trong giờ học, đảm bảo an toàn và hiệu quả nhất.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Y tá Phạm Thị Mai",
    date: "08/01/2025",
    category: "Cấp cứu",
    readTime: "6 phút đọc",
    isHot: true,
  },
  {
    id: 5,
    title: "Lợi ích của hoạt động thể chất đối với sức khỏe học sinh",
    summary:
      "Tập thể dục đều đặn không chỉ giúp cải thiện sức khỏe thể chất mà còn nâng cao khả năng học tập và tinh thần.",
    image: "/placeholder.svg?height=200&width=300",
    author: "ThS. Hoàng Văn Nam",
    date: "05/01/2025",
    category: "Thể chất",
    readTime: "8 phút đọc",
    isHot: false,
  },
  {
    id: 6,
    title: "Chăm sóc sức khỏe răng miệng cho trẻ em",
    summary: "Hướng dẫn chi tiết về cách chăm sóc răng miệng đúng cách, phòng ngừa sâu răng và các bệnh lý nha khoa.",
    image: "/placeholder.svg?height=200&width=300",
    author: "BS. Nha khoa Vũ Thị Lan",
    date: "03/01/2025",
    category: "Nha khoa",
    readTime: "5 phút đọc",
    isHot: false,
  },
]

const features = [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Hồ sơ sức khỏe",
    desc: "Phụ huynh khai báo và quản lý hồ sơ sức khỏe của học sinh: dị ứng, bệnh mãn tính, tiền sử điều trị, thị lực, thính lực, tiêm chủng...",
    color: "bg-gradient-to-br from-pink-400 to-pink-600",
  },
  {
    icon: "💊",
    title: "Quản lý thuốc",
    desc: "Phụ huynh gửi thuốc cho trường, nhân viên y tế quản lý và cho học sinh uống theo đúng hướng dẫn và thời gian quy định.",
    color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
  },
  {
    icon: "🚨",
    title: "Xử lý sự kiện y tế",
    desc: "Ghi nhận và xử lý các sự kiện y tế trong trường: tai nạn, sốt, té ngã, dịch bệnh... với quy trình chuyên nghiệp.",
    color: "bg-gradient-to-br from-red-400 to-orange-400",
  },
  {
    icon: "💉",
    title: "Tiêm chủng",
    desc: "Quản lý quy trình tiêm chủng: thông báo phụ huynh → chuẩn bị danh sách → tiêm chủng → theo dõi sau tiêm.",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    icon: "🩺",
    title: "Kiểm tra y tế định kỳ",
    desc: "Tổ chức kiểm tra y tế định kỳ: thông báo → chuẩn bị → thực hiện → gửi kết quả → tư vấn riêng nếu cần.",
    color: "bg-gradient-to-br from-green-400 to-green-600",
  },
  {
    icon: "📊",
    title: "Báo cáo & Thống kê",
    desc: "Dashboard và báo cáo chi tiết về tình hình sức khỏe học sinh, lịch sử kiểm tra y tế, và các chỉ số quan trọng.",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
  },
]

const quickAccess = [
  {
    icon: "📋",
    title: "Khai báo hồ sơ sức khỏe",
    desc: "Dành cho phụ huynh cập nhật thông tin sức khỏe con em",
  },
  {
    icon: "💊",
    title: "Gửi thuốc cho trường",
    desc: "Đăng ký gửi thuốc và hướng dẫn sử dụng",
  },
  {
    icon: "📅",
    title: "Lịch kiểm tra y tế",
    desc: "Xem lịch kiểm tra y tế định kỳ sắp tới",
  },
  {
    icon: "💉",
    title: "Lịch tiêm chủng",
    desc: "Theo dõi lịch tiêm chủng và xác nhận tham gia",
  },
  {
    icon: "📞",
    title: "Liên hệ y tế khẩn cấp",
    desc: "Thông tin liên hệ trong trường hợp khẩn cấp",
  },
  {
    icon: "📖",
    title: "Tài liệu sức khỏe",
    desc: "Kiến thức và hướng dẫn chăm sóc sức khỏe học đường",
  },
]

const stats = [
  { value: "1,247", label: "Học sinh đăng ký" },
  { value: "98.5%", label: "Tỷ lệ tiêm chủng đầy đủ" },
  { value: "456", label: "Sự kiện y tế đã xử lý" },
  { value: "100%", label: "Phụ huynh hài lòng" },
]

function HomeForm() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0)
  const [isNewsAutoPlay, setIsNewsAutoPlay] = useState(true)

  // Auto-slide functionality for banner
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Auto-slide functionality for news
  useEffect(() => {
    if (!isNewsAutoPlay) return

    const interval = setInterval(() => {
      setCurrentNewsSlide((prev) => (prev + 1) % Math.ceil(newsArticles.length / 3))
    }, 4000)

    return () => clearInterval(interval)
  }, [isNewsAutoPlay])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev + 1) % Math.ceil(newsArticles.length / 3))
  }

  const prevNewsSlide = () => {
    setCurrentNewsSlide((prev) => (prev - 1 + Math.ceil(newsArticles.length / 3)) % Math.ceil(newsArticles.length / 3))
  }

  const handleMouseEnter = () => {
    setIsAutoPlay(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlay(true)
  }

  const handleNewsMouseEnter = () => {
    setIsNewsAutoPlay(false)
  }

  const handleNewsMouseLeave = () => {
    setIsNewsAutoPlay(true)
  }

  return (
    <main className="w-full">
      {/* Banner Slideshow - Full Width & Larger */}
      <section
        className="relative w-full h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden shadow-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides */}
        <div className="relative w-full h-full">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`w-full h-full bg-gradient-to-r ${slide.bgColor} flex items-center justify-center relative`}
              >
                {/* Background Image */}
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />

                {/* Content */}
                <div className="relative z-10 text-center text-white px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 drop-shadow-md max-w-4xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                  <a
                    href={slide.ctaLink}
                    className="inline-block bg-white text-gray-800 font-bold py-4 px-10 md:py-5 md:px-12 lg:py-6 lg:px-16 rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg md:text-xl lg:text-2xl"
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-4 z-10">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 backdrop-blur-sm ${
                index === currentSlide
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110"
              }`}
              title={`Đi đến slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {/* <div className="absolute top-6 left-6 z-10">
          <div
            className={`w-3 h-3 rounded-full ${isAutoPlay ? "bg-green-400" : "bg-red-400"} animate-pulse shadow-lg`}
          />
        </div> */}

        {/* Slide counter */}
        <div className="absolute top-6 right-6 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentSlide + 1} / {bannerSlides.length}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Chức năng chính</h2>
          <p className="text-gray-600 text-xl">Hệ thống quản lý y tế học đường toàn diện và hiện đại</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
              onClick={() => {
                if (f.title === "Hồ sơ sức khỏe") {
                  navigate("/health-record")
                }
              }}
            >
              <div
                className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center text-4xl text-white ${f.color} shadow-lg`}
              >
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{f.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section
        className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50"
        onMouseEnter={handleNewsMouseEnter}
        onMouseLeave={handleNewsMouseLeave}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Tin tức sức khỏe</h2>
            <p className="text-gray-600 text-xl">Cập nhật thông tin y tế và sức khỏe học đường mới nhất</p>
          </div>

          {/* News Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentNewsSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(newsArticles.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {newsArticles.slice(slideIndex * 3, slideIndex * 3 + 3).map((article) => (
                      <div
                        key={article.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
                      >
                        {/* Article Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {article.isHot && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              🔥 HOT
                            </div>
                          )}
                          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {article.category}
                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{article.summary}</p>

                          {/* Article Meta */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <UserIcon className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{article.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-600 font-medium">{article.readTime}</span>
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group">
                              Đọc thêm
                              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* News Navigation Arrows */}
            <button
              onClick={prevNewsSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg text-gray-800 p-3 rounded-full hover:bg-gray-50 transition-all duration-200 z-10"
              title="Tin tức trước"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={nextNewsSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg text-gray-800 p-3 rounded-full hover:bg-gray-50 transition-all duration-200 z-10"
              title="Tin tức tiếp theo"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* News Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(newsArticles.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentNewsSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentNewsSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* View All News Button */}
          <div className="text-center mt-12">
            <a
              href="/news"
              className="inline-flex items-center gap-3 bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Xem tất cả tin tức
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Truy cập nhanh</h2>
            <p className="text-gray-600 text-xl">Các chức năng thường sử dụng</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {quickAccess.map((q, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <h4 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-3">
                  <span className="text-3xl">{q.icon}</span> {q.title}
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Thống kê hệ thống</h2>
            <p className="text-blue-100 text-xl">Năm học 2024-2025</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-3xl bg-white/10 p-10 shadow-xl backdrop-blur-sm">
                <h3 className="text-5xl md:text-6xl font-extrabold mb-4">{s.value}</h3>
                <p className="text-xl text-blue-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomeForm
