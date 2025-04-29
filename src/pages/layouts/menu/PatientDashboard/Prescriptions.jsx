// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Prescription = () => {
//   const [prescriptions, setPrescriptions] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://6809f36e1f1a52874cde79fe.mockapi.io/prescribtion")
//       .then(res => {
//         // Force every item to 'Verified'
//         const verifiedOnly = res.data.map(item => ({
//           ...item,
//           status: "Verified",
//         }));
//         setPrescriptions(verifiedOnly);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
//       <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
//         <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
//           <tr>
//             <th className="px-6 py-3 text-left">Date</th>
//             <th className="px-6 py-3 text-left">Doctor Name</th>
//             <th className="px-6 py-3 text-left">Hospital Name</th>
//             <th className="px-6 py-3 text-left">Diagnosis</th>
//             <th className="px-6 py-3 text-left">Status</th>
//             <th className="px-6 py-3 text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white text-gray-800">
//           {prescriptions.map((item, i) => (
//             <tr
//               key={i}
//               className="border-b border-gray-200 hover:bg-slate-50 transition duration-200"
//             >
//               <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {item.doctorName}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {item.hospitalName}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">{item.diagnosis}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
//                   Verified
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <a
//                   href={item.prescriptionURL || item.prescriptionUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-150"
//                 >
//                   View
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Prescription;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://6809f36e1f1a52874cde79fe.mockapi.io/prescribtion")
      .then(res => {
        // Force every item to 'Verified'
        const verifiedOnly = res.data.map(item => ({
          ...item,
          status: "Verified",
        }));
        setPrescriptions(verifiedOnly);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
      <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
        <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Doctor Name</th>
            <th className="px-6 py-3 text-left">Hospital Name</th>
            <th className="px-6 py-3 text-left">Diagnosis</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {prescriptions.map((item, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 hover:bg-slate-50 transition duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.doctorName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.hospitalName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.diagnosis}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  Verified
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.prescriptionURL ? (
                  <>
                    <a
                      href={item.prescriptionURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-600 text-white px-3 py-1  me-4 rounded hover:bg-slate-700 transition duration-150"
                    >
                      View
                    </a>
                    <a
                      href={item.prescriptionURL}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-150"
                    >
                      Download
                    </a>
                  </>
                ) : (
                  <span className="text-red-500">No URL Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prescription;
