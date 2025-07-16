"use client"

import { useState } from "react"
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ShieldCheckIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline"

const contactInfo = [
  {
    icon: PhoneIcon,
    title: "Điện thoại",
    details: [
      { label: "Tổng đài chính", value: "024.1234.5678" },
      { label: "Khẩn cấp 24/7", value: "024.1234.5679" },
      { label: "Tư vấn sức khỏe", value: "024.1234.5680" }
    ],
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    icon: EnvelopeIcon,
    title: "Email",
    details: [
      { label: "Email chính", value: "info@school.edu.vn" },
      { label: "Khẩn cấp", value: "emergency@school.edu.vn" },
      { label: "Hỗ trợ kỹ thuật", value: "support@school.edu.vn" }
    ],
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    icon: MapPinIcon,
    title: "Địa chỉ",
    details: [
      { label: "Trường học", value: "123 Đường ABC, Quận XYZ, TP.HCM" },
      { label: "Phòng y tế", value: "Tầng 2, Tòa nhà chính" },
      { label: "Mã bưu điện", value: "700000" }
    ],
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: ClockIcon,
    title: "Giờ làm việc",
    details: [
      { label: "Thứ 2 - Thứ 6", value: "7:00 - 17:00" },
      { label: "Thứ 7", value: "8:00 - 12:00" },
      { label: "Khẩn cấp", value: "24/7" }
    ],
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
]

const departments = [
  {
    name: "Phòng y tế chính",
    description: "Khám bệnh, tư vấn sức khỏe, xử lý sự cố y tế",
    staff: "BS. Nguyễn Thị Lan, Y tá Trần Văn Nam",
    phone: "024.1234.5678",
    email: "yte@school.edu.vn",
    icon: HeartIcon,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    name: "Phòng cấp cứu",
    description: "Xử lý các tình huống khẩn cấp, tai nạn",
    staff: "BS. Lê Thị Hoa, Y tá Phạm Văn Minh",
    phone: "024.1234.5679",
    email: "emergency@school.edu.vn",
    icon: ShieldCheckIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Phòng tư vấn dinh dưỡng",
    description: "Tư vấn chế độ ăn, dinh dưỡng học đường",
    staff: "TS. Hoàng Thị Mai, Chuyên viên dinh dưỡng",
    phone: "024.1234.5680",
    email: "dinhduong@school.edu.vn",
    icon: AcademicCapIcon,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
]

const faqs = [
  {
    question: "Làm thế nào để đăng ký khám sức khỏe định kỳ cho con?",
    answer: "Phụ huynh có thể đăng ký qua hệ thống online hoặc liên hệ trực tiếp với phòng y tế. Chúng tôi sẽ thông báo lịch khám cụ thể qua email và tin nhắn.",
  },
  {
    question: "Trường có những dịch vụ y tế nào?",
    answer: "Chúng tôi cung cấp: khám sức khỏe định kỳ, xử lý sự cố y tế, tư vấn dinh dưỡng, tiêm chủng, theo dõi sức khỏe học sinh có bệnh mãn tính.",
  },
  {
    question: "Khi nào cần liên hệ khẩn cấp?",
    answer: "Liên hệ ngay khi học sinh gặp tai nạn, bị thương, sốt cao, khó thở, hoặc bất kỳ tình huống nào cần can thiệp y tế ngay lập tức.",
  },
  {
    question: "Làm sao để cập nhật thông tin sức khỏe của con?",
    answer: "Phụ huynh có thể cập nhật thông tin qua tài khoản cá nhân trên hệ thống hoặc mang hồ sơ y tế đến phòng y tế để cập nhật trực tiếp.",
  },
  {
    question: "Trường có chương trình giáo dục sức khỏe không?",
    answer: "Có, chúng tôi tổ chức các buổi tập huấn về sức khỏe, dinh dưỡng và an toàn cho học sinh và phụ huynh định kỳ hàng tháng.",
  },
]

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    message: "",
    urgent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        department: "",
        message: "",
        urgent: false,
      })
    }, 3000)
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse animation-delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <ChatBubbleLeftEllipsisIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Liên hệ với chúng tôi</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn về sức khỏe học đường cho con em bạn
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <span className="font-semibold">📞 Hotline: 024.1234.5678</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              <span className="font-semibold">🚨 Khẩn cấp 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`${info.bgColor} ${info.borderColor} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${info.textColor} bg-white rounded-xl mb-4 shadow-md`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className={`text-xl font-bold ${info.textColor} mb-4`}>{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <div key={idx}>
                      <p className="text-sm text-gray-600 font-medium">{detail.label}:</p>
                      <p className="text-gray-800 font-semibold">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Gửi tin nhắn</h2>
                  <p className="text-gray-600">Điền thông tin bên dưới và chúng tôi sẽ phản hồi sớm nhất có thể</p>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-green-800 font-semibold">Gửi thành công!</p>
                      <p className="text-green-600 text-sm">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phòng ban
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      >
                        <option value="">Chọn phòng ban</option>
                        <option value="medical">Phòng y tế chính</option>
                        <option value="emergency">Phòng cấp cứu</option>
                        <option value="nutrition">Phòng tư vấn dinh dưỡng</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tiêu đề *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Nhập tiêu đề tin nhắn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Nhập nội dung tin nhắn..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="urgent"
                      checked={formData.urgent}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700 flex items-center gap-2">
                      <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                      Đây là vấn đề khẩn cấp
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5" />
                        Gửi tin nhắn
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Departments */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Các phòng ban</h3>
                <div className="space-y-6">
                  {departments.map((dept, index) => (
                    <div key={index} className={`${dept.bgColor} rounded-2xl p-6 border border-gray-200`}>
                      <div className="flex items-start gap-4">
                        <div className={`${dept.color} bg-white rounded-xl p-3 shadow-md`}>
                          <dept.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-2">{dept.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Nhân viên:</span> {dept.staff}</p>
                            <p><span className="font-medium">Điện thoại:</span> {dept.phone}</p>
                            <p><span className="font-medium">Email:</span> {dept.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Câu hỏi thường gặp</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="font-semibold text-gray-800">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <ExclamationTriangleIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Liên hệ khẩn cấp</h2>
          <p className="text-xl mb-8 opacity-90">
            Trong trường hợp khẩn cấp, vui lòng liên hệ ngay với chúng tôi
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <PhoneIcon className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Hotline khẩn cấp</h3>
              <p className="text-2xl font-bold">024.1234.5679</p>
              <p className="text-sm opacity-80 mt-2">Hoạt động 24/7</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <EnvelopeIcon className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Email khẩn cấp</h3>
              <p className="text-lg font-bold">emergency@school.edu.vn</p>
              <p className="text-sm opacity-80 mt-2">Phản hồi trong 15 phút</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Vị trí trường học</h2>
            <p className="text-gray-600 text-lg">Tìm đường đến trường và phòng y tế</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="h-96 bg-gray-300 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Bản đồ Google Maps sẽ được tích hợp tại đây</p>
                <p className="text-sm text-gray-500 mt-2">123 Đường ABC, Quận XYZ, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactForm