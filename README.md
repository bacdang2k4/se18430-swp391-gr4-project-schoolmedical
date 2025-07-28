# 🏫 School Health Management System - Hệ thống y tế học đường thông minh

## 📌 Giới thiệu
School Health Management System là hệ thống phần mềm hỗ trợ quản lý toàn diện các hoạt động y tế trong trường học. Hệ thống giúp phụ huynh, nhân viên y tế và nhà trường phối hợp hiệu quả trong việc chăm sóc sức khỏe học sinh – từ khai báo thông tin y tế, xử lý các tình huống khẩn cấp, đến quản lý tiêm chủng và kiểm tra sức khỏe định kỳ.

## 👤 Các vai trò người dùng

1. **Parent**- Phụ huynh, có thể khai báo sức khỏe và theo dõi tình trạng của con
2. **Nurse** - Nhân viên y tế, xử lý sự kiện y tế và theo dõi hồ sơ sức khỏe
3. **Admin** -  Quản lý nhà trường, giám sát hoạt động y tế học đường

## Chức năng chính

1. **Trang chủ & thông tin y tế học đường**
- Giới thiệu trường học, phòng y tế, dịch vụ hỗ trợ
- Chia sẻ tài liệu & blog về chăm sóc sức khỏe học đường

2. **Khai báo hồ sơ sức khỏe học sinh (dành cho phụ huynh)**
- Dị ứng, bệnh nền, thị lực, thính lực, tiền sử tiêm chủng
- Gửi thuốc cho y tế trường kèm hướng dẫn sử dụng

3. **Ghi nhận & xử lý sự kiện y tế tại trường**
- Ghi nhận các sự kiện: sốt, té ngã, tai nạn, dịch bệnh,...
- Quản lý sơ cứu, điều trị và theo dõi sau can thiệp

4. **Quản lý thuốc & vật tư y tế**
- Kiểm kê thuốc men, thiết bị và vật tư y tế
- Xuất - nhập kho theo tình huống hoặc định kỳ

5. **Quản lý tiêm chủng học đường**
- Gửi phiếu xin ý kiến phụ huynh
- Tạo danh sách học sinh tham gia
- Ghi nhận kết quả tiêm và theo dõi sau tiêm

6. **Quản lý kiểm tra sức khỏe định kỳ**
- Gửi phiếu xin ý kiến phụ huynh
- Tạo danh sách học sinh tham gia
- Ghi nhận kết quả tiêm sau kiểm tra

7. **Hồ sơ y tế học sinh & lịch sử chăm sóc**
- Tổng hợp hồ sơ sức khỏe, quá trình khám chữa bệnh
- Quản lý theo năm học hoặc cấp học

8. **Báo cáo & Dashboard**
- Thống kê sự kiện y tế, tiêm chủng, kiểm tra định kỳ
- Xuất báo cáo phục vụ công tác tổng hợp & đánh giá

## 🗂️ Cấu trúc thư mục

```
SWP-School-Medical-Management/
│
├── Backend/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com.dinhbachihi.spring_security/
│           │       ├── config/              # Cấu hình bảo mật, CORS, JWT, ...
│           │       ├── controller/          # REST API endpoints
│           │       ├── dto/                 # Đối tượng truyền dữ liệu
│           │       ├── entity/              # Các class ánh xạ database
│           │       ├── exception/           # Xử lý ngoại lệ toàn cục
│           │       ├── repository/          # Giao tiếp với tầng dữ liệu
│           │       ├── service/             # Business logic và xử lý nghiệp vụ
│           │       └── SpringSecurityApplication.java  # Điểm khởi chạy Spring Boot
│           └── resources/                   # Cấu hình application.yml, template nếu có
│
├── Frontend/
│   ├── public/                                   # Tài nguyên tĩnh (ảnh, favicon, ...)
│   ├── src/
│   │   ├── assets/                               # Ảnh, icon, css
│   │   ├── components/                           # Các component React tái sử dụng
│   │   ├── layouts/                              # Layout tổng thể
│   │   ├── pages/                                # Các trang chức năng (dashboard, login, ...)
│   │   └── routes/                               # Định tuyến ứng dụng
│   ├── package.json                              # Thông tin, dependencies frontend
│   └── vite.config.js                            # Cấu hình Vite
│
├── Docs/                                         # Tài liệu dự án, hướng dẫn, đặc tả
│
└── README.md
```

## 💻 Công nghệ sử dụng

### Frontend
- **React**: Thư viện JavaScript để xây dựng giao diện người dùng hiện đại
- **Vite**: Công cụ build và phát triển frontend nhanh, tối ưu
- **Tailwind CSS**: Framework CSS tiện lợi với hệ thống utility-first, giúp xây dựng giao diện nhanh chóng, dễ tùy chỉnh và đồng nhất.
- **CSS Modules**: Quản lý style theo từng component, tránh xung đột
- **React Router**: Định tuyến các trang trong ứng dụng
- **Axios**: Giao tiếp API với backend

