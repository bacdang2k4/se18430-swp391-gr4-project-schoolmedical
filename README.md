# 🏥 School Medical Management System

Một hệ thống quản lý y tế học đường (backend + frontend) được phát triển trong khuôn khổ nhóm SWP391.

---

## 📂 Cấu trúc dự án


```bash
├── BackEnd/      # mã nguồn ứng dụng Spring Boot
└── FrontEnd/     # mã nguồn ứng dụng web React
```

---

## ⚙️ Backend (Spring Boot + Maven)

### Yêu cầu
- Java 17+ (cài và set `JAVA_HOME`)
- Maven 3.x

### Cài đặt & chạy
1. Di chuyển vào thư mục backend:
    ```bash
    cd BackEnd
    ```
2. Tải các dependency:
    ```bash
    mvn clean install
    ```
3. Chạy ứng dụng:
    ```bash
    mvn spring-boot:run
    ```
   hoặc build thành `.jar` và chạy thủ công:
    ```bash
    mvn package
    java -jar target/<your-app-name>.jar
    ```

### Cấu hình
- File cấu hình mặc định nằm ở `src/main/resources/application.properties`
- Thiết lập chứa: `server.port`, `spring.datasource.url`, `username`, `password`, v.v.
- Đảm bảo database (MySQL/PostgreSQL) đã được tạo và cấu hình đúng.

### API
- Các endpoint RESTful có thể truy cập tại: `http://localhost:<port>/api/...`
- Có thể dùng **Postman**, **Insomnia** hoặc Swagger (nếu tích hợp) để test API.

---

## 🧩 Frontend (Web App)

### Yêu cầu
- Node.js (LTS) & npm (hoặc yarn)

### Cài đặt & chạy
1. Di chuyển vào thư mục frontend:
    ```bash
    cd FrontEnd
    ```
2. Cài đặt dependencies:
    ```bash
    npm install
    ```
   hoặc:
    ```bash
    yarn install
    ```
3. Start ứng dụng:
    ```bash
    npm start
    ```
   hoặc:
    ```bash
    yarn start
    ```

4. Mở trình duyệt truy cập:
    ```
    http://localhost:3000
    ```
   (hoặc cổng khác nếu cấu hình tùy chỉnh).

### Cấu hình kết nối backend
- Kiểm tra file cấu hình (ví dụ `.env`, hoặc trong code) để đảm bảo:
    ```env
    REACT_APP_API_URL=http://localhost:<backend-port>/api
    ```

### Xây dựng bản production
Để build ứng dụng frontend ổn định:
```bash
npm run build
