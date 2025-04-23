

// // import React, { useState } from "react";

// // // Step 1 Component for Booking Appointment
// // const Step1 = ({
// //   consultationType,
// //   setConsultationType,
// //   location,
// //   setLocation,
// //   symptoms,
// //   setSymptoms,
// //   specialty,
// //   setSpecialty,
// //   specialties,
// //   setSpecialties,
// //   date,
// //   setDate,
// //   time,
// //   setTime,
// //   doctors,
// //   selectedDoctor,
// //   setSelectedDoctor,
// //   handleNext,
// // }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   // Handle symptom input and map to specialties
// //   const handleSymptomsChange = (e) => {
// //     const val = e.target.value.toLowerCase();
// //     setSymptoms(val);
// //     setSpecialties(symptomSpecialtyMap[val] || []);
// //     setSpecialty("");
// //   };

// //   // Filter doctors based on consultation type, date, time, and location (for physical consultations)
// //   const filteredDoctors = doctors.filter((doctor) => {
// //     const isSameType =
// //       doctor.consultationType.toLowerCase() === consultationType.toLowerCase();

// //     if (consultationType === "Physical") {
// //       return (
// //         isSameType &&
// //         doctor.specialty === specialty &&
// //         doctor.location === location &&
// //         doctor.availableDates.includes(date) &&
// //         doctor.availableTimes.includes(time)
// //       );
// //     } else if (consultationType === "Virtual") {
// //       return (
// //         isSameType &&
// //         doctor.specialty === specialty &&
// //         doctor.availableDates.includes(date) &&
// //         doctor.availableTimes.includes(time)
// //       );
// //     }

// //     return false;
// //   });

// //   // Next doctor navigation
// //   const handleNextDoctor = () => {
// //     if (currentIndex < filteredDoctors.length - 1) {
// //       setCurrentIndex(currentIndex + 1);
// //     }
// //   };

// //   // Previous doctor navigation
// //   const handlePrevDoctor = () => {
// //     if (currentIndex > 0) {
// //       setCurrentIndex(currentIndex - 1);
// //     }
// //   };

// //   return (
// //     <div className="space-y-6 text-sm text-[#0e1630] min-h-[450px] rounded-xl">
// //       <h2 className="text-2xl font-bold text-[#0e1630] mb-4">
// //         Book <span className="text-yellow-400">Appointment</span>
// //       </h2>

// //       {/* Consultation Type Selection */}
// //       <div>
// //   <h4 className="font-semibold mb-2">Consultation Type</h4>
// //   <div className="flex gap-4">
// //     {["Physical", "Virtual"].map((type) => (
// //       <label
// //         key={type}
// //         className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer ${
// //           consultationType === type
// //             ? "border-slate-900 bg-slate-900 text-white"
// //             : "border-slate-200 hover:border-slate-300"
// //         }`}
// //       >
// //         <input
// //           type="radio"
// //           name="consultationType"
// //           value={type}
// //           checked={consultationType === type}
// //           onChange={(e) => setConsultationType(e.target.value)}
// //           className="accent-[#0e1630] absolute opacity-0"
// //         />
// //         <span>{type}</span>
// //       </label>
// //     ))}
// //   </div>
// // </div>


// //       {/* Location (for Physical Consultation) */}
// //       {consultationType === "Physical" && (
// //         <div>
// //           <label className="font-semibold mb-2">Location</label>
// //           <select
// //             value={location}
// //             onChange={(e) => setLocation(e.target.value)}
// //             className="w-full p-3 border border-[#ccd1dc] rounded-xl bg-white"
// //           >
// //             <option value="">Select location</option>
// //             {citiesData.map((c) => (
// //               <option key={c.id} value={c.name}>
// //                 {c.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       )}

// //       {/* Symptom Description */}
// //       <div>
// //         <label className="font-semibold mb-2">Describe your symptoms</label>
// //         <input
// //           type="text"
// //           placeholder="e.g. Fever, Cough..."
// //           value={symptoms}
// //           onChange={handleSymptomsChange}
// //           className="w-full p-3 border border-[#ccd1dc] rounded-xl bg-white"
// //         />
// //       </div>

