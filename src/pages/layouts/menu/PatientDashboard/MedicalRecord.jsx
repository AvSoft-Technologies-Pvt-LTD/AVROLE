// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MedicalRecords = () => {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     axios.get("https://your-api-endpoint.com/medical-records") // Replace with your real API
//       .then(res => setRecords(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <table className="min-w-full border">
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Diagnosis</th>
//           <th>Doctor Name</th>
//           <th>Hospital Name</th>
//           <th>Followup Needed</th>
//           <th>Doctor Note</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {records.map((record, i) => (
//           <tr key={i}>
//             <td>{record.date}</td>
//             <td>{record.diagnosis}</td>
//             <td>{record.doctorName}</td>
//             <td>{record.hospitalName}</td>
//             <td>{record.followupNeeded ? "Yes" : "No"}</td>
//             <td>{record.doctorNote}</td>
//             <td><button className="text-blue-600">View</button></td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default MedicalRecords;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MedicalRecords = () => {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     axios.get("https://6809f36e1f1a52874cde79fe.mockapi.io/send-note")
//       .then(res => setRecords(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Medical Records</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Diagnosis</th>
//               <th className="px-4 py-2">Doctor Name</th>
//               <th className="px-4 py-2">Hospital Name</th>
//               <th className="px-4 py-2">Followup Needed</th>
//               <th className="px-4 py-2">Doctor Note</th>
//               <th className="px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {records.map((record, i) => (
//               <tr key={i} className="border-b">
//                 <td className="px-4 py-2">{record.date}</td>
//                 <td className="px-4 py-2">{record.diagnosis}</td>
//                 <td className="px-4 py-2">{record.doctorName}</td>
//                 <td className="px-4 py-2">{record.hospitalName}</td>
//                 <td className="px-4 py-2">{record.followupNeeded ? "Yes" : "No"}</td>
//                 <td className="px-4 py-2">{record.doctorNote}</td>
//                 <td className="px-4 py-2">
//                   <button className="text-blue-600 hover:underline">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MedicalRecords;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MedicalRecords = () => {
//   const [records, setRecords] = useState([]);

//   const hospitalNames = ["Apollo Hospital", "AIIMS", "Fortis", "Max Healthcare"];

//   useEffect(() => {
//     axios
//       .get("https://6809f36e1f1a52874cde79fe.mockapi.io/send-note")
//       .then((res) => setRecords(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Medical Records</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Diagnosis</th>
//               <th className="px-4 py-2">Doctor Name</th>
             
              
//               <th className="px-4 py-2">Doctor Note</th>
         
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {records.map((record, i) => (
//               <tr key={record.id} className="border-b">
//                 <td className="px-4 py-2">{record.date}</td>
//                 <td className="px-4 py-2">{record.diagnosis}</td>
//                 <td className="px-4 py-2">{record.doctorName}</td>
              
              
//                 <td className="px-4 py-2">{record.note}</td>
//                 <td className="px-4 py-2">
               
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MedicalRecords;
import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("https://6809f36e1f1a52874cde79fe.mockapi.io/send-note")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
      <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
        <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Diagnosis</th>
            <th className="px-6 py-3 text-left">Doctor Name</th>
            <th className="px-6 py-3 text-left">Doctor's Note</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {records.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-slate-50 transition duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.diagnosis}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.doctorName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.note || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecords;
