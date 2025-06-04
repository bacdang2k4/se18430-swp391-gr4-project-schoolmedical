import React from "react";

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
];

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
];

const stats = [
  { value: "1,247", label: "Học sinh đăng ký" },
  { value: "98.5%", label: "Tỷ lệ tiêm chủng đầy đủ" },
  { value: "456", label: "Sự kiện y tế đã xử lý" },
  { value: "100%", label: "Phụ huynh hài lòng" },
];

function HomeForm() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-400 to-indigo-400 py-20 px-4 text-center rounded-3xl shadow-lg max-w-5xl mx-auto mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Hệ thống quản lý y tế học đường</h1>
        <p className="text-lg md:text-xl text-blue-100 mb-10 font-medium">Chăm sóc sức khỏe toàn diện cho học sinh - Kết nối nhà trường và gia đình</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a href="/login" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-50 transition text-lg">Đăng nhập</a>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Chức năng chính</h2>
          <p className="text-gray-500 text-lg">Hệ thống quản lý y tế học đường toàn diện và hiện đại</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition group">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl text-white ${f.color}`}>{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Truy cập nhanh</h2>
            <p className="text-gray-500 text-lg">Các chức năng thường sử dụng</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickAccess.map((q, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer group">
                <h4 className="text-xl font-bold text-blue-600 mb-2 flex items-center gap-2">
                  <span className="text-2xl">{q.icon}</span> {q.title}
                </h4>
                <p className="text-gray-500 text-base">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-blue-500 to-indigo-500 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Thống kê hệ thống</h2>
            <p className="text-blue-100 text-lg">Năm học 2024-2025</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-2xl bg-white/10 p-8 shadow-lg">
                <h3 className="text-4xl font-extrabold mb-2">{s.value}</h3>
                <p className="text-lg text-blue-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeForm;