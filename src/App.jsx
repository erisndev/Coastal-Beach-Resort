// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import { Home } from "./pages/Home";
import { Accommodations } from "./pages/Accommodations";
import { About } from "./pages/About";
import { Amenities } from "./pages/Amenities";
import { Gallery } from "./pages/Gallery";
import { Dining } from "./pages/Dining";
import { Contact } from "./pages/Contact";
import { Testimonials } from "./pages/Testimonials";
import { Appointment } from "./pages/Appointment";

// Admin Pages
import { Login } from "./pages/admin/Login";
import { AdminRoutes } from "./pages/admin/adminRoutes";
// Optional: RequireAdmin HOC
import RequireAdmin from "./pages/admin/components/RequireAdmin";
import { ToastContainer } from "react-toastify";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Only show public navbar on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <ScrollToTop />

      <div
        className={`bg-gray-100 min-h-screen ${!isAdminRoute ? "pt-16" : ""}`}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/about" element={<About />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/appointment" element={<Appointment />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Dashboard - Protected */}
          <Route
            path="/admin/*"
            element={
              <RequireAdmin>
                <AdminRoutes />
              </RequireAdmin>
            }
          />

          {/* Catch-all: redirect to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Only show public footer on non-admin routes */}
      {!isAdminRoute && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
