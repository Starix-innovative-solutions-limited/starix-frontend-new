/* eslint-disable @typescript-eslint/no-explicit-any */

const ActivityItem = ({ text, time }: any) => (
  <div className="py-2">
    <div className="text-sm text-gray-700">{text}</div>
    <div className="text-xs text-gray-400">{time}</div>
  </div>
);

export default ActivityItem;
