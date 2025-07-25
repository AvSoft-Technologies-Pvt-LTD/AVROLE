import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Upload, FileText, X, Camera, Phone, ChevronDown } from 'lucide-react';
const NeatFileUpload = ({ name, accept, multiple = false, files, onFileChange, label, required = false, icon: Icon = Upload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const handlePreview = (file) => {
    setPreviewDoc(file);
    setIsModalOpen(true);
  };
 return (
  <div className="relative floating-input" data-placeholder={`${label}${required ? ' *' : ''}`}>
    <label className="block cursor-pointer">
      <div className="input-field flex items-center gap-2 peer">
        <Icon size={16} />
        <span className="truncate">{label}{required && ' *'}</span>
      </div>
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={onFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer peer"
      />
    </label>

    {/* Uploaded Files */}
    {files?.length > 0 && (
      <div className="mt-2 space-y-1">
        {files.map((file, i) => (
          <div key={i} className="flex justify-between items-center p-2 border rounded-md">
            <span className="text-sm text-gray-700">{file.name}</span>
            <button type="button" onClick={() => handlePreview(file)} className="text-blue-500 hover:text-blue-700">
              <Eye size={14} />
            </button>
          </div>
        ))}
      </div>
    )}

    {/* Preview Modal */}
    {isModalOpen && previewDoc && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="relative bg-white p-4 rounded-lg w-full max-w-2xl">
          <button className="absolute top-2 right-2 text-red-500" onClick={() => { setIsModalOpen(false); setPreviewDoc(null); }}>
            <X size={24} />
          </button>
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          {previewDoc.type.startsWith("image/") ? (
            <img src={URL.createObjectURL(previewDoc)} alt="Preview" className="max-h-[500px] w-full object-contain" />
          ) : previewDoc.type === "application/pdf" ? (
            <iframe src={URL.createObjectURL(previewDoc)} className="w-full h-[500px]" title="PDF Preview" />
          ) : (
            <p className="text-gray-600">Preview not available for this file type.</p>
          )}
        </div>
      </div>
    )}
  </div>
);
};
const PhotoUpload = ({ photoPreview, onPhotoChange, onPreviewClick }) => (
  <div className="relative floating-input" data-placeholder="Upload Photo *">
    <label className="block relative cursor-pointer">
      <div className="input-field flex items-center gap-2 peer">
        <Camera size={16} /> <span className="truncate">Upload Photo *</span>
      </div>
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={onPhotoChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </label>

    {photoPreview && (
      <div className="mt-2">
        <img
          src={photoPreview}
          alt="Preview"
          onClick={onPreviewClick}
          className="cursor-pointer rounded-lg border p-1 max-h-40 object-contain"
        />
      </div>
    )}
  </div>
);
const CompactDropdownCheckbox = ({ 
  label, 
  options, 
  selected, 
  onChange, 
  required = false,
  placeholder = "Select options",
  allowOther = false,
  otherValue = "",
  onOtherChange = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (option, checked) => {
    if (checked) {
      onChange([...selected, option]);
    } else {
      onChange(selected.filter(item => item !== option));
    }
  };

  const displayText = selected.length > 0 
    ? selected.length === 1 
      ? selected[0] 
      : `${selected.length} selected`
    : placeholder;

  return (
    <div className="floating-input relative w-full" data-placeholder={label + (required ? ' *' : '')}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="input-field peer w-full flex items-center justify-between text-left"
        >
          <span className={selected.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
            {displayText}
          </span>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                  className="mr-3 rounded border-gray-300 text-[#0E1630] focus:ring-[#0E1630]"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
            {allowOther && (
              <div className="border-t border-gray-200 p-3">
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selected.includes("Other")}
                    onChange={(e) => handleCheckboxChange("Other", e.target.checked)}
                    className="mr-3 rounded border-gray-300 text-[#0E1630] focus:ring-[#0E1630]"
                  />
                  <span className="text-sm text-gray-700">Other</span>
                </label>
                {selected.includes("Other") && (
                  <input
                    type="text"
                    placeholder="Specify other..."
                    value={otherValue}
                    onChange={(e) => onOtherChange(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#0E1630]"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [patientFormData, setPatientFormData] = useState({
    firstName: '', middleName: '', lastName: '', phone: '', aadhaar: '', gender: '', dob: '', email: '', occupation: '', temporaryAddress: '', permanentAddress: '', isSameAsPermanent: false, photo: null, password: '', confirmPassword: '', agreeDeclaration: false,
  });
  const [patientFormErrors, setPatientFormErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "", confirmPassword: "",
    hospitalName: "", headCeoName: "", registrationNumber: "",
    phone: "", location: "", hospitalType: [], email: "",
    gstNumber: "", nabhCertificate: null, inHouseLab: "",
    inHousePharmacy: "", labLicenseNo: "", pharmacyLicenseNo: "",
    agreeDeclaration: false, otherHospitalType: "",
    centerType: "", centerName: "", ownerFullName: "",
    availableTests: [], scanServices: [], specialServices: [],
    licenseNumber: "", certificates: [], certificateTypes: [],
    otherCertificate: "", otherSpecialService: "",
    firstName: "", middleName: "", lastName: "",
    aadhaar: "", gender: "", dob: "", photo: null,
    documents: [],
    roleSpecificData: {
      registrationNumber: "", practiceType: "",
      specialization: "", qualification: "",
      location: "", agreeDeclaration: false
    }});
  const hospitalTypeOptions = ["General Hospital", "Multi-specialty Hospital", "Super-specialty Hospital", "Maternity/Nursing Home", "Dental Hospital", "Government", "Private"];
const labTestOptions = ["CBC (Complete Blood Count)", "Blood Sugar (FBS, PPBS, HbA1c)", "Lipid Profile", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Thyroid Profile (T3, T4, TSH)", "Urine Test", "Dengue, Malaria, etc."];
const scanServiceOptions = ["X-Ray", "MRI", "CT Scan", "Ultrasound", "ECG", "2D Echo", "Mammography"];
const specialServicesOptions = ["Home Sample Collection", "Emergency Diagnostic Services", "Tele-Radiology Services", "Mobile Diagnostic Units"];

const certificateTypeOptions = ["Lab/Scan Registration Certificate", "GST Certificate", "Lab/Scan License Document", "NABL Accreditation Certificate"];
  const ayushSpecializations = [ "Ayurveda", "Homeopathy", "Unani", "Siddha", "Naturopathy", "Yoga"];
  const allopathySpecializations = ["General Medicine", "Pediatrics", "Cardiology", "Orthopedics", "Dermatology", "Gynecology", "ENT", "Ophthalmology", "Radiology", ];
  const specializationToPracticeType = {
  Ayurveda: ["Ayush"], Homeopathy: ["Ayush"], Unani: ["Ayush"],
  Siddha: ["Ayush"], Naturopathy: ["Ayush"], Yoga: ["Ayush"],
  "General Medicine": ["Allopathy"], Pediatrics: ["Allopathy"],
  Cardiology: ["Allopathy"], Orthopedics: ["Allopathy"],
  Dermatology: ["Allopathy"], Gynecology: ["Allopathy"],
  ENT: ["Allopathy"], Ophthalmology: ["Allopathy"],
  Psychiatry: ["Allopathy"], Radiology: ["Allopathy"]
};
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  // Determine which form state to update
  const isPatient = userType === "patient";
  if (type === "checkbox") {
    if (isPatient) {
      setPatientFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  } else {
    if (name === "phone") {
      const formatted = value.replace(/\D/g, "").slice(0, 10);
      if (isPatient) {
        setPatientFormData(prev => ({ ...prev, phone: formatted }));
      } else {
        setFormData(prev => ({ ...prev, phone: formatted }));
      }
      return;
    }
    if (name === "aadhaar") {
      const formatted = value
        .replace(/\D/g, "")
        .slice(0, 12)
        .replace(
          /(\d{4})(\d{4})(\d{0,4})/,
          (_, g1, g2, g3) => [g1, g2, g3].filter(Boolean).join("-")
        );
      if (isPatient) {
        setPatientFormData(prev => ({ ...prev, aadhaar: formatted }));
      } else {
        setFormData(prev => ({ ...prev, aadhaar: formatted }));
      }
      return;
    }
    // For roleSpecificData fields (doctor)
    if (!isPatient && name.startsWith("roleSpecificData.")) {
      const fieldName = name.replace("roleSpecificData.", "");
      // If specialization changes, update practiceType accordingly
      if (fieldName === "specialization") {
        const possiblePracticeTypes = specializationToPracticeType[value] || [];
        setFormData(prev => ({
          ...prev,
          roleSpecificData: {
            ...prev.roleSpecificData,
            specialization: value,
            practiceType: possiblePracticeTypes.length === 1 ? possiblePracticeTypes[0] : ""
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          roleSpecificData: { ...prev.roleSpecificData, [fieldName]: value }
        }));
      }
    } else {
      if (isPatient) {
        setPatientFormData(prev => ({ ...prev, [name]: value }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    }
  }
  setErrors(prev => ({ ...prev, [name]: "" }));
};

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "photo" && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setFormData(prev => ({ ...prev, photo: file }));
        setPhotoPreview(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid photo.");
      }
    } else if (name === "nabhCertificate" && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, nabhCertificate: file }));
    } else if (name === "certificates" && files.length > 0) {
      const validFiles = Array.from(files).filter(
        file => file.type === "application/pdf" || file.type.startsWith("image/")
      );
      if (validFiles.length > 0) {
        setFormData(prev => ({
          ...prev,
          certificates: [...(prev.certificates || []), ...validFiles]
        }));
      } else {
        alert("Only PDF or image files are allowed.");
      }
    } else if (name === "documents" && files.length > 0) {
      const validFiles = Array.from(files).filter(
        file => file.type === "application/pdf" || file.type.startsWith("image/")
      );
      if (validFiles.length > 0) {
        setFormData(prev => ({
          ...prev,
          documents: [...(prev.documents || []), ...validFiles]
        }));
      } else {
        alert("Only PDF or image files are allowed.");
      }
    }
  };
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must include capital letters, numbers, and special characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (userType === "hospital") {
      if (!formData.hospitalName.trim()) newErrors.hospitalName = "Hospital name is required";
      if (!formData.headCeoName.trim()) newErrors.headCeoName = "Head/CEO name is required";
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
      if (!formData.phone.match(phoneRegex)) newErrors.phone = "Phone must be 10 digits";
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.hospitalType.length) newErrors.hospitalType = "Please select hospital type";
      if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";
      if (!formData.gstNumber.trim()) newErrors.gstNumber = "GST number is required";
      if (!formData.nabhCertificate) newErrors.nabhCertificate = "NABH certificate is required";
      if (!formData.inHouseLab) newErrors.inHouseLab = "Please select if you have in-house lab";
      if (!formData.inHousePharmacy) newErrors.inHousePharmacy = "Please select if you have in-house pharmacy";
      if (formData.inHouseLab === "yes" && !formData.labLicenseNo.trim()) {
        newErrors.labLicenseNo = "Lab license number is required";
      }
      if (formData.inHousePharmacy === "yes" && !formData.pharmacyLicenseNo.trim()) {
        newErrors.pharmacyLicenseNo = "Pharmacy license number is required";
      }
      if (!formData.agreeDeclaration) newErrors.agreeDeclaration = "Please accept the declaration";
    }
    if (userType === "lab") {
      if (!formData.centerType.trim()) newErrors.centerType = "Center type is required";
      if (!formData.centerName.trim()) newErrors.centerName = "Center name is required";
      if (!formData.ownerFullName.trim()) newErrors.ownerFullName = "Owner's full name is required";
      if (!formData.phone.match(phoneRegex)) newErrors.phone = "Phone must be 10 digits";
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
      if (!formData.availableTests.length) newErrors.availableTests = "Please select available tests";
      if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.gstNumber.trim()) newErrors.gstNumber = "GST number is required";
      if (!formData.certificates.length) newErrors.certificates = "Please upload certificates";
      if (!formData.certificateTypes.length) newErrors.certificateTypes = "Please select certificate types";
      if (!formData.specialServices.length) newErrors.specialServices = "Please select special services";
      if (!formData.agreeDeclaration) newErrors.agreeDeclaration = "Please accept the declaration";
    }
    if (userType === "doctor") {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.phone.match(phoneRegex)) newErrors.phone = "Phone must be 10 digits";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";
      if (!formData.photo) newErrors.photo = "Photo is required";
      if (!formData.roleSpecificData.registrationNumber.trim()) {
        newErrors.registrationNumber = "Registration number is required";
      }
      if (!formData.roleSpecificData.practiceType) newErrors.practiceType = "Practice type is required";
      if (!formData.roleSpecificData.specialization) newErrors.specialization = "Specialization is required";
      if (!formData.roleSpecificData.qualification) newErrors.qualification = "Qualification is required";
      if (!formData.roleSpecificData.location) newErrors.location = "Location is required";
      if (!formData.roleSpecificData.agreeDeclaration) {
        newErrors.agreeDeclaration = "Please accept the declaration";
      }
    }
    setErrors(newErrors);return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();if (!validateForm()) return;setIsSubmitting(true); setTimeout(() => {   console.log("Form submitted:", formData);
      alert("Registration successful!"); setIsSubmitting(false); navigate("/verification");  }, 2000); };
  const renderInput = (name, type = "text", placeholder = "", required = false) => (
  <div className="floating-input relative w-full" data-placeholder={`${placeholder}${required ? " *" : ""}`}>
    <input
      type={type} name={name} placeholder=" " required={required} autoComplete="off"
      value={formData[name] || ""} onChange={handleInputChange}
      className={`input-field peer ${errors[name] ? "input-error" : ""}`}
    />
    <label htmlFor={name} className="sr-only">{placeholder}</label>
    {errors[name] && <p className="error-text">{errors[name]}</p>}
  </div>
);  const renderSelect = (name, options, placeholder, required = false) => (
    <div className="floating-input relative w-full" data-placeholder={placeholder + (required ? " *" : "")}>
      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleInputChange}
        className={`input-field peer ${errors[name] ? "input-error" : ""}`}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <label htmlFor={name} className="sr-only">{placeholder}</label>
      {errors[name] && <p className="error-text">{errors[name]}</p>}
    </div>
  );
const renderHospitalForm = () => (
  <div className="space-y-6 mt-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {renderInput("hospitalName","text","Hospital Name",true)}
      {renderInput("headCeoName","text","Head/ CEO Name",true)}
      {renderInput("registrationNumber","text","Register Number",true)}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="floating-input relative w-full" data-placeholder="Phone Number *">
        <input type="text" name="phone" placeholder=" " maxLength="10" value={formData.phone} onChange={handleInputChange} className={`input-field peer rounded-l-none ${errors.phone?"input-error":""}`} />
        {errors.phone && <p className="error-text">{errors.phone}</p>}
      </div>
      {renderInput("location","text","Location",true)}
      {renderInput("email","email","Email ID",true)}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CompactDropdownCheckbox label="Select Hospital Type" required placeholder="Select Hospital Type"
        options={hospitalTypeOptions} selected={formData.hospitalType}
        onChange={s=>setFormData(p=>({...p,hospitalType:s}))}
        allowOther otherValue={formData.otherHospitalType}
        onOtherChange={v=>setFormData(p=>({...p,otherHospitalType:v}))}/>
      {renderInput("gstNumber","text","Enter GST number",true)}
      <NeatFileUpload name="nabhCertificate" label="Upload NABH certificate" required icon={FileText}
        accept="application/pdf,image/*" files={formData.nabhCertificate?[formData.nabhCertificate]:[]} onFileChange={handleFileChange}/>
    </div>
    {errors.hospitalType && <p className="error-text">{errors.hospitalType}</p>}
<h3 className="text-lg font-semibold text-gray-800 -mb-1">
  Additional Information
</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
    {["inHouseLab","inHousePharmacy"].map(field=>(
      <div key={field}>
        <label className=" font-medium text-gray-700 ">Do you have an {field==="inHouseLab"?"in-house Lab/Scan center":"in-house Pharmacy"}? *</label>
        <div className="flex space-x-4 mb-3">{["yes","no"].map(val=>(
          <label key={val} className="flex items-center">
            <input type="radio" name={field} value={val} checked={formData[field]===val} onChange={handleInputChange} className="mr-2"/>{val==="yes"?"Yes":"No"}
          </label>))}
        </div>
        {errors[field] && <p className="error-text">{errors[field]}</p>}
        {formData[field]==="yes" && (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {renderInput(field==="inHouseLab"?"labLicenseNo":"pharmacyLicenseNo","text",`If Yes, Enter the ${field==="inHouseLab"?"Lab":"Pharmacy"} License No.`,true)}
          </div>
        )}
      </div>
    ))}
  </div>
  </div>
);
 const renderLabForm = () => (
  <div className="space-y-6 mt-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="floating-input relative w-full" data-placeholder="Center Type *">
        <select name="centerType" value={formData.centerType} onChange={handleInputChange} className={`input-field peer ${errors.centerType?"input-error":""}`} required>
          <option value="">Select Center Type</option><option value="Lab">Lab</option><option value="Scan">Scan</option><option value="Lab & Scan">Lab & Scan</option>
        </select>
        {errors.centerType && <p className="error-text">{errors.centerType}</p>}
      </div>
      {renderInput("centerName","text","Center Name",true)}
      {renderInput("ownerFullName","text","Owner's Full Name",true)}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CompactDropdownCheckbox label="Available Tests/Scans" options={labTestOptions} selected={formData.availableTests} onChange={s=>setFormData(p=>({...p,availableTests:s}))} required placeholder="Select Available Tests"/>
      <div className="floating-input relative w-full" data-placeholder="Phone No. *">
        <input type="text" name="phone" placeholder=" " maxLength="10" value={formData.phone} onChange={handleInputChange} className={`input-field peer rounded-l-none ${errors.phone?"input-error":""}`}/>
        {errors.phone && <p className="error-text">{errors.phone}</p>}
      </div>
      {renderInput("registrationNumber","text","Registration Number",true)}
    </div>
    {errors.availableTests && <p className="error-text">{errors.availableTests}</p>}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CompactDropdownCheckbox label="Scan Services" options={scanServiceOptions} selected={formData.scanServices} onChange={s=>setFormData(p=>({...p,scanServices:s}))} placeholder="Select Scan Services"/>
      <CompactDropdownCheckbox label="Special Services" options={specialServicesOptions} selected={formData.specialServices} onChange={s=>setFormData(p=>({...p,specialServices:s}))} required placeholder="Select Special Services" allowOther otherValue={formData.otherSpecialService} onOtherChange={v=>setFormData(p=>({...p,otherSpecialService:v}))}/>
      {renderInput("email","email","Email ID",true)}
    </div>
    {errors.specialServices && <p className="error-text">{errors.specialServices}</p>}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {renderInput("licenseNumber","text","License Number",true)}
      {renderInput("location","text","Location",true)}
      {renderInput("gstNumber","text","GST Number",true)}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NeatFileUpload name="certificates" accept="application/pdf,image/*" multiple files={formData.certificates||[]} onFileChange={handleFileChange} label="Upload Certificates" required icon={FileText}/>
      <CompactDropdownCheckbox label="Certificate Types" options={certificateTypeOptions} selected={formData.certificateTypes} onChange={s=>setFormData(p=>({...p,certificateTypes:s}))} required placeholder="Select Certificate Types" allowOther otherValue={formData.otherCertificate} onOtherChange={v=>setFormData(p=>({...p,otherCertificate:v}))}/>
    </div>
    {errors.certificates && <p className="error-text">{errors.certificates}</p>}
    {errors.certificateTypes && <p className="error-text">{errors.certificateTypes}</p>}
  </div>
);
const renderDoctorForm = () => {
  const practiceTypeOptions = ["Ayush","Allopathy"];
  const specializationOptions = formData.roleSpecificData.practiceType==="Ayush"?ayushSpecializations:formData.roleSpecificData.practiceType==="Allopathy"?allopathySpecializations:[];
  const handlePracticeTypeChange = e=>{
    const v=e.target.value;
    setFormData(p=>({...p,roleSpecificData:{...p.roleSpecificData,practiceType:v,specialization:""}}));
    setErrors(p=>({...p,"roleSpecificData.practiceType":""}));
  };
  const handleSpecializationChange = e=>{
    const v=e.target.value;
    setFormData(p=>({...p,roleSpecificData:{...p.roleSpecificData,specialization:v}}));
    setErrors(p=>({...p,"roleSpecificData.specialization":""}));
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput("firstName","text","First Name",true)}
        {renderInput("middleName","text","Middle Name")}
        {renderInput("lastName","text","Last Name",true)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="floating-input relative w-full" data-placeholder="Phone Number *">
          <input type="text" name="phone" placeholder=" " value={formData.phone} onChange={handleInputChange} maxLength="10" className={`input-field peer rounded-l-none ${errors.phone?"input-error":""}`}/>
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>
        {renderInput("aadhaar","text","Aadhaar Number")}
        <div className="floating-input relative w-full" data-placeholder="Gender *">
          <select name="gender" value={formData.gender} onChange={handleInputChange} className={`input-field peer ${errors.gender?"input-error":""}`}>
            <option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput("dob","date","Date of Birth",true)}
        {renderInput("email","email","Email",true)}
        <PhotoUpload photo={formData.photo} onPhotoChange={handleFileChange} photoPreview={photoPreview} onPreviewClick={()=>setIsModalOpen(true)}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="floating-input relative w-full" data-placeholder="Registration Number *">
          <input type="text" name="roleSpecificData.registrationNumber" placeholder=" " value={formData.roleSpecificData.registrationNumber} onChange={handleInputChange} className={`input-field peer ${errors.registrationNumber?"input-error":""}`}/>
          {errors.registrationNumber && <p className="error-text">{errors.registrationNumber}</p>}
        </div>

        <div className="floating-input relative w-full" data-placeholder="Practice Type *">
          <select name="roleSpecificData.practiceType" value={formData.roleSpecificData.practiceType} onChange={handlePracticeTypeChange} className={`input-field peer ${errors.practiceType?"input-error":""}`} required>
            <option value="">Select Practice Type</option>{practiceTypeOptions.map(o=><option key={o}>{o}</option>)}
          </select>
          {errors.practiceType && <p className="error-text">{errors.practiceType}</p>}
        </div>

        <div className="floating-input relative w-full" data-placeholder="Specialization *">
          <select name="roleSpecificData.specialization" value={formData.roleSpecificData.specialization} onChange={handleSpecializationChange} disabled={!formData.roleSpecificData.practiceType} className={`input-field peer ${errors.specialization?"input-error":""}`} required>
            <option value="">Select Specialization</option>{specializationOptions.map(o=><option key={o}>{o}</option>)}
          </select>
          {errors.specialization && <p className="error-text">{errors.specialization}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderInput("roleSpecificData.qualification","text","Qualification",true)}
        {renderInput("roleSpecificData.location","text","Location",true)}
        <NeatFileUpload name="documents" accept="application/pdf,image/*" multiple files={formData.documents||[]} onFileChange={handleFileChange} label="Upload Documents" icon={FileText}/>
      </div>
    </div>
  );
};
 if (!userType) return (
  <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center">
    <div className="text-center">
      <h2 className="h2-heading mb-4">Please select a user type first</h2>
      <button onClick={()=>navigate("/register-select")} className="btn btn-primary">Go Back to Selection</button>
    </div>
  </div>
);
  return (
    <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/30 rounded-xl">
        <h2 className="h2-heading text-center drop-shadow mb-1">Register as {userType}</h2>
        <p className="paragraph text-center">Please fill in your details to create an account.</p>
        {/* Patient Form */}
        {userType === "patient" && (
          <form className="space-y-6 mt-6" onSubmit={e => {
            e.preventDefault();
            // Patient form validation (same as validateForm but for patientFormData)
            const newErrors = {};
            const emailRegex = /^\S+@\S+\.\S+$/;
            const phoneRegex = /^\d{10}$/;
            const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/;
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
            if (!patientFormData.firstName.trim()) newErrors.firstName = "First name is required";
            if (!patientFormData.lastName.trim()) newErrors.lastName = "Last name is required";
            if (!patientFormData.phone.match(phoneRegex)) newErrors.phone = "Phone must be 10 digits";
            if (!patientFormData.aadhaar.match(aadhaarRegex)) newErrors.aadhaar = "Aadhaar must be 12 digits (xxxx-xxxx-xxxx)";
            if (!patientFormData.gender) newErrors.gender = "Gender is required";
            if (!patientFormData.dob) newErrors.dob = "Date of birth is required";
            if (!emailRegex.test(patientFormData.email)) newErrors.email = "Enter a valid email";
            if (!patientFormData.occupation.trim()) newErrors.occupation = "Occupation is required";
            if (!patientFormData.permanentAddress.trim()) newErrors.permanentAddress = "Permanent address is required";
            if (!patientFormData.photo) newErrors.photo = "Photo is required";
            if (!passwordRegex.test(patientFormData.password)) newErrors.password = "Password must include capital letters, numbers, and special characters";
            if (patientFormData.password !== patientFormData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
            if (!patientFormData.agreeDeclaration) newErrors.agreeDeclaration = "Please accept the declaration";
            setPatientFormErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
            setIsSubmitting(true);
            setTimeout(() => {
              alert("Registration successful!");
              setIsSubmitting(false);
              navigate("/verification");
            }, 2000);
          }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["firstName", "middleName", "lastName", "phone", "aadhaar", "gender", "dob", "email", "occupation","temporaryAddress", "permanentAddress" ].map((field, index) => (
                <div key={index} className="space-y-1 floating-input relative" data-placeholder={
                  (field === "firstName" && "First Name *") ||
                  (field === "middleName" && "Middle Name") ||
                  (field === "lastName" && "Last Name *") ||
                  (field === "phone" && "Phone Number *") ||
                  (field === "aadhaar" && "Aadhaar Number *") ||
                  (field === "dob" && "Date of Birth *") ||
                  (field === "email" && "Email Address *") ||
                  (field === "occupation" && "Occupation *") ||
                   (field === "temporaryAddress" && "Temporary Address") ||
                  (field === "permanentAddress" && "Permanent Address *") || ''
                }>
                  {field === "gender" ? (
                    <select name={field} onChange={e => setPatientFormData(prev => ({ ...prev, [field]: e.target.value }))} value={patientFormData[field]} className="input-field peer">
                      <option value="">Select Gender *</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <input
                      name={field}
                      type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
                      placeholder=" "
                      onChange={e => {
                        // Use handleInputChange for unified validation/formatting
                        handleInputChange({
                          target: {
                            name: field,
                            value: e.target.value,
                            type: e.target.type,
                            checked: e.target.checked
                          }
                        });
                      }}
                      value={patientFormData[field]}
                      className="input-field peer"
                    />
                  )}
                  {patientFormErrors[field] && <p className="error-text">{patientFormErrors[field]}</p>}
                </div>
              ))}
              <div className="relative flex flex-col gap-2">
                <label className="flex items-center border border-gray-300 rounded-lg p-2 pr-3 bg-white shadow-sm cursor-pointer overflow-hidden">
                  <span className="flex-1 truncate text-gray-700">{patientFormData.photo ? patientFormData.photo.name : 'Upload Photo'}</span>
                  <input type="file" accept="image/*" name="photo" onChange={e => {
                    const file = e.target.files[0];
                    if (file && file.type.startsWith('image/')) {
                      setPatientFormData(prev => ({ ...prev, photo: file }));
                      setPhotoPreview(URL.createObjectURL(file));
                    }
                  }} className="hidden" />
                  {patientFormData.photo && <button type="button" onClick={() => setIsModalOpen(true)} className="text-sm text-blue-600 flex items-center gap-1 w-fit mt-1">Preview</button>}
                </label>
                {patientFormErrors.photo && <p className="error-text">{patientFormErrors.photo}</p>}
              </div>
            </div>
            <div className="flex items-center">
<input
  type="checkbox"
  name="isSameAsPermanent"
  checked={patientFormData.isSameAsPermanent}
  onChange={e => {
    const checked = e.target.checked;
    setPatientFormData(prev => ({
      ...prev,
      isSameAsPermanent: checked,
      permanentAddress: checked ? prev.temporaryAddress : prev.permanentAddress
    }));
  }}
  className="mr-2"
/>              <span className="text-sm">Temporary address is the same as permanent address</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              {["password", "confirmPassword"].map((field, index) => (
                <div className="relative space-y-1 floating-input" data-placeholder={field === 'password' ? 'Password *' : 'Confirm Password *'} key={index}>
                  <input name={field} type={showPassword ? 'text' : 'password'} placeholder=" " onChange={e => setPatientFormData(prev => ({ ...prev, [field]: e.target.value }))} value={patientFormData[field]} className="input-field peer pr-8" />
                  <button
  type="button"
  tabIndex={-1}
  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-[var(--primary-color)] focus:outline-none"
  onClick={() => setShowPassword(prev => !prev)}
  style={{ display: field === 'password' || field === 'confirmPassword' ? 'block' : 'none' }}
>
  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
</button>
                  {patientFormErrors[field] && <p className="error-text">{patientFormErrors[field]}</p>}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="agreeDeclaration" checked={patientFormData.agreeDeclaration} onChange={e => setPatientFormData(prev => ({ ...prev, agreeDeclaration: e.target.checked }))} className="mr-2" />
              <span className="text-sm">I/We hereby declare that all the information provided in this registration form has been filled in accurately and to the best of my/our knowledge. I/We understand and agree to the terms and conditions of AV Swasthya.</span>
            </div>
            {patientFormErrors.agreeDeclaration && <p className="error-text">{patientFormErrors.agreeDeclaration}</p>}
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary w-full md:w-auto">Verify & Proceed</button>
            </div>
            <div className="text-center mt-4 text-[var(--primary-color)]">
              <p>Already have an account? <button type="button" onClick={() => navigate("/login")} className="text-[var(--accent-color)] font-semibold">Login Here</button></p>
            </div>
            {isModalOpen && photoPreview && (
              <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded shadow-lg relative">
                  <img src={photoPreview} alt="Preview" className="max-h-[50vh] max-w-full animate-float" style={{ animation: "float 3s ease-in-out infinite" }} />
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-6 text-xl text-red-600">&times;</button>
                </div>
              </div>
            )}
          </form>
        )}
        {userType === "hospital" && renderHospitalForm()}
        {userType === "lab" && renderLabForm()}
        {userType === "doctor" && renderDoctorForm()}
        {userType !== "patient" && (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {["password","confirmPassword"].map(f=>(
                <div key={f} className="floating-input relative w-full" data-placeholder={`${f==="password"?"Create":"Confirm"} Password *`}>
                  <input name={f} type={showPassword?"text":"password"} placeholder=" " onChange={handleInputChange} className={`input-field peer pr-10 ${errors[f]?"input-error":""}`} value={formData[f]} autoComplete="off"/>
                  <span onClick={()=>setShowPassword(!showPassword)} className="absolute top-3 right-3 cursor-pointer text-gray-700">{showPassword?<EyeOff size={20}/>:<Eye size={20}/>}</span>
                  {errors[f] && <p className="error-text">{errors[f]}</p>}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-600 mt-2">Include Capital Letters, Numbers, and Special Characters</div>
            <label className="flex items-start mt-4">
              <input type="checkbox" name="agreeDeclaration" checked={formData.agreeDeclaration||formData.roleSpecificData?.agreeDeclaration} onChange={handleInputChange} className="mr-3 mt-1"/>
              <span className="text-sm text-gray-700">
                {userType==="hospital"?"I/We declare that I/We have signed this document willingly and with full understanding of its contents, as explained by the authorized representatives and doctors of AV Swasthya."
                :userType==="lab"?"I/We hereby declare that all the information provided in this registration form has been filled in accurately and to the best of my/our knowledge. I/We understand and agree to the terms and conditions of AV Swasthya."
                :userType==="doctor"?"I/We hereby declare that all the information provided in this registration form has been filled in accurately and to the best of my/our knowledge. I/We understand and agree to the terms and conditions of AV Swasthya."
                :userType==="patient"?"I/We hereby declare that all the information provided in this registration form has been filled in accurately and to the best of my/our knowledge. I/We understand and agree to the terms and conditions of AV Swasthya."
                :"I agree to the declaration"}
              </span>
            </label>
            {errors.agreeDeclaration && <p className="error-text">{errors.agreeDeclaration}</p>}
            <div className="flex justify-center mt-6">
              <button type="submit" disabled={isSubmitting} className={`btn btn-primary w-full md:w-auto ${isSubmitting?"btn-disabled":""}`}>
                {isSubmitting?"Submitting...":"Verify & Proceed"}
              </button>
            </div>
            <div className="text-center mt-4 text-[#0e1630]">
              <p>Already have an account? <button type="button" onClick={()=>navigate("/login")} className="text-[#01D48C] font-semibold">Login Here</button></p>
            </div>
            {isModalOpen && (previewDoc||photoPreview) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg w-full max-w-2xl relative">
                  <button className="absolute top-2 right-2 text-red-500 text-2xl" onClick={()=>{setIsModalOpen(false);setPreviewDoc(null);}}><X size={24}/></button>
                  <h2 className="text-lg font-semibold mb-4">Preview</h2>
                  {previewDoc?previewDoc.type.startsWith("image/")?
                    <img src={URL.createObjectURL(previewDoc)} alt="Document Preview" className="max-h-[500px] w-full object-contain"/>
                    :previewDoc.type==="application/pdf"?
                    <iframe src={URL.createObjectURL(previewDoc)} className="w-full h-[500px]" title="PDF Preview"/>
                    :<p className="text-gray-600">Preview not available for this file type.</p>
                  :<img src={photoPreview} alt="Photo Preview" className="max-h-[500px] w-full object-contain"/>}
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
export default RegisterForm;