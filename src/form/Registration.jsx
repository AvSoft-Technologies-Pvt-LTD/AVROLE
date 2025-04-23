import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveRegistrationData, setUser, setOTP, sendOTP, registerUser } from '../context-api/authSlice';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCamera } from 'react-icons/ai';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '',
    phone: '', aadhaar: '', dob: '', gender: '',
    email: '', password: '', confirmPassword: '',
    photo: null, region: '+91', declaration: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "aadhaar") {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
      const formatted = digitsOnly.replace(/(\d{4})(\d{4})(\d{0,4})/, (_, g1, g2, g3) =>
        [g1, g2, g3].filter(Boolean).join('-')
      );
      return setForm({ ...form, aadhaar: formatted });
    }

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      return setForm({ ...form, phone: digitsOnly });
    }

    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!emailRegex.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!phoneRegex.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!aadhaarRegex.test(form.aadhaar)) newErrors.aadhaar = 'Invalid Aadhaar format';
    if (!form.gender) newErrors.gender = 'Please select gender';
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!passwordRegex.test(form.password)) newErrors.password = 'Weak password';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!form.photo) newErrors.photo = 'Upload a photo';
    if (!form.declaration) newErrors.declaration = 'Please accept declaration';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const result = await dispatch(registerUser(form)).unwrap();
        dispatch(setOTP('123456'));
        dispatch(sendOTP());
        dispatch(setUser(result));
        navigate("/verification");
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl p-8 sm:p-10  shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/30">
        <h2 className="text-3xl font-bold text-center text-[#0e1630] drop-shadow mb-1">Register</h2>
        <p className="text-sm text-center text-[#0e1630] mb-6">Please fill in your details to create an account.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input name="firstName" placeholder="First Name" onChange={handleChange} className="input border border-gray-300 rounded-lg p-2" />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}

          <input name="middleName" placeholder="Middle Name" onChange={handleChange} className="input border border-gray-300 rounded-lg p-2" />

          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input border border-gray-300 rounded-lg p-2" />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}

          <div className="flex flex-col">
            <div className="flex gap-2">
              <select name="region" value={form.region} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-[90px]">
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
              </select>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input border border-gray-300 rounded-lg p-2 w-full" />
            </div>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="input border border-gray-300 rounded-lg p-2" />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

          <select name="gender" value={form.gender} onChange={handleChange} className="input border border-gray-300 rounded-lg p-2">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}

          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="input border border-gray-300 rounded-lg p-2" />
          {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}

          <input name="aadhaar" placeholder="Aadhaar Number (XXXX-XXXX-XXXX)" value={form.aadhaar} onChange={handleChange} className="input border border-gray-300 rounded-lg p-2" />
          {errors.aadhaar && <p className="text-xs text-red-500">{errors.aadhaar}</p>}

          <div className="relative flex flex-col gap-2">
        <label className="flex items-center border border-gray-300 rounded-lg p-2 pr-3 bg-white shadow-sm cursor-pointer overflow-hidden">
          <AiOutlineCamera className="text-xl text-gray-500 mr-2" />
          <span className="flex-1 truncate text-gray-700">
            {form.photo ? form.photo.name : 'Upload Photo'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
           {form.photo && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-600 flex items-center gap-1 w-fit mt-1"
          >
            <FiEye />
          </button>
        )}
        </label>
        {/* Error */}
        {errors.photo && (
          <p className="text-xs text-red-500">{errors.photo}</p>
        )}
      </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create Password"
              onChange={handleChange}
              className="input pr-10 border border-gray-300 rounded-lg p-2 w-full"
            />
            {/* <span onClick={togglePassword} className="absolute top-3 right-3 cursor-pointer text-gray-700">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span> */}
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="input pr-10 border border-gray-300 rounded-lg p-2 w-full"
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="flex items-center mt-6 text-[#0e1630]">
          <input type="checkbox" name="declaration" checked={form.declaration} onChange={handleChange} className="mr-2" />
          <label>I hereby declare that the information provided is true and accurate.</label>
        </div>
        {errors.declaration && <p className="text-xs text-red-500">{errors.declaration}</p>}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#0e1630] hover:bg-[#F4C430] text-white py-3 px-8 rounded-lg shadow-lg w-full md:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Verify & Proceed'}
          </button>
        </div>

        <div className="text-center mt-4 text-[#0e1630]">
          <p>
            Already have an account?{' '}
            <button onClick={() => navigate("/login")} className="text-[#F4C430] font-semibold">
              Login Here
            </button>
          </p>
        </div>

        {/* Popup Modal for Photo */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-full h-auto object-contain rounded"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default RegisterForm;

