/* AdminLayout.jsx */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

export const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} />

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
        <AdminNavbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
