import React, { useEffect, useState } from "react";
import { Search, Filter, X, Calendar, User, Home } from "lucide-react";
import { fetchBookings, fetchRoomTypes } from "../../../../API/Api";

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: 'all',
    roomType: 'all',
    paymentStatus: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookingsData, roomTypesData] = await Promise.all([
          fetchBookings(),
          fetchRoomTypes()
        ]);
        setBookings(bookingsData || []);
        setRoomTypes(roomTypesData || []);
        
        // Data loaded successfully
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Helper function to get room type name
  const getRoomTypeName = (booking) => {
    // Check if room has nested roomType with name (this is the correct structure)
    if (booking.room?.roomType?.name) {
      return booking.room.roomType.name;
    }
    
    // Direct room name from booking
    if (booking.room?.name) {
      return booking.room.name;
    }
    
    // Room type name from booking root
    if (booking.roomType?.name) {
      return booking.roomType.name;
    }
    
    // Try to find room type by ID if roomType is just an ID reference
    if (booking.room?.roomType && typeof booking.room.roomType === 'string') {
      const roomType = roomTypes.find(rt => rt._id === booking.room.roomType);
      if (roomType) {
        return roomType.name;
      }
    }
    
    // Try to find room type directly by various ID fields
    const possibleTypeIds = [
      booking.roomTypeId,
      booking.roomId,
      booking.room?._id,
      booking.room?.roomTypeId,
      booking.room?.typeId,
      booking.selectedRoom?.roomTypeId,
      booking.selectedRoom?._id
    ].filter(Boolean);
    
    for (const id of possibleTypeIds) {
      const roomType = roomTypes.find(rt => rt._id === id);
      if (roomType) {
        return roomType.name;
      }
    }
    
    return "Unknown Room";
  };

  // Helper function to determine booking status
  const getBookingStatus = (booking) => {
    const today = new Date();
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    
    // Set time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    if (checkOut < today) {
      return { status: 'completed', label: 'Completed', color: 'text-gray-500' };
    } else if (checkIn <= today && checkOut >= today) {
      return { status: 'checked-in', label: 'Checked In', color: 'text-blue-600' };
    } else if (checkIn > today) {
      return { status: 'confirmed', label: 'Confirmed', color: 'text-green-600' };
    }
    return { status: 'unknown', label: 'Unknown', color: 'text-gray-500' };
  };

  // Filter functions
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      status: 'all',
      roomType: 'all',
      paymentStatus: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  const hasActiveFilters = () => {
    return filters.searchTerm || 
           filters.status !== 'all' || 
           filters.roomType !== 'all' || 
           filters.paymentStatus !== 'all' || 
           filters.dateFrom || 
           filters.dateTo;
  };

  // Categorize bookings
  const categorizedBookings = bookings.map(booking => ({
    ...booking,
    roomTypeName: getRoomTypeName(booking),
    bookingStatus: getBookingStatus(booking)
  }));

  // Apply filters
  const filteredBookings = categorizedBookings.filter(booking => {
    // Search term filter (name, email)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const fullName = `${booking.guestDetails?.firstName || ''} ${booking.guestDetails?.lastName || ''}`.toLowerCase();
      const email = (booking.guestDetails?.email || '').toLowerCase();
      
      if (!fullName.includes(searchLower) && !email.includes(searchLower)) {
        return false;
      }
    }

    // Status filter
    if (filters.status !== 'all' && booking.bookingStatus.status !== filters.status) {
      return false;
    }

    // Room type filter
    if (filters.roomType !== 'all' && booking.roomTypeName !== filters.roomType) {
      return false;
    }

    // Payment status filter
    if (filters.paymentStatus !== 'all' && booking.status !== filters.paymentStatus) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom) {
      const checkInDate = new Date(booking.checkIn);
      const fromDate = new Date(filters.dateFrom);
      if (checkInDate < fromDate) {
        return false;
      }
    }

    if (filters.dateTo) {
      const checkInDate = new Date(booking.checkIn);
      const toDate = new Date(filters.dateTo);
      if (checkInDate > toDate) {
        return false;
      }
    }

    return true;
  });

  // Sort bookings: confirmed first, then checked-in, then completed
  const sortedBookings = filteredBookings.sort((a, b) => {
    const statusOrder = { confirmed: 0, 'checked-in': 1, completed: 2 };
    const aOrder = statusOrder[a.bookingStatus.status] || 3;
    const bOrder = statusOrder[b.bookingStatus.status] || 3;
    
    if (aOrder !== bOrder) return aOrder - bOrder;
    
    // Within same category, sort by check-in date
    return new Date(a.checkIn) - new Date(b.checkIn);
  });

  // Get unique room types for filter dropdown
  const uniqueRoomTypes = [...new Set(categorizedBookings.map(b => b.roomTypeName))].filter(Boolean);

  if (loading) {
    return (
      <p className="text-gray-500 dark:text-gray-300">Loading bookings...</p>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-300">No bookings found.</p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {/* Search Bar and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by guest name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {hasActiveFilters() && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters || hasActiveFilters()
                  ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters() && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[filters.status !== 'all', filters.roomType !== 'all', filters.paymentStatus !== 'all', filters.dateFrom, filters.dateTo].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Booking Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Booking Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked-in">Checked In</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Room Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Room Type
                </label>
                <select
                  value={filters.roomType}
                  onChange={(e) => handleFilterChange('roomType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Room Types</option>
                  {uniqueRoomTypes.map(roomType => (
                    <option key={roomType} value={roomType}>{roomType}</option>
                  ))}
                </select>
              </div>

              {/* Payment Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Status
                </label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Date From Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Date To Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {hasActiveFilters() && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Showing {sortedBookings.length} of {categorizedBookings.length} bookings
              {filters.searchTerm && ` matching "${filters.searchTerm}"`}
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">Confirmed Bookings</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {sortedBookings.filter(b => b.bookingStatus.status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">Checked In</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {sortedBookings.filter(b => b.bookingStatus.status === 'checked-in').length}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Completed</h3>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {sortedBookings.filter(b => b.bookingStatus.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        {sortedBookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {hasActiveFilters() 
                ? "Try adjusting your filters to see more results."
                : "No bookings have been made yet."
              }
            </p>
            {hasActiveFilters() && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Guest</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Room Type</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Check-In</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Check-Out</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Booking Status</th>
                <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Payment</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map((b) => (
                <tr
                  key={b._id}
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    b.bookingStatus.status === 'past' ? 'opacity-75' : ''
                  }`}
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {b.guestDetails?.firstName} {b.guestDetails?.lastName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {b.guestDetails?.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {b.roomTypeName}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {new Date(b.checkIn).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {new Date(b.checkOut).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.bookingStatus.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : b.bookingStatus.status === 'checked-in'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {b.bookingStatus.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === "paid" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {b.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingTable;
