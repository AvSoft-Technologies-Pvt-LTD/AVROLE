import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../context-api/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); // Reset any previous errors
    if (phone && (loginMethod === 'otp' || password)) {
      try {
        setLoading(true); // Set loading to true when login starts
        const result = await dispatch(loginUser({ phone, password })).unwrap();

        if (result) {
          navigate("/dashboard");  // Redirect to dashboard
        }
      } catch (error) {
        setError('Login failed: ' + error); // Show error if login fails
      } finally {
        setLoading(false); // Set loading to false once login finishes
      }
    } else {
      setError('Please fill in all required fields.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f9fc]">
      <div className="flex items-center w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#0e1630] mb-6">Login to Your Account</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
            />
          </div>

          {loginMethod === 'password' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
              />
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-[#F4C430]"
              />
              <span>Remember me</span>
            </label>

            {loginMethod === 'password' && (
              <span className="text-sm text-[#F4C430] hover:underline cursor-pointer">
                Forgot Password?
              </span>
            )}
          </div>

          {/* Display error message */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <div className="flex justify-center mt-6">
          <button
            onClick={handleLogin}
            className="bg-[#0e1630] hover:bg-[#F4C430] text-white py-3 px-12 rounded-lg shadow-lg w-full md:w-auto"
            disabled={loading}
          >
            {loading ? 'Logging in...' : loginMethod === 'otp' ? 'Send OTP' : 'Login'}
          </button>
</div>
          <p className="text-sm text-gray-600 text-center mt-6">
            Don't have an account?{' '}
            <span
              className="text-[#F4C430] hover:underline cursor-pointer"
              onClick={() => navigate('/register')}>
              Register
            </span>
          </p>
        </div>

        {/* Image on the right side */}
        <div className="w-full max-w-xs ml-8 animate__animated animate__fadeInRight">
          <img
            src="https://img.freepik.com/premium-vector/doctor-examines-report-disease-medical-checkup-annual-doctor-health-test-appointment-tiny-person-concept-preventive-examination-patient-consults-hospital-specialist-vector-illustration_419010-581.jpg?ga=GA1.1.587832214.1744916073&semt=ais_hybrid&w=740"  // Replace with your image URL
            alt="Login illustration"
            className="w-full h-auto rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
