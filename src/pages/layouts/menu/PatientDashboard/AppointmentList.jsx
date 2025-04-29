import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('doctor');
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    const apiUrl =
      activeTab === 'doctor'
        ? 'https://67e3e1e42ae442db76d2035d.mockapi.io/register/book'
        : 'https://your-lab-api-endpoint.com/appointments';
    axios
      .get(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        const userAppointments = response.data.filter(
          (appointment) => appointment.userId === loggedInUserId
        );
        setAppointments(userAppointments);
      })
      .catch((error) => {
        console.error("Error fetching appointments!", error);
      });
  }, [activeTab]);
  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `https://67e3e1e42ae442db76d2035d.mockapi.io/register/book/${appointmentId}`,
        { status: 'Cancelled' },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setAppointments(appointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'Cancelled' }
          : appointment
      ));
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };
  const lowerSearch = search.toLowerCase();
  const filteredAppointments = appointments.filter((appointment) =>
    activeTab === 'doctor'
      ? (appointment?.doctorName?.toLowerCase() || '').includes(lowerSearch) ||
        (appointment?.specialty?.toLowerCase() || '').includes(lowerSearch)
      : (appointment?.testName?.toLowerCase() || '').includes(lowerSearch) ||
        (appointment?.labName?.toLowerCase() || '').includes(lowerSearch)
  );
  return (
    <div className="p-4 md:p-6 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-2xl font-semibold text-[#0E1630] mb-6">My Appointments</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab('doctor')}
              className={`px-5 py-2 rounded-full text-sm font-semibold ${activeTab === 'doctor' ? 'bg-[#0E1630] text-white' : 'bg-gray-200 text-[#0E1630]'}`}
            >
              Doctor Appointments
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-5 py-2 rounded-full text-sm font-semibold ${activeTab === 'lab' ? 'bg-[#0E1630] text-white' : 'bg-gray-200 text-[#0E1630]'}`}
            >
              Lab Appointments
            </button>
          </div>
          <button
            onClick={() =>
              navigate(activeTab === 'doctor' ? '/dashboard/book-appointment' : '/lab-tests')
            }
            className="px-4 py-2 rounded-full border border-[#0E1630] text-[#0E1630] hover:bg-[#0E1630] hover:text-white transition-all font-medium shadow-sm"
          > Book Appointment
           </button>
           </div>
            {/* {activeTab === 'doctor' ? ':heavy_plus_sign: Book Doctor Appointment' : ':heavy_plus_sign: Book Lab Appointment'} */}
         
      
        {/* <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder={activeTab === 'doctor' ? 'Search doctor or specialty...' : 'Search test or lab name...'}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0E1630] bg-white text-gray-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3.5 top-3 text-[#0E1630] text-lg">:mag:</span>
          </div>
        </div> */}
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-slate-800 text-white text-xs uppercase font-semibold">
            <tr>
              {activeTab === 'doctor' && (
                <>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Time</th>
                  <th className="px-6 py-4 text-left">Doctor</th>
                  <th className="px-6 py-4 text-left">Specialty</th>
                </>
              )}
              {activeTab === 'lab' && (
                <>
                  <th className="px-6 py-4 text-left">Test</th>
                  <th className="px-6 py-4 text-left">Lab Name</th>
                </>
              )}
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-yellow-50 transition duration-200">
                  {activeTab === 'doctor' && (
                    <>
                      <td className="px-6 py-4">{appointment.date || 'N/A'}</td>
                      <td className="px-6 py-4">{appointment.time || 'N/A'}</td>
                      <td className="px-6 py-4">{appointment.doctorName || 'N/A'}</td>
                      <td className="px-6 py-4">{appointment.specialty || 'N/A'}</td>
                    </>
                  )}
                  {activeTab === 'lab' && (
                    <>
                      <td className="px-6 py-4">{appointment.testName || 'N/A'}</td>
                      <td className="px-6 py-4">{appointment.labName || 'N/A'}</td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === 'Confirmed'
                          ? 'bg-yellow-100 text-slate-800'
                          : appointment.status === 'Cancelled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {appointment.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {appointment.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="px-4 py-1.5 bg-slate-800 text-white rounded-full text-xs font-semibold hover:bg-yellow-500 transition-all duration-300 focus:ring-2 focus:ring-yellow-300"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={activeTab === 'doctor' ? 6 : 4} className="text-center px-6 py-10 text-gray-400 text-base">
                  :zzz: No {activeTab === 'doctor' ? 'doctor' : 'lab'} appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AppointmentList;