// //       {/* Suggested Specialties */}
// //       {specialties.length > 0 && (
// //         <div className="space-y-2">
// //           {specialties.map((spec, i) => (
// //             <label
// //               key={i}
// //               className={`flex justify-between items-center px-4 py-2 border rounded-xl cursor-pointer transition-all ${
// //                 specialty === spec
// //                   ? "border-[#0e1630] bg-[#0e1630]/10"
// //                   : "border-[#ccd1dc] hover:border-[#0e1630]"
// //               }`}
// //             >
// //               <div className="flex items-center gap-2">
// //                 <input
// //                   type="radio"
// //                   name="specialty"
// //                   value={spec}
// //                   checked={specialty === spec}
// //                   onChange={(e) => setSpecialty(e.target.value)}
// //                   className="accent-[#0e1630]"
// //                 />
// //                 <span>{spec}</span>
// //               </div>
// //             </label>
// //           ))}
// //         </div>
// //       )}

// //       {/* Date & Time Selection */}
// //       <div className="flex gap-4">
// //         <div className="w-1/2">
// //           <label className="font-semibold mb-2">Select Date</label>
// //           <input
// //             type="date"
// //             value={date}
// //             onChange={(e) => setDate(e.target.value)}
// //             className="w-full p-3 border rounded-xl"
// //           />
// //         </div>
// //         <div className="w-1/2">
// //           <label className="font-semibold mb-2">Select Time</label>
// //           <input
// //             type="time"
// //             value={time}
// //             onChange={(e) => setTime(e.target.value)}
// //             className="w-full p-3 border rounded-xl"
// //           />
// //         </div>
// //       </div>

// //       {/* Display Available Doctors */}
// //       {filteredDoctors.length > 0 && (
// //         <div className="relative w-full mt-4">
// //           <h4 className="text-base font-semibold mb-3">Available Doctors</h4>
// //           <div className="overflow-hidden">
// //             <div
// //               className="flex gap-4 transition-transform duration-300 ease-in-out"
// //               style={{ transform: `translateX(-${currentIndex * 230}px)` }}
// //             >
// //               {filteredDoctors.map((doctor) => (
// //                 <div
// //                   key={doctor.name}
// //                   className={`min-w-[200px] max-w-[200px] p-3 border rounded-2xl shadow-md cursor-pointer transition-all duration-200 ${
// //                     selectedDoctor?.name === doctor.name
// //                       ? "border-[#0e1630] bg-[#0e1630]/10 ring-1 ring-[#0e1630]"
// //                       : "border-[#ccd1dc] hover:border-[#0e1630]"
// //                   }`}
// //                   onClick={() => setSelectedDoctor(doctor)}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <img
// //                       src={doctor.photo}
// //                       alt={doctor.name}
// //                       className="w-12 h-12 rounded-full object-cover border-2 border-[#0e1630]"
// //                       onError={(e) => {
// //                         e.target.onerror = null;
// //                         e.target.src =
// //                           "https://cdn-icons-png.flaticon.com/512/3870/3870822.png";
// //                       }}
// //                     />
// //                     <div>
// //                       <h6 className="text-sm font-semibold">{doctor.name}</h6>
// //                       <p className="text-xs text-gray-500">{doctor.specialty}</p>
// //                       <span className="text-sm font-medium text-yellow-500">
// //                         ₹{doctor.fees}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Navigation Buttons */}
// //           <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20">
// //             <button
// //               onClick={handlePrevDoctor}
// //               className="backdrop-blur-md bg-white/70 hover:bg-white text-[#0e1630] p-1 rounded-full shadow-lg border border-[#e2e8f0] hover:scale-105 transition-all duration-200"
// //               title="Previous"
// //             >
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-5 w-5"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M15 19l-7-7 7-7"
// //                 />
// //               </svg>
// //             </button>
// //           </div>

// //           <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20">
// //             <button
// //               onClick={handleNextDoctor}
// //               className="backdrop-blur-md bg-white/70 hover:bg-white text-[#0e1630] p-1 rounded-full shadow-lg border border-[#e2e8f0] hover:scale-105 transition-all duration-200"
// //               title="Next"
// //             >
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-5 w-5"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M9 5l7 7-7 7"
// //                 />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Next Button */}
// //       <div className="flex justify-end mt-6">
// //   <button
// //     type="button"
// //     onClick={handleNext}
// //     className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium shadow-lg 
// //           hover:bg-slate-800 "
// //   >
// //    Next
// //   </button>
// // </div>

// //     </div>
// //   );
// // };

// // export default Step1;

// // // Static Data for Cities and Symptom-Specialty Mapping
// // const citiesData = [
// //   { id: "delhi", name: "Delhi" },
// //   { id: "mumbai", name: "Mumbai" },
// //   { id: "bangalore", name: "Bangalore" },
// //   { id: "chennai", name: "Chennai" },
// //   { id: "kolkata", name: "Kolkata" },
// //   { id: "hyderabad", name: "Hyderabad" },
// //   { id: "pune", name: "Pune" },
// // ];

