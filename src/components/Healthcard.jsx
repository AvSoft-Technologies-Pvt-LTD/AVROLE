import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import AVCard from "./microcomponents/AVCard";

function Healthcard() {
  const userData = useSelector((state) => state.auth.user);
  const [healthId, setHealthId] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const cardRef = useRef();

  useEffect(() => {
    const fetchHealthId = async () => {
      if (userData?.dob && userData?.gender && stateValue && city) {
        try {
          const res = await fetch("http://localhost:5000/api/healthcard", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gender: userData.gender,
              dob: userData.dob,
              state: stateValue,
              city: city,
            }),
          });
          const data = await res.json();
          setHealthId(data.healthId); // Assume backend sends { healthId: "AV..." }
        } catch (err) {
          console.error("Error generating health ID:", err);
        }
      }
    };

    fetchHealthId();
  }, [stateValue, city, userData]);

  const handleSkip = () => navigate("/login");

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "AV Health Card";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F4C430]/10 to-[#ffffff] flex items-center justify-center px-4 py-10 print:bg-white">
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 w-full max-w-6xl flex flex-col md:flex-row gap-10 print:shadow-none print:p-0">
        {/* Left - AVCard */}
        <div className="w-full md:w-1/2 flex items-center justify-center" ref={cardRef}>
          <AVCard
            initialName={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
            initialCardNumber={healthId}
            initialGender={userData?.gender || ''}
            initialPhoneNumber={userData?.phone || ''}
            initialPhotoUrl="/default-avatar.png"
            isReadOnly={true}
          />
        </div>

        {/* Right - Display Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#0e1630]">
            Welcome to <span className="text-[#F4C430]">AV Swasthya</span>
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Generate your digital health card with just a few details. It's simple and secure.
          </p>
          <p className="text-center text-[#666] text-sm italic mb-4">
            {healthId || "Your Health ID will appear here"}
          </p>

          <div className="space-y-3 text-sm">
            {/* User Info Displayed as Tags */}
            <div className="flex flex-wrap gap-2 bg-[#f4c430]/20 rounded-md mb-4 text-sm">
              <div >
                <strong>First Name:</strong> {userData?.firstName || "N/A"}
              </div>
              <div >
                <strong>Last Name:</strong> {userData?.lastName || "N/A"}
              </div>
              <div >
                <strong>DOB:</strong> {userData?.dob || "N/A"}
              </div>
              <div >
                <strong>Gender:</strong> {userData?.gender || "N/A"}
              </div>
              <div>
                <strong>Phone:</strong> {userData?.phone || "N/A"}
              </div>
            </div>

            {/* State & City Dropdown */}
            <div className="flex gap-2">
              <select
                className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
                onChange={(e) => setStateValue(e.target.value)}
              >
                <option value="">State</option>
                <option value="MH">Maharashtra</option>
                <option value="DL">Delhi</option>
                <option value="KA">Karnataka</option>
              </select>
              <select
                className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">City</option>
                <option value="CSTM">Mumbai (CSTM)</option>
                <option value="NDLS">New Delhi (NDLS)</option>
                <option value="SBC">Bangalore (SBC)</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white border-2 border-transparent hover:bg-white hover:text-[#0e1630] hover:border-[#0e1630] font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#0e1630]/40 hover:scale-105"
              onClick={handlePrint}
            >
              <FaDownload /> Generate & Download
            </button>

            <button
              className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630] font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={handleSkip}
            >
              Skip & Continue <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Healthcard;
