"use client"

import { useState, useEffect, useRef } from "react"
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CalendarIcon, 
  UserIcon, 
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  AcademicCapIcon,
  ClockIcon,
  PhoneIcon,
  DocumentTextIcon,
  BellIcon,
  StarIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { getProfile } from "../api/axios"
import banner1 from "../../images/banner1.jpg"

const bannerSlides = [
  {
    id: 1,
    image: banner1,
    title: "Hệ thống Y tế Học đường Thông minh",
    subtitle: "FPT University HCM",
    description: "Nền tảng quản lý sức khỏe toàn diện cho học sinh với công nghệ hiện đại và quy trình chuyên nghiệp",
    ctaText: "Khám phá ngay",
    ctaLink: "/dashboard",
    bgGradient: "from-blue-600/90 via-indigo-600/80 to-purple-600/90",
    features: ["AI-Powered", "24/7 Support", "Secure & Private"]
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Kiểm tra Sức khỏe Định kỳ",
    subtitle: "Chăm sóc toàn diện",
    description: "Lịch kiểm tra sức khỏe học kỳ 2 cho tất cả học sinh. Đảm bảo sức khỏe toàn diện với đội ngũ y bác sĩ chuyên nghiệp",
    ctaText: "Xem lịch kiểm tra",
    ctaLink: "/health-checkup",
    bgGradient: "from-emerald-600/90 via-green-600/80 to-teal-600/90",
    features: ["Professional Staff", "Modern Equipment", "Comprehensive Care"]
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Dinh dưỡng Học đường",
    subtitle: "Phát triển toàn diện",
    description: "Chương trình dinh dưỡng khoa học được thiết kế bởi chuyên gia, đảm bảo sự phát triển tối ưu cho học sinh",
    ctaText: "Tải tài liệu",
    ctaLink: "/documents",
    bgGradient: "from-orange-600/90 via-amber-600/80 to-yellow-600/90",
    features: ["Expert Designed", "Balanced Nutrition", "Growth Focused"]
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=1400",
    title: "Phòng chống Dịch bệnh",
    subtitle: "An toàn tuyệt đối",
    description: "Hệ thống phòng chống dịch bệnh hiện đại với quy trình chuẩn quốc tế, đảm bảo môi trường học tập an toàn",
    ctaText: "Tìm hiểu thêm",
    ctaLink: "/blog",
    bgGradient: "from-purple-600/90 via-violet-600/80 to-indigo-600/90",
    features: ["International Standards", "Advanced Prevention", "Safe Environment"]
  },
]

const features = [
  {
    icon: HeartIcon,
    title: "Hồ sơ sức khỏe",
    desc: "Quản lý toàn diện thông tin sức khỏe học sinh với công nghệ bảo mật cao và giao diện thân thiện",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    stats: "1,247+ hồ sơ",
    link: "/health-record"
  },
  {
    icon: ShieldCheckIcon,
    title: "Quản lý thuốc",
    desc: "Hệ thống theo dõi và quản lý thuốc thông minh, đảm bảo an toàn và hiệu quả trong việc điều trị",
    color: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-50 to-blue-50",
    stats: "98.5% độ chính xác",
    link: "/medical-send"
  },
  {
    icon: SparklesIcon,
    title: "Xử lý sự kiện y tế",
    desc: "Quy trình xử lý sự kiện y tế nhanh chóng và chuyên nghiệp với đội ngũ y tế 24/7",
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-50 to-orange-50",
    stats: "< 5 phút phản hồi",
    link: "/dashboard"
  },
  {
    icon: ShieldCheckIcon,
    title: "Tiêm chủng",
    desc: "Quản lý lịch tiêm chủng thông minh với nhắc nhở tự động và theo dõi phản ứng sau tiêm",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    stats: "100% theo dõi",
    link: "/vaccination"
  },
  {
    icon: AcademicCapIcon,
    title: "Kiểm tra y tế định kỳ",
    desc: "Chương trình kiểm tra sức khỏe định kỳ toàn diện với thiết bị hiện đại và báo cáo chi tiết",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    stats: "Định kỳ 6 tháng",
    link: "/health-checkup"
  },
  {
    icon: ClockIcon,
    title: "Báo cáo & Thống kê",
    desc: "Dashboard thông minh với phân tích dữ liệu sức khỏe và báo cáo xu hướng theo thời gian thực",
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50",
    stats: "Real-time data",
    link: "/dashboard"
  },
]

