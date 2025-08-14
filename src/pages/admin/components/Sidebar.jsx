import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  CreditCard,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  House,
  LayoutDashboard,
} from "lucide-react";

const Sidebar = ({ darkMode }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Bookings", path: "/admin/bookings", icon: <BookOpen size={20} /> },
    { name: "Rooms", path: "/admin/rooms", icon: <House size={20} /> },
    {
      name: "Payments",
      path: "/admin/payments",
      icon: <CreditCard size={20} />,
    },
  ];

  const bgColor = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const hoverColor = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const activeBg = darkMode
    ? "bg-gray-800 border-blue-500"
    : "bg-gray-200 border-blue-600";

  return (
    <div
      className={`
        h-screen transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        overflow-hidden shadow-lg flex flex-col ${bgColor}
      `}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center p-6 border-b ${borderColor} min-h-[73px]`}
      >
        <button
          className="text-gray-400 hover:text-white transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2 flex flex-col overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`
              flex items-center gap-3 p-4 ${hoverColor} transition-colors relative group
              ${location.pathname === link.path ? `border-r-4 ${activeBg}` : ""}
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <div className="flex-shrink-0">{link.icon}</div>
            <span
              className={`${
                collapsed ? "hidden" : "block"
              } font-medium transition-opacity`}
            >
              {link.name}
            </span>

            {collapsed && (
              <div
                className={`absolute left-full ml-2 px-2 py-1 ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                } text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50`}
              >
                {link.name}
                <div
                  className={`absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 ${
                    darkMode ? "bg-gray-800" : "bg-gray-100"
                  } rotate-45`}
                ></div>
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div
        className={`p-4 border-t ${borderColor} ${
          collapsed ? "hidden" : "block"
        }`}
      >
        <p
          className={`text-xs ${
            darkMode ? "text-gray-400" : "text-gray-500"
          } text-center`}
        >
          v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
