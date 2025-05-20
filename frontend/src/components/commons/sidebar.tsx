import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { Menu, X } from "lucide-react";
import DeleteConfirmModal from "../modals/common/DeleteConfirmModal";
import { House, CarFront, CircleParking, UsersRound, LogOut, ParkingMeterIcon } from "lucide-react";

const Sidebar: React.FC = () => {
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = localStorage.getItem("user");
  const userRole = user ? JSON.parse(user).role : null;

  const navItems = [
    { name: "Overview", path: "/dashboard/overview", roles: ["ADMIN"], icon: House },
    { name: "Vehicles", path: "/dashboard/vehicles", roles: ["USER"], icon: CarFront },
    { name: "Slots", path: "/dashboard/slots", roles: ["ADMIN"], icon: CircleParking },
    { name: "Users", path: "/dashboard/users", roles: ["ADMIN"], icon: UsersRound },
    { name: "Parking", path:"/dashboard/parking", roles: ["ADMIN"], icon: ParkingMeterIcon },

  ];

  const confirmLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <>
      <div className="lg:hidden flex justify-between items-center p-4 bg-white mt-2">
        <img src={logo} alt="Logo" className="h-10" />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

   <aside
  className={`
    group fixed top-0 left-0 h-screen w-30 hover:w-64
    transition-all duration-300 ease-in-out bg-white shadow-lg
    flex flex-col items-center lg:items-start rounded-r-2xl p-4
    z-50
  `}
>
        <div className="mb-8 text-center w-full">
          <img src={logo} alt="Logo" className="h-14 mx-auto" />
          <h1 className="hidden group-hover:block font-bold text-sm mt-2">Linda's PMS</h1>
        </div>

      <nav className="flex flex-col space-y-4 w-full">
  {navItems
    .filter((item) => item.roles.includes(userRole))
    .map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-700 text-white font-semibold"
                : "hover:bg-blue-200"
            }`
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          <Icon className="w-7 h-7" />
          <span className="hidden group-hover:inline text-base">
            {item.name}
          </span>
        </NavLink>
      );
    })}
</nav>

<div className="mt-auto mb-6 w-full flex justify-center group-hover:justify-start transition-all duration-300">
  <button
    onClick={confirmLogout}
    className="flex items-center gap-3 px-4 py-3 rounded-md border-2 text-black hover:bg-blue-200 transition-all duration-300"
  >
    <LogOut className="w-6 h-6" />
    <span className="hidden group-hover:inline text-base">Logout</span>
  </button>
</div>


        <DeleteConfirmModal
          isOpen={isLogoutConfirmOpen}
          onOpenChange={setIsLogoutConfirmOpen}
          onConfirm={handleLogout}
          title="Confirm Logout"
          description="Are you sure you want to logout? This action cannot be undone."
          confirmText="Logout"
          loadingText="Logging out ..."
        />
      </aside>
    </>
  );
};

export default Sidebar;
