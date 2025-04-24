import React, { useState } from 'react';
import { History, ClipboardList, FileText, Upload, X, Download, Eye } from 'lucide-react';

function MedicalRecord() {
  const [activeTab, setActiveTab] = useState('history');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    prescriptions: { doctorName: '', hospitalName: '', diagnosis: '' },
    reports: { testName: '', labName: '' }
  });
  const [uploadedFiles, setUploadedFiles] = useState({ prescriptions: [], reports: [] });

  const tabData = {
    history: {
      icon: History,
      title: 'Medical History',
      data: [{
        date: '2024-03-10',
        diagnosis: 'Common Cold',
        doctorName: 'Dr. Smith',
        hospitalName: 'City General Hospital',
        followupNeeded: 'Yes',
        doctorNote: 'Patient showing good recovery',
        action: 'View Details'
      }]
    },
    prescriptions: {
      icon: ClipboardList,
      title: 'Prescriptions',
      data: [{
        date: '2024-03-10',
        doctorName: 'Dr. Smith',
        hospitalName: 'City General Hospital',
        diagnosis: 'Common Cold',
        status: 'Verified',
        fileUrl: 'https://example.com/prescription1.pdf',
        action: 'View',
        isUploaded: false
      }, ...uploadedFiles.prescriptions]
    },
    reports: {
      icon: FileText,
      title: 'Reports',
      data: [{
        date: '2024-03-10',
        testName: 'Blood Test',
        labName: 'City Lab',
        status: 'Verified',
        fileUrl: 'https://example.com/report1.pdf',
        action: 'Download'
      }, ...uploadedFiles.reports]
    }
  };

  const mockPrescriptionData = {
    patientName: "John Doe", dateOfBirth: "1990-05-15", age: "33", sex: "Male",
    occupation: "Software Engineer", healthInsurance: "ABC123456", healthProvider: "HealthCare Plus",
    healthCardNo: "HC789012", patientId: "P123456", address: "123 Main St, City, Country",
    cellNo: "+1 234-567-8900", bloodPressure: "120/80", pulseRate: "72", weight: "75 kg",
    allergies: "None", disabilities: "None",
    medications: [
      { drug: "Amoxicillin", unit: "500mg Tablet", dosage: "1-0-1" },
      { drug: "Paracetamol", unit: "650mg Tablet", dosage: "1-1-1" },
      { drug: "Vitamin C", unit: "500mg Tablet", dosage: "0-1-0" }
    ],
    dietToFollow: "Regular balanced diet with plenty of fluids",
    patientHistory: "Patient presented with fever and body ache for 2 days",
    followUpPhysician: "Dr. Jane Wilson"
  };

  const handleAction = (item, type) => {
    if (type === 'Medical History') {
      setModalContent({ type, data: item });
    } else if (type === 'Prescriptions') {
      setModalContent({
        type: item.isUploaded ? 'UploadedPrescription' : type,
        data: item.isUploaded ? item : { ...item, ...mockPrescriptionData }
      });
    } else {
      window.open(item.fileUrl, '_blank');
      return;
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [name]: value }
    }));
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const newFile = {
      date: new Date().toISOString().split('T')[0],
      status: 'Unverified',
      fileUrl: URL.createObjectURL(selectedFile),
      action: activeTab === 'prescriptions' ? 'View' : 'Download',
      ...(activeTab === 'prescriptions' ? {
        doctorName: formData.prescriptions.doctorName,
        hospitalName: formData.prescriptions.hospitalName,
        diagnosis: formData.prescriptions.diagnosis,
        isUploaded: true,
        imageUrl: URL.createObjectURL(selectedFile)
      } : {
        testName: formData.reports.testName,
        labName: formData.reports.labName
      })
    };

    setUploadedFiles(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newFile]
    }));

    setSelectedFile(null);
    setFormData(prev => ({
      ...prev,
      [activeTab]: Object.fromEntries(
        Object.keys(prev[activeTab]).map(key => [key, ''])
      )
    }));
  };

  const renderModalContent = () => {
    const { type, data } = modalContent || {};
    
    if (type === 'Prescriptions') {
      return (
        <div className="bg-white p-8 max-w-4xl w-full mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-red-600">Doctor's</h1>
              <h2 className="text-xl">Medical Prescription</h2>
            </div>
            <div className="text-4xl font-bold">Rx</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[['Patient\'s Name', data.patientName], ['Date', data.date]].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="font-semibold">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              ['Date of Birth', data.dateOfBirth],
              ['Age', data.age],
              ['Sex', data.sex]
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="font-semibold">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              ['Health Insurance No', data.healthInsurance],
              ['Health Care Provider', data.healthProvider]
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="font-semibold">{label}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="font-semibold mb-2">Medications:</div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Drugs</th>
                  <th className="border p-2 text-left">Unit (Tablet / Syrup)</th>
                  <th className="border p-2 text-left">Dosage (Per Day)</th>
                </tr>
              </thead>
              <tbody>
                {data.medications.map((med, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{med.drug}</td>
                    <td className="border p-2">{med.unit}</td>
                    <td className="border p-2">{med.dosage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {[
            ['Diet To Follow', data.dietToFollow, 'bg-blue-50'],
            ['Brief History of Patient', data.patientHistory, 'bg-yellow-50']
          ].map(([label, value, bgColor]) => (
            <div key={label} className="mb-4">
              <div className="font-semibold mb-2">{label}:</div>
              <div className={`p-2 ${bgColor} rounded`}>{value}</div>
            </div>
          ))}

          <div className="mt-8 pt-4 border-t">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Follow Up Physician:</div>
                <div>{data.followUpPhysician}</div>
              </div>
              <div>
                <div className="font-semibold">Signature of Physician:</div>
                <div className="mt-2">Dr. {data.doctorName}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'UploadedPrescription') {
      return (
        <div className="bg-white p-8 max-w-4xl w-full mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-red-600">Uploaded</h1>
              <h2 className="text-xl">Prescription</h2>
            </div>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ['Doctor Name', data.doctorName],
                ['Hospital Name', data.hospitalName],
                ['Diagnosis', data.diagnosis],
                ['Date', data.date]
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <span className="font-semibold">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <img 
                src={data.imageUrl} 
                alt="Uploaded Prescription"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <h2 className="text-lg font-semibold mb-4">{type} Details</h2>
        <div className="space-y-2">
          {Object.entries(data)
            .filter(([key]) => !['action', 'fileUrl', 'isUploaded', 'imageUrl'].includes(key))
            .map(([key, value], idx) => (
              <div key={idx} className="flex justify-between border-b pb-1">
                <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
        </div>
      </>
    );
  };

  const ActiveTabData = tabData[activeTab];

  // This function will ensure we get a consistent set of table headers
  const getHeadersForActiveTab = () => {
    switch(activeTab) {
      case 'history':
        return ['date', 'diagnosis', 'doctorName', 'hospitalName', 'followupNeeded', 'doctorNote'];
      case 'prescriptions':
        return ['date', 'doctorName', 'hospitalName', 'diagnosis', 'status'];
      case 'reports':
        return ['date', 'testName', 'labName', 'status'];
      default:
        return [];
    }
  };

  const headers = getHeadersForActiveTab();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(tabData).map(([tab, { icon: Icon, title }]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab ? 'bg-[#001630] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Icon size={18} />
              {title}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    {headers.map((header) => (
                      <th key={header} className="px-4 py-2 capitalize">
                        {header.replace(/([A-Z])/g, ' $1')}
                      </th>
                    ))}
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ActiveTabData.data.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      {headers.map(header => (
                        <td key={header} className="px-4 py-2">
                          {item[header]}
                        </td>
                      ))}
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleAction(item, ActiveTabData.title)}
                          className="text-[#001630] hover:underline text-sm flex items-center gap-1"
                        >
                          {activeTab === 'history' ? (
                            <><Eye size={16} />View Details</>
                          ) : activeTab === 'reports' ? (
                            <><Download size={16} />Download</>
                          ) : (
                            <><Eye size={16} />View</>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {activeTab !== 'history' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Upload size={18} />
                Upload {activeTab === 'prescriptions' ? 'Prescription' : 'Report'}
              </h2>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className={`grid grid-cols-1 ${activeTab === 'prescriptions' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                  {Object.entries(formData[activeTab]).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.replace(/([A-Z])/g, ' $1').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-[#001630] focus:border-[#001630] outline-none"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Choose File
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#001630] text-white px-6 py-2 rounded-md hover:bg-opacity-90 self-end transition-colors flex items-center gap-1"
                  >
                    <Upload size={16} />
                    Upload
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative bg-white rounded-lg mx-auto w-full p-6 z-50 shadow-lg">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalRecord;