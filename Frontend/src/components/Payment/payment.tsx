import { useState } from 'react';

const Payments = () => {
  const [payments, setPayments] = useState<string[]>([]);

  const handleMakePayment = () => {
    // Example function to simulate making a payment (replace with actual logic)
    const newPayment = `Payment ${payments.length + 1}`;
    setPayments([...payments, newPayment]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Payments</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Make Payment</h2>

        {/* Payment Form */}
        <form className="space-y-4">
          {/* Payment Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              id="amount"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter amount"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              id="method"
              name="method"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Payment Method</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Make Payment Button */}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleMakePayment}
          >
            Make Payment
          </button>
        </form>

        {/* Display Payments */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Payments History:</h3>
          <ul>
            {payments.map((payment, index) => (
              <li key={index} className="text-gray-700">{`Payment ${index + 1}: ${payment}`}</li>
            ))}
            {payments.length === 0 && <li className="text-gray-500">No payments made yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payments;
