"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FaSearch,
  FaDownload,
  FaUserPlus,
  FaFilter,
  FaTimes,
  FaTrash,
  FaEdit,
  FaEye,
  FaUsers,
  FaUserCheck,
  FaHdd
} from "react-icons/fa";
import {
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdInformationCircle
} from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import CreateEmailModal from "../CreateEmailModal";

// --- Types ---
type UserStatus = "active" | "blocked";
type UserRole = "admin" | "user";
type User = {
  id: string;
  fullName: string;
  companyEmail: string;
  mobile: string;
  doj: string;
  storageUsed: number;
  storageLimit: number;
  status: UserStatus;
  role: UserRole | string;
};
type Notification = {
  message: string;
  type: "" | "success" | "error" | "warning";
};

// --- Stats ---
const UserStats: React.FC<{ users: User[] }> = React.memo(({ users }) => {
  const totalUsers = users.length;
  const activeUsers = useMemo(
    () => users.filter((u) => u.status === "active").length,
    [users]
  );
  const totalStorageUsed = useMemo(
    () => users.reduce((sum, u) => sum + u.storageUsed, 0),
    [users]
  );
  const totalStorageLimit = useMemo(
    () => users.reduce((sum, u) => sum + u.storageLimit, 0),
    [users]
  );

  return (
    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
      <div className="flex items-center p-4 bg-white rounded-lg shadow">
        <FaUsers className="w-8 h-8 text-blue-600" />
        <div className="ml-4">
          <div className="text-2xl font-bold">{totalUsers}</div>
          <div className="text-gray-500">Total Users</div>
        </div>
      </div>
      <div className="flex items-center p-4 bg-white rounded-lg shadow">
        <FaUserCheck className="w-8 h-8 text-green-600" />
        <div className="ml-4">
          <div className="text-2xl font-bold">{activeUsers}</div>
          <div className="text-gray-500">Active Users</div>
        </div>
      </div>
      <div className="flex items-center p-4 bg-white rounded-lg shadow">
        <FaHdd className="w-8 h-8 text-indigo-600" />
        <div className="ml-4">
          <div className="text-2xl font-bold">
            {totalStorageUsed} / {totalStorageLimit} GB
          </div>
          <div className="text-gray-500">Used Storage</div>
        </div>
      </div>
    </div>
  );
});
UserStats.displayName = "UserStats";

// --- Main Component ---
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [notification, setNotification] = useState<Notification>({
    message: "",
    type: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers([
        {
          id: "1",
          fullName: "John Doe",
          companyEmail: "john@camelq.in",
          mobile: "9876543210",
          doj: "2023-05-15",
          storageUsed: 65,
          storageLimit: 100,
          status: "active",
          role: "admin"
        },
        {
          id: "2",
          fullName: "Jane Smith",
          companyEmail: "jane@camelq.in",
          mobile: "9876543211",
          doj: "2023-06-20",
          storageUsed: 30,
          storageLimit: 100,
          status: "active",
          role: "user"
        },
        {
          id: "3",
          fullName: "Alice Green",
          companyEmail: "alice@camelq.in",
          mobile: "9876543212",
          doj: "2023-08-05",
          storageUsed: 80,
          storageLimit: 100,
          status: "blocked",
          role: "user"
        }
      ]);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = useMemo(() => {
    const s = search.toLowerCase();
    return users
      .filter(
        (user) =>
          user.fullName.toLowerCase().includes(s) ||
          user.companyEmail.toLowerCase().includes(s) ||
          user.mobile.includes(s)
      )
      .filter((user) => statusFilter === "all" || user.status === statusFilter)
      .sort(
        (a, b) => new Date(b.doj).getTime() - new Date(a.doj).getTime()
      );
  }, [users, search, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = useMemo(
    () =>
      filteredUsers.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
      ),
    [filteredUsers, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(
        () => setNotification({ message: "", type: "" }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleDeleteUser = useCallback(() => {
    if (!userToDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
    setShowDeleteModal(false);
    setNotification({ message: "User deleted successfully", type: "success" });
  }, [userToDelete]);

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setShowModal(true);
  }, []);

  const exportCSV = useCallback(() => {
    if (users.length === 0) {
      setNotification({ message: "No users to export", type: "warning" });
      return;
    }
    const csv = [
      ["Full Name", "Company Email", "Mobile", "DOJ", "Storage Used", "Status"],
      ...users.map((u) => [
        u.fullName,
        u.companyEmail,
        u.mobile,
        u.doj,
        `${u.storageUsed}% of ${u.storageLimit}GB`,
        u.status
      ])
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    setNotification({ message: "CSV exported", type: "success" });
  }, [users]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-GB");

  const toggleUserStatus = useCallback((userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "blocked" : "active"
            }
          : user
      )
    );
    setNotification({ message: "User status updated", type: "success" });
  }, []);

  const UserRow: React.FC<{ user: User }> = ({ user }) => (
    <tr key={user.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-blue-600 bg-blue-100 rounded-full">
            {user.fullName.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.fullName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.companyEmail}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.mobile}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDate(user.doj)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                user.storageUsed > 80
                  ? "bg-red-500"
                  : user.storageUsed > 50
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${user.storageUsed}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs text-gray-500">
            {user.storageUsed}%
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          onClick={() => toggleUserStatus(user.id)}
          className={`inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded-full cursor-pointer ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status === "active" ? "Active" : "Blocked"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-1 text-blue-600 hover:text-blue-900"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              setUserToDelete(user);
              setShowDeleteModal(true);
            }}
            className="p-1 text-red-600 hover:text-red-900"
          >
            <FaTrash />
          </button>
          <button className="p-1 text-gray-600 hover:text-gray-900">
            <FaEye />
          </button>
        </div>
      </td>
    </tr>
  );
  UserRow.displayName = "UserRow";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-white sm:p-6"
    >
      <div className="mx-auto max-w-7xl">
        <UserStats users={users} />
                <div className="flex flex-col items-start justify-between mb-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-0">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <FaUserPlus className="mr-2" /> Add User
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              <FaDownload className="mr-2" /> Export CSV
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 pl-10 text-sm border rounded"
              />
              <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | UserStatus)
              }
              className="px-4 py-2 text-sm border rounded"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Company Email
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Mobile
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  DOJ
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Storage
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex items-center text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        <AnimatePresence>
          {notification.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg text-white ${
                notification.type === "success"
                  ? "bg-green-600"
                  : notification.type === "error"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {notification.type === "success" && (
                <IoMdCheckmarkCircle className="inline mr-2" />
              )}
              {notification.type === "error" && (
                <IoMdCloseCircle className="inline mr-2" />
              )}
              {notification.type === "warning" && (
                <IoMdInformationCircle className="inline mr-2" />
              )}
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div className="p-6 bg-white rounded shadow">
                <h2 className="mb-4 text-lg font-bold">
                  Confirm Delete User
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Are you sure you want to delete{" "}
                  <strong>{userToDelete?.fullName}</strong>?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-sm bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showModal && (
          <CreateEmailModal
            onClose={() => {
              setShowModal(false);
              setEditingUser(null);
            }}
            onConfirm={() => {
              setShowModal(false);
              setNotification({
                message: editingUser
                  ? "User updated"
                  : "User added",
                type: "success"
              });
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Users;


