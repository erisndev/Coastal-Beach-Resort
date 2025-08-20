import React, { useState } from "react";
import BookingTable from "../admin/components/admin/BookingTable";
import { BookingDetails } from "../admin/BookingDetails";
import { Modal } from "../admin/components/admin/Modal";

export const Bookings = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleViewBooking = (id) => {
    setSelectedBookingId(id);
  };

  const closeModal = () => setSelectedBookingId(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Bookings
      </h1>

      <BookingTable onViewBooking={handleViewBooking} />

      <Modal isOpen={!!selectedBookingId} onClose={closeModal}>
        {selectedBookingId && <BookingDetails bookingId={selectedBookingId} />}
      </Modal>
    </div>
  );
};
