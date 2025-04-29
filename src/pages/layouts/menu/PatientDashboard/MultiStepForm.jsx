




import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Step1 from "./Step1";
import Step2 from "./Step2";
import axios from "axios";
import book from "./book1.jpg";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const [location, setLocation] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationType, setConsultationType] = useState("Physical");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState("Upcoming");

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // ✅ Redux user

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://mocki.io/v1/df98b258-0b01-4da8-9f14-a34d6c8d3690");
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handlePayment = async () => {
    const userId = localStorage.getItem("userId");
  
    const payload = {
      userId,
      name: `${user?.firstName || "Guest"} ${user?.lastName || ""}`,
      phone: userDetails?.phone || "N/A",
      symptoms,
      date,
      time,
      specialty,
      consultationType,
      doctorName: selectedDoctor?.name || "N/A",
      status,
      notification: {
        doctorId: selectedDoctor?.id || "N/A",
        message: `You have a new appointment with ${user?.firstName || "a patient"} on ${date} at ${time}. The patient is experiencing: ${symptoms || "No symptoms provided"}.`
      }
    };
  
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        "https://67e3e1e42ae442db76d2035d.mockapi.io/register/book",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Booking & notification successful:", response.data);
  
      // Trigger notification to the doctor
      await sendNotificationToDoctor(payload.notification);
  
      // Show confirmation modal
      setShowConfirmationModal(true);
  
      // Reset fields after short delay
      setTimeout(() => {
        setShowConfirmationModal(false);
        setStep(1);
        setLocation("");
        setSymptoms("");
        setDate("");
        setTime("");
        setSpecialty("");
        setSpecialties([]);
        setSelectedDoctor(null);
        setConsultationType("Physical");
        setMobile("");
        navigate("/dashboard/app");
      }, 800);
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to send notification
  const sendNotificationToDoctor = async (notification) => {
    try {
      const response = await axios.post(
        "https://67e631656530dbd3110f0322.mockapi.io/drnotifiy",
        notification,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Notification sent to doctor:", response.data);
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 min-h-[450px] mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 px-4">
            <div className="min-h-[350px] h-auto overflow-y-auto">
              {step === 1 && (
                <Step1
                  consultationType={consultationType}
                  setConsultationType={setConsultationType}
                  location={location}
                  setLocation={setLocation}
                  symptoms={symptoms}
                  setSymptoms={setSymptoms}
                  specialty={specialty}
                  setSpecialty={setSpecialty}
                  specialties={specialties}
                  setSpecialties={setSpecialties}
                  date={date}
                  setDate={setDate}
                  time={time}
                  setTime={setTime}
                  doctors={doctors}
                  selectedDoctor={selectedDoctor}
                  setSelectedDoctor={setSelectedDoctor}
                  handleNext={handleNext}
                  mobile={mobile}
                  setMobile={setMobile}
                />
              )}
              {step === 2 && (
                <Step2
                  selectedDoctor={selectedDoctor}
                  selectedDate={date}
                  selectedTime={time}
                  handleBack={handleBack}
                  handlePayment={handlePayment}
                />
              )}
            </div>
          </div>

          <div className="hidden md:block w-px bg-gray-300 mx-2"></div>

          <div className="hidden md:block w-1/3 px-4 flex justify-center items-center min-h-[500px]">
            <img src={book} alt="Appointment" className="max-w-[400px] h-auto object-contain" />
          </div>
        </div>

        {showConfirmationModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-center text-[#0e1630] mb-2">
                Appointment Booked Successfully!
              </h3>
              <p className="text-center text-gray-700 mb-4">
                You’ll receive a confirmation message from the doctor shortly.
              </p>

              <div className="text-center text-sm font-medium text-[#0e1630] mb-4">
                💳 Fee: <span className="text-yellow-600">₹{selectedDoctor?.fees}</span>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm rounded-lg p-4 text-center">
                Thank you! Redirecting you to your dashboard…
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;






