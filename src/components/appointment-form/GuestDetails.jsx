/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  AlertCircle,
} from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const GuestDetails = ({
  bookingData,
  setBookingData,
  onNext,
  onPrev,
}) => {
  const [errors, setErrors] = useState({});
  const [guest, setGuest] = useState({});

  useEffect(() => {
    setGuest(bookingData.guestDetails || {});
  }, []);

  const handleGuestDetailsChange = (field, value) => {
    setGuest((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFieldBlur = () => {
    setBookingData((prev) => ({
      ...prev,
      guestDetails: { ...prev.guestDetails, ...guest },
    }));
  };

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Phone validation using libphonenumber-js
  const validatePhone = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(`+${phone}`);
    return phoneNumber?.isValid() || false;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!guest.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!guest.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!guest.email?.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(guest.email))
      newErrors.email = "Please enter a valid email address";
    if (!guest.phone?.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(guest.phone))
      newErrors.phone = "Please enter a valid phone number";
    if (!guest.address?.trim()) newErrors.address = "Address is required";
    if (!guest.city?.trim()) newErrors.city = "City is required";
    if (!guest.country?.trim()) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      handleFieldBlur();
      onNext();
    }
  };

  const isFormValid = () =>
    guest.firstName &&
    guest.lastName &&
    guest.email &&
    guest.phone &&
    guest.address &&
    guest.city &&
    guest.country &&
    validatePhone(guest.phone);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Guest Information
        </h2>
        <p className="text-slate-600 text-lg">
          Please provide your details for the reservation
        </p>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-500" /> Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" /> First Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.firstName || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("firstName", e.target.value)
                }
                onBlur={handleFieldBlur}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" /> Last Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.lastName || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("lastName", e.target.value)
                }
                onBlur={handleFieldBlur}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.lastName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-500" /> Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" /> Email Address{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.email || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("email", e.target.value)
                }
                onBlur={handleFieldBlur}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" /> Phone Number{" "}
                <span className="text-red-500">*</span>
              </label>

              <PhoneInput
                country={"za"} // default country (South Africa)
                value={guest.phone || ""}
                onChange={(phone) => handleGuestDetailsChange("phone", phone)}
                onBlur={handleFieldBlur}
                inputClass="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none text-slate-800 placeholder-slate-400"
                buttonClass="border border-slate-200 bg-slate-50 rounded-l-lg"
                containerClass="w-full"
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                specialLabel=""
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-500" /> Address Information
          </h3>
          {/* Street */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" /> Street Address{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="123 Main Street, Apt 4B"
              className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
              value={guest.address || ""}
              onChange={(e) =>
                handleGuestDetailsChange("address", e.target.value)
              }
              onBlur={handleFieldBlur}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.address}
              </p>
            )}
          </div>

          {/* City, State, Country */}
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="New York"
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.city || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("city", e.target.value)
                }
                onBlur={handleFieldBlur}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.city}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                placeholder="NY"
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.state || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("state", e.target.value)
                }
                onBlur={handleFieldBlur}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="United States"
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.country || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("country", e.target.value)
                }
                onBlur={handleFieldBlur}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.country}
                </p>
              )}
            </div>
          </div>

          {/* Postal */}
          <div className="mt-4">
            <label className="text-sm font-semibold text-slate-700 mb-2">
              Postal/ZIP Code
            </label>
            <input
              type="text"
              placeholder="10001"
              className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
              value={guest.postalCode || ""}
              onChange={(e) =>
                handleGuestDetailsChange("postalCode", e.target.value)
              }
              onBlur={handleFieldBlur}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Additional Information
          </h3>

          {/* DOB */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.dateOfBirth || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("dateOfBirth", e.target.value)
                }
                onBlur={handleFieldBlur}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2">
                Gender
              </label>
              <select
                className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none"
                value={guest.gender || ""}
                onChange={(e) =>
                  handleGuestDetailsChange("gender", e.target.value)
                }
                onBlur={handleFieldBlur}
              >
                <option value="">Select gender (optional)</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Special Requests or Dietary Requirements
            </label>
            <textarea
              rows={4}
              placeholder="Please let us know about any special requests, dietary requirements, accessibility needs, or other preferences..."
              className="w-full p-3 border rounded-lg bg-slate-50 focus:outline-none resize-none"
              value={guest.specialRequests || ""}
              onChange={(e) =>
                handleGuestDetailsChange("specialRequests", e.target.value)
              }
              onBlur={handleFieldBlur}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
