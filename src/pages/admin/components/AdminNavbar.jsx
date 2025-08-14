import React from "react";
import { Bell, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminNavbar = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();

  const handleWebsite = () => {
    Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      }
    });
  };
  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
      <div className="font-bold text-lg text-gray-800 dark:text-white">
        Admin Dashboard
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div
          onClick={handleWebsite}
          className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 hover:shadow-md cursor-pointer transition duration-200 ease-in-out text-center"
        >
          Back to Website
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
