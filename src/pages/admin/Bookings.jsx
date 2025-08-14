import React from "react";
import BookingTable from "../admin/components/admin/BookingTable";

export const Bookings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Bookings
      </h1>
      <BookingTable />
    </div>
  );
};
