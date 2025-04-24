import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Auth Pages
import RegisterSelect from "./form/RegisterSelect";
import Registration from "./form/Registration";
import Verification from "./form/Verification";
import LoginForm from "./form/Login";

// Public Pages
import Home from "./pages/Home";
import Healthcard from "./components/Healthcard";
import BookApp from "./components/BookApp";

// Dashboard Layout & Nested Routes
import DashboardLayout from "./pages/layouts/DashboardLayout";
import PdashboardRoutes from "./pages/layouts/menu/PatientDashboard/PdashboardRoutes";


// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterSelect />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/healthcard" element={<Healthcard />} />
        <Route path="/bookconsultation" element={<BookApp />} />

        {/* Protected Routes */}
        <Route path="/dashboard/*" element={<PrivateRoute element={<DashboardLayout />} />}>
         
          <Route path="*" element={<PdashboardRoutes />} />
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<h1 className="text-center text-red-600 text-xl mt-10">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

// import LabTestBooking from './pages/layouts/menu/PatientDashboard/LabTestBooking'

// function App() {
//   return (
//     <div><LabTestBooking/></div>
//   )
// }

// export default App