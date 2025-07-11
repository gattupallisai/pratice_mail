 "use client";
import React from "react";
import { FiTool } from "react-icons/fi";

const SettingsPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="flex items-center gap-3 mb-4">
      <FiTool className="w-8 h-8 text-blue-500 animate-bounce" />
      <h2 className="text-2xl font-bold text-blue-800">Settings</h2>
    </div>
    <div className="p-6 text-center border border-blue-100 shadow bg-blue-50 rounded-xl">
      <p className="mb-2 text-lg font-semibold text-blue-700">
        Coming Soon!
      </p>
      <p className="text-gray-600">
        The settings page is under construction.<br />
        Please check back soon for updates.
      </p>
    </div>
  </div>
);

export default SettingsPage;
