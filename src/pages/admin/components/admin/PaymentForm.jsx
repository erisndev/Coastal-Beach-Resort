import React, { useState, useEffect } from "react";

const PaymentForm = ({ payment, onClose }) => {
  const [formData, setFormData] = useState({
    guest: "",
    amount: "",
    status: "Pending",
  });

  useEffect(() => {
    if (payment) setFormData(payment);
  }, [payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved payment:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {payment ? "Edit Payment" : "Add Payment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200">
              Guest
            </label>
            <input
              type="text"
              name="guest"
              value={formData.guest}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            >
              <option>Pending</option>
              <option>Paid</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