// // const symptomSpecialtyMap = {
// //   fever: ["Pediatrics", "General Physician"],
// //   cough: ["Pulmonologist", "General Physician"],
// //   headache: ["Neurologist", "General Physician"],
// //   pain: ["Orthopedic", "General Physician"],
// //   stomach: ["Gastroenterologist", "General Physician"],
// //   rash: ["Dermatologist", "General Physician"],
// //   "chest pain": ["Cardiologist", "General Physician"],
// // };

// import React, { useState } from "react";

// // Step 1 Component for Booking Appointment
// const Step1 = ({
//   consultationType,
//   setConsultationType,
//   location,
//   setLocation,
//   symptoms,
//   setSymptoms,
//   specialty,
//   setSpecialty,
//   specialties,
//   setSpecialties,
//   date,
//   setDate,
//   time,
//   setTime,
//   doctors,
//   selectedDoctor,
//   setSelectedDoctor,
//   handleNext,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Handle symptom input and map to specialties
//   const handleSymptomsChange = (e) => {
//     const val = e.target.value.toLowerCase();
//     setSymptoms(val);
//     setSpecialties(symptomSpecialtyMap[val] || []);
//     setSpecialty("");
//   };

//   // Filter doctors based on consultation type, date, time, and location (for physical consultations)
//   const filteredDoctors = doctors.filter((doctor) => {
//     const isSameType =
//       doctor.consultationType.toLowerCase() === consultationType.toLowerCase();

//     if (consultationType === "Physical") {
//       return (
//         isSameType &&
//         doctor.specialty === specialty &&
//         doctor.location === location &&
//         doctor.availableDates.includes(date) &&
//         doctor.availableTimes.includes(time)
//       );
//     } else if (consultationType === "Virtual") {
//       return (
//         isSameType &&
//         doctor.specialty === specialty &&
//         doctor.availableDates.includes(date) &&
//         doctor.availableTimes.includes(time)
//       );
//     }

//     return false;
//   });

//   // Next doctor navigation
//   const handleNextDoctor = () => {
//     if (currentIndex < filteredDoctors.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   // Previous doctor navigation
//   const handlePrevDoctor = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="space-y-6 text-sm text-[#0e1630] min-h-[450px] rounded-xl">
//       <h2 className="text-2xl font-bold text-[#0e1630] mb-4">
//         Book <span className="text-yellow-400">Appointment</span>
//       </h2>

//       {/* Consultation Type Selection */}
//       <div>
//   <h4 className="font-semibold mb-2">Consultation Type</h4>
//   <div className="flex gap-4">
//     {["Physical", "Virtual"].map((type) => (
//       <label
//         key={type}
//         className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer ${
//           consultationType === type
//             ? "border-slate-900 bg-slate-900 text-white"
//             : "border-slate-200 hover:border-slate-300"
//         }`}
//       >
//         <input
//           type="radio"
//           name="consultationType"
//           value={type}
//           checked={consultationType === type}
//           onChange={(e) => setConsultationType(e.target.value)}
//           className="accent-[#0e1630] absolute opacity-0"
//         />
//         <span>{type}</span>
//       </label>
//     ))}
//   </div>
// </div>


//       {/* Location (for Physical Consultation) */}
//       {consultationType === "Physical" && (
//         <div>
//           <label className="font-semibold mb-2">Location</label>
//           <select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full p-3 border border-[#ccd1dc] rounded-xl bg-white"
//           >
//             <option value="">Select location</option>
//             {citiesData.map((c) => (
//               <option key={c.id} value={c.name}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Symptom Description */}
//       <div>
//         <label className="font-semibold mb-2">Describe your symptoms</label>
//         <input
//           type="text"
//           placeholder="e.g. Fever, Cough..."
//           value={symptoms}
//           onChange={handleSymptomsChange}
//           className="w-full p-3 border border-[#ccd1dc] rounded-xl bg-white"
//         />
//       </div>

//       {/* Suggested Specialties */}
//       {specialties.length > 0 && (
//         <div className="space-y-2">
//           {specialties.map((spec, i) => (
//             <label
//               key={i}
//               className={`flex justify-between items-center px-4 py-2 border rounded-xl cursor-pointer transition-all ${
//                 specialty === spec
//                   ? "border-[#0e1630] bg-[#0e1630]/10"
//                   : "border-[#ccd1dc] hover:border-[#0e1630]"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="specialty"
//                   value={spec}
//                   checked={specialty === spec}
//                   onChange={(e) => setSpecialty(e.target.value)}
//                   className="accent-[#0e1630]"
//                 />
//                 <span>{spec}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//       )}

