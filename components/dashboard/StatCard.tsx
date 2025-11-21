/* eslint-disable @typescript-eslint/no-explicit-any */
import { Info } from "lucide-react";

const StatCard = ({ title, value, subtitle, bgColor }: any) => (
  <div
    className={`${bgColor} rounded-lg p-6 border border-gray-200 shadow-[0_2px_4px_0_#1B1C1D0A]`}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm text-gray-600">{title}</span>
      <Info className="w-4 h-4 text-gray-400" />
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500">{subtitle}</div>
  </div>
);

export default StatCard;
