import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AdminLoginProps {
  onLogin: (token: string, name: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      if (!data.token) {
        throw new Error('No token received from server');
      }

      const name = data.user?.name || data.name || credentials.email;
      localStorage.setItem('adminEmail', credentials.email);
      onLogin(data.token, name);
    } catch (err) {
      if (err instanceof TypeError) {
        setError(`Cannot connect to server. Make sure backend is running on ${API_BASE_URL}`);
      } else {
        setError(err instanceof Error ? err.message : 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage(null);

    if (!forgotEmail.trim()) {
      setForgotMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setForgotMessage({
        type: 'success',
        text: 'If an account exists with this email, a password reset link has been sent. Please check your email.',
      });
      setForgotEmail('');
    } catch (err) {
      setForgotMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to process forgot password request',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          {showForgotPassword ? 'Reset Password' : 'Admin Login'}
        </h1>

        {showForgotPassword ? (
          <>
            {forgotMessage && (
              <div
                className={`mb-4 p-3 rounded text-sm ${
                  forgotMessage.type === 'success'
                    ? 'bg-green-100 border border-green-400 text-green-700'
                    : 'bg-red-100 border border-red-400 text-red-700'
                }`}
              >
                {forgotMessage.text}
              </div>
            )}
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="admin@restaurant.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-300"
              >
                Send Reset Link
              </button>
            </form>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="w-full mt-4 text-orange-500 hover:text-orange-600 font-medium py-2"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="admin@restaurant.com"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition duration-300"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <button
              onClick={() => setShowForgotPassword(true)}
              className="w-full mt-4 text-orange-500 hover:text-orange-600 font-medium py-2"
            >
              Forgot Password?
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