//       {/* Date & Time Selection */}
//       <div className="flex gap-4">
//         <div className="w-1/2">
//           <label className="font-semibold mb-2">Select Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full p-3 border rounded-xl"
//           />
//         </div>
//         <div className="w-1/2">
//           <label className="font-semibold mb-2">Select Time</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="w-full p-3 border rounded-xl"
//           />
//         </div>
//       </div>

//       {/* Display Available Doctors */}
//       {filteredDoctors.length > 0 && (
//         <div className="relative w-full mt-4">
//           <h4 className="text-base font-semibold mb-3">Available Doctors</h4>
//           <div className="overflow-hidden">
//             <div
//               className="flex gap-4 transition-transform duration-300 ease-in-out"
//               style={{ transform: `translateX(-${currentIndex * 230}px)` }}
//             >
//               {filteredDoctors.map((doctor) => (
//                 <div
//                   key={doctor.name}
//                   className={`min-w-[200px] max-w-[200px] p-3 border rounded-2xl shadow-md cursor-pointer transition-all duration-200 ${
//                     selectedDoctor?.name === doctor.name
//                       ? "border-[#0e1630] bg-[#0e1630]/10 ring-1 ring-[#0e1630]"
//                       : "border-[#ccd1dc] hover:border-[#0e1630]"
//                   }`}
//                   onClick={() => setSelectedDoctor(doctor)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={doctor.photo}
//                       alt={doctor.name}
//                       className="w-12 h-12 rounded-full object-cover border-2 border-[#0e1630]"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src =
//                           "https://cdn-icons-png.flaticon.com/512/3870/3870822.png";
//                       }}
//                     />
//                     <div>
//                       <h6 className="text-sm font-semibold">{doctor.name}</h6>
//                       <p className="text-xs text-gray-500">{doctor.specialty}</p>
//                       <span className="text-sm font-medium text-yellow-500">
//                         ₹{doctor.fees}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20">
//             <button
//               onClick={handlePrevDoctor}
//               className="backdrop-blur-md bg-white/70 hover:bg-white text-[#0e1630] p-1 rounded-full shadow-lg border border-[#e2e8f0] hover:scale-105 transition-all duration-200"
//               title="Previous"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20">
//             <button
//               onClick={handleNextDoctor}
//               className="backdrop-blur-md bg-white/70 hover:bg-white text-[#0e1630] p-1 rounded-full shadow-lg border border-[#e2e8f0] hover:scale-105 transition-all duration-200"
//               title="Next"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Next Button */}
//       <div className="flex justify-end mt-6">
//   <button
//     type="button"
//     onClick={handleNext}
//     className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium shadow-lg 
//           hover:bg-slate-800 "
//   >
//    Next
//   </button>
// </div>

//     </div>
//   );
// };

// export default Step1;

import React, { useState } from "react";

