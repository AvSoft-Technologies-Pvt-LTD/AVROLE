import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, sendOTP } from '../context-api/authSlice';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOTPSent, isVerified, loading, error, user } = useSelector(state => state.auth);
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (!isOTPSent) {
      dispatch(sendOTP(user.phone)); // Pass the user's phone number
    }
  }, [dispatch, isOTPSent, user.phone]);

  useEffect(() => {
    if (isVerified) {
      navigate('/healthcard'); // Redirect to dashboard after verification
    }
    5
  }, [isVerified, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...enteredOtp];
    updatedOtp[index] = value;
    setEnteredOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = enteredOtp.join('');
    if (otpValue.length === 6) {
      dispatch(verifyOTP({ phone: user.phone, otp: otpValue, type: 'register' }));
    } else {
      alert('Please enter a 6-digit OTP');
    }
  };
  

  const handleResend = () => {
    dispatch(sendOTP(user.phone)); // Pass the user's phone number
    setResendTimer(30);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f9fc]">
      <div className="bg-white shadow-lg w-full max-w-4xl p-6 flex items-center border border-gray-200">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-[#0e1630] text-center">OTP Verification</h2>
          <p className="text-sm text-gray-600 text-center">
            Enter the 6-digit OTP sent to your registered number
          </p>

          <div className="flex justify-between gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={enteredOtp[index] || ''}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !enteredOtp[index]) {
                    const prevIndex = index - 1;
                    if (prevIndex >= 0) {
                      document.getElementById(`otp-input-${prevIndex}`).focus();
                    }
                  }
                }}
                id={`otp-input-${index}`}
                className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl font-semibold text-[#0e1630] focus:outline-none focus:ring-2 focus:ring-[#01D48C]"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={handleVerifyOTP}
            className="w-full bg-[#01D48C] hover:bg-[#00bd7c] transition-colors text-white font-semibold py-2 rounded-lg shadow-md mb-3"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Submit & Proceed'}
          </button>

          <div className="text-center text-sm text-gray-600">
            {resendTimer > 0 ? (
              <p>Resend OTP in {resendTimer} seconds</p>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#01D48C] hover:underline font-medium"
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 hidden lg:block">
          <img
            src="https://img.freepik.com/premium-vector/doctor-examines-report-disease-medical-checkup-annual-doctor-health-test-appointment-tiny-person-concept-preventive-examination-patient-consults-hospital-specialist-vector-illustration_419010-581.jpg?ga=GA1.1.587832214.1744916073&semt=ais_hybrid&w=740"
            alt="Login illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
      
    </div>
  );
};

export default Verification;