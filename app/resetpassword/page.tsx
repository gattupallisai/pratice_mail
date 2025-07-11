"use client";
import { useState } from 'react';
import { FaLock, FaEnvelope, FaCheck, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  // Password validation rules
  const validatePassword = (password: string) => {
    const errors = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
    setPasswordErrors(errors);
    return Object.values(errors).every(Boolean);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value.length > 0) {
      validatePassword(value);
    } else {
      setPasswordErrors({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (!validatePassword(newPassword)) {
      setError('Password does not meet requirements');
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your API here:
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, currentPassword, newPassword })
      // });
      
      // if (!response.ok) throw new Error('Password reset failed');
      
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to reset password');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <FaCheck className="text-2xl text-green-600" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-center">Password Updated</h2>
        <p className="mb-6 text-center text-gray-600">
          Your password has been successfully updated.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <FaLock className="text-4xl text-blue-600" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Reset Your Password
        </h2>
        
        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Company Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="yourname@company.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="currentPassword" className="block mb-1 text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            
            {/* Password requirements checklist */}
            <div className="mt-2 space-y-1 text-xs">
              <p className="text-gray-500">Password must contain:</p>
              <ul className="space-y-1">
                <li className={`flex items-center ${passwordErrors.length ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordErrors.length ? <FaCheck className="mr-1" /> : <FaExclamationTriangle className="mr-1" />}
                  At least 8 characters
                </li>
                <li className={`flex items-center ${passwordErrors.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordErrors.uppercase ? <FaCheck className="mr-1" /> : <FaExclamationTriangle className="mr-1" />}
                  1 uppercase letter (A-Z)
                </li>
                <li className={`flex items-center ${passwordErrors.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordErrors.lowercase ? <FaCheck className="mr-1" /> : <FaExclamationTriangle className="mr-1" />}
                  1 lowercase letter (a-z)
                </li>
                <li className={`flex items-center ${passwordErrors.number ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordErrors.number ? <FaCheck className="mr-1" /> : <FaExclamationTriangle className="mr-1" />}
                  1 number (0-9)
                </li>
                <li className={`flex items-center ${passwordErrors.symbol ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordErrors.symbol ? <FaCheck className="mr-1" /> : <FaExclamationTriangle className="mr-1" />}
                  1 special character (!@#$% etc.)
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;