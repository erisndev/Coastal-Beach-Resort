import React, { useEffect, useState } from "react";
import { fetchBookings } from "../../API/Api";
import { PaymentKPIs } from "../admin/components/admin/PaymentKPIs";
import { PaymentTable } from "../admin/components/admin/PaymentTable";

export const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guestFilter, setGuestFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const bookings = await fetchBookings();

        const rows = (Array.isArray(bookings) ? bookings : []).map((b) => ({
          id: b._id,
          guest:
            `${b.guestDetails?.firstName || ""} ${
              b.guestDetails?.lastName || ""
            }`.trim() || "—",
          amount:
            typeof b.totalPrice === "number"
              ? b.totalPrice
              : b.payment?.amount ?? 0,
          status: b.payment?.status || b.status || "pending",
          reference: b.payment?.reference || b.reference || "—",
          checkIn: b.checkIn,
          checkOut: b.checkOut,
        }));

        setPayments(rows);
      } catch (err) {
        console.error("Error loading payments:", err);
        setError("Failed to load payments. Try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Filter payments
  const filteredPayments = payments.filter((p) => {
    const guestMatch = p.guest
      .toLowerCase()
      .includes(guestFilter.toLowerCase());
    const dateMatch =
      (!dateRange.from || new Date(p.checkIn) >= new Date(dateRange.from)) &&
      (!dateRange.to || new Date(p.checkOut) <= new Date(dateRange.to));
    return guestMatch && dateMatch;
  });

  // KPI calculations
  const totalRevenue = filteredPayments.reduce((acc, p) => acc + p.amount, 0);
  const paidCount = filteredPayments.filter(
    (p) => p.status.toLowerCase() === "paid"
  ).length;
  const pendingCount = filteredPayments.filter(
    (p) => p.status.toLowerCase() === "pending"
  ).length;
  const cancelledCount = filteredPayments.filter(
    (p) => p.status.toLowerCase() === "cancelled"
  ).length;

  if (loading) return <p className="text-gray-500">Loading payments...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Payments
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            Guest Name
          </label>
          <input
            type="text"
            value={guestFilter}
            onChange={(e) => setGuestFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Search by guest"
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            From
          </label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange({ ...dateRange, from: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            To
          </label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* KPI Summary */}
      <PaymentKPIs
        totalRevenue={totalRevenue}
        paidCount={paidCount}
        pendingCount={pendingCount}
        cancelledCount={cancelledCount}
      />

      {/* Payments Table */}
      <PaymentTable payments={filteredPayments} />
    </div>
  );
};
