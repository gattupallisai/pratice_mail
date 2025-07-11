"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiGrid,
  FiGlobe,
  FiMail,
  FiUsers,
  FiSettings,
  FiUser,
  FiActivity,
  FiChevronRight,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Image from "next/image";

interface Theme {
  bg: string;
  text: string;
  border: string;
  highlight: string;
  gradient: string;
}

interface NavLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface ProfileOption {
  label: string;
  key: string;
  icon: React.ReactNode;
}

export default function Admin() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userName, setUserName] = useState("Admin User");
  const [currentPage, setCurrentPage] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const themeColor = "blue";
  const avatarType = "initials" as const;

  useEffect(() => {
    setHasMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && e.target instanceof Node && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const theme: Theme = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      highlight: "hover:bg-blue-50",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      highlight: "hover:bg-green-50",
      gradient: "bg-gradient-to-br from-green-500 to-green-700",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-200",
      highlight: "hover:bg-purple-50",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
  }[themeColor];

  const links: NavLink[] = [
    { label: "Dashboard", path: "/admin", icon: <FiGrid className="w-5 h-5" /> },
    { label: "Domain Management", path: "/admin/domain", icon: <FiGlobe className="w-5 h-5" /> },
    { label: "Admin Mailbox", path: "/admin/adminmailbox", icon: <FiMail className="w-5 h-5" /> },
    { label: "User Management", path: "/admin/user", icon: <FiUsers className="w-5 h-5" /> },
    { label: "Settings", path: "/admin/settings", icon: <FiSettings className="w-5 h-5" /> },
  ];

  const profileOptions: ProfileOption[] = [
    { label: "Profile", key: "profile", icon: <FiUser className={`w-4 h-4 mr-2 ${theme.text}`} /> },
    { label: "Settings", key: "settings", icon: <IoSettingsOutline className={`w-4 h-4 mr-2 ${theme.text}`} /> },
    { label: "Activity", key: "activity", icon: <FiActivity className={`w-4 h-4 mr-2 ${theme.text}`} /> },
  ];

  const closeModal = () => setCurrentPage("");

  return (
    <>
      <aside className="sticky top-0 w-64 h-screen p-4 bg-white border-r border-blue-100 shadow-sm">
        {/* Logo */}
        <div className="flex items-center justify-center p-4 mb-6 rounded-lg bg-blue-50">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg">
              <Image
                src="/camelqmaillogo.png"
                alt="CamelQ Logo"
                width={40}
                height={40}
                className="object-cover w-10 h-10"
              />
            </div>
            <span className="text-xl font-bold text-blue-800">CamelQ Mail</span>
          </div>
        </div>

        {/* Profile */}
        <div className="relative mb-6" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 px-4 py-3 transition bg-white border ${theme.border} rounded-xl shadow hover:shadow-md`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${theme.bg} ${theme.text} font-semibold shadow-sm`}
            >
              {avatarType === "initials" ? (
                <span className="text-sm">{initials}</span>
              ) : (
                <FiUser className="w-5 h-5" />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-800">
                {userName}
              </span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
            <FiChevronRight
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isProfileOpen ? "rotate-90" : ""
              }`}
            />
          </button>
{isProfileOpen && (
  <div className="absolute left-0 right-0 z-50 w-56 mx-auto mt-2 bg-white border border-blue-100 shadow-lg rounded-xl animate-fadeIn">
    <div className={`px-4 py-3 border-b ${theme.border} ${theme.bg}`}>
      <p className={`text-sm font-medium ${theme.text}`}>{userName}</p>
      <p className="text-xs text-blue-700">admin@example.com</p>
    </div>
    <div className="flex flex-col py-2">
      {profileOptions.map(({ label, key, icon }) => (
        <button
          key={key}
          onClick={() => {
            setCurrentPage(key);
            setIsProfileOpen(false);
          }}
          className={`flex items-center px-4 py-2 text-sm text-gray-800 ${theme.highlight} transition-colors`}
        >
          {icon}
          {label}
        </button>
      ))}
      <button
        onClick={() => console.log("Logging out...")}
        className="flex items-center px-4 py-2 text-sm text-red-600 transition-colors border-t border-blue-100 hover:bg-red-50"
      >
        <FiLogOut className="w-4 h-4 mr-2" />
        Sign out
      </button>
    </div>
  </div>
)}

        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map(({ label, path, icon }) => (
            <Link key={path} href={path}>
              <div
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  pathname === path
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-blue-900 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <span
                  className={`mr-3 ${
                    pathname === path ? "text-white" : "text-blue-600"
                  }`}
                >
                  {icon}
                </span>
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Modal Content */}
      {currentPage === 'profile' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute p-2 transition-colors rounded-full top-4 right-4 hover:bg-blue-50 focus:outline-none"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5 text-blue-600" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-800">Profile Settings</h2>
              <div className="mt-4">
                <p>Profile content goes here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}