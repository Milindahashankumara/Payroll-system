import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SettingsModal({ email, open, onClose }) {
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState({ firstName: "", lastName: "", userName: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/Auth/${email}`)
      .then((res) => {
        setUser(res.data);
        setEditUser({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          userName: res.data.userName || "",
          email: res.data.email || "",
        });
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [email, open]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/Auth/${email}`,
        editUser
      );
      setSuccessMsg("Profile updated successfully.");
    } catch (err) {
      setErrorMsg("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMsg("New passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/Auth/change-password`,
        {
          email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword : passwordData.confirmPassword,
        }
      );
      setPasswordMsg(res.data.message || "Password changed successfully.");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordMsg(
        err.response?.data?.message || "Failed to change password."
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className="bg-white rounded-2xl shadow-2xl border w-96 max-w-full p-6 relative animate-slide-in"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold mb-2 shadow">
            {user && user.firstName ? user.firstName[0].toUpperCase() : <span className="opacity-50">?</span>}
          </div>
          <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
        </div>
        {loading ? (
          <div className="text-gray-500 text-center py-8">Loading...</div>
        ) : user ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={editUser.firstName}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editUser.lastName}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="userName"
                value={editUser.userName}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
            {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}
            {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-red-500 text-center py-8">User not found.</div>
        )}

        {/* Change Password Section */}
        <div className="mt-8 border-t pt-4">
          <button
            onClick={() => setShowPassword((s) => !s)}
            className="text-indigo-600 font-medium mb-2"
          >
            {showPassword ? "Hide Change Password" : "Change Password"}
          </button>
          {showPassword && (
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={e => setPasswordData(d => ({ ...d, currentPassword: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={e => setPasswordData(d => ({ ...d, newPassword: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={e => setPasswordData(d => ({ ...d, confirmPassword: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  required
                />
              </div>
              {passwordMsg && (
                <div className={`text-sm ${passwordMsg.includes("success") ? "text-green-600" : "text-red-600"}`}>
                  {passwordMsg}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
                >
                  Change Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{`
        .animate-slide-in {
          animation: slideInRight 0.3s cubic-bezier(.4,0,.2,1);
        }
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}