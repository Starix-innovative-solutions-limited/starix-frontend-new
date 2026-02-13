"use client";

import { FiArrowLeft, FiDownload } from "react-icons/fi";
import Link from "next/link";

export default function TransactionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Normally you'd fetch from API using params.id
  const data = {
    id: params.id,
    challengeName: "Challenge Name",
    category: "Category",
    description:
      "Challenge Description - From brands running high-impact challenges to creators winning rewards and building",
    amount: 4000,
    status: "Funded",
  };

  return (
    <div className="general-space flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <Link
            href="/brand/payments"
            className="flex items-center gap-2 text-dark-navy text-xl font-medium"
          >
            <FiArrowLeft />
            Transactions List
          </Link>

          {/* TAGS */}
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              ● {data.challengeName}
            </span>
            <span className="flex items-center gap-1">
              ● {data.category}
            </span>
          </div>
        </div>

        {/* DOWNLOAD */}
        <button className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-50">
          <FiDownload />
          Download
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col gap-10">
        {/* TOP RIGHT TRANSACTION ID */}
        <div className="flex justify-end">
          <div className="bg-[#F3F5FF] border border-[#D8DEFF] rounded-xl px-5 py-3 text-sm">
            <p className="text-gray-500">Transaction ID:</p>
            <p className="text-dark-navy font-medium">{data.id}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-8 max-w-3xl">
          <div>
            <p className="text-gray-500 text-sm">Challenge Name:</p>
            <p className="text-lg text-dark-navy font-medium">
              {data.challengeName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Category:</p>
            <p className="text-lg text-dark-navy font-medium">
              {data.category}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Challenge Description:</p>
            <p className="text-lg text-dark-navy leading-relaxed">
              {data.description}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Amount:</p>
            <p className="text-lg text-dark-navy font-medium">
              ${data.amount}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status:</p>
            <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium bg-[#E8F7EF] text-[#1F9254]">
              {data.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
