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

export const getAllStudentsByParent = async () => {
  const response = await api.get('/v1/parent/get-all');
  return response.data;
};

export const getHealthRecordById = async (id) => {
  const response = await api.get(`/v1/parent/get-health-record/${id}`);
  return response.data;
};

export const updateHealthRecordById = async (id, data) => {
  const response = await api.put(`/v1/parent/update-health-record/${id}`, data);
  return response.data;
};

export const getMedicalSentHistory = async () => {
  const response = await api.get('/v1/parent/medical-sent/history');
  return response.data;
};

export const sendMedical = async (id,data) => {
  const response = await api.post(`/v1/parent/medical-sent/${id}`, data);
  return response.data;
};

export const getNurseMedicalSentList = async () => {
  const response = await api.get('/v1/nurse/medical-sent/list');
  return response.data;
};

export const approveMedicalSend = async (id) => {
  const response = await api.put(`/v1/nurse/medical-sent/${id}`);
  return response.data;
};
export const setUse = async (id) => {
  const response = await api.put(`/v1/nurse/set-use/${id}`);
  return response.data;
};

export const getNurseHealthRecordList = async () => {
  const response = await api.get('/v1/nurse/health-record/list');
  return response.data;
};

export const getNurseMedicalEventList = async () => {
  const response = await api.get('/v1/nurse/medical-event/list');
  return response.data;
};

// Medical Event
export const createNurseMedicalEvent = async (studentId, data) => {
  const response = await api.post(`/v1/nurse/medical-event/${studentId}`, data);
  return response.data;
};

export const getNurseMedicineList = async () => {
  const response = await api.get('/v1/nurse/medicine/list');
  return response.data;
};

export const getNurseStudentList = async () => {
  const response = await api.get('/v1/nurse/student/list');
  return response.data;
};

export const updateNurseMedicine = async (id, data) => {
  const response = await api.put(`/v1/nurse/medicine/${id}`, data);
  return response.data;
};

export const medicineHistoryUsed = async () => {
  const response = await api.put('/v1/nurse/medicine/history');
  return response.data;
};

// Tạo sự kiện mới (Admin)
export const createAdminVaccinationEvent = async (eventData) => {
  const response = await api.post('/v1/admin/vaccination-event', eventData);
  return response.data;
};

// Lấy danh sách vaccination (Admin)
export const getAdminVaccinationList = async () => {
  const response = await api.get('/v1/admin/vaccination');
  return response.data;
};

// Lấy danh sách health record (Admin)
export const getAdminHealthRecordList = async () => {
  const response = await api.get('/v1/admin/health-record/list');
  return response.data;
};

// Lấy danh sách sự kiện y tế (Admin)
export const getAdminMedicalEventList = async () => {
  const response = await api.get('/v1/admin/medical-event/list');
  return response.data;
};

// Lấy danh sách tất cả học sinh (Admin)
export const getAllAdminStudents = async () => {
  const response = await api.get('/v1/admin/students/get-all-student');
  return response.data;
};

// Gửi thông báo (Admin)
export const sendAdminNotification = async (id) => {
  const response = await api.post(`/v1/admin/sendNoti/${id}`);
  return response.data;
};

// Kết thúc sự kiện tiêm chủng (Admin)
export const finishAdminVaccination = async (id) => {
  const response = await api.put(`/v1/admin/vaccination/finish/${id}`);
  return response.data;
};

// Sửa sự kiện tiêm chủng (Admin)
export const editAdminVaccination = async (id, data) => {
  const response = await api.put(`/v1/admin/vaccination/edit/${id}`, data);
  return response.data;
};

// Xóa sự kiện tiêm chủng (Admin)
export const deleteAdminVaccination = async (id) => {
  const response = await api.delete(`/v1/admin/vaccination/${id}`);
  return response.data;
};

// Xóa sự kiện y tế (Admin)
export const deleteAdminMedicalEvent = async (id) => {
  const response = await api.delete(`/v1/admin/medical-event/${id}`);
  return response.data;
};

// Lấy danh sách thuốc (Admin)
export const getAdminMedicineList = async () => {
  const response = await api.get('/v1/admin/medicine/list');
  return response.data;
};

// Thêm mới thuốc (Admin)
export const createAdminMedicine = async (medicineData) => {
  // medicineData: { name, type, quantity, unit }
  const response = await api.post('/v1/admin/medicine', medicineData);
  return response.data;
};

// Xóa thuốc (Admin)
export const deleteAdminMedicine = async (id) => {
  const response = await api.delete(`/v1/admin/medicine/${id}`);
  return response.data;
};

export default api;
