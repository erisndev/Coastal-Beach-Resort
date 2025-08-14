// src/pages/admin/components/admin/RoomForm.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Building2,
  Users,
  DollarSign,
  Star,
  Home,
  Save,
  Loader2,
} from "lucide-react";

const RoomForm = ({ roomType, onClose, onSubmit, saving = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: 1,
    pricePerNight: "",
    amenities: "",
    totalUnits: 1,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (roomType) {
      setFormData({
        name: roomType.name || "",
        description: roomType.description || "",
        capacity: roomType.capacity || 1,
        pricePerNight: roomType.pricePerNight || "",
        amenities: roomType.amenities ? roomType.amenities.join(", ") : "",
        totalUnits: roomType.totalUnits || 1,
      });
    }
  }, [roomType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacity" || name === "pricePerNight" || name === "totalUnits"
          ? Number(value)
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim())
      newErrors.name = "Accommodation name is required";
    if (!formData.pricePerNight && formData.pricePerNight !== 0)
      newErrors.pricePerNight = "Premium rate is required";
    if (formData.capacity < 1)
      newErrors.capacity = "Guest capacity must be at least 1";
    if (formData.totalUnits < 1)
      newErrors.totalUnits = "Total units must be at least 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: formData.name.trim(),
      description: formData.description?.trim() || "",
      capacity: Number(formData.capacity) || 1,
      pricePerNight: Number(formData.pricePerNight),
      amenities: formData.amenities
        ? formData.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean)
        : [],
      totalUnits: Number(formData.totalUnits) || 1,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-slate-200/60">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                <Building2 className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {roomType
                    ? "Modify Accommodation"
                    : "Create New Accommodation"}
                </h2>
                <p className="text-slate-300 text-sm font-medium">
                  {roomType
                    ? "Update luxury portfolio details"
                    : "Add to luxury portfolio"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-2 text-white transition-all duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Accommodation Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <Building2 className="text-slate-600 w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">
                  Accommodation Details
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Accommodation Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-slate-50 focus:bg-white focus:outline-none ${
                      errors.name
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="Enter luxury accommodation name"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Premium Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white focus:outline-none resize-none"
                    placeholder="Describe the luxury features and amenities of this accommodation..."
                  />
                </div>
              </div>
            </div>

            {/* Capacity & Pricing */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <Users className="text-slate-600 w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">
                  Capacity & Premium Rates
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Guest Capacity *</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min={1}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-slate-50 focus:bg-white focus:outline-none ${
                      errors.capacity
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="Maximum guests"
                  />
                  {errors.capacity && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.capacity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Premium Rate (ZAR) *</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    min={0}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-slate-50 focus:bg-white focus:outline-none ${
                      errors.pricePerNight
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="Per night rate"
                    required
                  />
                  {errors.pricePerNight && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.pricePerNight}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities & Inventory */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <Star className="text-slate-600 w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">
                  Luxury Features & Inventory
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Luxury Amenities</span>
                    </div>
                  </label>
                  <input
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 transition-all duration-200 bg-slate-50 focus:bg-white focus:outline-none"
                    placeholder="WiFi, Pool Access, Spa Services, Ocean View (comma separated)"
                  />
                  <p className="text-slate-500 text-xs mt-2">
                    Separate multiple amenities with commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4" />
                      <span>Total Units Available *</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    name="totalUnits"
                    value={formData.totalUnits}
                    onChange={handleChange}
                    min={1}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-slate-50 focus:bg-white focus:outline-none ${
                      errors.totalUnits
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                    placeholder="Number of units"
                    required
                  />
                  {errors.totalUnits && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.totalUnits}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-200"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={saving}
              >
                <div className="flex items-center space-x-2">
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{saving ? "Processing..." : "Save Changes"}</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomForm;
