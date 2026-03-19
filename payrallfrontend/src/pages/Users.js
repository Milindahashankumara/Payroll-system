import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaEye, FaSync } from 'react-icons/fa';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    role: 'Admin'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Available roles
  const availableRoles = ['Admin'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // This endpoint would need to be created in your API
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/all`
      );
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserByEmail = async (email) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/${email}`
      );
      setSelectedUser(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details', err);
      setError('Failed to load user details');
    }
  };

  const openEditModal = (user) => {
    setEditUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const updateUser = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/${editUser.email}`,
        editUser
      );
      
      // Update local state
      setUsers((prev) =>
        prev.map((u) => u.email === editUser.email ? editUser : u)
      );
      
      setIsEditModalOpen(false);
      setSuccess('User updated successfully!');
    } catch (err) {
      console.error('Error updating user', err);
      setError('Failed to update user');
    }
  };

  const deleteUser = async (email) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      // You'll need to create a delete endpoint in your API
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/${email}`
      );
      
      setUsers((prev) => prev.filter((u) => u.email !== email));
      setSuccess('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user', err);
      setError('Failed to delete user');
    }
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    // Validate passwords match
    if (newUser.password !== newUser.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        newUser
      );
      
      // Add the new user to the state
      setUsers((prev) => [...prev, res.data]);
      
      setIsCreateModalOpen(false);
      setNewUser({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        userName: '', 
        password: '', 
        confirmPassword: '', 
        role: 'User' 
      });
      setSuccess('User created successfully!');
    } catch (err) {
      console.error('Error creating user', err);
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Manager': return 'bg-purple-100 text-purple-800';
      case 'Employee': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your system users — view, edit, or remove them.
            </p>
          </div>
          <div className="flex items-center gap-3">
            
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              <FaPlus /> Create New User
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-600">Loading users...</span>
            </div>
          </div>
        )}

        {/* Table for medium+ screens */}
        {!loading && (
          <>
            <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.email} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.userName}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">Admin</td>
                          <td className="px-6 py-4 text-center text-sm">
                            <div className="inline-flex items-center gap-2">
                              <button
                                aria-label={`view-${user.email}`}
                                onClick={() => fetchUserByEmail(user.email)}
                                className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                              >
                                <FaEye />
                              </button>
                              <button
                                aria-label={`edit-${user.email}`}
                                onClick={() => openEditModal(user)}
                                className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                              >
                                <FaEdit />
                              </button>
                              <button
                                aria-label={`delete-${user.email}`}
                                onClick={() => deleteUser(user.email)}
                                className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card list for small screens */}
            <div className="sm:hidden space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.email} className="bg-white shadow-sm rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role || 'User'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">Username: {user.userName}</div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label={`view-${user.email}`}
                        onClick={() => fetchUserByEmail(user.email)}
                        className="flex-1 inline-flex items-center justify-center gap-1 p-2 rounded-md text-blue-600 hover:bg-blue-50 transition text-xs"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        aria-label={`edit-${user.email}`}
                        onClick={() => openEditModal(user)}
                        className="flex-1 inline-flex items-center justify-center gap-1 p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition text-xs"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        aria-label={`delete-${user.email}`}
                        onClick={() => deleteUser(user.email)}
                        className="flex-1 inline-flex items-center justify-center gap-1 p-2 rounded-md text-red-600 hover:bg-red-50 transition text-xs"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
                  No users found
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editUser.firstName || ''}
                  onChange={handleEditChange}
                  placeholder="First Name"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editUser.lastName || ''}
                  onChange={handleEditChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email || ''}
                  onChange={handleEditChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={editUser.userName || ''}
                  onChange={handleEditChange}
                  placeholder="Username"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value="Admin"
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={updateUser}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              height: "auto", // allow modal to grow with content
              minHeight: "unset", // remove any min-height
            }}
          >
            {/* The modal will now use only as much height as needed */}
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleNewChange}
                  placeholder="First Name"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleNewChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={newUser.userName}
                  onChange={handleNewChange}
                  placeholder="Username"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={handleNewChange}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleNewChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={createUser}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for User Details */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-3">
              <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Username:</strong> {selectedUser.userName}</p>
              <p><strong>Role:</strong> Admin</p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}