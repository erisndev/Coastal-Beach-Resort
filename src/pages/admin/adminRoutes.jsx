// import { Routes, Route, Navigate } from "react-router-dom";
// import { AdminLayout } from "./components/AdminLayout";
// import { Dashboard } from "./Dashboard";
// import { Bookings } from "./Bookings";
// import { BookingDetails } from "./BookingDetails";
// import { Rooms } from "./Rooms";
// import { Payments } from "./Payments";
// import { Login } from "./Login";
// import { BookingCalendar } from "./BookingCalendar";

// export const AdminRoutes = () => {
//   const isAdminLoggedIn = true; // Replace with real auth

//   return (
//     <Routes>
//       {/* Admin login */}
//       <Route path="login" element={<Login />} />

//       {/* Protected Admin Layout */}
//       <Route
//         path=""
//         element={isAdminLoggedIn ? <AdminLayout /> : <Navigate to="login" />}
//       >
//         <Route index element={<Dashboard />} />
//         <Route path="dashboard" element={<Dashboard />} />

//         {/* Nested bookings route */}
//         <Route path="bookings" element={<Bookings />}>
//           <Route path=":bookingId" element={<BookingDetails />} />
//         </Route>

//         <Route path="rooms" element={<Rooms />} />
//         <Route path="payments" element={<Payments />} />
//         <Route path="calendar" element={<BookingCalendar />} />
//       </Route>
//     </Routes>
//   );
// };
// src/routes/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Bookings from "../pages/admin/Bookings";
import BookingDetails from "../pages/admin/BookingDetails";
import Rooms from "../pages/admin/Rooms";
import Payments from "../pages/admin/Payments";
import BookingCalendar from "../pages/admin/BookingCalendar";
import Login from "../pages/admin/Login";
import RequireAdmin from "../admin/components/RequireAdmin";

export const AdminRoutes = () => {
  return (
    <Routes>
      {/* Admin login */}
      <Route path="login" element={<Login />} />

      {/* Protected Admin Layout */}
      <Route
        path=""
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Nested bookings route */}
        <Route path="bookings" element={<Bookings />}>
          <Route path=":bookingId" element={<BookingDetails />} />
        </Route>

        <Route path="rooms" element={<Rooms />} />
        <Route path="payments" element={<Payments />} />
        <Route path="calendar" element={<BookingCalendar />} />
      </Route>
    </Routes>
  );
};
