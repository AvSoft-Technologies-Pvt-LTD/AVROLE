import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserAlt, FaHospital, FaStethoscope, FaFlask, FaPills } from 'react-icons/fa';
import { setUserType } from "../context-api/authSlice";

const RegisterSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Who am I?");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false); // Close dropdown after selection
    dispatch(setUserType(value)); // Dispatch the selected user type

    if (value !== "Who am I?") {
      navigate("/registration"); // Navigate to registration page if a valid user type is selected
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-5xl p-8 bg-white  shadow-lg">

        {/* Left side (Text content) */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#0e1630] mb-8 leading-relaxed">
            Your <span className="text-[#F4C430]">Health</span>, Our Priority.
            Expert <span className="text-[#F4C430]">Care</span> You Can Trust
          </h1>
          <h3 className="text-2xl font-bold text-center mb-4 text-[#F4C430]">
            Welcome to AV Swasthya
          </h3>
          <p className="text-center text-gray-600 mb-8">
            "Empowering Your Health Journey with AVSwasthya — <span className="text-[#F4C430]">Personalized Care</span> at Your Fingertips, <span className="text-[#F4C430]">Trusted Services</span> Around the Clock."
          </p>

          <div className="relative w-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-2 text-lg bg-white text-gray-700 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F4C430] transition"
            >
              {selected}
            </button>

            {isOpen && (
              <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div onClick={() => handleSelect('User / My Health Records')} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#F4C430] hover:text-white cursor-pointer">
                  <FaUserAlt className="mr-2" /> Patient
                </div>
                <div onClick={() => handleSelect('Hospital')} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#F4C430] hover:text-white cursor-pointer">
                  <FaHospital className="mr-2" /> Hospital
                </div>
                <div onClick={() => handleSelect('Doctor')} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#F4C430] hover:text-white cursor-pointer">
                  <FaStethoscope className="mr-2" /> Doctor
                </div>
                <div onClick={() => handleSelect('Labs / Scan')} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#F4C430] hover:text-white cursor-pointer">
                  <FaFlask className="mr-2" /> Labs / Scan
                </div>
                <div onClick={() => handleSelect('Pharmacy')} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#F4C430] hover:text-white cursor-pointer">
                  <FaPills className="mr-2" /> Pharmacy
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side (Image) */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
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

export default RegisterSelect;
