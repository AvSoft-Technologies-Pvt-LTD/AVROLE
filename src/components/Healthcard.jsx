
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import AVCard from "./microcomponents/AVCard";

// function Healthcard() {
//   const userData = useSelector((state) => state.auth.user);
//   const [healthId, setHealthId] = useState("");
//   const [stateValue, setStateValue] = useState("");
//   const [city, setCity] = useState("");
//   const navigate = useNavigate();
//   const cardRef = useRef();

//   useEffect(() => {
//     const fetchHealthId = async () => {
//       // Check if userData is available
//       console.log("User  Data:", userData);
//       console.log("State Value:", stateValue);
//       console.log("City:", city);

//       if (userData?.dob && userData?.gender && stateValue && city) {
//         try {
//           const res = await fetch("https://6810972027f2fdac2411f6a5.mockapi.io/users", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               gender: userData.gender,
//               dob: userData.dob,
//               state: stateValue,
//               city: city,
//             }),
//           });
//           const data = await res.json();
//           console.log("API Response:", data); // Log the API response
//           setHealthId(data.healthId); // Assume backend sends { healthId: "AV..." }
//         } catch (err) {
//           console.error("Error generating health ID:", err);
//         }
//       } else {
//         console.log("Missing required data for health ID generation.");
//       }
//     };

//     fetchHealthId();
//   }, [stateValue, city, userData]);

//   const handleSkip = () => navigate("/login");

