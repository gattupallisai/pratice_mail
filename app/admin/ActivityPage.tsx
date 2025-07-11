"use client";
import React from "react";
import { FiActivity, FiClock } from "react-icons/fi";

// Example activity data
const activities = [
  {
    id: 1,
    action: "Logged in",
    timestamp: "2025-07-10 09:00",
  },
  {
    id: 2,
    action: "Changed password",
    timestamp: "2025-07-09 18:25",
  },
  {
    id: 3,
    action: "Edited user Jane Smith",
    timestamp: "2025-07-08 13:10",
  },
  {
    id: 4,
    action: "Logged out",
    timestamp: "2025-07-08 13:15",
  },
];

const ActivityPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-blue-800">
        <FiActivity /> Recent Activity
      </h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center gap-3 p-4 border border-blue-100 rounded-lg bg-blue-50"
          >
            <FiClock className="text-blue-400" />
            <div>
              <div className="text-sm font-medium text-gray-800">
                {activity.action}
              </div>
              <div className="text-xs text-gray-500">{activity.timestamp}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityPage;
