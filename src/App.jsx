import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { Accommodations } from "./pages/Accommodations";
import { Amenities } from "./pages/Amenities";
import { Gallery } from "./pages/Gallery";
import { Dining } from "./pages/Dining";
import { Testimonials } from "./pages/Testimonials";
import { Appointment } from "./pages/Appointment";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/about" element={<About />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
