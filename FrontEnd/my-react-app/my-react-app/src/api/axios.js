import axios from "axios";
import { getToken, getRefreshToken, setTokens, removeTokens } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor để tự động thêm token vào headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý token expired
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 (Unauthorized) và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/auth/refresh`, {
            refreshToken: refreshToken,
          });

          const { token, refreshToken: newRefreshToken } = response.data.result;
          
          // Cập nhật token mới
          setTokens(token, newRefreshToken);
          
          // Thử lại request ban đầu với token mới
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn, logout user
        removeTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const getProfile = async () => {
  const response = await api.get('/v1/profile');
  return response.data;
};

export const changePassword = async (oldPassword, newPassword, confirmPassword) => {
  const response = await api.put('/v1/profile/change-password', {
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post('/v1/auth/signup', userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/v1/admin/users/${userId}`);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/v1/admin/users/${userId}`);
  // Có thể trả về response.data.result hoặc response.data tùy backend
  return response.data.result || response.data;
};

export const sendOtp = async (email) => {
  const response = await api.post('/v1/auth/send-otp', { email });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post('/v1/auth/verify-otp', { email, otp });
  return response.data;
};

export default api;
