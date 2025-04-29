import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUser  } from '../context-api/authSlice'; // Adjust the import path as necessary
import { AiOutlineCamera } from 'react-icons/ai';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PatientForm = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    aadhaar: '',
    gender: '',
    dob: '',
    email: '',
    photo: null,
    password: '',
    confirmPassword: '',
    agreeDeclaration: false,
  });

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Constants for class names with minimal padding
  const inputStyle = "p-2 border border-gray-300 rounded w-full";
  const errorStyle = "text-red-500 text-xs mt-1";

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }

    if (name === 'aadhaar') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
      const formatted = digitsOnly.replace(/(\d{4})(\d{4})(\d{0,4})/, (_, g1, g2, g3) => [g1, g2, g3].filter(Boolean).join('-'));
      setFormData((prev) => ({ ...prev, aadhaar: formatted }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'photo' && files.length > 0) {
      const file = files[0];
      if (file && file.type.startsWith('image/')) {
        setFormData((prev) => ({ ...prev, photo: file }));
        setPhotoPreview(URL.createObjectURL(file));
      } else {
        alert('Please upload a valid image file.');
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    const phoneRegex = /^\d{10}$/; // 10-digit phone number
    const nameRegex = /^[A-Za-z]{1,10}$/; // First, middle, last name: max 10 characters, letters only
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/; // Aadhaar format
    const emailRegex = /^\S+@\S+\.\S+$/; // Email format
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/; // Strong password

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!nameRegex.test(formData.firstName)) {
      errors.firstName = "First name must be up to 10 characters and contain only letters";
    }

    if (formData.middleName && !nameRegex.test(formData.middleName)) {
      errors.middleName = "Middle name must be up to 10 characters and contain only letters";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (!nameRegex.test(formData.lastName)) {
      errors.lastName = "Last name must be up to 10 characters and contain only letters";
    }

    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }

    if (!aadhaarRegex.test(formData.aadhaar)) {
      errors.aadhaar = 'Invalid Aadhaar format';
    }

    if (!formData.dob) {
      errors.dob = 'Date of birth is required';
    }

    if (!emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }

    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeDeclaration) {
      errors.agreeDeclaration = 'You must agree to the terms and conditions';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await dispatch(registerUser (formData)); // Dispatch the registerUser  action with formData
      navigate("/verification");
    } catch (error) {
      alert("Error during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/30 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-[#0e1630] drop-shadow mb-2">Register as Patient</h2>
        <p className="text-xs text-center text-[#0e1630] mb-4">Please fill in your details to create an account.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['firstName', 'middleName', 'lastName', 'phone', 'aadhaar', 'gender', 'dob', 'email'].map((field, index) => (
              <div key={index}>
                {field === 'gender' ? (
                  <select
                    name={field}
                    onChange={handleInputChange}
                    value={formData[field]}
                    className={`${inputStyle} ${formErrors[field] ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <input
                    name={field}
                    type={field === 'dob' ? 'date' : field === 'email' ? 'email' : 'text'}
                    placeholder={
                      field === 'firstName' ? 'First Name' :
                      field === 'middleName' ? 'Middle Name' :
                      field === 'lastName' ? 'Last Name' :
                      field === 'phone' ? 'Phone Number' :
                      field === 'aadhaar' ? 'Aadhaar Number' :
                      field === 'dob' ? 'Date of Birth' :
                      field === 'email' ? 'Email Address' : ''
                    }
                    onChange={handleInputChange}
                    value={formData[field]}
                    className={`${inputStyle} ${formErrors[field] ? 'border-red-500' : ''}`}
                  />
                )}
                {formErrors[field] && <p className={errorStyle}>{formErrors[field]}</p>}
              </div>
            ))}
            <div>
              <label className="flex items-center border border-gray-300 rounded-lg p-2 pr-3 bg-white shadow-sm cursor-pointer overflow-hidden">
                <AiOutlineCamera className="text-xl text-gray-500 mr-2" />
                <span className="flex-1 truncate text-gray-700">{formData.photo ? formData.photo.name : 'Upload Photo'}</span>
                <input type="file" accept="image/*" name="photo" onChange={handleFileChange} className="hidden" />
                {formData.photo && <button type="button" onClick={() => setIsModalOpen(true)} className="text-sm text-blue-600 flex items-center gap-1 w-fit mt-1"><FiEye /></button>}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols- 2 gap-3">
            {['password', 'confirmPassword'].map((field, index) => (
              <div className="relative" key={index}>
                <input
                  name={field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={
                    field === 'password' ? 'Password' :
                    field === 'confirmPassword' ? 'Confirm Password' : ''
                  }
                  onChange={handleInputChange}
                  className={`${inputStyle} pr-8`}
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 cursor-pointer text-gray-700">
                  {/* {showPassword ? <FiEyeOff /> : <FiEye />} */}
                </span>
                {formErrors[field] && <p className={errorStyle}>{formErrors[field]}</p>}
              </div>
            ))}
          </div>

          <label className="flex items-center ">
            <input type="checkbox" name="agreeDeclaration" checked={formData.agreeDeclaration} onChange={handleInputChange} className="mr-2" />
            I agree to the declaration
          </label>
         
          {formErrors.agreeDeclaration && <p className={errorStyle}>{formErrors.agreeDeclaration}</p>}
          <div className="flex justify-center">
            <button type="submit" disabled={isSubmitting} className="bg-[#0e1630] hover:bg-[#F4C430] hover:text-[#0e1630] text-white py-2 px-6 rounded-lg shadow-lg w-full md:w-auto transition">
              {isSubmitting ? "Submitting..." : "Verify & Proceed"}
            </button>
          </div>
          <div className="text-center text-[#0e1630]">
            <p>Already have an account? <button type="button" onClick={() => navigate("/login")} className="text-[#F4C430] font-semibold">Login Here</button></p>
          </div>
          {isModalOpen && photoPreview && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded shadow-lg relative">
                <img src={photoPreview} alt="Preview" className="max-h-[80vh] max-w-full" />
                <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-xl text-gray-600">X</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PatientForm;