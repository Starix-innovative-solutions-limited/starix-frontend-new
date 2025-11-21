"use client";

import { CreditCard, History } from "lucide-react";

const billingHistory = [
  { id: "INV-001", date: "2025-09-10", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "2025-08-10", amount: "$29.00", status: "Paid" },
];

export default function BillingInfo() {
  return (
    <div className="space-y-8 lg:px-6">
      <div>
        <div className="pt-6">
          <h3 className="font-semibold text-lg mb-2">Current Plan</h3>
          <p className="text-gray-600">Pro Plan – $29/month</p>
          <button className="mt-3">Upgrade / Manage Plan</button>
        </div>
      </div>

      <div>
        <div className="pt-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Payment Method
          </h3>
          <p className="text-gray-600">Visa ending in 4242</p>
          <button className="mt-3">Update div</button>
        </div>
      </div>

      <div>
        <div className="pt-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <History className="w-4 h-4" /> Billing History
          </h3>
          <div className="border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">Invoice ID</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((bill) => (
                  <tr key={bill.id} className="border-t">
                    <td className="p-2">{bill.id}</td>
                    <td className="p-2">{bill.date}</td>
                    <td className="p-2">{bill.amount}</td>
                    <td className="p-2">{bill.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
