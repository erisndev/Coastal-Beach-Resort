// src/API/api.js

// ===== Base URL =====
let API_BASE = import.meta.env.VITE_API_BASE_URL;

// ===== Token Handling =====
const TOKEN_KEY = "adminToken";

const getAuthHeaders = (extra = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...extra,
  };
};

// ===== Admin Auth =====
export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Login failed");
    }
    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

// ===== RoomType API =====
export const fetchRoomTypes = async () => {
  const res = await fetch(`${API_BASE}/rooms/room-types`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch room types");
  return await res.json();
};

export const createRoomType = async (roomData) => {
  const res = await fetch(`${API_BASE}/rooms/room-types`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(roomData),
  });
  if (!res.ok) throw new Error("Failed to create room type");
  return await res.json();
};

export const updateRoomType = async (id, roomData) => {
  const res = await fetch(`${API_BASE}/rooms/room-types/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(roomData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update room type");
  }
  return await res.json();
};

export const deleteRoomType = async (id) => {
  const res = await fetch(`${API_BASE}/rooms/room-types/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete room type");
  }
  return await res.json();
};

// ===== Room Units API =====
export const fetchRooms = async () => {
  const res = await fetch(`${API_BASE}/rooms`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return await res.json();
};

export const createRoomUnit = async (roomTypeId, totalUnits) => {
  const res = await fetch(`${API_BASE}/rooms`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ roomTypeId, totalUnits }),
  });
  if (!res.ok) throw new Error("Failed to create room units");
  return await res.json();
};

// ===== Room Availability API =====
export const checkRoomAvailability = async (
  roomTypeId,
  checkIn,
  checkOut,
  guests
) => {
  const params = new URLSearchParams();
  if (roomTypeId) params.append("roomTypeId", roomTypeId);
  if (checkIn) params.append("checkIn", checkIn);
  if (checkOut) params.append("checkOut", checkOut);
  if (guests !== undefined && guests !== null) {
    const g = typeof guests === "number" ? guests : parseInt(guests, 10);
    if (!Number.isNaN(g)) params.append("guests", String(g));
  }
  const res = await fetch(`${API_BASE}/availability?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to check room availability");
  return await res.json();
};

// ===== Bookings API =====
export const fetchBookings = async () => {
  const res = await fetch(`${API_BASE}/bookings`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return await res.json();
};

export const createBooking = async (booking) => {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create booking");
  }
  return await res.json();
};

export const cancelBooking = async (bookingId) => {
  const res = await fetch(`${API_BASE}/bookings/cancel/${bookingId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to cancel booking");
  }
  return await res.json();
};

// ===== Payment API =====
export const initializePayment = async ({ email, amount, reference }) => {
  const res = await fetch(`${API_BASE}/bookings/initialize-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount, reference }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Payment initialization failed");
  }
  return await res.json();
};

export const verifyPayment = async (reference) => {
  const res = await fetch(`${API_BASE}/bookings/verify-payment/${reference}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Payment verification failed");
  }
  return await res.json();
};

// ===== Booking (Single) API =====
export const fetchBookingById = async (id) => {
  const res = await fetch(`${API_BASE}/bookings/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch booking by ID");
  }
  return await res.json();
};

export const fetchBookingByReference = async (reference) => {
  const res = await fetch(`${API_BASE}/bookings/ref/${reference}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch booking by reference");
  }
  return await res.json();
};

// ===== NEW: Check-In / Check-Out API =====
export const checkInBooking = async (bookingId) => {
  const res = await fetch(`${API_BASE}/bookings/check-in/${bookingId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to check in booking");
  }
  return await res.json();
};

export const checkOutBooking = async (bookingId) => {
  const res = await fetch(`${API_BASE}/bookings/check-out/${bookingId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to check out booking");
  }
  return await res.json();
};
