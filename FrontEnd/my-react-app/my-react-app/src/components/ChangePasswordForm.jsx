import React, { useState } from "react";
import { changePassword } from "../api/axios";

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setLoading(true);
    try {
      const res = await changePassword(oldPassword, newPassword, confirmPassword);
      setMessage(res.message || "Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err?.response?.data?.message || "Đổi mật khẩu thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Đổi mật khẩu</h2>
      {message && <div className="mb-4 text-green-600 text-center font-medium">{message}</div>}
      {error && <div className="mb-4 text-red-500 text-center font-medium">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Mật khẩu cũ</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Mật khẩu mới</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Xác nhận mật khẩu mới</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
      </button>
    </form>
  );
}

export default ChangePasswordForm;
