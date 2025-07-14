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

// Lấy danh sách sự kiện kiểm tra sức khỏe (Admin)
export const getAdminCheckupEventList = async () => {
  const response = await api.get('/v1/admin/checkupEvent');
  return response.data;
};

// Lấy danh sách tất cả học sinh (Admin)
export const getAllAdminStudents = async () => {
  const response = await api.get('/v1/admin/students/get-all-student');
  return response.data;
};

// Lấy danh sách user (Admin)
export const getAdminUserList = async () => {
  const response = await api.get('/v1/admin/users');
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

// Thêm học sinh mới (Admin)
export const addAdminStudent = async (studentData) => {
  const response = await api.post('/v1/admin/students/add-student', studentData);
  return response.data;
};

// Xóa học sinh (Admin)
export const deleteAdminStudent = async (studentId) => {
  const response = await api.delete(`/v1/admin/students/${studentId}`);
  return response.data;
};

// Sửa thông tin học sinh (Admin)
export const updateAdminStudent = async (studentId, data) => {
  const response = await api.put(`/v1/admin/students/${studentId}`, data);
  return response.data;
};

// Lấy danh sách form sự kiện cho phụ huynh
export const getParentEventForms = async () => {
  const response = await api.get('/v1/parent/event/list-forms');
  return response.data;
};

// Phụ huynh chấp nhận sự kiện tiêm chủng
export const acceptParentEvent = async (eventId) => {
  const response = await api.put(`/v1/parent/event/accept/${eventId}`);
  return response.data;
};

// Phụ huynh từ chối sự kiện tiêm chủng
export const rejectParentEvent = async (eventId) => {
  const response = await api.put(`/v1/parent/event/reject/${eventId}`);
  return response.data;
};

export default api;

// Gửi thông báo sự kiện kiểm tra sức khỏe (Admin)
export const sendAdminCheckupNotification = async (id) => {
  const response = await api.post(`/v1/admin/checkup/sendNoti/${id}`);
  return response.data;
};

// Tạo sự kiện kiểm tra sức khỏe (Admin)
export const createAdminCheckupEvent = async (eventData) => {
  const response = await api.post('/v1/admin/checkup-event', eventData);
  return response.data;
};

// Lấy danh sách người tham gia tiêm chủng (Admin)
export const getAdminVaccinationParticipants = async (id) => {
  const response = await api.get(`/v1/admin/vaccination/parti/${id}`);
  return response.data;
};

// Lấy danh sách từ chối chiến dịch tiêm chủng (Admin)
export const getRRejectAdminVaccination = async (id) => {
  const response = await api.get(`/v1/admin/vaccination/reject/${id}`);
  return response.data;
};

// Sửa sự kiện kiểm tra sức khỏe (Admin)
export const editAdminCheckupEvent = async (id, data) => {
  const response = await api.put(`/v1/admin/checkup-event/${id}`, data);
  return response.data;
};

export const getNurseEventParticipants = async (id) => {
  const response = await api.get(`/v1/nurse/event/parti/${id}`);
  return response.data;
};

export const getNurseVaccinationList = async () => {
  const response = await api.get('/v1/nurse/vaccination');
  return response.data;
};

export const updateNurseEventRecord = async (id, data) => {
  const response = await api.put(`/v1/nurse/event/record/${id}`, data);
  return response.data;
};

export const getParentVaccinationResult = async (id) => {
  const response = await api.get(`/v1/parent/event/result/${id}`);
  return response.data;
};

// Lấy danh sách form kiểm tra sức khỏe cho phụ huynh
export const getParentCheckupForms = async () => {
  const response = await api.get('/v1/parent/checkup/list-forms');
  return response.data;
};

// Phụ huynh chấp nhận sự kiện kiểm tra sức khỏe
export const acceptParentCheckup = async (id) => {
  const response = await api.put(`/v1/parent/checkup/accept/${id}`);
  return response.data;
};

// Phụ huynh từ chối sự kiện kiểm tra sức khỏe
export const rejectParentCheckup = async (id) => {
  const response = await api.put(`/v1/parent/checkup/reject/${id}`);
  return response.data;
};

// Lấy danh sách người tham gia kiểm tra sức khỏe (Nurse)
export const getNurseCheckupParticipants = async (id) => {
  const response = await api.get(`/v1/nurse/checkup/parti/${id}`);
  return response.data;
};

// Lấy danh sách sự kiện kiểm tra sức khỏe (Nurse)
export const getNurseCheckupEventList = async () => {
  const response = await api.get('/v1/nurse/checkupEvent');
  return response.data;
};

// Lấy danh sách từ chối sự kiện kiểm tra sức khỏe (Nurse)
export const getNurseCheckupRejectList = async (id) => {
  const response = await api.get(`/v1/nurse/checkup/reject/${id}`);
  return response.data;
};

// Cập nhật kết quả kiểm tra sức khỏe (Nurse)
export const updateNurseCheckupRecord = async (id, data) => {
  const response = await api.put(`/v1/nurse/checkup/record/${id}`, data);
  return response.data;
};

// Tạo blog mới (Nurse)
export const createNurseBlog = async (data) => {
  const response = await api.post('/v1/nurse/blog', data);
  return response.data;
};

// Cập nhật blog (Nurse)
export const updateNurseBlog = async (id, data) => {
  const response = await api.put(`/v1/nurse/blog/${id}`, data);
  return response.data;
};

// Xóa blog (Nurse)
export const deleteNurseBlog = async (id) => {
  const response = await api.delete(`/v1/nurse/blog/${id}`);
  return response.data;
};

// Lấy danh sách blog (Admin)
export const getBlogList = async () => {
  const response = await api.get('/v1/blog');
  return response.data;
};

// Lấy chi tiết blog (Admin)
export const getBlogDetail = async (id) => {
  const response = await api.get(`/v1/blog/${id}`);
  return response.data;
};

// Duyệt blog (Admin)
export const acceptAdminBlog = async (id) => {
  const response = await api.put(`/v1/admin/blog/accept/${id}`);
  return response.data;
};
// Không duyệt blog (Admin)
export const rejectAdminBlog = async (id) => {
  const response = await api.put(`/v1/admin/blog/reject/${id}`);
  return response.data;
};

// Kết thúc sự kiện kiểm tra y tế (Admin)
export const markFinishCheckupAdmin = async (id) => {
  const response = await api.put(`/v1/admin/checkup/mark/${id}`);
  return response.data;
};
