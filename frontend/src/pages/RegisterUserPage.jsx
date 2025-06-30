import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegisterUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState({
    loading: false,
    message: '',
    type: ''
  });

  const navigate = useNavigate(); // ✅ create navigate instance here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess({ loading: true, message: '', type: '' });

    try {
      const response = await axios.post('http://localhost:3000/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // ✅ optional, if you're using cookies
      });

      setSuccess({
        loading: false,
        message: response.data.message || 'Registration successful!',
        type: 'success',
      });

      if (response.data.user) {
        navigate('/login'); // ✅ correct navigation
      }

      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setSuccess({
        loading: false,
        message: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  return (
    <div className="register-user-page">
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={success.loading}>
          {success.loading ? 'Registering...' : 'Register'}
        </button>
        {success.message && (
          <p style={{ color: success.type === 'success' ? 'green' : 'red' }}>{success.message}</p>
        )}
      </form>
    </div>
  );
};
