// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from './context-api/authSlice';

import RegisterSelect from "./form/RegisterSelect";
import Registration from "./form/Registration";
import Verification from "./form/Verification";
import LoginForm from "./form/Login";
import Home from "./pages/Home";
import Healthcard from "./components/Healthcard";
import BookApp from "./components/BookApp";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import PatientNotifications from './pages/layouts/menu/PatientDashboard/Notifications';
import PdashboardRoutes from "./pages/layouts/menu/PatientDashboard/PdashboardRoutes";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    setLoading(false); // stop loading after checking localstorage
  }, [dispatch]);

  const RequireAuth = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

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

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }>
          <Route path="notifications" element={<PatientNotifications />} />
          <Route path="*" element={<PdashboardRoutes />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={
          <h1 className="text-center text-red-600 text-xl mt-10">
            404 - Page Not Found
          </h1>
        } />
      </Routes>
    </Router>
  );
};

export default App;
