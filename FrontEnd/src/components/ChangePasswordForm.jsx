import React, { useState } from "react";
import { 
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  LockClosedIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { 
  ShieldCheckIcon as ShieldCheckIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid
} from "@heroicons/react/24/solid";
import { changePassword } from "../api/axios";

// Password strength checker
const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    score,
    checks,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong'
  };
};

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const passwordStrength = checkPasswordStrength(formData.newPassword);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear messages when user starts typing
    if (message) setMessage("");
    if (error) setError("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp với mật khẩu mới.");
      return;
    }

    if (passwordStrength.score < 3) {
      setError("Mật khẩu mới chưa đủ mạnh. Vui lòng chọn mật khẩu phức tạp hơn.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(formData.oldPassword, formData.newPassword, formData.confirmPassword);
      setMessage(res.message || "Đổi mật khẩu thành công!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err?.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'weak': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'strong': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 'weak': return 'Yếu';
      case 'medium': return 'Trung bình';
      case 'strong': return 'Mạnh';
      default: return 'Chưa đánh giá';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200/50 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              Đổi Mật Khẩu
            </h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Bảo vệ tài khoản của bạn bằng cách cập nhật mật khẩu thường xuyên
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          {/* Security Header */}
          <div className="bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <LockClosedIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Bảo mật tài khoản</h2>
                <p className="text-white/80 text-sm">Cập nhật mật khẩu để tăng cường bảo mật</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Success Message */}
            {message && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <CheckCircleIconSolid className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-emerald-800">Thành công!</div>
                  <div className="text-emerald-700 text-sm">{message}</div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <ExclamationTriangleIconSolid className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-red-800">Có lỗi xảy ra</div>
                  <div className="text-red-700 text-sm">{error}</div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu hiện tại
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPasswords.old ? "text" : "password"}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                      focusedField === 'oldPassword' ? 'border-sky-300 bg-sky-50/30' : 'border-gray-300 bg-gray-50'
                    }`}
                    value={formData.oldPassword}
                    onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                    onFocus={() => setFocusedField('oldPassword')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => togglePasswordVisibility('old')}
                  >
                    {showPasswords.old ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                      focusedField === 'newPassword' ? 'border-sky-300 bg-sky-50/30' : 'border-gray-300 bg-gray-50'
                    }`}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    onFocus={() => setFocusedField('newPassword')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Độ mạnh mật khẩu:</span>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full border ${getStrengthColor(passwordStrength.strength)}`}>
                        {getStrengthText(passwordStrength.strength)}
                      </span>
                    </div>
                    
                    {/* Strength Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.strength === 'weak' ? 'bg-red-500' :
                          passwordStrength.strength === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>

                    {/* Password Requirements */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className={`flex items-center gap-2 ${passwordStrength.checks.length ? 'text-emerald-600' : 'text-gray-500'}`}>
                        <CheckCircleIcon className={`w-4 h-4 ${passwordStrength.checks.length ? 'text-emerald-500' : 'text-gray-400'}`} />
                        Ít nhất 8 ký tự
                      </div>
                      <div className={`flex items-center gap-2 ${passwordStrength.checks.uppercase ? 'text-emerald-600' : 'text-gray-500'}`}>
                        <CheckCircleIcon className={`w-4 h-4 ${passwordStrength.checks.uppercase ? 'text-emerald-500' : 'text-gray-400'}`} />
                        Chữ hoa (A-Z)
                      </div>
                      <div className={`flex items-center gap-2 ${passwordStrength.checks.lowercase ? 'text-emerald-600' : 'text-gray-500'}`}>
                        <CheckCircleIcon className={`w-4 h-4 ${passwordStrength.checks.lowercase ? 'text-emerald-500' : 'text-gray-400'}`} />
                        Chữ thường (a-z)
                      </div>
                      <div className={`flex items-center gap-2 ${passwordStrength.checks.number ? 'text-emerald-600' : 'text-gray-500'}`}>
                        <CheckCircleIcon className={`w-4 h-4 ${passwordStrength.checks.number ? 'text-emerald-500' : 'text-gray-400'}`} />
                        Số (0-9)
                      </div>
                      <div className={`flex items-center gap-2 ${passwordStrength.checks.special ? 'text-emerald-600' : 'text-gray-500'}`}>
                        <CheckCircleIcon className={`w-4 h-4 ${passwordStrength.checks.special ? 'text-emerald-500' : 'text-gray-400'}`} />
                        Ký tự đặc biệt
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 ${
                      focusedField === 'confirmPassword' ? 'border-sky-300 bg-sky-50/30' : 'border-gray-300 bg-gray-50'
                    } ${
                      formData.confirmPassword && formData.newPassword !== formData.confirmPassword ? 'border-red-300 bg-red-50/30' : ''
                    }`}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className={`mt-2 flex items-center gap-2 text-sm ${
                    formData.newPassword === formData.confirmPassword ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {formData.newPassword === formData.confirmPassword ? (
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                    )}
                    {formData.newPassword === formData.confirmPassword ? 'Mật khẩu khớp' : 'Mật khẩu không khớp'}
                  </div>
                )}
              </div>
            </div>

            {/* Security Tips */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <InformationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Mẹo bảo mật</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Sử dụng mật khẩu duy nhất cho mỗi tài khoản</li>
                    <li>• Không chia sẻ mật khẩu với bất kỳ ai</li>
                    <li>• Thay đổi mật khẩu định kỳ (3-6 tháng)</li>
                    <li>• Tránh sử dụng thông tin cá nhân trong mật khẩu</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading || passwordStrength.score < 3 || formData.newPassword !== formData.confirmPassword}
                className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-medium hover:from-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <ShieldCheckIconSolid className="w-5 h-5" />
                    Cập nhật mật khẩu
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Security Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIconSolid className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Bảo mật cao</h4>
                <p className="text-sm text-emerald-600">Mã hóa end-to-end</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Mật khẩu của bạn được mã hóa và bảo vệ bằng các tiêu chuẩn bảo mật cao nhất.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <InformationCircleIcon className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Hỗ trợ 24/7</h4>
                <p className="text-sm text-sky-600">Luôn sẵn sàng giúp đỡ</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Nếu gặp khó khăn, đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordForm;