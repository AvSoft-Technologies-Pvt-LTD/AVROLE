
// // import React, { useEffect, useState } from "react";
// // import Step1 from "./Step1";
// // import Step2 from "./Step2";
// // import Step3 from "./Step3";
// // import axios from "axios";
// // import UserDetailsModal from "./UserDetailsModal"; // Ensure the correct path for your modal component
// // import book from '../assets/book.jpg'
// // const MultiStepForm = () => {
// //   const [step, setStep] = useState(1);

// //   // Booking-related states
// //   const [location, setLocation] = useState("");
// //   const [symptoms, setSymptoms] = useState("");
// //   const [date, setDate] = useState("");
// //   const [time, setTime] = useState("");
// //   const [specialty, setSpecialty] = useState("");
// //   const [specialties, setSpecialties] = useState([]);
// //   const [selectedDoctor, setSelectedDoctor] = useState(null);
// //   const [consultationType, setConsultationType] = useState("Physical");
// //   const [mobile, setMobile] = useState("");

// //   // Payment-related states
// //   const [paymentMethod, setPaymentMethod] = useState("Card");
// //   const [cardDetails, setCardDetails] = useState({ number: "", name: "", expiry: "", cvv: "" });
// //   const [gpayDetails, setGpayDetails] = useState({ email: "", mobile: "", transactionId: "" });
// //   const [netbankingDetails, setNetbankingDetails] = useState({ bankName: "" });

// //   // Error states for payment methods
// //   const [gpayErrors, setGpayErrors] = useState({});
// //   const [netbankingErrors, setNetbankingErrors] = useState({});
// //   const [cardErrors, setCardErrors] = useState({});

// //   const [doctors, setDoctors] = useState([]);
// //   const [showConfirmationModal, setShowConfirmationModal] = useState(false);

// //   // User details
// //   const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
// //   const [showUserModal, setShowUserModal] = useState(true);

// //   // Fetch doctors when component mounts
// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         const response = await axios.get("https://mocki.io/v1/df98b258-0b01-4da8-9f14-a34d6c8d3690");
// //         setDoctors(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch doctors:", error);
// //       }
// //     };

// //     fetchDoctors();
// //   }, []);

// //   const handleUserSubmit = (userData) => {
// //     setUserDetails(userData);
// //     setShowUserModal(false);
// //   };

// //   const handleNext = () => setStep((prev) => prev + 1);
// //   const handleBack = () => setStep((prev) => prev - 1);

// //   // Validate fields based on the selected payment method
// //   const validateFields = () => {
// //     let valid = true;

// //     if (paymentMethod === "Card") {
// //       const errors = {};
// //       if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number)) {
// //         errors.number = "Enter a valid 16-digit card number";
// //         valid = false;
// //       }
// //       if (!cardDetails.name || cardDetails.name.trim().length < 3) {
// //         errors.name = "Enter a valid name";
// //         valid = false;
// //       }
// //       if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
// //         errors.expiry = "Enter expiry in MM/YY format";
// //         valid = false;
// //       }
// //       if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) {
// //         errors.cvv = "Enter a valid 3-digit CVV";
// //         valid = false;
// //       }
// //       setCardErrors(errors);
// //     }

// //     if (paymentMethod === "GPay") {
// //       const errors = {};
// //       if (!gpayDetails.email || !/^\S+@\S+\.\S+$/.test(gpayDetails.email)) {
// //         errors.email = "Enter a valid email";
// //         valid = false;
// //       }
// //       if (!gpayDetails.mobile || !/^\d{10}$/.test(gpayDetails.mobile)) {
// //         errors.mobile = "Enter a 10-digit mobile number";
// //         valid = false;
// //       }
// //       setGpayErrors(errors);
// //     }

// //     if (paymentMethod === "NetBanking") {
// //       const errors = {};
// //       if (!netbankingDetails.bankName) {
// //         errors.bankName = "Please select a bank";
// //         valid = false;
// //       }
// //       setNetbankingErrors(errors);
// //     }

// //     return valid;
// //   };

// //   // Handle payment submission
// //   const handlePayment = async () => {
// //     if (!validateFields()) return;
  
// //     const payload = {
// //       name: userDetails.name,
// //       phone: userDetails.phone,
// //       symptoms,
// //       date,
// //       time,
// //       specialty,
// //       consultationType,
// //       doctor: selectedDoctor?.name || "N/A",
// //       paymentMethod,
// //     };
  
// //     try {
// //       const response = await axios.post("https://67e3e1e42ae442db76d2035d.mockapi.io/register/book", payload);
// //       console.log("Booking successful:", response.data);
// //       setShowConfirmationModal(true);
  
