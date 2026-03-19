import { useState } from 'react';
import axios from 'axios';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      await axios.post(`${baseUrl}/api/auth/forgot-password`, { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Email not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        <h4 className="text-center mb-3">Forgot Password</h4>
        {sent ? (
          <div className="alert alert-success">
            If that email is registered, a reset link has been sent.
          </div>
        ) : (
          <>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}