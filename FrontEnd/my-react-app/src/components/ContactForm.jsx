"use client"

import { useState } from "react"
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"

const contactInfo = [
  {
    icon: PhoneIcon,
    title: "Điện thoại",
    details: [
      { label: "Phòng y tế", value: "024.1234.5678" },
      { label: "Khẩn cấp", value: "024.1234.5679" },
      { label: "Tư vấn", value: "024.1234.5680" },
    ],
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: EnvelopeIcon,
    title: "Email",
    details: [
      { label: "Phòng y tế", value: "yte@thcsnguyendu.edu.vn" },
      { label: "Khẩn cấp", value: "emergency@thcsnguyendu.edu.vn" },
      { label: "Tư vấn", value: "tuvan@thcsnguyendu.edu.vn" },
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: MapPinIcon,
    title: "Địa chỉ",
    details: [
      { label: "Trường THCS Nguyễn Du", value: "123 Đường ABC, Quận XYZ, TP.HCM" },
      { label: "Phòng y tế", value: "Tầng 1, Tòa nhà A" },
    ],
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: ClockIcon,
    title: "Giờ làm việc",
    details: [
      { label: "Thứ 2 - Thứ 6", value: "7:00 - 17:00" },
      { label: "Thứ 7", value: "7:00 - 11:00" },
      { label: "Chủ nhật", value: "Nghỉ" },
      { label: "Khẩn cấp", value: "24/7" },
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const departments = [
  {
    name: "Phòng y tế chính",
    description: "Khám bệnh, tư vấn sức khỏe, xử lý sự cố y tế",
    staff: "BS. Nguyễn Thị Lan, Y tá Trần Văn Nam",
    phone: "024.1234.5678",
    email: "yte@thcsnguyendu.edu.vn",
  },
  {
    name: "Phòng cấp cứu",
    description: "Xử lý các tình huống khẩn cấp, tai nạn",
    staff: "BS. Lê Thị Hoa, Y tá Phạm Văn Minh",
    phone: "024.1234.5679",
    email: "emergency@thcsnguyendu.edu.vn",
  },
  {
    name: "Phòng tư vấn dinh dưỡng",
    description: "Tư vấn chế độ ăn, dinh dưỡng học đường",
    staff: "TS. Hoàng Thị Mai, Chuyên viên dinh dưỡng",
    phone: "024.1234.5680",
    email: "dinhduong@thcsnguyendu.edu.vn",
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Liên hệ với chúng tôi</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn về sức khỏe học đường cho con em bạn
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Info Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Thông tin liên hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <div className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <info.icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-sm text-gray-500">{detail.label}</p>
                      <p className="font-medium text-gray-800">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-blue-600" />
              Gửi tin nhắn cho chúng tôi
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-600 mb-2">Gửi thành công!</h3>
                <p className="text-gray-600">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phòng ban</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Chọn phòng ban</option>
                      <option value="medical">Phòng y tế chính</option>
                      <option value="emergency">Phòng cấp cứu</option>
                      <option value="nutrition">Phòng tư vấn dinh dưỡng</option>
                      <option value="admin">Ban giám hiệu</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tiêu đề"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Nhập nội dung tin nhắn..."
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Đây là vấn đề khẩn cấp cần xử lý ngay
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
            )}
          </section>

          {/* Departments & FAQ */}
          <div className="space-y-8">
            {/* Departments */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Các phòng ban</h2>
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{dept.name}</h3>
                    <p className="text-gray-600 mb-2">{dept.description}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p><strong>Nhân viên:</strong> {dept.staff}</p>
                      <p><strong>Điện thoại:</strong> {dept.phone}</p>
                      <p><strong>Email:</strong> {dept.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">{faq.question}</h3>
                        <span className="text-gray-500 text-xl">
                          {expandedFaq === index ? "−" : "+"}
                        </span>
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Emergency Contact */}
        <section className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🚨 Liên hệ khẩn cấp</h2>
          <p className="text-xl mb-6">
            Trong trường hợp khẩn cấp, vui lòng gọi ngay số điện thoại dưới đây
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Cấp cứu 24/7</p>
                <p className="text-2xl font-bold">024.1234.5679</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Email khẩn cấp</p>
                <p className="text-lg font-bold">emergency@thcsnguyendu.edu.vn</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Vị trí trường học</h2>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPinIcon className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Bản đồ Google Maps</p>
              <p className="text-sm">123 Đường ABC, Quận XYZ, TP.HCM</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactForm