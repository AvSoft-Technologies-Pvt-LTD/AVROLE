import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, sendOTP, verifyOTP } from '../context-api/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [loginMethod, setLoginMethod] = useState('password'); // Email/password is primary
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleLogin = async () => {
    if (loginMethod === 'password') {
      const res = await dispatch(loginUser({ email, password }));

      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      } else {
        setOtpError('Invalid email or password');
      }
    } else if (loginMethod === 'otp') {
      await handleSendOTP();
    }
  };

  const handleSendOTP = async () => {
    if (phone.length === 10) {
      await dispatch(sendOTP(phone));
      setOtpSent(true);
      setOtpError('');
    } else {
      setOtpError('Invalid phone number');
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      const res = await dispatch(verifyOTP({ phone, otp: otpValue, type: 'login' }));

      if (res.meta.requestStatus === 'fulfilled') {
        setOtp(new Array(6).fill(''));
        navigate('/dashboard');
      } else {
        setOtpError('Invalid OTP');
      }
    } else {
      setOtpError('Please enter a valid OTP');
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const switchLoginMethod = (method) => {
    setLoginMethod(method);
    setOtpError('');
    if (method === 'otp') {
      setEmail('');
      setPassword('');
      setOtpSent(false);
      setOtp(new Array(6).fill(''));
    } else {
      setPhone('');
      setOtpSent(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f9fc]">
      <div className="flex items-center w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#0e1630] mb-6">
            Login to Your Account
          </h2>

          {/* Email/Password Login Form */}
          {loginMethod === 'password' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
              />
              <button
                onClick={handleLogin}
                disabled={loading || !email || !password}
                className="mt-4 bg-[#0e1630] hover:bg-[#F4C430] text-white py-2 px-4 rounded-lg w-full"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          )}

          {/* OTP Login Form */}
          {loginMethod === 'otp' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) setPhone(value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
                  maxLength="10"
                />
                <button
                  onClick={handleSendOTP}
                  disabled={loading || phone.length !== 10}
                  className="mt-2 bg-[#0e1630] hover:bg-[#F4C430] text-white py-2 px-4 rounded-lg"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>

              {otpSent && (
                <div className="mb-4">
                  <div className="flex gap-2 justify-between mb-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="w-10 h-10 text-center border border-gray-300 rounded-lg text-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.join('').length !== 6}
                    className="bg-[#0e1630] text-white py-2 px-4 rounded-lg w-full"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Error Message */}
          {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}

          {/* Switch Login Methods */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => switchLoginMethod('password')}
              className={`px-4 py-2 rounded-l-lg border-b-2 ${loginMethod === 'password' ? 'border-[#0e1630] text-[#0e1630]' : 'border-transparent text-gray-700'}`}
            >
              Email
            </button>
            <button
              onClick={() => switchLoginMethod('otp')}
              className={`px-4 py-2 rounded-r-lg border-b-2 ${loginMethod === 'otp' ? 'border-[#0e1630] text-[#0e1630]' : 'border-transparent text-gray-700'}`}
            >
              OTP
            </button>
          </div>

          {/* Register link */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Don't have an account?{' '}
            <span
              className="text-[#01D48C] hover:underline cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="w-full max-w-xs ml-8">
          <img
            src="https://img.freepik.com/premium-vector/doctor-examines-report-disease-medical-checkup-annual-doctor-health-test-appointment-tiny-person-concept-preventive-examination-patient-consults-hospital-specialist-vector-illustration_419010-581.jpg"
            alt="Login illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