### Backend
- **Spring Boot (3.5.4)**: Nền tảng phát triển Web API mạnh mẽ, hiện đại
- **Entity Framework Core**: ORM thao tác với cơ sở dữ liệu MySQL
- **JWT Bearer Authentication**: Xác thực người dùng bảo mật
- **Redis**: Lưu trữ cache, OTP, dữ liệu tạm thời
- **Swagger / OpenAPI**: Sinh tài liệu API tự động, hỗ trợ test API
- **Docker**: Đóng gói và triển khai backend

### Database
- **MySQL Server on Linux (Docker)**: Chạy trên máy ảo Azure (Linux VM).

### DevOps & Testing
- **Git**: Quản lý phiên bản mã nguồn
- **Docker**: Đóng gói ứng dụng cho việc triển khai.
- **Vercel**: Nền tảng triển khai và hosting cho frontend.
- **Swagger UI**: Test và kiểm thử API trực tiếp trên trình duyệt

## 🔐 Bảo mật & Quyền riêng tư

- **Xác thực & Phân quyền**: Hệ thống sử dụng JWT Bearer Authentication để xác thực người dùng và phân quyền dựa trên vai trò (Admin, School Nurse, Parent).
- **Mã hóa mật khẩu**: Mật khẩu người dùng được mã hóa bằng thuật toán mạnh (BCrypt) trước khi lưu trữ.
- **Bảo vệ dữ liệu cá nhân**: Thông tin sức khỏe, hồ sơ học sinh và dữ liệu cá nhân được bảo vệ nghiêm ngặt, chỉ những người có quyền mới được truy cập.
- **Kiểm soát truy cập API**: Các endpoint API được bảo vệ, chỉ cho phép truy cập với token hợp lệ và đúng vai trò.
- **Kiểm tra đầu vào**: Tất cả dữ liệu đầu vào đều được kiểm tra, xác thực để phòng tránh tấn công injection, XSS, CSRF.
- **Chính sách bảo mật**: Cam kết tuân thủ các quy định về bảo mật và quyền riêng tư dữ liệu theo pháp luật hiện hành.

## 🛡️ Yêu cầu phi chức năng

- **Hiệu năng**: Hệ thống đáp ứng nhanh, có khả năng mở rộng để phục vụ nhiều người dùng đồng thời.
- **Khả năng mở rộng**: Thiết kế kiến trúc nhiều lớp, dễ dàng mở rộng thêm tính năng hoặc tích hợp hệ thống khác.
- **Khả năng bảo trì**: Codebase rõ ràng, tuân thủ SOLID, Clean Code, dễ bảo trì và nâng cấp.
- **Khả năng kiểm thử**: Hỗ trợ kiểm thử tự động (unit test, integration test), dễ dàng kiểm thử các thành phần riêng biệt.
- **Tính di động**: Ứng dụng có thể triển khai trên nhiều môi trường (Windows, Linux, Docker...).
- **Bảo mật**: Đảm bảo an toàn dữ liệu, bảo vệ thông tin cá nhân, tuân thủ các tiêu chuẩn bảo mật.
- **Khả năng sử dụng**: Giao diện thân thiện, dễ sử dụng cho cả phụ huynh, nhân viên y tế và quản trị viên.

## 👥 Author & Contributors

---

### 🧑‍💼 Đặng Đình Bắc  
**Team Leader** | Full-Stack Developer | DevOps | MySQL DB Designer  

- Led the development of the SchoolMedicalManager project  
- Built both frontend (ReactJS) and backend (Spring Boot)  
- Designed and optimized MySQL database (schema, procedures, seed data)  
- Deployed backend & DB using Docker; frontend to Vercel, backend to Render  
- Registered custom domain and configured DNS for production  
- Managed team progress, code quality, and final delivery

---

### 👨‍💻 Nguyễn Thanh Nhã
**Backend Developer** | DevOps | MySQL DB Designer  

- Contributed to the development of system features, covering both frontend and backend components.
- Designed and optimized relational databases using MySQL, ensuring high performance and scalability.
- Proficient in using Postman to test APIs, validate responses, and support frontend integration for accurate UI display.
- Prepared comprehensive documentation, including API references, user guides, and system workflows, to support team collaboration and future development. 

---

### 🎨 Dương Hải Nam  
**Frontend Developer** | MySQL DB Designer  

- Developed UI components with ReactJS  
- Participated in UI/UX design and user flow  
- Assisted in MySQL schema design and seed data
- Prepared comprehensive documentation, including API references, user guides, and system workflows, to support team collaboration and future development.

---

### 💻 Trần Nhật Huy  
**Backend Developer**  | MySQL DB Designer  
- Contributed to the development of system features, covering both frontend and backend components.
- Designed and optimized relational databases using MySQL, ensuring high performance and scalability.
- Proficient in using Postman to test APIs, validate responses, and support frontend integration for accurate UI display.
- Prepared comprehensive documentation, including API references, user guides, and system workflows, to support team collaboration and future development.

