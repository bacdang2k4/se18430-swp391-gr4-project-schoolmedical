import React, { useEffect, useState } from "react";
import { getProfile } from "../api/axios";

function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data.result);
      } catch {
        setError("Không thể tải thông tin hồ sơ.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-8 text-center">Đang tải thông tin...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Thông tin cá nhân</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Họ</label>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">{profile.lastName}</div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Tên</label>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">{profile.firstName}</div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-600 font-medium">Email</label>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">{profile.email}</div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Số điện thoại</label>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">{profile.phone}</div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Role</label>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">{profile.role}</div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Ngày tạo</label>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">{new Date(profile.createdAt).toLocaleString()}</div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Username</label>
          <div className="p-2 bg-gray-50 rounded border border-gray-200">{profile.username}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
