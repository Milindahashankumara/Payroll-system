import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tokenFromUrl = query.get('token');
  const emailFromUrl = query.get('email');

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (emailFromUrl && tokenFromUrl) {
      setEmail(emailFromUrl);
      setToken(tokenFromUrl);
    }
  }, [emailFromUrl, tokenFromUrl]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirm) {
      return setError('Passwords do not match');
    }

    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      await axios.post(`${baseUrl}/api/auth/reset-password`, {
        email,
        token,
        newPassword: password,
        confirmPassword: confirm
      });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired link');
    }
  };

  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        {done ? (
          <>
            <h4 className="text-center">Password reset!</h4>
            <Link to="/login" className="btn btn-primary w-100 mt-3">Return to Login</Link>
          </>
        ) : (
          <>
            <h4 className="text-center mb-3">Set New Password</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" value={confirm} onChange={e => setConfirm(e.target.value)} required />
              </div>
              <button className="btn btn-primary w-100">Reset Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
