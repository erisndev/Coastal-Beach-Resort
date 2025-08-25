import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, AlertCircle, MapPin, Phone, Mail } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import emailjs from "@emailjs/browser";
import { useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    reason: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const position = [-30.1911, 30.7944];

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim()))
      return "Name can only contain letters, spaces, apostrophes, and hyphens";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()))
      return "Please enter a valid email address";
    if (email.length > 100) return "Email must be less than 100 characters";
    return "";
  };

  const validateSubject = (subject) => {
    if (!subject.trim()) return "Subject is required";
    if (subject.trim().length < 3)
      return "Subject must be at least 3 characters";
    if (subject.trim().length > 100)
      return "Subject must be less than 100 characters";
    return "";
  };

  const validateReason = (reason) => {
    if (!reason) return "Please select a reason for contact";
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10)
      return "Message must be at least 10 characters";
    if (message.trim().length > 5000)
      return "Message must be less than 5000 characters";
    return "";
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
    // Clear submit status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      subject: validateSubject(formData.subject),
      reason: validateReason(formData.reason),
      message: validateMessage(formData.message),
    };
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Clear any previous errors
    setErrors({});

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          reason: formData.reason,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Set success state
      setSubmitStatus("success");
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        reason: "",
        message: "",
      });

      // Auto-hide success message after 8 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setSubmitStatus(null);
      }, 8000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to send message. Please try again later.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Get In
          </h1>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Touch
          </h1>
          <div className="w-24 h-px bg-white mx-auto opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Alert - Fixed positioning and visibility */}
        {(showSuccess || submitStatus === "success") && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
            <Alert className="border-green-200 bg-green-50 shadow-xl rounded-2xl animate-[slideInDown_0.5s_ease-out]">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                Thank you for your message! We have received your inquiry and
                will get back to you within 24 hours.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Error Alert */}
        {(errors.submit || submitStatus === "error") && (
          <div className="mb-8 max-w-2xl mx-auto mt-8">
            <Alert className="border-red-200 bg-red-50 shadow-lg rounded-2xl">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                {errors.submit ||
                  "Failed to send message. Please try again later."}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Welcome Section */}
        <section className="py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-4 tracking-wide">
            We're Here to Help
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We're here to assist you with any inquiries regarding reservations,
            events, or general information about your perfect coastal getaway.
          </p>
        </section>

        {/* Contact Info Section */}
        <section className="py-16 border-t border-slate-200">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-light text-slate-800 mb-6 tracking-wide">
                  Visit Our Paradise
                </h3>
                <div className="w-12 h-px bg-amber-600 mx-auto lg:mx-0 mb-8"></div>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start space-x-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="font-light text-slate-800 mb-1">Address</h4>
                    <p className="text-slate-600 leading-relaxed">
                      561 R102 Umgababa
                      <br />
                      4125 Umkomaas, South Africa
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="font-light text-slate-800 mb-1">Phone</h4>
                    <p className="text-slate-600">031 285 0538</p>
                  </div>
                </div>

                <div className="group flex items-start space-x-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="font-light text-slate-800 mb-1">Email</h4>
                    <p className="text-slate-600">info@coastalbeach.co.za</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map using react-leaflet with fixed z-index */}
            <div className="relative z-0 rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[320px]">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
                style={{ zIndex: 1 }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    <b>Coastal Beach Resort</b>
                    <br />
                    561 R102 Umgababa
                    <br />
                    4125 Umkomaas, South Africa
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 border-t border-slate-200">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-light text-slate-800 mb-4 tracking-wide">
                Send Us a Message
              </h3>
              <div className="w-16 h-px bg-amber-600 mx-auto"></div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-sm font-light text-slate-700 tracking-wide"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                    className={`border-slate-200 rounded-xl py-3 px-4 focus-visible:ring-amber-500 focus-visible:border-amber-500 transition-all duration-300 ${
                      errors.name
                        ? "border-red-300 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-sm font-light text-slate-700 tracking-wide"
                  >
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john.doe@example.com"
                    className={`border-slate-200 rounded-xl py-3 px-4 focus-visible:ring-amber-500 focus-visible:border-amber-500 transition-all duration-300 ${
                      errors.email
                        ? "border-red-300 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <Label
                  htmlFor="subject"
                  className="text-sm font-light text-slate-700 tracking-wide"
                >
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Inquiry about accommodation"
                  className={`border-slate-200 rounded-xl py-3 px-4 focus-visible:ring-amber-500 focus-visible:border-amber-500 transition-all duration-300 ${
                    errors.subject
                      ? "border-red-300 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.subject && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.subject}
                  </div>
                )}
              </div>

              {/* Reason for Contact */}
              <div className="space-y-3">
                <Label
                  htmlFor="reason"
                  className="text-sm font-light text-slate-700 tracking-wide"
                >
                  Reason for Contact
                </Label>
                <Select
                  value={formData.reason}
                  onValueChange={(value) => handleInputChange("reason", value)}
                >
                  <SelectTrigger
                    className={`w-full border-slate-200 rounded-xl h-12 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 ${
                      errors.reason ? "border-red-300 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reservation">
                      Reservation Inquiry
                    </SelectItem>
                    <SelectItem value="event">Event Planning</SelectItem>
                    <SelectItem value="general">General Information</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="compliment">Compliment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reason && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.reason}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-3">
                <Label
                  htmlFor="message"
                  className="text-sm font-light text-slate-700 tracking-wide"
                >
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Please describe your request in detail..."
                  rows={6}
                  className={`resize-none border-slate-200 rounded-xl py-3 px-4 focus-visible:ring-amber-500 focus-visible:border-amber-500 transition-all duration-300 ${
                    errors.message
                      ? "border-red-300 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                <div className="flex justify-between items-center">
                  {errors.message ? (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {errors.message}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <span className="text-xs text-slate-500 font-light">
                    {formData.message.length}/5000
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-light py-4 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Submit Message
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
