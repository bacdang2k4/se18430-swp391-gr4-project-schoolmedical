import React from "react";

function FooterForm() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 mt-10 shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="text-blue-400 font-bold mb-4">Thông tin trường học</h4>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Giới thiệu trường</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Đội ngũ y tế</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Cơ sở vật chất</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Thành tích đạt được</a>
        </div>
        <div>
          <h4 className="text-blue-400 font-bold mb-4">Tài liệu sức khỏe</h4>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Hướng dẫn chăm sóc sức khỏe</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Phòng chống dịch bệnh</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Dinh dưỡng học đường</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">An toàn trường học</a>
        </div>
        <div>
          <h4 className="text-blue-400 font-bold mb-4">Blog chia sẻ</h4>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Kinh nghiệm phụ huynh</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Câu chuyện y tế học đường</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Mẹo chăm sóc sức khỏe</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">Hoạt động y tế tại trường</a>
        </div>
        <div>
          <h4 className="text-blue-400 font-bold mb-4">Liên hệ</h4>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">📞 024.1234.5678</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">✉️ yte@thcsnguyendu.edu.vn</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">📍 123 Đường ABC, Quận XYZ, Hà Nội</a>
          <a href="#" className="block text-gray-300 hover:text-blue-400 mb-2 transition">⏰ 7:00 - 17:00 (T2-T6)</a>
        </div>
      </div>
      <div className="text-center text-gray-400 border-t border-gray-800 pt-6 text-sm">
        © 2025 Hệ thống quản lý y tế học đường - FPT University HCM. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
}

export default FooterForm;