
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/PatientDashboard/Dashboard";
import MedicalRecord from "../pages/PatientDashboard/MedicalRecord";
import PatientAppointments from "../pages/PatientDashboard/PatientAppointments ";
import Insurance from "../pages/PatientDashboard/Insurance";
// import Healthwellness from "../pages/PatientDashboard/Healthwellness";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="medical-record" element={<MedicalRecord />} />
      <Route path="calendar" element={<PatientAppointments />} />
      <Route path="insurance" element={<Insurance />} />
      {/* <Route path="health-wellness" element={<Healthwellness />} /> */}

      {/* Catch-all 404 Page */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;
