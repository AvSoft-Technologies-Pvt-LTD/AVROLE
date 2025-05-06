import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("doctor");
  const [labAppointments, setLabAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  useEffect(() => {
    fetchLabAppointments();
    fetchDoctorAppointments();
  }, []);

  const fetchLabAppointments = async () => {
    try {
      const response = await axios.get("https://680b3642d5075a76d98a3658.mockapi.io/Lab/payment");
      setLabAppointments(response.data.reverse());
    } catch (error) {
      console.error("Error fetching lab appointments", error);
    }
  };

  const fetchDoctorAppointments = async () => {
    try {
      const response = await axios.get("https://67e3e1e42ae442db76d2035d.mockapi.io/register/book");
      setDoctorAppointments(response.data.reverse());
    } catch (error) {
      console.error("Error fetching doctor appointments", error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Appointment Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Technician On the Way":
        return "bg-yellow-100 text-yellow-800";
      case "Sample Collected":
        return "bg-purple-100 text-purple-800";
      case "Test Processing":
        return "bg-orange-100 text-orange-800";
      case "Report Ready":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleBookAppointment = () => {
    if (activeTab === "lab") {
      navigate("/dashboard/lab-tests");
    } else {
      navigate("/dashboard/book-appointment");
    }
  };

  const handleTrackAppointment = (id) => {
    navigate(`/dashboard/track-appointment/${id}`);
  };

  const handleCancelDoctorAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      axios
        .delete(`https://67e3e1e42ae442db76d2035d.mockapi.io/register/book/${id}`)
        .then(() => {
          fetchDoctorAppointments();
          alert("Appointment cancelled successfully!");
        })
        .catch((error) => {
          console.error("Error cancelling appointment", error);
          alert("Failed to cancel appointment!");
        });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
         
          <button
            onClick={() => setActiveTab("doctor")}
            className={`px-4 py-2 rounded-full ${activeTab === "doctor" ? "bg-[#0e1630] text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Doctor Appointments
          </button>
          <button
            onClick={() => setActiveTab("lab")}
            className={`px-4 py-2 rounded-full ${activeTab === "lab" ? "bg-[#0e1630] text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Lab Appointments
          </button>
        </div>
        <button
          onClick={handleBookAppointment}
          className="bg-[#F4C430] hover:bg-[#0e1630] hover:text-white text-[#0e1630] px-6 py-2 rounded-full font-semibold"
        >
          Book Appointment
        </button>
      </div>
      {activeTab === "doctor" && (
        <div className="bg-white rounded shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Doctor Appointments</h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Doctor Name</th>
                <th className="py-2 px-4 border-b">Speciality</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Status</th>
                {/* <th className="py-2 px-4 border-b">Action</th> */}
              </tr>
            </thead>
            <tbody>
            {doctorAppointments.map((apt) => (
  <tr key={apt.id} className="hover:bg-gray-50">
    <td className="py-2 px-4 border-b">{apt.doctorName}</td>
    <td className="py-2 px-4 border-b">{apt.specialty}</td>
    <td className="py-2 px-4 border-b">{apt.date}</td>
    <td className="py-2 px-4 border-b">{apt.time}</td>
    <td className="py-2 px-4 border-b">
      {apt.status === 'Confirmed' ? (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
          Confirmed
        </span>
      ) : (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">
          Pending
        </span>
      )}
    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       {activeTab === "lab" && (
        <div className="bg-white rounded shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lab Appointments</h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Appointment ID</th>
                <th className="py-2 px-4 border-b">Test</th>
                <th className="py-2 px-4 border-b">Lab Name</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {labAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{apt.bookingId}</td>
                  <td className="py-2 px-4 border-b">{apt.testTitle}</td>
                  <td className="py-2 px-4 border-b">{apt.labName}</td>
                  <td className="py-2 px-4 border-b">{apt.date}</td>
                  <td className="py-2 px-4 border-b">{apt.time}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(apt.status)}`}>
                      {apt.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleTrackAppointment(apt.bookingId)}
                      className="text-[#0e1630] hover:text-[#F4C430] font-semibold"
                    >
                      Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
