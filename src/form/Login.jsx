import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, sendOTP, verifyOTP } from '../context-api/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('otp'); // Default to OTP login
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // Email state for password login
  const [password, setPassword] = useState(''); // Password state
  const [otp, setOtp] = useState(new Array(6).fill('')); // OTP state
  const inputRefs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    if (phone) {
      // Check if the phone number is registered
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.phone === phone) {
        dispatch(sendOTP());
        setOtpSent(true);
      } else {
        setError('This phone number is not registered.');
      }
    } else {
      setError('Please enter your phone number.');
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    const enteredOTP = otp.join(''); // Join the OTP array into a string
    if (!enteredOTP) {
      setError('Please enter the OTP.');
      return;
    }
    try {
      setLoading(true);
      await dispatch(verifyOTP(enteredOTP)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      setError('OTP verification failed: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithEmail = async () => {
    setError(''); // Reset error
    if (loginMethod === 'otp' && phone) {
      try {
        setLoading(true);
        const result = await dispatch(loginUser({ phone })).unwrap();
        if (result) {
          navigate('/dashboard');
        }
      } catch (err) {
        setError('Login failed: ' + err);
      } finally {
        setLoading(false);
      }
    } else if (loginMethod === 'password' && email && password) {
      try {
        setLoading(true);
        const result = await dispatch(loginUser({ email, password })).unwrap(); // Pass password too
        if (result) {
          navigate('/dashboard');
        }
      } catch (err) {
        setError('Login failed: ' + err);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter your phone number or email and password.');
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f9fc]">
      <div className="flex items-center w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#0e1630] mb-6">
            Login to Your Account
          </h2>

          <div className="flex justify-center mb-4">
            <button
              onClick={() => {
                setLoginMethod('password');
                setOtpSent(false); // Reset OTP state when switching to email
              }}
              className={`px-4 py-2 rounded-l-lg border-b-2 ${loginMethod === 'password' ? 'border-[#0e1630] text-[#0e1630]' : 'border-transparent text-gray-700'}`}
            >
              Email
            </button>
            <button
              onClick={() => {
                setLoginMethod('otp');
                setOtpSent(false); // Reset OTP state when switching to OTP
              }}
              className={`px-4 py-2 rounded-r-lg border-b-2 ${loginMethod === 'otp' ? 'border-[#0e1630] text-[#0e1630]' : 'border-transparent text-gray-700'}`}
            >
              OTP
            </button>
          </div>

          {loginMethod === 'otp' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setPhone(value);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
                maxLength="10"
              />
              <button
                onClick={handleSendOTP}
                className="mt-2 bg-[#0e1630] hover:bg-[#F4C430] text-white py-2 px-4 rounded-lg"
              >
                Send OTP
              </button>
            </div>
          )}

          {otpSent && loginMethod === 'otp' && (
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-10 h-10 text-center border border-gray-300 rounded-lg text-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
                />
              ))}
              <button
                onClick={handleVerifyOTP}
                className="bg-[#0e1630] text-white py-2 px-4 rounded-lg"
              >
                Verify OTP
              </button>
            </div>
          )}

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
              />
              <button
                onClick={handleLoginWithEmail}
                className="mt-2 bg-[#0e1630] hover:bg-[#F4C430] text-white py-2 px-4 rounded-lg"
              >
                Login
              </button>
              <p className="text-sm text-gray-600 text-center mt-6">
            Don't have an account?{" "}
            <span
              className="text-[#01D48C] hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
            </div>
          )}

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          {loading && (
            <div className="text-center mt-4">
              <p className="text-[#0e1630]">Loading...</p>
            </div>
          )}
        </div>
        <div className="flex-1 hidden lg:block">
          <img
            src="https://img.freepik.com/premium-vector/doctor-examines-report-disease-medical-checkup-annual-doctor-health-test-appointment-tiny-person-concept-preventive-examination-patient-consults-hospital-specialist-vector-illustration_419010-581.jpg?ga=GA1.1.587832214.1744916073&semt=ais_hybrid&w=740"  // Replace with your image URL
            alt="Login illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
