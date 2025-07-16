import React, { useEffect, useState } from "react";
import { 
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { 
  UserCircleIcon as UserCircleIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid
} from "@heroicons/react/24/solid";
import { getProfile, updateProfile } from "../api/axios";
import { useNavigate } from "react-router-dom";

// Medical color palette
const MEDICAL_COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1'
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#10b981',
    600: '#059669'
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b'
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444'
  }
};

// Role configuration with medical theme
const ROLE_CONFIG = {
  ADMIN: {
    label: 'Quản trị viên',
    icon: ShieldCheckIconSolid,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  NURSE: {
    label: 'Y tá',
    icon: HeartIcon,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  PARENT: {
    label: 'Phụ huynh',
    icon: UserCircleIconSolid,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200'
  }
};

function ProfileForm() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data.result);
        setEditData({
          firstName: data.result.firstName || '',
          lastName: data.result.lastName || '',
          phone: data.result.phone || '',
          email: data.result.email || '',
        });
      } catch {
        setError("Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Toast auto-close
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleConfig = (role) => {
    return ROLE_CONFIG[role] || ROLE_CONFIG.PARENT;
  };

  // Handle edit
  const handleEditClick = () => setEditMode(true);
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      phone: profile.phone || '',
      email: profile.email || '',
    });
  };
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      await updateProfile(editData);
      setProfile({ ...profile, ...editData });
      setEditMode(false);
      setToast({ message: 'Cập nhật thông tin thành công!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Cập nhật thất bại! ' + (err?.response?.data?.message || ''), type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Loading state with medical theme
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowPathIcon className="w-8 h-8 text-white animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Đang tải thông tin</h3>
            <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with medical theme
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-red-200/50 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const roleConfig = getRoleConfig(profile.role);
  const RoleIcon = roleConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-8 px-4">
      {/* Toast notification */}
      {toast.message && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          onClick={() => setToast({ message: '', type: '' })}
          role="alert"
        >
          {toast.message}
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200/50 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              Hồ Sơ Cá Nhân
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thông tin chi tiết về tài khoản và vai trò của bạn trong hệ thống Y tế Học đường
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <UserCircleIconSolid className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {profile.lastName} {profile.firstName}
                </h2>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30`}>
                    <RoleIcon className="w-4 h-4 text-white" />
                    <span className="text-white font-medium text-sm">
                      {roleConfig.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-300/30">
                    <CheckBadgeIconSolid className="w-4 h-4 text-emerald-100" />
                    <span className="text-emerald-100 font-medium text-sm">Đã xác thực</span>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-200 group">
                <PencilSquareIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                    <IdentificationIcon className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Thông tin cá nhân</h3>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên đệm
                    </label>
                    <div className="relative">
                      {editMode ? (
                        <input
                          type="text"
                          name="lastName"
                          value={editData.lastName}
                          onChange={handleEditChange}
                          className="bg-gray-50 border border-sky-300 rounded-xl px-4 py-3 w-full font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                          disabled={saving}
                        />
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-sky-300 transition-colors duration-200">
                          <div className="font-medium text-gray-800">{profile.lastName}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên
                    </label>
                    <div className="relative">
                      {editMode ? (
                        <input
                          type="text"
                          name="firstName"
                          value={editData.firstName}
                          onChange={handleEditChange}
                          className="bg-gray-50 border border-sky-300 rounded-xl px-4 py-3 w-full font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                          disabled={saving}
                        />
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-sky-300 transition-colors duration-200">
                          <div className="font-medium text-gray-800">{profile.firstName}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-sky-300 transition-colors duration-200 flex items-center gap-3">
                      <IdentificationIcon className="w-5 h-5 text-gray-400" />
                      <div className="font-medium text-gray-800">{profile.username}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <EnvelopeIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Thông tin liên hệ</h3>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ email
                  </label>
                  <div className="relative">
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="bg-gray-50 border border-emerald-300 rounded-xl px-4 py-3 w-full font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        disabled={saving}
                      />
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-emerald-300 transition-colors duration-200 flex items-center gap-3">
                        <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                        <div className="font-medium text-gray-800">{profile.email}</div>
                        <div className="ml-auto">
                          <CheckBadgeIcon className="w-5 h-5 text-emerald-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    {editMode ? (
                      <input
                        type="text"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                        className="bg-gray-50 border border-emerald-300 rounded-xl px-4 py-3 w-full font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        disabled={saving}
                      />
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 group-hover:border-emerald-300 transition-colors duration-200 flex items-center gap-3">
                        <PhoneIcon className="w-5 h-5 text-gray-400" />
                        <div className="font-medium text-gray-800">{profile.phone}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vai trò trong hệ thống
                  </label>
                  <div className="relative">
                    <div className={`${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-xl px-4 py-3 group-hover:border-opacity-60 transition-colors duration-200 flex items-center gap-3`}>
                      <RoleIcon className={`w-5 h-5 ${roleConfig.color}`} />
                      <div className={`font-medium ${roleConfig.color}`}>{roleConfig.label}</div>
                      <div className="ml-auto">
                        <CheckBadgeIconSolid className={`w-5 h-5 ${roleConfig.color}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <CalendarDaysIcon className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Thông tin tài khoản</h3>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Ngày tạo tài khoản</div>
                    <div className="text-lg font-semibold text-violet-700">
                      {formatDate(profile.createdAt)}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                    <CalendarDaysIcon className="w-6 h-6 text-violet-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                {editMode ? (
                  <>
                    <button
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
                      onClick={handleSaveEdit}
                      disabled={saving}
                    >
                      <ArrowPathIcon className={`w-5 h-5 ${saving ? 'animate-spin' : ''}`} />
                      Lưu thay đổi
                    </button>
                    <button
                      className="flex-1 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex-1 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      onClick={handleEditClick}
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                      Chỉnh sửa thông tin
                    </button>
                    <button
                      className="flex-1 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                      onClick={() => navigate('/change-password')}
                    >
                      <ShieldCheckIcon className="w-5 h-5" />
                      Đổi mật khẩu
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Security Status */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIconSolid className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Bảo mật</h4>
                <p className="text-sm text-emerald-600">Tài khoản an toàn</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Tài khoản của bạn được bảo vệ với các biện pháp bảo mật tiên tiến.
            </p>
          </div>

          {/* Activity Status */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <CheckBadgeIconSolid className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Trạng thái</h4>
                <p className="text-sm text-sky-600">Đang hoạt động</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Tài khoản đang hoạt động bình thường và có thể truy cập đầy đủ tính năng.
            </p>
          </div>

          {/* Support */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Hỗ trợ</h4>
                <p className="text-sm text-violet-600">24/7 sẵn sàng</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn khi cần thiết.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;