// //       // Clear form data after 3 seconds
// //       setTimeout(() => {
// //         setShowConfirmationModal(false);
// //         setStep(1);
// //         // Reset form states
// //         setLocation("");
// //         setSymptoms("");
// //         setDate("");
// //         setTime("");
// //         setSpecialty("");
// //         setSpecialties([]);
// //         setSelectedDoctor(null);
// //         setConsultationType("Physical");
// //         setMobile("");
// //         setPaymentMethod("Card");
// //         setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
// //         setGpayDetails({ email: "", mobile: "", transactionId: "" });
// //         setNetbankingDetails({ bankName: "" });
// //         setCardErrors({});
// //         setGpayErrors({});
// //         setNetbankingErrors({});
// //       }, 3000);
  
// //     } catch (error) {
// //       console.error("Failed to book appointment:", error);
// //       alert("Booking failed. Please try again.");
// //     }
// //   };
  

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       {showUserModal && (
// //         <UserDetailsModal
// //           onClose={() => setShowUserModal(false)}
// //           onSubmit={handleUserSubmit}
// //         />
// //       )}

// //       {!showUserModal && (
// //          <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 min-h-[450px] mt-4">
// //          <div className="flex flex-col md:flex-row">
// //            {/* Left: Form Area */}
// //            <div className="w-full md:w-1/2 px-4">
// //              <div className="min-h-[350px] h-auto overflow-y-auto">
// //                 {step === 1 && (
// //                   <Step1
// //                     consultationType={consultationType}
// //                     setConsultationType={setConsultationType}
// //                     location={location}
// //                     setLocation={setLocation}
// //                     symptoms={symptoms}
// //                     setSymptoms={setSymptoms}
// //                     specialty={specialty}
// //                     setSpecialty={setSpecialty}
// //                     specialties={specialties}
// //                     setSpecialties={setSpecialties}
// //                     date={date}
// //                     setDate={setDate}
// //                     time={time}
// //                     setTime={setTime}
// //                     doctors={doctors}
// //                     selectedDoctor={selectedDoctor}
// //                     setSelectedDoctor={setSelectedDoctor}
// //                     handleNext={handleNext}
// //                     mobile={mobile}
// //                     setMobile={setMobile}
// //                   />
// //                 )}
// //                 {step === 2 && (
// //                   <Step2
// //                     selectedDoctor={selectedDoctor}
// //                     selectedDate={date}
// //                     selectedTime={time}
// //                     handleNext={handleNext}
// //                     handleBack={handleBack}
// //                   />
// //                 )}
// //                 {step === 3 && (
// //                   <Step3
// //                     handleBack={handleBack}
// //                     handlePayment={handlePayment}
// //                     paymentMethod={paymentMethod}
// //                     setPaymentMethod={setPaymentMethod}
// //                     cardDetails={cardDetails}
// //                     setCardDetails={setCardDetails}
// //                     gpayDetails={gpayDetails}
// //                     setGpayDetails={setGpayDetails}
// //                     netbankingDetails={netbankingDetails}
// //                     setNetbankingDetails={setNetbankingDetails}
// //                     cardErrors={cardErrors}
// //                     gpayErrors={gpayErrors}
// //                     netbankingErrors={netbankingErrors}
// //                   />
// //                 )}
// //               </div>
              
             
// //             </div>
// //             <div className="hidden md:block w-px bg-gray-300 mx-2"></div>
// //             {/* Right side image */}
// //             <div className="hidden md:block w-1/3 px-4 flex justify-center items-center min-h-[500px]">
// //   <img
// //     src={book}
// //     alt="Appointment"
// //     className="max-w-[400px] h-auto object-contain"
// //   />
// // </div>

// //           </div>

// //           {/* Confirmation modal */}
// //           {showConfirmationModal && (
// //             <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
// //               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
// //                 <h2 className="text-xl font-semibold text-green-600 mb-4">Appointment Booked Successfully!</h2>
// //                 <p className="text-gray-700 mb-4">Thank you for booking. You will receive a confirmation shortly.</p>
// //                 <div className="text-sm text-gray-600 space-y-1">
// //                   <p><span className="font-medium">Doctor:</span> {selectedDoctor?.name}</p>
// //                   <p><span className="font-medium">Date:</span> {date}</p>
// //                   <p><span className="font-medium">Time:</span> {time}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MultiStepForm;
// // import React, { useEffect, useState } from "react";
// // import Step1 from "./Step1";
// // import Step2 from "./Step2";
// // import Step3 from "./Step3";
// // import axios from "axios";
// // import UserDetailsModal from "./UserDetailsModal"; // Ensure the correct path for your modal component
// // import book from '../assets/book.jpg'

// // const MultiStepForm = () => {
// //   const [step, setStep] = useState(1);
// //   const [isUserRegistered, setIsUserRegistered] = useState(false); // Track if the user is registered

// //   // Booking-related states
// //   const [location, setLocation] = useState("");
// //   const [symptoms, setSymptoms] = useState("");
// //   const [date, setDate] = useState("");
// //   const [time, setTime] = useState("");
// //   const [specialty, setSpecialty] = useState("");
// //   const [specialties, setSpecialties] = useState([]);
// //   const [selectedDoctor, setSelectedDoctor] = useState(null);
// //   const [consultationType, setConsultationType] = useState("Physical");
// //   const [mobile, setMobile] = useState("");

// //   // Payment-related states
// //   const [paymentMethod, setPaymentMethod] = useState("Card");
// //   const [cardDetails, setCardDetails] = useState({ number: "", name: "", expiry: "", cvv: "" });
// //   const [gpayDetails, setGpayDetails] = useState({ email: "", mobile: "", transactionId: "" });
// //   const [netbankingDetails, setNetbankingDetails] = useState({ bankName: "" });

// //   // Error states for payment methods
// //   const [gpayErrors, setGpayErrors] = useState({});
// //   const [netbankingErrors, setNetbankingErrors] = useState({});
// //   const [cardErrors, setCardErrors] = useState({});

// //   const [doctors, setDoctors] = useState([]);
// //   const [showConfirmationModal, setShowConfirmationModal] = useState(false);

// //   // User details
// //   const [userDetails, setUserDetails] = useState({ name: "", phone: "" });

// //   // Fetch doctors when component mounts
// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         const response = await axios.get("https://mocki.io/v1/df98b258-0b01-4da8-9f14-a34d6c8d3690");
// //         setDoctors(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch doctors:", error);
// //       }
// //     };

// //     fetchDoctors();
// //   }, []);

// //   const handleUserSubmit = (userData) => {
// //     setUserDetails(userData);
// //     setIsUserRegistered(true); // Set user as registered after submitting details
// //   };

// //   const handleNext = () => setStep((prev) => prev + 1);
// //   const handleBack = () => setStep((prev) => prev - 1);

// //   // Validate fields based on the selected payment method
// //   const validateFields = () => {
// //     let valid = true;

// //     if (paymentMethod === "Card") {
// //       const errors = {};
// //       if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number)) {
// //         errors.number = "Enter a valid 16-digit card number";
// //         valid = false;
// //       }
// //       if (!cardDetails.name || cardDetails.name.trim().length < 3) {
// //         errors.name = "Enter a valid name";
// //         valid = false;
// //       }
// //       if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
// //         errors.expiry = "Enter expiry in MM/YY format";
// //         valid = false;
// //       }
// //       if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) {
// //         errors.cvv = "Enter a valid 3-digit CVV";
// //         valid = false;
// //       }
// //       setCardErrors(errors);
// //     }

// //     if (paymentMethod === "GPay") {
// //       const errors = {};
// //       if (!gpayDetails.email || !/^\S+@\S+\.\S+$/.test(gpayDetails.email)) {
// //         errors.email = "Enter a valid email";
// //         valid = false;
// //       }
// //       if (!gpayDetails.mobile || !/^\d{10}$/.test(gpayDetails.mobile)) {
// //         errors.mobile = "Enter a 10-digit mobile number";
// //         valid = false;
// //       }
// //       setGpayErrors(errors);
// //     }

// //     if (paymentMethod === "NetBanking") {
// //       const errors = {};
// //       if (!netbankingDetails.bankName) {
// //         errors.bankName = "Please select a bank";
// //         valid = false;
// //       }
// //       setNetbankingErrors(errors);
// //     }

// //     return valid;
// //   };

// //   // Handle payment submission
// //   const handlePayment = async () => {
// //     if (!validateFields()) return;
  
// //     const payload = {
// //       name: userDetails.name,
// //       phone: userDetails.phone,
// //       symptoms,
// //       date,
// //       time,
// //       specialty,
// //       consultationType,
// //       doctor: selectedDoctor?.name || "N/A",
// //       paymentMethod,
// //     };
  
// //     try {
// //       const response = await axios.post("https://67e3e1e42ae442db76d2035d.mockapi.io/register/book", payload);
// //       console.log("Booking successful:", response.data);
// //       setShowConfirmationModal(true);
  
// //       // Clear form data after 3 seconds
// //       setTimeout(() => {
// //         setShowConfirmationModal(false);
// //         setStep(1);
// //         // Reset form states
// //         setLocation("");
// //         setSymptoms("");
// //         setDate("");
// //         setTime("");
// //         setSpecialty("");
// //         setSpecialties([]);
// //         setSelectedDoctor(null);
// //         setConsultationType("Physical");
// //         setMobile("");
// //         setPaymentMethod("Card");
// //         setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
// //         setGpayDetails({ email: "", mobile: "", transactionId: "" });
// //         setNetbankingDetails({ bankName: "" });
// //         setCardErrors({});
// //         setGpayErrors({});
// //         setNetbankingErrors({});
// //       }, 3000);
  
// //     } catch (error) {
// //       console.error("Failed to book appointment:", error);
// //       alert("Booking failed. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       {!isUserRegistered ? (
// //         <UserDetailsModal
// //           onClose={() => setIsUserRegistered(true)} // Close modal and mark user as registered
// //           onSubmit={handleUserSubmit}
// //         />
// //       ) : (
// //         <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 min-h-[450px] mt-4">
// //           <div className="flex flex-col md:flex-row">
// //             {/* Left: Form Area */}
// //             <div className="w-full md:w-1/2 px-4">
// //               <div className="min-h-[350px] h-auto overflow-y-auto">
// //                 {step === 1 && (
// //                   <Step1
// //                     consultationType={consultationType}
// //                     setConsultationType={setConsultationType}
// //                     location={location}
// //                     setLocation={setLocation}
// //                     symptoms={symptoms}
// //                     setSymptoms={setSymptoms}
// //                     specialty={specialty}
// //                     setSpecialty={setSpecialty}
// //                     specialties={specialties}
// //                     setSpecialties={setSpecialties}
// //                     date={date}
// //                     setDate={setDate}
// //                     time={time}
// //                     setTime={setTime}
// //                     doctors={doctors}
// //                     selectedDoctor={selectedDoctor}
// //                     setSelectedDoctor={setSelectedDoctor}
// //                     handleNext={handleNext}
// //                     mobile={mobile}
// //                     setMobile={setMobile}
// //                   />
// //                 )}
// //                 {step === 2 && (
// //                   <Step2
// //                     selectedDoctor={selectedDoctor}
// //                     selectedDate={date}
// //                     selectedTime={time}
// //                     handleNext={handleNext}
// //                     handleBack={handleBack}
// //                   />
// //                 )}
// //                 {step === 3 && (
// //                   <Step3
// //                     handleBack={handleBack}
// //                     handlePayment={handlePayment}
// //                     paymentMethod={paymentMethod}
// //                     setPaymentMethod={setPaymentMethod}
// //                     cardDetails={cardDetails}
// //                     setCardDetails={setCardDetails}
// //                     gpayDetails={gpayDetails}
// //                     setGpayDetails={setGpayDetails}
// //                     netbankingDetails={netbankingDetails}
// //                     setNetbankingDetails={setNetbankingDetails}
// //                     cardErrors={cardErrors}
// //                     gpayErrors={gpayErrors}
// //                     netbankingErrors={netbankingErrors}
// //                   />
// //                 )}
// //               </div>
// //             </div>
// //             <div className="hidden md:block w-px bg-gray-300 mx-2"></div>
// //             {/* Right side image */}
// //             <div className="hidden md:block w-1/3 px-4 flex justify-center items-center min-h-[500px]">
// //               <img
// //                 src={book}
// //                 alt="Appointment"
// //                 className="max-w-[400px] h-auto object-contain"
// //               />
// //             </div>
// //           </div>

// //           {/* Confirmation modal */}
// //           {showConfirmationModal && (
// //             <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
// //               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
// //                 <h2 className="text-xl font-semibold text-green-600 mb-4">Appointment Booked Successfully!</h2>
// //                 <p className="text-gray-700 mb-4">Thank you for booking. You will receive a confirmation shortly.</p>
// //                 <div className="text-sm text-gray-600 space-y-1">
// //                   <p><span className="font-medium">Doctor:</span> {selectedDoctor?.name}</p>
// //                   <p><span className="font-medium">Date:</span> {date}</p>
// //                   <p><span className="font-medium">Time:</span> {time}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MultiStepForm;
// // import React, { useEffect, useState } from "react";
// // import Step1 from "./Step1";
// // import Step2 from "./Step2";
// // import Step3 from "./Step3";
// // import axios from "axios";
// // import UserDetailsModal from "./UserDetailsModal"; // Ensure the correct path for your modal component
// // import book from '../assets/book.jpg'

// // const MultiStepForm = () => {
// //   const [step, setStep] = useState(1);
// //   const [isUserRegistered, setIsUserRegistered] = useState(false); // Track if the user is registered

// //   // Booking-related states
// //   const [location, setLocation] = useState("");
// //   const [symptoms, setSymptoms] = useState("");
// //   const [date, setDate] = useState("");
// //   const [time, setTime] = useState("");
// //   const [specialty, setSpecialty] = useState("");
// //   const [specialties, setSpecialties] = useState([]);
// //   const [selectedDoctor, setSelectedDoctor] = useState(null);
// //   const [consultationType, setConsultationType] = useState("Physical");
// //   const [mobile, setMobile] = useState("");

// //   // Payment-related states
// //   const [paymentMethod, setPaymentMethod] = useState("Card");
// //   const [cardDetails, setCardDetails] = useState({ number: "", name: "", expiry: "", cvv: "" });
// //   const [gpayDetails, setGpayDetails] = useState({ email: "", mobile: "", transactionId: "" });
// //   const [netbankingDetails, setNetbankingDetails] = useState({ bankName: "" });

// //   // Error states for payment methods
// //   const [gpayErrors, setGpayErrors] = useState({});
// //   const [netbankingErrors, setNetbankingErrors] = useState({});
// //   const [cardErrors, setCardErrors] = useState({});

// //   const [doctors, setDoctors] = useState([]);
// //   const [showConfirmationModal, setShowConfirmationModal] = useState(false);

// //   // User details
// //   const [userDetails, setUserDetails] = useState({ name: "", phone: "" });

// //   // Fetch doctors when component mounts
// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         const response = await axios.get("https://mocki.io/v1/df98b258-0b01-4da8-9f14-a34d6c8d3690");
// //         setDoctors(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch doctors:", error);
// //       }
// //     };

// //     fetchDoctors();
// //   }, []);

// //   const handleUserSubmit = (userData) => {
// //     setUserDetails(userData);
// //     setIsUserRegistered(true); // Set user as registered after submitting details
// //   };

// //   const handleNext = () => setStep((prev) => prev + 1);
// //   const handleBack = () => setStep((prev) => prev - 1);

// //   // Validate fields based on the selected payment method
// //   const validateFields = () => {
// //     let valid = true;

// //     if (paymentMethod === "Card") {
// //       const errors = {};
// //       if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number)) {
// //         errors.number = "Enter a valid 16-digit card number";
// //         valid = false;
// //       }
// //       if (!cardDetails.name || cardDetails.name.trim().length < 3) {
// //         errors.name = "Enter a valid name";
// //         valid = false;
// //       }
// //       if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
// //         errors.expiry = "Enter expiry in MM/YY format";
// //         valid = false;
// //       }
// //       if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) {
// //         errors.cvv = "Enter a valid 3-digit CVV";
// //         valid = false;
// //       }
// //       setCardErrors(errors);
// //     }

// //     if (paymentMethod === "GPay") {
// //       const errors = {};
// //       if (!gpayDetails.email || !/^\S+@\S+\.\S+$/.test(gpayDetails.email)) {
// //         errors.email = "Enter a valid email";
// //         valid = false;
// //       }
// //       if (!gpayDetails.mobile || !/^\d{10}$/.test(gpayDetails.mobile)) {
// //         errors.mobile = "Enter a 10-digit mobile number";
// //         valid = false;
// //       }
// //       setGpayErrors(errors);
// //     }

// //     if (paymentMethod === "NetBanking") {
// //       const errors = {};
// //       if (!netbankingDetails.bankName) {
// //         errors.bankName = "Please select a bank";
// //         valid = false;
// //       }
// //       setNetbankingErrors(errors);
// //     }

// //     return valid;
// //   };

// //   // Handle payment submission
// //   const handlePayment = async () => {
// //     if (!validateFields()) return;
  
// //     const payload = {
// //       name: userDetails.name,
// //       phone: userDetails.phone,
// //       symptoms,
// //       date,
// //       time,
// //       specialty,
// //       consultationType,
// //       doctor: selectedDoctor?.name || "N/A",
// //       paymentMethod,
// //     };
  
// //     try {
// //       const response = await axios.post("https://67e3e1e42ae442db76d2035d.mockapi.io/register/book", payload);
// //       console.log("Booking successful:", response.data);
// //       setShowConfirmationModal(true);
  
// //       // Clear form data after 3 seconds
// //       setTimeout(() => {
// //         setShowConfirmationModal(false);
// //         setStep(1);
// //         // Reset form states
// //         setLocation("");
// //         setSymptoms("");
// //         setDate("");
// //         setTime("");
// //         setSpecialty("");
// //         setSpecialties([]);
// //         setSelectedDoctor(null);
// //         setConsultationType("Physical");
// //         setMobile("");
// //         setPaymentMethod("Card");
// //         setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
// //         setGpayDetails({ email: "", mobile: "", transactionId: "" });
// //         setNetbankingDetails({ bankName: "" });
// //         setCardErrors({});
// //         setGpayErrors({});
// //         setNetbankingErrors({});
// //       }, 3000);
  
// //     } catch (error) {
// //       console.error("Failed to book appointment:", error);
// //       alert("Booking failed. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 min-h-[450px] mt-4">
// //         <div className="flex flex-col md:flex-row">
// //           {/* Left: Form Area */}
// //           <div className="w-full md:w-1/2 px-4">
// //             <div className="min-h-[350px] h-auto overflow-y-auto">
// //               {!isUserRegistered ? (
// //                 <div>
// //                   <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
// //                   <div className="mb-4">
// //                     <label className="block text-sm font-medium">Name</label>
// //                     <input
// //                       type="text"
// //                       value={userDetails.name}
// //                       onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
// //                       className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
// //                       placeholder="Your name"
// //                     />
// //                   </div>
// //                   <div className="mb-4">
// //                     <label className="block text-sm font-medium">Mobile</label>
// //                     <input
// //                       type="text"
// //                       value={userDetails.phone}
// //                       onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
// //                       className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
// //                       placeholder="10-digit mobile number"
// //                     />
// //                   </div>
// //                   <button
// //                     onClick={() => {
// //                       if (userDetails.name.trim() !== "" && /^\d{10}$/.test(userDetails.phone)) {
// //                         setIsUserRegistered(true);
// //                       } else {
// //                         alert("Please enter valid name and 10-digit mobile number.");
// //                       }
// //                     }}
// //                     className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
// //                   >
// //                     Continue
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {step === 1 && (
// //                     <Step1
// //                       consultationType={consultationType}
// //                       setConsultationType={setConsultationType}
// //                       location={location}
// //                       setLocation={setLocation}
// //                       symptoms={symptoms}
// //                       setSymptoms={setSymptoms}
// //                       specialty={specialty}
// //                       setSpecialty={setSpecialty}
// //                       specialties={specialties}
// //                       setSpecialties={setSpecialties}
// //                       date={date}
// //                       setDate={setDate}
// //                       time={time}
// //                       setTime={setTime}
// //                       doctors={doctors}
// //                       selectedDoctor={selectedDoctor}
// //                       setSelectedDoctor={setSelectedDoctor}
// //                       handleNext={handleNext}
// //                       mobile={mobile}
// //                       setMobile={setMobile}
// //                     />
// //                   )}
// //                   {step === 2 && (
// //                     <Step2
// //                       selectedDoctor={selectedDoctor}
// //                       selectedDate={date}
// //                       selectedTime={time}
// //                       handleNext={handleNext}
// //                       handleBack={handleBack}
// //                     />
// //                   )}
// //                   {step === 3 && (
// //                     <Step3
// //                       handleBack={handleBack}
// //                       handlePayment={handlePayment}
// //                       paymentMethod={paymentMethod}
// //                       setPaymentMethod={setPaymentMethod}
// //                       cardDetails={cardDetails}
// //                       setCardDetails={setCardDetails}
// //                       gpayDetails={gpayDetails}
// //                       setGpayDetails={setGpayDetails}
// //                       netbankingDetails={netbankingDetails}
// //                       setNetbankingDetails={setNetbankingDetails}
// //                       cardErrors={cardErrors}
// //                       gpayErrors={gpayErrors}
// //                       netbankingErrors={netbankingErrors}
// //                     />
// //                   )}
// //                 </>
// //               )}
// //             </div>
// //           </div>
  
// //           {/* Divider */}
// //           <div className="hidden md:block w-px bg-gray-300 mx-2"></div>
  
// //           {/* Right side image */}
// //           <div className="hidden md:block w-1/3 px-4 flex justify-center items-center min-h-[500px]">
// //             <img
// //               src={book}
// //               alt="Appointment"
// //               className="max-w-[400px] h-auto object-contain"
// //             />
// //           </div>
// //         </div>
  
// //         {/* Confirmation modal */}
// //         {showConfirmationModal && (
// //           <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
// //             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
// //               <h2 className="text-xl font-semibold text-green-600 mb-4">Appointment Booked Successfully!</h2>
// //               <p className="text-gray-700 mb-4">Thank you for booking. You will receive a confirmation shortly.</p>
// //               <div className="text-sm text-gray-600 space-y-1">
// //                 <p><span className="font-medium">Doctor:</span> {selectedDoctor?.name}</p>
// //                 <p><span className="font-medium">Date:</span> {date}</p>
// //                 <p><span className="font-medium">Time:</span> {time}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
  
// // };

// // export default MultiStepForm;
// import React, { useEffect, useState } from "react";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import axios from "axios";
// import book from "./book1.jpg";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// const MultiStepForm = () => {
//   const [step, setStep] = useState(1);
//   const [isUserRegistered, setIsUserRegistered] = useState(false);

//   const [location, setLocation] = useState("");
//   const [symptoms, setSymptoms] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [specialties, setSpecialties] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [consultationType, setConsultationType] = useState("Physical");
//   const [mobile, setMobile] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const [paymentMethod, setPaymentMethod] = useState("Card");
//   const [cardDetails, setCardDetails] = useState({ number: "", name: "", expiry: "", cvv: "" });
//   const [gpayDetails, setGpayDetails] = useState({ email: "", mobile: "", transactionId: "" });
//   const [netbankingDetails, setNetbankingDetails] = useState({ bankName: "" });

//   const [gpayErrors, setGpayErrors] = useState({});
//   const [netbankingErrors, setNetbankingErrors] = useState({});
//   const [cardErrors, setCardErrors] = useState({});

//   const [doctors, setDoctors] = useState([]);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);

//   const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
//   const [status, setStatus] = useState("Upcoming"); // Added status state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get("https://mocki.io/v1/df98b258-0b01-4da8-9f14-a34d6c8d3690");
//         setDoctors(response.data);
//       } catch (error) {
//         console.error("Failed to fetch doctors:", error);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleUserSubmit = (userData) => {
//     setUserDetails(userData);
//     setIsUserRegistered(true);
//   };

//   const handleNext = () => setStep((prev) => prev + 1);
//   const handleBack = () => setStep((prev) => prev - 1);

//   const validateFields = () => {
//     let valid = true;

//     if (paymentMethod === "Card") {
//       const errors = {};
//       if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number)) {
//         errors.number = "Enter a valid 16-digit card number";
//         valid = false;
//       }
//       if (!cardDetails.name || cardDetails.name.trim().length < 3) {
//         errors.name = "Enter a valid name";
//         valid = false;
//       }
//       if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
//         errors.expiry = "Enter expiry in MM/YY format";
//         valid = false;
//       }
//       if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) {
//         errors.cvv = "Enter a valid 3-digit CVV";
//         valid = false;
//       }
//       setCardErrors(errors);
//     }

//     if (paymentMethod === "GPay") {
//       const errors = {};
//       if (!gpayDetails.email || !/^\S+@\S+\.\S+$/.test(gpayDetails.email)) {
//         errors.email = "Enter a valid email";
//         valid = false;
//       }
//       if (!gpayDetails.mobile || !/^\d{10}$/.test(gpayDetails.mobile)) {
//         errors.mobile = "Enter a 10-digit mobile number";
//         valid = false;
//       }
//       setGpayErrors(errors);
//     }

//     if (paymentMethod === "NetBanking") {
//       const errors = {};
//       if (!netbankingDetails.bankName) {
//         errors.bankName = "Please select a bank";
//         valid = false;
//       }
//       setNetbankingErrors(errors);
//     }

//     return valid;
//   };
//   const handlePayment = async () => {
//     if (!validateFields()) return;

//     const userId = localStorage.getItem("userId");
//     const payload = {
//       userId,
//       name: userDetails.name,
//       phone: userDetails.phone,
//       symptoms,
//       date,
//       time,
//       specialty,
//       consultationType,
//       doctorName: selectedDoctor?.name || "N/A",
//       paymentMethod,
//       status, // Added status to the payload
//     };
//     setIsLoading(true);
//     try {
//       const response = await axios.post("https://67e3e1e42ae442db76d2035d.mockapi.io/register/book", payload);
//       console.log("Booking successful:", response.data);
//       setShowConfirmationModal(true);

//       setTimeout(() => {
//         setShowConfirmationModal(false);
//         setStep(1);
//         setLocation("");
//         setSymptoms("");
//         setDate("");
//         setTime("");
//         setSpecialty("");
//         setSpecialties([]);
//         setSelectedDoctor(null);
//         setConsultationType("Physical");
//         setMobile("");
//         setPaymentMethod("Card");
//         setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
//         setGpayDetails({ email: "", mobile: "", transactionId: "" });
//         setNetbankingDetails({ bankName: "" });
//         setCardErrors({});
//         setGpayErrors({});
//         setNetbankingErrors({});
//         navigate("/dashboard/app");
//       }, 800);
//     } catch (error) {
//       console.error("Failed to book appointment:", error);
//       alert("Booking failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 min-h-[450px] mt-4">
//         <div className="flex flex-col md:flex-row">
//           <div className="w-full md:w-1/2 px-4">
//             <div className="min-h-[350px] h-auto overflow-y-auto">
//               {step === 1 && (
//                 <Step1
//                   consultationType={consultationType}
//                   setConsultationType={setConsultationType}
//                   location={location}
//                   setLocation={setLocation}
//                   symptoms={symptoms}
//                   setSymptoms={setSymptoms}
//                   specialty={specialty}
//                   setSpecialty={setSpecialty}
//                   specialties={specialties}
//                   setSpecialties={setSpecialties}
//                   date={date}
//                   setDate={setDate}
//                   time={time}
//                   setTime={setTime}
//                   doctors={doctors}
//                   selectedDoctor={selectedDoctor}
//                   setSelectedDoctor={setSelectedDoctor}
//                   handleNext={handleNext}
//                   mobile={mobile}
//                   setMobile={setMobile}
//                 />
//               )}
//               {step === 2 && (
//                 <Step2
//                   selectedDoctor={selectedDoctor}
//                   selectedDate={date}
//                   selectedTime={time}
//                   handleNext={handleNext}
//                   handleBack={handleBack}
//                 />
//               )}
//               {step === 3 && (
//                 <Step3
//                   handleBack={handleBack}
//                   handlePayment={handlePayment}
//                   paymentMethod={paymentMethod}
//                   setPaymentMethod={setPaymentMethod}
//                   cardDetails={cardDetails}
//                   setCardDetails={setCardDetails}
//                   gpayDetails={gpayDetails}
//                   setGpayDetails={setGpayDetails}
//                   netbankingDetails={netbankingDetails}
//                   setNetbankingDetails={setNetbankingDetails}
//                   cardErrors={cardErrors}
//                   gpayErrors={gpayErrors}
//                   netbankingErrors={netbankingErrors}
//                 />
//               )}
//             </div>
//           </div>

//           <div className="hidden md:block w-px bg-gray-300 mx-2"></div>

//           <div className="hidden md:block w-1/3 px-4 flex justify-center items-center min-h-[500px]">
//             <img src={book} alt="Appointment" className="max-w-[400px] h-auto object-contain" />
//           </div>
//         </div>

//         {showConfirmationModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
//               <h2 className="text-xl font-semibold text-green-600 mb-4">Appointment Booked Successfully!</h2>
//               <p className="text-gray-700 mb-4">Thank you for booking. You will receive a confirmation shortly.</p>
//               <div className="text-sm text-gray-600 space-y-1">
//                 <p><span className="font-medium">Doctor:</span> {selectedDoctor?.name}</p>
//                 <p><span className="font-medium">Date:</span> {date}</p>
//                 <p><span className="font-medium">Time:</span> {time}</p>
//                 <p><span className="font-medium">Status:</span> {status}</p> {/* Show status */}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;

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
    const userId = localStorage.getItem("userId"); // Get user ID from localStorage
    const payload = {
      userId,
      name: `${user?.firstName || "Guest"} ${user?.lastName || ""}`, // Concatenate first and last name or use "Guest"
      phone: userDetails.phone, // User phone number from the form
      symptoms, // User symptoms entered
      date, // Selected appointment date
      time, // Selected appointment time
      specialty, // Specialty chosen by the user
      consultationType, // Whether it's a physical or virtual consultation
      doctorName: selectedDoctor?.name || "N/A", // Selected doctor's name, defaulting to "N/A" if not selected
      paymentMethod: "NotRequired", // Set the payment method; can be extended if needed
      status, // Appointment status, e.g., "Upcoming"
    };
  
    // Set loading state to true
    setIsLoading(true);
  
    try {
      // Send the POST request with payload
      const response = await axios.post(
        "https://67e3e1e42ae442db76d2035d.mockapi.io/register/book", // Endpoint for booking
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
  
      // On successful booking, log response and show confirmation modal
      console.log("Booking successful:", response.data);
      setShowConfirmationModal(true);
  
      // Reset the form and redirect after a short delay
      setTimeout(() => {
        setShowConfirmationModal(false);
        setStep(1);
        setLocation(""); // Clear location
        setSymptoms(""); // Clear symptoms
        setDate(""); // Clear date
        setTime(""); // Clear time
        setSpecialty(""); // Clear specialty
        setSpecialties([]); // Clear specialties list
        setSelectedDoctor(null); // Clear selected doctor
        setConsultationType("Physical"); // Reset consultation type to default
        setMobile(""); // Clear mobile number
        navigate("/dashboard/app"); // Redirect to dashboard
      }, 800);
    } catch (error) {
      // Handle error if booking fails
      console.error("Failed to book appointment:", error);
      alert("Booking failed. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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












