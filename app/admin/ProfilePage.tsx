"use client";
import React from "react";
import { FiUser, FiMail, FiPhone, FiEdit2 } from "react-icons/fi";

const ProfilePage: React.FC = () => {
  // Example static user data (replace with real data as needed)
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 9876543210",
    role: "Administrator",
    joined: "2023-01-01",
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 text-3xl font-bold text-white bg-blue-600 rounded-full">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 ml-auto text-sm text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50">
          <FiEdit2 /> Edit
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center text-gray-700">
          <FiMail className="mr-2 text-blue-500" /> {user.email}
        </div>
        <div className="flex items-center text-gray-700">
          <FiPhone className="mr-2 text-blue-500" /> {user.phone}
        </div>
        <div className="flex items-center text-gray-700">
          <FiUser className="mr-2 text-blue-500" /> Joined:{" "}
          <span className="ml-1">{user.joined}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