// Role-based features (copy from HeaderForm.jsx for consistency)
const ROLE_FEATURES = {
  PARENT: [
    { 
      icon: HeartIcon, 
      title: "Hồ sơ sức khỏe", 
      path: "/parent/health-record", 
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      description: "Theo dõi sức khỏe con em"
    },
    { 
      icon: SparklesIcon, 
      title: "Gửi thuốc", 
      path: "/parent/medical-send-history", 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Đăng ký gửi thuốc"
    },
    { 
      icon: ShieldCheckIcon, 
      title: "Tiêm chủng", 
      path: "/parent/medical-vaccine", 
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      description: "Lịch tiêm chủng"
    },
    { 
      icon: ClockIcon, 
      title: "Kiểm tra y tế", 
      path: "/parent/health-checkup", 
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Lịch khám định kỳ"
    },
    { 
      icon: CalendarDaysIcon, 
      title: "Sự kiện y tế", 
      path: "/parent/event-in-school", 
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      description: "Xem sự kiện y tế trong trường"
    },
  ],
  NURSE: [
    { 
      icon: HeartIcon, 
      title: "Hồ sơ học sinh", 
      path: "/nurse/list-health-records", 
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      description: "Quản lý hồ sơ sức khỏe"
    },
    { 
      icon: SparklesIcon, 
      title: "Quản lý thuốc", 
      path: "/nurse/list-medical-send", 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Xử lý thuốc từ phụ huynh"
    },
    { 
      icon: ShieldCheckIcon, 
      title: "Tiêm chủng", 
      path: "/nurse/vaccination", 
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      description: "Quản lý tiêm chủng"
    },
    { 
      icon: ClockIcon, 
      title: "Kiểm tra y tế", 
      path: "/nurse/health-checkup", 
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Quản lý kiểm tra sức khỏe"
    },
    { 
      icon: CalendarDaysIcon, 
      title: "Sự kiện y tế", 
      path: "/nurse/event-in-school", 
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      description: "Quản lý sự kiện y tế"
    },
    { 
      icon: DocumentTextIcon, 
      title: "Kho vật tư", 
      path: "/nurse/warehouse", 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Quản lý vật tư y tế"
    },
  ],
  ADMIN: [
    { 
      icon: ShieldCheckIcon, 
      title: "Dashboard", 
      path: "/admin/dashboard", 
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Quản trị hệ thống"
    },
  ]
}

const stats = [
  { value: "1,247", label: "Học sinh đăng ký", icon: "👥", change: "+12%", trend: "up" },
  { value: "98.5%", label: "Tỷ lệ tiêm chủng đầy đủ", icon: "💉", change: "+2.1%", trend: "up" },
  { value: "456", label: "Sự kiện y tế đã xử lý", icon: "🚨", change: "+8%", trend: "up" },
  { value: "100%", label: "Phụ huynh hài lòng", icon: "⭐", change: "0%", trend: "stable" },
]


function HomeForm() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [userRole, setUserRole] = useState("PARENT")
  
  const heroRef = useRef(null)
  const observerRef = useRef(null)

  // Fetch user profile to get role
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setUserRole(data.result.role || "PARENT")
      } catch {
        setUserRole("PARENT")
      }
    }
    fetchProfile()
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // setIsVisible(prev => ({
            //   ...prev,
            //   [entry.target.dataset.animate]: true
            // }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-slide functionality for banner
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <main className="w-full overflow-hidden bg-gray-50">
      

      {/* Hero Banner Section */}
      <section 
        ref={heroRef}
        className="relative w-full h-screen min-h-[700px] overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Background Slides */}
        <div className="absolute inset-0">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              {/* Background Image with Parallax */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                style={{
                  backgroundImage: `url(${slide.image || "/placeholder.svg"})`,
                  transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px) scale(1.1)`
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
                <div className="max-w-5xl mx-auto px-4">
                  <div className="mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {slide.features.map((feature, idx) => (
                      <span key={idx} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate(slide.ctaLink)}
                      className="bg-white text-gray-800 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      {slide.ctaText}
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                      Liên hệ ngay
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse">
                  <PlayIcon className="w-8 h-8 text-white m-auto mt-12" />
                </div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse animation-delay-1000">
                  <SparklesIcon className="w-6 h-6 text-white m-auto mt-9" />
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-white/10 rounded-full animate-pulse animation-delay-2000">
                  <ShieldCheckIcon className="w-7 h-7 text-white m-auto mt-10" />
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse animation-delay-3000">
                  <HeartIcon className="w-5 h-5 text-white m-auto mt-7" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
          {/* Dots Indicator */}
          <div className="flex space-x-3">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                }`}
                title={`Đi đến slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Slide counter */}
          <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentSlide + 1} / {bannerSlides.length}
          </div>
        </div>
      </section>

      {/* Quick Access Section - Moved up for better UX */}
      <section className="py-16 px-4 bg-white" data-animate="quickaccess">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Truy cập nhanh</h2>
            <p className="text-gray-600 text-lg">Các chức năng thường sử dụng nhất</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {(ROLE_FEATURES[userRole] || ROLE_FEATURES.PARENT).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2`}
                  onClick={() => navigate(item.path)}
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${item.bgColor}`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors text-center line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 text-center line-clamp-2">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50" data-animate="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Chức năng chính</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">Hệ thống quản lý y tế học đường toàn diện và hiện đại, được thiết kế để đảm bảo sức khỏe tối ưu cho học sinh</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(feature.link)}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.desc}</p>
                <div className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                  <StarIcon className="w-4 h-4" />
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-4 text-white" data-animate="stats">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Thống kê hệ thống</h2>
            <p className="text-blue-100 text-xl">Năm học 2024-2025</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-2">{stat.value}</h3>
                  <p className="text-blue-100 mb-2">{stat.label}</p>
                  <div className={`text-sm font-semibold flex items-center justify-center gap-1 ${
                    stat.trend === 'up' ? 'text-green-300' : stat.trend === 'down' ? 'text-red-300' : 'text-yellow-300'
                  }`}>
                    {stat.trend === 'up' && '↗'}
                    {stat.trend === 'down' && '↘'}
                    {stat.trend === 'stable' && '→'}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia hệ thống quản lý y tế học đường thông minh ngay hôm nay để đảm bảo sức khỏe tốt nhất cho con em bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Đăng nhập ngay
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
            >
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomeForm