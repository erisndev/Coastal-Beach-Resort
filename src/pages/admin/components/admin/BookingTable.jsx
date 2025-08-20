import React, { useEffect, useState } from "react";
import { Search, Filter, X, MoreVertical } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  fetchBookings,
  fetchRoomTypes,
  cancelBooking,
  checkInBooking,
  checkOutBooking,
} from "../../../../API/Api";

const ActionsDropdown = ({
  booking,
  processingId,
  handleCheckIn,
  handleCheckOut,
  handleCancelBooking,
  onViewBooking,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  checkInDate.setHours(0, 0, 0, 0);
  checkOutDate.setHours(0, 0, 0, 0);

  const canCheckIn = booking.bookingStatus.status === "confirmed";
  const canCheckOut = booking.bookingStatus.status === "checked-in";
  const canCancel = booking.status !== "cancelled";

  const isCheckInToday = today.getTime() === checkInDate.getTime();
  const isCheckOutToday = today.getTime() === checkOutDate.getTime();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center items-center w-8 h-8 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <MoreVertical className="w-4 h-4" />
      </MenuButton>
      <MenuItems className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-[9999] py-1 origin-top-right">
        {/* View Booking Button */}
        {onViewBooking && (
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => onViewBooking(booking._id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                View Details
              </button>
            )}
          </MenuItem>
        )}

        {canCheckIn && (
          <MenuItem>
            {({ active }) => (
              <button
                disabled={processingId === booking._id || !isCheckInToday}
                onClick={() => handleCheckIn(booking._id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  processingId === booking._id || !isCheckInToday
                    ? "text-gray-400 cursor-not-allowed"
                    : active
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {processingId === booking._id ? "Processing..." : "Check In"}
              </button>
            )}
          </MenuItem>
        )}

        {canCheckOut && (
          <MenuItem>
            {({ active }) => (
              <button
                disabled={processingId === booking._id || !isCheckOutToday}
                onClick={() => handleCheckOut(booking._id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  processingId === booking._id || !isCheckOutToday
                    ? "text-gray-400 cursor-not-allowed"
                    : active
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                    : "text-purple-600 dark:text-purple-400"
                }`}
              >
                {processingId === booking._id ? "Processing..." : "Check Out"}
              </button>
            )}
          </MenuItem>
        )}

        {canCancel && (
          <MenuItem>
            {({ active }) => (
              <button
                disabled={processingId === booking._id}
                onClick={() => handleCancelBooking(booking._id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  processingId === booking._id
                    ? "text-gray-400 cursor-not-allowed"
                    : active
                    ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {processingId === booking._id
                  ? "Processing..."
                  : "Cancel Booking"}
              </button>
            )}
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};

const BookingTable = ({ onViewBooking }) => {
  const [bookings, setBookings] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
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
      setProcessingId(bookingId);
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
      setProcessingId(null);
    }
  };

  const handleCheckIn = async (bookingId) => {
    const booking = bookings.find((b) => b._id === bookingId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(booking.checkIn);
    checkInDate.setHours(0, 0, 0, 0);

    if (today.getTime() !== checkInDate.getTime()) {
      return alert(
        "You can only check in on the guest's booked check-in date."
      );
    }

    if (!window.confirm("Mark this booking as Checked In?")) return;
    try {
      setProcessingId(bookingId);
      await checkInBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, checkIn: new Date().toISOString() } : b
        )
      );
      alert("Booking checked in successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to check in");
    } finally {
      setProcessingId(null);
    }
  };

  const handleCheckOut = async (bookingId) => {
    const booking = bookings.find((b) => b._id === bookingId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkOutDate = new Date(booking.checkOut);
    checkOutDate.setHours(0, 0, 0, 0);

    if (today.getTime() !== checkOutDate.getTime()) {
      return alert(
        "You can only check out on the guest's booked check-out date."
      );
    }

    if (!window.confirm("Mark this booking as Checked Out?")) return;
    try {
      setProcessingId(bookingId);
      await checkOutBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, checkOut: new Date().toISOString() } : b
        )
      );
      alert("Booking checked out successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to check out");
    } finally {
      setProcessingId(null);
    }
  };

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const clearFilters = () =>
    setFilters({
      searchTerm: "",
      status: "all",
      roomType: "all",
      paymentStatus: "all",
      dateFrom: "",
      dateTo: "",
    });

  const hasActiveFilters = () =>
    filters.searchTerm ||
    filters.status !== "all" ||
    filters.roomType !== "all" ||
    filters.paymentStatus !== "all" ||
    filters.dateFrom ||
    filters.dateTo;

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
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-300">
          Loading bookings...
        </div>
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-300">
          No bookings found.
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
            Confirmed Bookings
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {
              sortedBookings.filter(
                (b) => b.bookingStatus.status === "confirmed"
              ).length
            }
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Checked In
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {
              sortedBookings.filter(
                (b) => b.bookingStatus.status === "checked-in"
              ).length
            }
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/20 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Checked Out/Completed
          </h3>
          <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
            {
              sortedBookings.filter(
                (b) => b.bookingStatus.status === "completed"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by guest name or email..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Show Cancelled Toggle */}
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showCancelled}
                onChange={() => setShowCancelled(!showCancelled)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              Show Cancelled
            </label>

            {hasActiveFilters() && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-4 h-4" /> Clear
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors font-medium ${
                showFilters || hasActiveFilters()
                  ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters() && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
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

        {/* Filter Panel */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <option value="all">All Types</option>
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
                  <option value="all">All</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From Date
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
                  To Date
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

      {/* Booking Table */}
      <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Guest Details
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Room Type
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Check In
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Check Out
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Booking Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedBookings.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
              >
                No bookings found matching your filters.
              </td>
            </tr>
          ) : (
            sortedBookings.map((booking) => (
              <tr
                key={booking._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {booking.guestDetails?.firstName}{" "}
                    {booking.guestDetails?.lastName}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {booking.guestDetails?.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {booking.roomTypeName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.bookingStatus.status === "confirmed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : booking.bookingStatus.status === "checked-in"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        : booking.bookingStatus.status === "completed"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {booking.bookingStatus.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      booking.status === "paid"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center relative">
                  <ActionsDropdown
                    booking={booking}
                    processingId={processingId}
                    handleCheckIn={handleCheckIn}
                    handleCheckOut={handleCheckOut}
                    handleCancelBooking={handleCancelBooking}
                    onViewBooking={onViewBooking}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