//   const handlePrint = () => {
//     const originalTitle = document.title;
//     document.title = "AV Health Card";
//     window.print();
//     document.title = originalTitle;
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-[#F4C430]/10 to-[#ffffff] flex items-center justify-center px-4 py-10 print:bg-white">
//       <div
//         className="bg-white rounded-3xl shadow-lg p-6 md:p-10 w-full max-w-6xl flex flex-col md:flex-row gap-10 print:shadow-none print:p-0"
//         ref={cardRef}
//       >
//         {/* Left - AVCard */}
//         <AVCard
//           initialName={`${userData?.firstName || ""} ${userData?.lastName || ""}`}
//           initialCardNumber={healthId}
//           initialGender={userData?.gender || ""}
//           imageUrl="https://img.freepik.com/vecteurs-premium/icone-profil-avatar-par-defaut-image-utilisateur-medias-sociaux-icone-avatar-gris-silhouette-profil-vide-illustration-vectorielle_561158-3383.jpg?ga=GA1.1.1895928303.1746111458&semt=ais_h ybrid&w=740"
//           isReadOnly={true}
//         />

//         {/* Right - Display Info */}
//         <div className="w-full md:w-1/2">
//           <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#0e1630]">
//             Welcome to <span className="text-[#F4C430]">AV Swasthya</span>
//           </h1>
//           <p className="text-center text-gray-600 mb-6">
//             Generate your digital health card with just a few details. It's simple and secure.
//           </p>
//           <p className="text-center text-[#666] text-sm italic mb-4">
//             {healthId || "Your Health ID will appear here"}
//           </p>

//           <div className="space-y-3 text-sm">
//             {/* User Info Displayed as Tags */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <strong>First Name:</strong> {userData?.firstName || "N/A"}
//               </div>
//               <div>
//                 <strong>Last Name:</strong> {userData?.lastName || "N/A"}
//               </div>
//               <div>
//                 <strong>DOB:</strong> {userData?.dob || "N/A"}
//               </div>
//               <div>
//                 <strong>Gender:</strong> {userData?.gender || "N/A"}
//               </div>
//               <div>
//                 <strong>Phone:</strong> {userData?.phone || "N/A"}
//               </div>
//             </div>

//             {/* State & City Dropdown */}
//             <div className="flex gap-2">
//               <select
//                 className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
//                 onChange={(e) => setStateValue(e.target.value)}
//                 value={stateValue}
//                 aria-label="Select State"
//               >
//                 <option value="">State</option>
//                 <option value="MH">Maharashtra</option>
//                 <option value="DL">Delhi</option>
//                 <option value="KA">Karnataka</option>
//               </select>
//               <select
//                 className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
//                 onChange={(e) => setCity(e.target.value)}
//                 value={city}
//                 aria-label="Select City"
//               >
//                 <option value="">City</option>
//                 <option value="CSTM">Mumbai (CSTM)</option>
//                 <option value="NDLS">New Delhi (NDLS)</option>
//                 <option value="SBC">Bangalore (SBC)</option>
//               </select>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6">
//             <button
//               className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white border-2 border-transparent hover:bg-white hover:text-[#0e1630] hover:border-[#0e1630] font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#0e1630]/40 hover:scale-105"
//               onClick={handlePrint}
//               aria-label="Generate and Download Health Card"
//             >
//               Generate Healthcard
//             </button>

//             <button
//               className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630] font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//               onClick={handleSkip}
//               aria-label="Skip and Continue"
//             >
//               Skip &amp; Continue <FaArrowRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Healthcard;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowRight, FaDownload } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import AVCard from "./microcomponents/AVCard";

// function Healthcard() {
//   const userData = useSelector((state) => state.auth.user);
//   const [healthId, setHealthId] = useState("");
//   const [gender, setGender] = useState("");
//   const [state, setState] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [city, setCity] = useState("");
//   const [dob, setDob] = useState("");
//   const [isCardGenerated, setIsCardGenerated] = useState(false); // New state variable
//   const navigate = useNavigate();
//   const cardRef = useRef();

//   useEffect(() => {
//     if (userData?.gender && state && city && userData?.dob) {
//       setHealthId(
//         `AV${userData.gender.charAt(0).toUpperCase()}${state}${city}${userData.dob.replace(/-/g, "")}`
//       );
//     }
//   }, [userData?.gender, state, city, userData?.dob]);

//   const handleSkip = () => {
//     navigate("/login");
//   };

//   const handlePrint = () => {
//     const originalTitle = document.title;
//     document.title = "AV Health Card";
//     window.print();
//     document.title = originalTitle;
//   };

//   const handleGenerateCard = () => {
//     if (healthId) {
//       setIsCardGenerated(true); // Set the card as generated
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-[#e0f7f5] to-[#ffffff] flex items-center justify-center px-4 py-10 print:bg-white">
//       <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 w-full max-w-6xl flex flex-col md:flex-row gap-10 print:shadow-none print:p-0">
//         {/* Left - AVCard */}
//         <div className="w-full md:w-1/2 flex items-center justify-center" ref={cardRef}>
//           <AVCard
//             initialName={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
//             initialCardNumber={healthId}
//             initialGender={userData?.gender || ''}
//             initialPhoneNumber={userData?.phone || ''}
//             initialPhotoUrl="/default-avatar.png"
//             isReadOnly={true}
//           />
//         </div>

//         {/* Right - Form */}
//         <div className="w-full md:w-1/2">
//           <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#0e1630]">
//             Welcome to <span className="text-[#F4C430]">AV Swasthya</span>
//           </h1>
//           <p className="text-center text-gray-600 mb-6">
//             Generate your digital health card with just a few details. It's simple and secure.
//           </p>

//           {isCardGenerated ? (
//             <div className="text-center">
//               <p className="text-[#666] text-sm italic mb-4">
//                 Your Health ID: <strong>{healthId}</strong>
//               </p>
//               <button
//                 className="flex items-center justify-center gap-2 bg-[#0e1630] text-white font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//                 onClick={handlePrint}
//               >
//                 <FaDownload /> Download Healthcard
//               </button>
//             </div>
//           ) : (
//             <div>
//               <p className="text-center text-[#666] text-sm italic mb-4">
//                 {healthId || "Your Health ID will appear here"}
//               </p>

//               <form className="space-y-3 text-sm">
//                 {/* User Info Display {/* User Info Displayed as Tags */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <strong>First Name:</strong> {userData?.firstName || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Last Name:</strong> {userData?.lastName || "N/A"}
//                   </div>
//                   <div>
//                     <strong>DOB:</strong> {userData?.dob || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Gender:</strong> {userData?.gender || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Phone:</strong> {userData?.phone || "N/A"}
//                   </div>
//                 </div>

//                 {/* State & City */}
//                 <div className="flex gap-2">
//                   <select
//                     className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
//                     onChange={(e) => setState(e.target.value)}
//                   >
//                     <option value="">State</option>
//                     <option value="MH">Maharashtra</option>
//                     <option value="DL">Delhi</option>
//                     <option value="KA">Karnataka</option>
//                   </select>
//                   <select
//                     className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
//                     onChange={(e) => setCity(e.target.value)}
//                   >
//                     <option value="">City</option>
//                     <option value="CSTM">Mumbai (CSTM)</option>
//                     <option value="NDLS">New Delhi (NDLS)</option>
//                     <option value="SBC">Bangalore (SBC)</option>
//                   </select>
//                 </div>
//               </form>

//               {/* Generate Healthcard Button */}
//               <div className="flex gap-4 mt-6">
//                 <button
//                   className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//                   onClick={handleGenerateCard}
//                 >
//                   Generate Healthcard
//                 </button>

//                 <button
//                   className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630] font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//                   onClick={handleSkip}
//                 >
//                   Skip & Continue <FaArrowRight />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Healthcard; 
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaDownload, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import AVCard from "./microcomponents/AVCard";

function Healthcard() {
  const userData = useSelector((state) => state.auth.user);
  const [healthId, setHealthId] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isCardGenerated, setIsCardGenerated] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef();

  useEffect(() => {
    if (userData?.gender && state && city && userData?.dob) {
      setHealthId(
        `AV${userData.gender.charAt(0).toUpperCase()}${state}${city}${userData.dob.replace(/-/g, "")}`
      );
    } else {
      setHealthId("");
    }
  }, [userData?.gender, state, city, userData?.dob]);

  const handleBack = () => {
    setIsCardGenerated(false);
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "AV Health Card";
    window.print();
    document.title = originalTitle;
  };

  const handleGenerateCard = () => {
    if (state && city) {
      setIsCardGenerated(true);
    } else {
      alert("Please select both State and City to generate health card.");
    }
  };

  if (isCardGenerated) {
    // Minimal layout showing only the card, Back and Download buttons
    return (
      <div className="min-h-screen w-full flex items-center justify-center print:bg-white bg-white p-10">
        <div className="max-w-md w-full flex flex-col items-center gap-4">
          <AVCard
            initialName={`${userData?.firstName || "First"} ${userData?.lastName || "Last"}`}
            initialCardNumber={healthId}
            initialGender={userData?.gender || ""}
            initialPhoneNumber={userData?.phone || ""}
            initialPhotoUrl="/default-avatar.png"
            initialDob={userData?.dob || ""}
            isReadOnly={true}
            ref={cardRef}
          />
          <div className="w-full flex justify-between mt-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-800 font-semibold py-2 px-4 rounded-lg  transition"
              aria-label="Back"
            >
              <FaArrowLeft /> Back
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#0e1630] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#123456] transition"
              aria-label="Download Healthcard"
            >
              <FaDownload /> Download
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default form layout before generating the card
  return (
    <div className="min-h-screen w-full bg-[#f5f9fc] flex items-center justify-center px-4 py-10 print:bg-white">
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 w-full max-w-6xl flex flex-col md:flex-row gap-10 print:shadow-none print:p-0">
        {/* Left side: Sample card */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <AVCard
            initialName={`${userData?.firstName || "First"} ${userData?.lastName || "Last"}`}
            initialCardNumber={""} // no health ID yet
            initialGender={userData?.gender || ""}
            initialPhoneNumber={userData?.phone || ""}
            initialPhotoUrl="/default-avatar.png"
            initialDob={userData?.dob || ""}
            isReadOnly={true}
          />
        </div>

        {/* Right side: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#0e1630]">
            Welcome to <span className="text-[#F4C430]">AV Swasthya</span>
          </h1>

          <form className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <strong>First Name:</strong> {userData?.firstName || "N/A"}
              </div>
              <div>
                <strong>Last Name:</strong> {userData?.lastName || "N/A"}
              </div>
              <div>
                <strong>DOB:</strong> {userData?.dob || "N/A"}
              </div>
              <div>
                <strong>Gender:</strong> {userData?.gender || "N/A"}
              </div>
              <div>
                <strong>Phone:</strong> {userData?.phone || "N/A"}
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <select
                className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
                onChange={(e) => setState(e.target.value)}
                value={state}
                aria-label="Select State"
              >
                <option value="">State</option>
                <option value="MH">Maharashtra</option>
                <option value="DL">Delhi</option>
                <option value="KA">Karnataka</option>
              </select>
              <select
                className="p-2 w-1/2 border border-gray-300 rounded-md shadow-sm text-sm"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                aria-label="Select City"
              >
                <option value="">City</option>
                <option value="CSTM">Mumbai (CSTM)</option>
                <option value="NDLS">New Delhi (NDLS)</option>
                <option value="SBC">Bangalore (SBC)</option>
              </select>
            </div>

            <div className="flex gap-4 mt-6 justify-center">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 max-w-[200px]"
                onClick={handleGenerateCard}
              >
                Generate Healthcard
              </button>

              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0e1630] text-white hover:bg-[#F4C430] hover:text-[#0e1630] font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 max-w-[200px]"
                onClick={handleSkip}
              >
                Skip & Continue <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Healthcard;