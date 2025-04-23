import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "patient";

  return (
    <div className="flex h-screen">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-4 overflow-y-auto">
          <Outlet /> {/* this will render role-based dashboard content */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
