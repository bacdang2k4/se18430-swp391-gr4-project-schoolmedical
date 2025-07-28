"use client"

import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline"

const contactInfo = [
  {
    id: 1,
    icon: PhoneIcon,
    title: "Điện thoại",
    details: [
      { label: "Tổng đài chính:", value: "0352437611" },
      { label: "Khẩn cấp 24/7:", value: "0911293401" },
      { label: "Tư vấn sức khỏe:", value: "0345623181" },
    ],
  },
  {
    id: 2,
    icon: EnvelopeIcon,
    title: "Email",
    details: [
      { label: "Email chính:", value: "bacddse180351@fpt.edu.vn" },
      { label: "Khẩn cấp:", value: "bacddse180351@fpt.edu.vn" },
      { label: "Hỗ trợ kỹ thuật:", value: "bacddse180351@fpt.edu.vn" },
    ],
  },
  {
    id: 3,
    icon: MapPinIcon,
    title: "Địa chỉ",
    details: [
      { label: "Trường học:", value: "FPT University HCMC" },
      { label: "Phòng y tế:", value: "Tầng G, Tòa nhà chính" },
      { label: "Mã bưu điện:", value: "700000" },
    ],
  },
  {
    id: 4,
    icon: ClockIcon,
    title: "Giờ làm việc",
    details: [
      { label: "Thứ 2 - Thứ 6:", value: "7:00 - 17:00" },
      { label: "Thứ 7:", value: "8:00 - 12:00" },
      { label: "Khẩn cấp:", value: "24/7" },
    ],
  },
]

function ContactForm() {
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
              <span className="font-semibold">📞 Hotline: 0352437611</span>
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
            {contactInfo.map((item) => (
              <div key={item.id} className="bg-white/20 backdrop-blur-sm border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 text-blue-600 bg-white rounded-xl mb-4 shadow-md">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">{item.title}</h3>
                <div className="space-y-2">
                  {item.details.map((detail, index) => (
                    <div key={index}>
                      <p className="text-sm text-gray-600 font-medium">{detail.label}</p>
                      <p className="text-gray-800 font-semibold">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6073886319577!2d106.80888518621597!3d10.841327771394067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1753677520966!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FPT University HCMC Location"
              ></iframe>
            </div>
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="font-semibold text-gray-800">FPT University HCMC</h3>
                  <p className="text-gray-600 text-sm">Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</p>
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
              <p className="text-2xl font-bold">0911293401</p>
              <p className="text-sm opacity-80 mt-2">Hoạt động 24/7</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <EnvelopeIcon className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Email khẩn cấp</h3>
              <p className="text-lg font-bold">bacddse180351@fpt.edu.vn</p>
              <p className="text-sm opacity-80 mt-2">Phản hồi trong 15 phút</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactForm