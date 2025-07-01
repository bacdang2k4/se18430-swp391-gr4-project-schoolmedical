# Hệ thống Authentication

## Tổng quan
Hệ thống authentication đã được cải thiện để bảo vệ các route private và xử lý token một cách an toàn.

## Các thành phần chính

### 1. Utility Functions (`src/utils/auth.js`)
- `getToken()`: Lấy token từ localStorage
- `getRefreshToken()`: Lấy refresh token từ localStorage
- `setTokens(token, refreshToken)`: Lưu token và refresh token
- `removeTokens()`: Xóa token và refresh token
- `isAuthenticated()`: Kiểm tra xem user đã đăng nhập chưa
- `logout()`: Đăng xuất và redirect về trang login

### 2. Axios Configuration (`src/api/axios.js`)
- **Request Interceptor**: Tự động thêm token vào headers của mọi request
- **Response Interceptor**: Xử lý token expired bằng cách:
  - Tự động refresh token khi nhận được lỗi 401
  - Thử lại request ban đầu với token mới
  - Logout user nếu refresh token cũng hết hạn

### 3. Private Route (`src/routes/AppRoutes.jsx`)
- Kiểm tra token có tồn tại không
- Gọi API để verify token có hợp lệ không
- Hiển thị loading spinner trong quá trình kiểm tra
- Redirect về `/login` nếu token không hợp lệ

### 4. Login Flow (`src/components/LoginForm.jsx`)
- Lưu token và refresh token khi đăng nhập thành công
- Redirect về `/dashboard` nếu account đã enabled
- Redirect về `/verify` nếu account chưa enabled (để nhập OTP)

## Cách hoạt động

1. **Khi user truy cập `/dashboard`**:
   - PrivateRoute kiểm tra token trong localStorage
   - Nếu không có token → redirect về `/login`
   - Nếu có token → gọi API `/v1/user/profile` để verify
   - Nếu API trả về lỗi → xóa token và redirect về `/login`
   - Nếu API thành công → hiển thị Dashboard

2. **Khi gọi API**:
   - Request interceptor tự động thêm `Authorization: Bearer <token>` vào headers
   - Nếu API trả về 401 → response interceptor tự động refresh token
   - Nếu refresh thành công → thử lại request ban đầu
   - Nếu refresh thất bại → logout user

3. **Khi user logout**:
   - Xóa token và refresh token khỏi localStorage
   - Redirect về `/login`

## Lưu ý quan trọng

- **Endpoint `/verify`**: Dùng để nhập OTP khi account chưa được kích hoạt, KHÔNG phải để verify token
- **Endpoint `/v1/user/profile`**: Dùng để kiểm tra token có hợp lệ không (có thể thay đổi theo API của backend)
- **Refresh token**: Tự động được xử lý khi token hết hạn
- **Security**: Token được tự động thêm vào mọi request API

## Testing

Để test hệ thống:
1. Đăng nhập bình thường → vào được `/dashboard`
2. Xóa token trong localStorage → refresh trang → redirect về `/login`
3. Truy cập trực tiếp `/dashboard` mà không đăng nhập → redirect về `/login`
4. Đăng xuất → redirect về `/login` 