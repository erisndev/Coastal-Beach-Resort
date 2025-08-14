import React from "react";

const payments = [
  { id: 1, guest: "John Doe", amount: "$100", status: "Paid" },
  { id: 2, guest: "Jane Smith", amount: "$180", status: "Pending" },
];

const PaymentTable = ({ onEdit }) => (
  <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
    <thead>
      <tr className="text-left border-b border-gray-200 dark:border-gray-700">
        <th className="p-3">Guest</th>
        <th className="p-3">Amount</th>
        <th className="p-3">Status</th>
        <th className="p-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((p) => (
        <tr
          key={p.id}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          <td className="p-3">{p.guest}</td>
          <td className="p-3">{p.amount}</td>
          <td
            className={`p-3 font-bold ${
              p.status === "Paid" ? "text-green-500" : "text-yellow-500"
            }`}
          >
            {p.status}
          </td>
          <td className="p-3">
            <button
              onClick={() => onEdit(p)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PaymentTable;
