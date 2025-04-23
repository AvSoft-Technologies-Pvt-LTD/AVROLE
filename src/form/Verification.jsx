import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, loginUser } from '../context-api/authSlice';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const dispatch = useDispatch();
  const realOtp = useSelector((state) => state.auth.otp);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  
  const [resendTimer, setResendTimer] = useState(30);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

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

  const registrationData = useSelector((state) => state.auth.registrationData);

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === realOtp) {
      setLoading(true); // Start loading
      try {
        await dispatch(verifyOTP(enteredOtp)).unwrap();
        await dispatch(loginUser({
          phone: registrationData.phone,
          password: registrationData.password
        })).unwrap();
        navigate("/healthcard");
      } catch (error) {
        alert('Error during OTP verification');
      } finally {
        setLoading(false); // End loading
      }
    } else {
      alert('Invalid OTP');
    }
  };

  const handleResend = async () => {
    // Dispatch an action to generate/resend OTP here if needed
    alert('OTP resent!');
    setResendTimer(30);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f9fc]">
      <div className="bg-white  shadow-lg w-full max-w-4xl p-6 flex items-center border border-gray-200">
        {/* Form Side */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-[#0e1630] text-center">OTP Verification</h2>
          <p className="text-sm text-gray-600 text-center">
            Enter the 6-digit OTP sent to your registered number
          </p>

          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl font-semibold text-[#0e1630] focus:outline-none focus:ring-2 focus:ring-[#01D48C]"
              />
            ))}
          </div>

          {/* Show loading spinner during verification */}
          <button
            onClick={handleVerify}
            className="w-full bg-[#01D48C] hover:bg-[#00bd7c] transition-colors text-white font-semibold py-2 rounded-lg shadow-md mb-3"
            disabled={loading}  // Disable button while loading
          >
            {loading ? 'Verifying...' : 'Verify & Proceed'}
          </button>

          <div className="text-center text-sm text-gray-600">
            {resendTimer > 0 ? (
              <p>Resend OTP in {resendTimer} seconds</p>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#01D48C] hover:underline font-medium"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>

        {/* Image Side */}
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

export default OTPVerification;
