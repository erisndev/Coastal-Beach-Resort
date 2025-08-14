import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import { Dashboard } from "./Dashboard";
import { Bookings } from "./Bookings";
import { Rooms } from "./Rooms";
import { Payments } from "./Payments";
import { Login } from "./Login";

export const AdminRoutes = () => {
  const isAdminLoggedIn = true; // Replace with real auth

  return (
    <Routes>
      {/* Admin login */}
      <Route path="login" element={<Login />} />

      {/* Protected Admin Layout */}
      <Route
        path=""
        element={isAdminLoggedIn ? <AdminLayout /> : <Navigate to="login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="payments" element={<Payments />} />
      </Route>
    </Routes>
  );
};
