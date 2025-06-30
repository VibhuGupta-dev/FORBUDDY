import React, { useState } from 'react';
import axios from 'axios';

export const LoginUserPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    try {
      const res = await axios.post('http://localhost:3000/login', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setStatus({ loading: false, message: res.data.message, type: 'success' });
    } catch (err) {
      setStatus({ loading: false, message: err.response?.data?.message || err.message, type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">{status.loading ? 'Logging in...' : 'Login'}</button>
      {status.message && <p style={{ color: status.type === 'error' ? 'red' : 'green' }}>{status.message}</p>}
    </form>
  );
};
