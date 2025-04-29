// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Report = () => {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     axios.get("https://your-api-endpoint.com/reports") // Replace with your real API
//       .then(res => setReports(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <table className="min-w-full border">
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Test Name</th>
//           <th>Lab Name</th>
//           <th>Status</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {reports.map((report, i) => (
//           <tr key={i}>
//             <td>{report.date}</td>
//             <td>{report.testName}</td>
//             <td>{report.labName}</td>
//             <td>{report.status}</td>
//             <td><button className="text-blue-600">Download</button></td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Report;

import React, { useEffect, useState } from "react";

const Report = () => {
  const [reports, setReports] = useState([]);

  // Mock JSON data
  const mockReports = [
    {
      date: "2025-04-10",
      testName: "Complete Blood Count",
      labName: "MedLife Diagnostics",
      status: "Completed"
    },
    {
      date: "2025-04-12",
      testName: "Urine Test",
      labName: "PathCare Labs",
      status: "Pending"
    },
    {
      date: "2025-04-15",
      testName: "Chest X-Ray",
      labName: "Apollo Labs",
      status: "In Review"
    }
  ];

  useEffect(() => {
    // Instead of fetching, use mock data
    setReports(mockReports);
  }, []);

  const handleSendToDoctor = (report) => {
    alert(`Report for "${report.testName}" sent to doctor!`);
  };

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-xl shadow-inner">
      <table className="min-w-full border-collapse shadow-lg rounded-xl overflow-hidden text-sm">
        <thead className="bg-slate-800 text-white uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Test Name</th>
            <th className="px-6 py-3 text-left">Lab Name</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {reports.map((report, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 hover:bg-slate-50 transition duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.testName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.labName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.status}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-700 transition duration-150">
                  Download
                </button>
                <button
                  onClick={() => handleSendToDoctor(report)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-150"
                >
                  Send to Doctor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