// Step 1 Component for Booking Appointment
const Step1 = ({
  consultationType,
  setConsultationType,
  location,
  setLocation,
  symptoms,
  setSymptoms,
  specialty,
  setSpecialty,
  specialties,
  setSpecialties,
  date,
  setDate,
  time,
  setTime,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  handleNext,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle symptom input and map to specialties
  const handleSymptomsChange = (e) => {
    const val = e.target.value.toLowerCase();
    setSymptoms(val);
    setSpecialties(symptomSpecialtyMap[val] || []);
    setSpecialty("");
  };

  // Filter doctors based on consultation type, date, time, and location (for physical consultations)
  const filteredDoctors = doctors.filter((doctor) => {
    const isSameType =
      doctor.consultationType.toLowerCase() === consultationType.toLowerCase();

    if (consultationType === "Physical") {
      return (
        isSameType &&
        doctor.specialty === specialty &&
        doctor.location === location &&
        doctor.availableDates.includes(date) &&
        doctor.availableTimes.includes(time)
      );
    } else if (consultationType === "Virtual") {
      return (
        isSameType &&
        doctor.specialty === specialty &&
        doctor.availableDates.includes(date) &&
        doctor.availableTimes.includes(time)
      );
    }

    return false;
  });

  // Next doctor navigation
  const handleNextDoctor = () => {
    if (currentIndex < filteredDoctors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Previous doctor navigation
  const handlePrevDoctor = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-6 text-sm text-[#0e1630] min-h-[450px] rounded-xl">
      <h2 className="text-2xl font-bold text-[#0e1630] mb-4">
        Book <span className="text-yellow-400">Appointment</span>
      </h2>

      {/* Consultation Type Selection */}
      <div>
  <h4 className="font-semibold mb-2">Consultation Type</h4>
  <div className="flex gap-4">
    {["Physical", "Virtual"].map((type) => (
      <label
        key={type}
        className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer ${
          consultationType === type
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <input
          type="radio"
          name="consultationType"
          value={type}
          checked={consultationType === type}
          onChange={(e) => setConsultationType(e.target.value)}
          className="accent-[#0e1630] absolute opacity-0"
        />
        <span>{type}</span>
      </label>
    ))}
  </div>
</div>


      {/* Location (for Physical Consultation) */}
      {consultationType === "Physical" && (
        <div>
          <label className="font-semibold mb-2">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-[#ccd1dc] rounded-xl bg-white"
          >
            <option value="">Select location</option>
            {citiesData.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Symptom Description */}
      <div>
        <label className="font-semibold mb-2">Describe your symptoms</label>
        <input
          type="text"
          placeholder="e.g. Fever, Cough..."
          value={symptoms}
          onChange={handleSymptomsChange}
          className="w-full p-3 border border-[#ccd1dc] rounded-xl bg-white"
        />
      </div>

      {/* Suggested Specialties */}
      {specialties.length > 0 && (
        <div className="space-y-2">
          {specialties.map((spec, i) => (
            <label
              key={i}
              className={`flex justify-between items-center px-4 py-2 border rounded-xl cursor-pointer transition-all ${
                specialty === spec
                  ? "border-[#0e1630] bg-[#0e1630]/10"
                  : "border-[#ccd1dc] hover:border-[#0e1630]"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="specialty"
                  value={spec}
                  checked={specialty === spec}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="accent-[#0e1630]"
                />
                <span>{spec}</span>
              </div>
            </label>
          ))}
        </div>
      )}

      {/* Date & Time Selection */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="font-semibold mb-2">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>
        <div className="w-1/2">
          <label className="font-semibold mb-2">Select Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>
      </div>

      {/* Display Available Doctors */}
      {filteredDoctors.length > 0 && (
        <div className="relative w-full mt-4">
          <h4 className="text-base font-semibold mb-3">Available Doctors</h4>
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 230}px)` }}
            >
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.name}
                  className={`min-w-[200px] max-w-[200px] p-3 border rounded-2xl shadow-md cursor-pointer transition-all duration-200 ${
                    selectedDoctor?.name === doctor.name
                      ? "border-[#0e1630] bg-[#0e1630]/10 ring-1 ring-[#0e1630]"
                      : "border-[#ccd1dc] hover:border-[#0e1630]"
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0e1630]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/3870/3870822.png";
                      }}
                    />
                    <div>
                      <h6 className="text-sm font-semibold">{doctor.name}</h6>
                      <p className="text-xs text-gray-500">{doctor.specialty}</p>
                      <span className="text-sm font-medium text-yellow-500">
                        ₹{doctor.fees}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20">
            <button
              onClick={handlePrevDoctor}
              className="backdrop-blur-md bg-white/70 hover:bg-white text-[#0e1630] p-1 rounded-full shadow-lg border border-[#e2e8f0] hover:scale-105 transition-all duration-200"
              title="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20">
            <button
              onClick={handleNextDoctor}
              className="backdrop-blur-md bg-white/70 hover:bg-white text-[#0e1630] p-1 rounded-full shadow-lg border border-[#e2e8f0] hover:scale-105 transition-all duration-200"
              title="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end mt-6">
  <button
    type="button"
    onClick={handleNext}
    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium shadow-lg 
          hover:bg-slate-800 "
  >
   Next
  </button>
</div>

    </div>
  );
};

export default Step1;

// Static Data for Cities and Symptom-Specialty Mapping
const citiesData = [
  { id: "delhi", name: "Delhi" },
  { id: "mumbai", name: "Mumbai" },
  { id: "bangalore", name: "Bangalore" },
  { id: "chennai", name: "Chennai" },
  { id: "kolkata", name: "Kolkata" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "pune", name: "Pune" },
];
const symptomSpecialtyMap = {
  fever: ["Pediatrics", "General Physician"],
  cough: ["Pulmonologist", "General Physician"],
  headache: ["Neurologist", "General Physician"],
  pain: ["Orthopedic", "General Physician"],
  stomach: ["Gastroenterologist", "General Physician"],
  rash: ["Dermatologist", "General Physician"],
  "chest pain": ["Cardiologist", "General Physician"],
};