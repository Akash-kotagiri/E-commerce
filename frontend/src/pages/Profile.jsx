import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [editingDetails, setEditingDetails] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditDetailsToggle = () => {
    setEditingDetails(!editingDetails);
    if (!editingDetails) {
      setFormData({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
      });
    }
    setEditingPassword(false);
  };

  const handleEditPasswordToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.user.googleId) {
        toast.error('Google accounts cannot change passwords here');
        return;
      }
      setEditingPassword(!editingPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setEditingDetails(false);
    } catch (error) {
      toast.error('Failed to check account type');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setUser(response.data.user);
        setEditingDetails(false);
        toast.success('Profile updated!');
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update details error:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingPassword(false);
      toast.success('Password updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">Account Details</h2>
        {editingDetails ? (
          <form onSubmit={handleUpdateDetails} className="space-y-4">
            <div>
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Save
              </button>
              <button type="button" onClick={handleEditDetailsToggle} className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        ) : editingPassword ? (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block font-semibold">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Save
              </button>
              <button type="button" onClick={handleEditPasswordToggle} className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
            <p><strong>Address:</strong> {user?.address || 'Not provided'}</p>
            <p><strong>Joined:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Last Login:</strong> {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</p>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="border p-4 rounded-lg">
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Items:</strong> {order.items.map(item => `${item.title} (x${item.quantity})`).join(', ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={handleEditDetailsToggle} className="cursor-pointer flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
          {editingDetails ? 'Cancel Edit' : 'Edit Profile'}
        </button>
        <button onClick={handleEditPasswordToggle} className="cursor-pointer flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
          {editingPassword ? 'Cancel' : 'Change Password'}
        </button>
        <button
          onClick={handleLogout}
          className="cursor-pointer flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;