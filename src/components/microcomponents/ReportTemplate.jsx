import React from 'react';

const TestReportTemplate = ({ report }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal':
        return 'text-green-600';
      case 'High':
        return 'text-red-600';
      case 'Low':
        return 'text-orange-600';
      case 'Critical':
        return 'text-red-800 font-bold';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Normal':
        return '✓';
      case 'High':
        return '↑';
      case 'Low':
        return '↓';
      case 'Critical':
        return '⚠';
      default:
        return '';
    }
  };

  return (
    <div className="print-area max-w-4xl mx-auto bg-white p-8 text-sm">
      {/* Header */}
      <div className="border-b-2 border-[var(--primary-color)] pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary-color)] mb-2">{report.labName}</h1>
            <p className="text-gray-600">{report.labAddress}</p>
            <p className="text-gray-600">Phone: {report.labPhone}</p>
            <p className="text-gray-600">Email: {report.labEmail}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">LABORATORY REPORT</h2>
            <p className="text-gray-600">Report ID: <span className="font-medium">{report.reportId}</span></p>
            <p className="text-gray-600">Date: <span className="font-medium">{report.reportDate}</span></p>
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          PATIENT INFORMATION
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">Patient Name:</span> {report.patientName}</p>
            <p><span className="font-medium">Patient ID:</span> {report.patientId}</p>
            <p><span className="font-medium">Age:</span> {report.age} years</p>
            <p><span className="font-medium">Gender:</span> {report.gender}</p>
          </div>
          <div>
            <p><span className="font-medium">Phone:</span> {report.phoneNo}</p>
            <p><span className="font-medium">Address:</span> {report.address}</p>
            <p><span className="font-medium">Collection Date:</span> {report.collectedDate}</p>
            <p><span className="font-medium">Report Date:</span> {report.reportDate}</p>
          </div>
        </div>
      </div>

      {/* Test Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          TEST INFORMATION
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">Test(s) Ordered:</span> {report.testNames}</p>
            <p><span className="font-medium">Ordering Physician:</span> {report.doctorName}</p>
          </div>
          <div>
            <p><span className="font-medium">Technician:</span> {report.technician}</p>
            <p><span className="font-medium">Verified By:</span> {report.verifiedBy || 'Pending'}</p>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
          TEST RESULTS
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Test Parameter</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Result</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Unit</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Reference Range</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(report.testResults || {}).map(([parameter, result]) => (
                <tr key={parameter} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium">{parameter}</td>
                  <td className="border border-gray-300 px-4 py-2">{result.value}</td>
                  <td className="border border-gray-300 px-4 py-2">{result.unit}</td>
                  <td className="border border-gray-300 px-4 py-2">{result.reference}</td>
                  <td className={`border border-gray-300 px-4 py-2 font-medium ${getStatusColor(result.status)}`}>
                    {getStatusIcon(result.status)} {result.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comments */}
      {report.comments && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            COMMENTS & OBSERVATIONS
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{report.comments}</p>
          </div>
        </div>
      )}

      {/* Critical Values Notice */}
      {Object.values(report.testResults || {}).some(result => result.status === 'Critical' || result.status === 'High') && (
        <div className="mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">⚠ CRITICAL VALUES NOTICE</h4>
            <p className="text-red-700 text-sm">
              This report contains values outside the normal range. Please consult with your physician 
              for proper interpretation and follow-up care.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-300 pt-4 mt-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-500">
              This report has been generated electronically and is valid without signature.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              For any queries, please contact the laboratory at {report.labPhone}
            </p>
          </div>
          <div className="text-right">
            <div className="border-t border-gray-400 pt-2 mt-8 w-48">
              <p className="text-xs text-gray-600">Authorized Signature</p>
              <p className="text-xs text-gray-600 mt-1">{report.verifiedBy || 'Pending Verification'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          This report is confidential and intended solely for the use of the patient and attending physician. 
          Results should be interpreted in conjunction with clinical findings and other laboratory data.
        </p>
      </div>
    </div>
  );
};

export default TestReportTemplate;