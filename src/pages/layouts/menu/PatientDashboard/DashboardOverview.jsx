import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaHeartbeat,
  FaThermometerHalf,
  FaTint,
  FaStethoscope,
  FaPlusCircle,
  FaSpinner,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardOverview = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [healthSummary, setHealthSummary] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newVitals, setNewVitals] = useState({
    heartRate: "",
    temperature: "",
    bloodSugar: "",
    bloodPressure: "",
  });

  // useEffect(() => {
  //   axios
  //     .get("/api/appointments/monthly")
  //     .then((res) => setAppointmentsData(res.data.map(d => Math.max(d, 0)))) // Ensure positive values
  //     .catch((err) => console.error("Appointment fetch error", err));

  //   axios
  //     .get("/api/health-summary")
  //     .then((res) => setHealthSummary(res.data))
  //     .catch((err) => console.error("Health summary fetch error", err));
  // }, []);

  const handleAddVital = () => {
    setHealthSummary(newVitals);
    setShowModal(false);
    setNewVitals({
      heartRate: "",
      temperature: "",
      bloodSugar: "",
      bloodPressure: "",
    });
  };

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Appointments",
        data: appointmentsData.length === 12 ? appointmentsData : new Array(12).fill(0),
        fill: true,
        borderColor: "#0e1630",
        backgroundColor: "rgba(244,196,48,0.3)",
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#0e1630",
          font: { weight: "bold" },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#0e1630",
        },
        grid: {
          color: "rgba(14, 22, 48, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        min: 1,  // Start from 1
        max: 10,  // End at 5
        stepSize: 1,  // Set step size to 1 for integer values
        ticks: {
          color: "#0e1630",
          // Optional: round to whole integers if needed
          callback: function (value) {
            return Math.round(value);  // Ensure whole numbers on the Y-axis
          },
        },
        grid: {
          color: "rgba(14, 22, 48, 0.1)",
        },
      },
    },
  };
  const summaryCards = [
    {
      label: "Heart Rate",
      icon: <FaHeartbeat />,
      color: "bg-rose-100 text-rose-600", // warm pink/red for heart
      value: healthSummary.heartRate || "N/A",
    },
    {
      label: "Temperature",
      icon: <FaThermometerHalf />,
      color: "bg-amber-100 text-amber-600", // amber for body warmth
      value: healthSummary.temperature || "N/A",
    },
    {
      label: "Blood Sugar",
      icon: <FaTint />,
      color: "bg-sky-100 text-sky-600", // soft blue for fluid/sugar
      value: healthSummary.bloodSugar || "N/A",
    },
    {
      label: "Blood Pressure",
      icon: <FaStethoscope />,
      color: "bg-violet-100 text-violet-600", // calm purple for BP monitoring
      value: healthSummary.bloodPressure || "N/A",
    },
  ];
  
  const renderLoader = () => (
    <div className="flex justify-center items-center py-4">
      <FaSpinner className="animate-spin text-2xl text-[#F4C430]" />
    </div>
  );

  return (
    <div className="p-6 mt-5 bg-[#0e1630] min-h-screen text-white">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Appointments Chart */}
        <div className="bg-[#F4C430] p-5 rounded-2xl shadow-2xl h-full min-h-[400px] flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-[#0e1630] tracking-wide">
            Monthly Appointments Overview
          </h2>
          <div className="flex-grow">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Health Summary */}
        <div className="bg-white text-[#0e1630] p-5 rounded-2xl shadow-2xl h-full min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Health Summary</h2>
            <button
              className="flex items-center gap-2 text-sm bg-[#F4C430] text-[#0e1630] px-3 py-1 rounded-full shadow hover:scale-105 transition-transform"
              onClick={() => setShowModal(true)}
            >
              <FaPlusCircle /> Add Vital
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-grow">
            {summaryCards.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl shadow-md flex flex-col items-center justify-center ${item.color} hover:shadow-lg transition`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-md font-semibold">{item.label}</h3>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white text-[#0e1630] p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Insurance Info</h2>
          {renderLoader()}
        </div>

        <div className="bg-white text-[#0e1630] p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
          {renderLoader()}
        </div>
      </div>

      {/* Add Vital Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-start justify-center pt-20 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white text-[#0e1630] p-6 rounded-xl shadow-2xl w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Add Vital Details</h2>

            {/* Current Vitals */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: "Heart Rate", value: healthSummary.heartRate, unit: "bpm" },
                { label: "Temperature", value: healthSummary.temperature, unit: "°C" },
                { label: "Blood Sugar", value: healthSummary.bloodSugar, unit: "mg/dL" },
                { label: "Blood Pressure", value: healthSummary.bloodPressure, unit: "mmHg" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 shadow-sm bg-gray-50"
                >
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-lg font-bold">
                    {item.value || "N/A"}{" "}
                    <span className="text-sm font-medium text-gray-600">{item.unit}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Heart Rate (bpm)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]"
                value={newVitals.heartRate}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, heartRate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Temperature (°C)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]"
                value={newVitals.temperature}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, temperature: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Blood Sugar (mg/dL)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]"
                value={newVitals.bloodSugar}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, bloodSugar: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Blood Pressure (mmHg)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F4C430]"
                value={newVitals.bloodPressure}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, bloodPressure: e.target.value })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVital}
                className="px-4 py-2 bg-[#F4C430] text-[#0e1630] font-semibold rounded-md hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
