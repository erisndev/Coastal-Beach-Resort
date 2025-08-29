import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../admin/components/AdminLayout";
import { Dashboard } from "../admin/Dashboard";
import { Bookings } from "../admin/Bookings";
import { BookingDetails } from "../admin/BookingDetails";
import { Rooms } from "../admin/Rooms";
import { Payments } from "../admin/Payments";
import { BookingCalendar } from "../admin/BookingCalendar";
import { Login } from "../admin/Login";
import RequireAdmin from "../admin/components/RequireAdmin";
import { Newsletter } from "./Newsletter";

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
        <Route index element={<Newsletter />} />
        {/* <Route path="dashboard" element={<Dashboard />} />

        
        <Route path="bookings" element={<Bookings />}>
          <Route path=":bookingId" element={<BookingDetails />} />
        </Route>

        <Route path="rooms" element={<Rooms />} />
        <Route path="payments" element={<Payments />} />
        <Route path="calendar" element={<BookingCalendar />} /> */}
        <Route path="/" element={<Newsletter />} />
      </Route>
    </Routes>
  );
};
