import React, { useEffect, useState } from "react";
import { fetchBookings } from "../../../../API/Api";

const PaymentTable = ({ onEdit }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const bookings = await fetchBookings();
        const rows = (Array.isArray(bookings) ? bookings : []).map((b) => ({
          id: b._id,
          guest: `${b.guestDetails?.firstName || ""} ${b.guestDetails?.lastName || ""}`.trim() || "—",
          amount:
            typeof b.totalPrice === "number"
              ? b.totalPrice
              : b.payment?.amount ?? 0,
          status: (b.payment?.status || b.status || "pending").toString(),
          reference: b.payment?.reference || b.reference || "—",
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

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-300">Loading payments...</p>;
  }

  if (error) {
    return <p className="text-red-600 dark:text-red-400">{error}</p>;
  }

  if (!payments.length) {
    return <p className="text-gray-500 dark:text-gray-300">No payments found.</p>;
  }

  return (
    <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr className="text-left border-b border-gray-200 dark:border-gray-700">
          <th className="p-3">Guest</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Status</th>
          <th className="p-3">Reference</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p) => (
          <tr key={p.id} className="border-b border-gray-200 dark:border-gray-700">
            <td className="p-3">{p.guest}</td>
            <td className="p-3">R{Number(p.amount).toLocaleString()}</td>
            <td
              className={`p-3 font-bold ${
                p.status.toLowerCase() === "paid" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {p.status}
            </td>
            <td className="p-3">{p.reference}</td>
            <td className="p-3">
              {onEdit && (
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
