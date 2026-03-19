import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('roles', JSON.stringify(response.data.roles));
      navigate('/home');
    } catch (err) {
      const serverError = err.response?.data?.errors?.['']?.[0];
      setError(serverError || 'Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center mb-3">Sign In</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/forget-pass">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
