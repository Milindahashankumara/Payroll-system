import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileModal({ email, open, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/Auth/${email}`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [email, open]);

  if (!open) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border w-80 max-w-full p-6 relative animate-slide-in">
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
          <h2 className="text-xl font-bold text-gray-800">User Profile</h2>
        </div>
        {loading ? (
          <div className="text-gray-500 text-center py-8">Loading...</div>
        ) : user ? (
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="w-28 text-gray-500 font-medium">First Name:</span>
              <span className="text-gray-900">{user.firstName}</span>
            </div>
            <div className="flex items-center">
              <span className="w-28 text-gray-500 font-medium">Last Name:</span>
              <span className="text-gray-900">{user.lastName}</span>
            </div>
            <div className="flex items-center">
              <span className="w-28 text-gray-500 font-medium">Email:</span>
              <span className="text-gray-900 break-all">{user.email}</span>
            </div>
            <div className="flex items-center">
              <span className="w-28 text-gray-500 font-medium">Username:</span>
              <span className="text-gray-900">{user.userName}</span>
            </div>
          </div>
        ) : (
          <div className="text-red-500 text-center py-8">User not found.</div>
        )}
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