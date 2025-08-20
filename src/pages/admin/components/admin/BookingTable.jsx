import React, { useEffect, useState } from "react";
import { Search, Filter, X, User } from "lucide-react";
import {
  fetchBookings,
  fetchRoomTypes,
  cancelBooking,
} from "../../../../API/Api";

const BookingTable = ({ onViewBooking }) => {
  const [bookings, setBookings] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [showCancelled, setShowCancelled] = useState(false);

  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "all",
    roomType: "all",
    paymentStatus: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookingsData, roomTypesData] = await Promise.all([
          fetchBookings(),
          fetchRoomTypes(),
        ]);
        setBookings(bookingsData || []);
        setRoomTypes(roomTypesData || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      setCancelingId(bookingId);
      await cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
      alert("Booking cancelled successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking");
    } finally {
      setCancelingId(null);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      status: "all",
      roomType: "all",
      paymentStatus: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.searchTerm ||
      filters.status !== "all" ||
      filters.roomType !== "all" ||
      filters.paymentStatus !== "all" ||
      filters.dateFrom ||
      filters.dateTo
    );
  };

  const getRoomTypeName = (booking) => {
    if (booking.room?.roomType?.name) return booking.room.roomType.name;
    if (booking.room?.name) return booking.room.name;
    if (booking.roomType?.name) return booking.roomType.name;
    if (booking.room?.roomType && typeof booking.room.roomType === "string") {
      const roomType = roomTypes.find((rt) => rt._id === booking.room.roomType);
      if (roomType) return roomType.name;
    }
    return "Unknown Room";
  };

  const getBookingStatus = (booking) => {
    const today = new Date();
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    today.setHours(0, 0, 0, 0);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    if (booking.status === "cancelled")
      return { status: "cancelled", label: "Cancelled", color: "text-red-600" };
    if (checkOut < today)
      return {
        status: "completed",
        label: "Completed",
        color: "text-gray-500",
      };
    if (checkIn <= today && checkOut >= today)
      return {
        status: "checked-in",
        label: "Checked In",
        color: "text-blue-600",
      };
    if (checkIn > today)
      return {
        status: "confirmed",
        label: "Confirmed",
        color: "text-green-600",
      };
    return { status: "unknown", label: "Unknown", color: "text-gray-500" };
  };

  const categorizedBookings = bookings.map((booking) => ({
    ...booking,
    roomTypeName: getRoomTypeName(booking),
    bookingStatus: getBookingStatus(booking),
  }));

  // Filter out cancelled bookings unless showCancelled is true
  const filteredBookings = categorizedBookings.filter((b) => {
    if (!showCancelled && b.bookingStatus.status === "cancelled") return false;

    const searchLower = filters.searchTerm.toLowerCase();
    const fullName = `${b.guestDetails?.firstName || ""} ${
      b.guestDetails?.lastName || ""
    }`.toLowerCase();
    const email = (b.guestDetails?.email || "").toLowerCase();
    if (
      filters.searchTerm &&
      !fullName.includes(searchLower) &&
      !email.includes(searchLower)
    )
      return false;
    if (filters.status !== "all" && b.bookingStatus.status !== filters.status)
      return false;
    if (filters.roomType !== "all" && b.roomTypeName !== filters.roomType)
      return false;
    if (filters.paymentStatus !== "all" && b.status !== filters.paymentStatus)
      return false;
    if (filters.dateFrom && new Date(b.checkIn) < new Date(filters.dateFrom))
      return false;
    if (filters.dateTo && new Date(b.checkIn) > new Date(filters.dateTo))
      return false;
    return true;
  });

  const sortedBookings = filteredBookings.sort((a, b) => {
    const statusOrder = {
      confirmed: 0,
      "checked-in": 1,
      completed: 2,
      cancelled: 3,
    };
    return (
      (statusOrder[a.bookingStatus.status] || 4) -
        (statusOrder[b.bookingStatus.status] || 4) ||
      new Date(a.checkIn) - new Date(b.checkIn)
    );
  });

  const uniqueRoomTypes = [
    ...new Set(categorizedBookings.map((b) => b.roomTypeName)),
  ].filter(Boolean);

  if (loading)
    return (
      <p className="text-gray-500 dark:text-gray-300">Loading bookings...</p>
    );
  if (bookings.length === 0)
    return (
      <p className="text-gray-500 dark:text-gray-300">No bookings found.</p>
    );

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">
            Confirmed Bookings
          </h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {
              sortedBookings.filter(
                (b) => b.bookingStatus.status === "confirmed"
              ).length
            }
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
            Checked In
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {
              sortedBookings.filter(
                (b) => b.bookingStatus.status === "checked-in"
              ).length
            }
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Completed
          </h3>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {
              sortedBookings.filter(
                (b) => b.bookingStatus.status === "completed"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Show Cancelled Switch */}
      <div className="flex items-center mb-4 gap-2">
        <input
          type="checkbox"
          id="showCancelled"
          checked={showCancelled}
          onChange={() => setShowCancelled(!showCancelled)}
          className="w-4 h-4"
        />
        <label
          htmlFor="showCancelled"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Show Cancelled Bookings
        </label>
      </div>
      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by guest name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters() && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" /> Clear Filters
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters || hasActiveFilters()
                  ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <Filter className="w-4 h-4" /> Filters
              {hasActiveFilters() && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {
                    [
                      filters.status !== "all",
                      filters.roomType !== "all",
                      filters.paymentStatus !== "all",
                      filters.dateFrom,
                      filters.dateTo,
                    ].filter(Boolean).length
                  }
                </span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Filters same as previous code */}
              {/* Booking Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Booking Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked-in">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Room Type
                </label>
                <select
                  value={filters.roomType}
                  onChange={(e) =>
                    handleFilterChange("roomType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Room Types</option>
                  {uniqueRoomTypes.map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
              </div>
              {/* Payment Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Status
                </label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) =>
                    handleFilterChange("paymentStatus", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleFilterChange("dateFrom", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <th className="p-4 text-gray-800 dark:text-gray-200">Guest</th>
              <th className="p-4 text-gray-800 dark:text-gray-200">
                Room Type
              </th>
              <th className="p-4 text-gray-800 dark:text-gray-200">Check-In</th>
              <th className="p-4 text-gray-800 dark:text-gray-200">
                Check-Out
              </th>
              <th className="p-4 text-gray-800 dark:text-gray-200">
                Booking Status
              </th>
              <th className="p-4 text-gray-800 dark:text-gray-200">Payment</th>
              <th className="p-4 text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((b) => (
              <tr
                key={b._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-4 text-gray-900 dark:text-gray-100">
                  {b.guestDetails?.firstName} {b.guestDetails?.lastName}
                </td>
                <td className="p-4 text-gray-900 dark:text-gray-100">
                  {b.roomTypeName}
                </td>
                <td className="p-4 text-gray-900 dark:text-gray-100">
                  {new Date(b.checkIn).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-900 dark:text-gray-100">
                  {new Date(b.checkOut).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${b.bookingStatus.color} bg-gray-100 dark:bg-gray-900/30`}
                  >
                    {b.bookingStatus.label}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === "paid"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : b.status === "cancelled"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {b.status === "paid"
                      ? "Paid"
                      : b.status === "cancelled"
                      ? "Cancelled"
                      : "Pending"}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => onViewBooking(b._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  {b.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      disabled={cancelingId === b._id}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      {cancelingId === b._id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
