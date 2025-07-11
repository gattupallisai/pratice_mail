
'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98
  }
};

const pageTransition = {
  hidden: { opacity: 0, x: -20 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Color palette
const colors = {
  primary: '#4F46E5',       // Indigo
  secondary: '#10B981',     // Emerald
  accent: '#F59E0B',        // Amber
  danger: '#EF4444',        // Red
  success: '#10B981',       // Emerald
  info: '#3B82F6',         // Blue
  dark: '#1F2937',         // Gray-800
  light: '#F9FAFB',        // Gray-50
  purple: '#8B5CF6',       // Violet
  pink: '#EC4899'          // Pink
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCard, setActiveCard] = useState('users');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const totalUsersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Users',
        data: [800, 900, 950, 1000, 1100, 1150, 1248],
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}80`,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: colors.light,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ],
  };

  const storageData = {
    labels: ['Used', 'Available'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [colors.primary, `${colors.dark}20`],
        borderWidth: 0,
      },
    ],
  };

  const emailTrafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Emails Sent',
        data: [1200, 1900, 1500, 2000, 1800, 1400, 1600],
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}40`,
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: 'Emails Received',
        data: [1000, 1200, 1100, 1400, 1300, 900, 1100],
        borderColor: colors.secondary,
        backgroundColor: `${colors.secondary}40`,
        tension: 0.4,
        borderWidth: 2
      },
    ],
  };

  const topSenders = [
    { name: 'admin@camelq.in', count: 1245 },
    { name: 'support@camelq.in', count: 876 },
    { name: 'notifications@camelq.in', count: 543 },
    { name: 'john.doe@camelq.in', count: 321 },
    { name: 'jane.smith@camelq.in', count: 287 },
  ];

  const topRecipients = [
    { name: 'all@camelq.in', count: 1890 },
    { name: 'support@camelq.in', count: 765 },
    { name: 'john.doe@camelq.in', count: 432 },
    { name: 'jane.smith@camelq.in', count: 398 },
    { name: 'team@camelq.in', count: 256 },
  ];

  const domains = [
    { name: 'camelq.in', status: 'active', expiry: '2024-12-31', users: 850, dns: 'valid' },
    { name: 'cqservices.in', status: 'active', expiry: '2024-11-15', users: 350, dns: 'valid' },
    { name: 'mail.cq', status: 'expiring', expiry: '2023-10-30', users: 48, dns: 'invalid' },
  ];

  const usersList = [
    { 
      name: 'John Doe', 
      email: 'john.doe@camelq.in', 
      status: 'active', 
      lastLogin: '2 hours ago',
      mobile: '+1 555-123-4567',
      joinDate: '2022-05-15'
    },
    { 
      name: 'Jane Smith', 
      email: 'jane.smith@camelq.in', 
      status: 'active', 
      lastLogin: '1 day ago',
      mobile: '+1 555-987-6543',
      joinDate: '2022-06-20'
    },
    { 
      name: 'Admin User', 
      email: 'admin@camelq.in', 
      status: 'active', 
      lastLogin: '30 mins ago',
      mobile: '+1 555-789-0123',
      joinDate: '2021-11-10'
    },
    { 
      name: 'Support Team', 
      email: 'support@camelq.in', 
      status: 'inactive', 
      lastLogin: '1 week ago',
      mobile: '+1 555-456-7890',
      joinDate: '2022-01-05'
    },
    { 
      name: 'Test User', 
      email: 'test.user@camelq.in', 
      status: 'suspended', 
      lastLogin: '1 month ago',
      mobile: '+1 555-321-6549',
      joinDate: '2022-07-30'
    },
  ];

  const deletedUsers = [
    { 
      name: 'Old User 1', 
      email: 'old.user1@camelq.in', 
      createdDate: '2021-03-15', 
      deletedDate: '2023-05-10',
      lastLogin: '2023-04-28'
    },
    { 
      name: 'Test Account', 
      email: 'test.account@camelq.in', 
      createdDate: '2022-01-10', 
      deletedDate: '2023-06-22',
      lastLogin: '2023-06-15'
    },
    { 
      name: 'Temporary User', 
      email: 'temp.user@camelq.in', 
      createdDate: '2022-11-05', 
      deletedDate: '2023-07-01',
      lastLogin: '2023-06-28'
    },
    { 
      name: 'Former Employee', 
      email: 'employee@camelq.in', 
      createdDate: '2020-08-20', 
      deletedDate: '2023-04-15',
      lastLogin: '2023-03-10'
    },
  ];

  const recentActivities = [
    { action: 'Created mailbox', user: 'new.user@camelq.in', time: '10 mins ago' },
    { action: 'Reset password', user: 'existing.user@camelq.in', time: '25 mins ago' },
    { action: 'Suspended user', user: 'inactive.user@camelq.in', time: '1 hour ago' },
    { action: 'Added domain', domain: 'newdomain.cq', time: '2 hours ago' },
  ];

  const alerts = [
    { type: 'suspicious', message: 'Unusual login from new IP (192.168.1.100)', time: '30 mins ago' },
    { type: 'quota', message: '5 mailboxes exceeded storage quota', time: '1 hour ago' },
    { type: 'failed', message: '15 failed login attempts detected', time: '2 hours ago' },
    { type: 'server', message: 'IMAP server response time increased', time: '3 hours ago' },
  ];

  const tickets = [
    { id: 1245, subject: 'Cannot send emails', status: 'open', priority: 'high' },
    { id: 1244, subject: 'Password reset needed', status: 'in-progress', priority: 'medium' },
    { id: 1243, subject: 'Mailbox full', status: 'resolved', priority: 'low' },
  ];

  const handleRestoreUser = (email: string) => {
    alert(`Restoring user: ${email}`);
  };

  const handlePermanentDelete = (email: string) => {
    if (confirm(`Permanently delete ${email}? This cannot be undone.`)) {
      alert(`Permanently deleted user: ${email}`);
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      // variants={pageTransition}
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-blue-50'}`}
    >
      {/* Main Content */}
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.2 }
          }}
          className={`rounded-xl z-40 p-6 mb-6 bg-gradient-to-r ${darkMode ? 'from-indigo-800 to-purple-900' : 'from-indigo-600 to-blue-700'} shadow-lg backdrop-blur-sm`}
        >
          <div className="z-40 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome back, Admin</h2>
              <p className="mt-1 text-indigo-100">Here&apos;s what&apos;s happening with your mail services today</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-indigo-200 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div 
          // variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Total Users Card */}
          <motion.div 
            // variants={item}
            whileHover="hover"
            whileTap="tap"
            className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${activeCard === 'users' ? 'ring-2 ring-indigo-500' : ''}`}
            onClick={() => setActiveCard('users')}
          >
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="p-3 text-indigo-600 bg-indigo-100 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </motion.div>
              <div className="ml-4">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Users</h3>
                <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,248</p>
                <p className="flex items-center mt-1 text-xs text-emerald-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  12.5% from last week
                </p>
              </div>
            </div>
          </motion.div>

          {/* Domain Status Card */}
          <motion.div 
            // variants={item}
            whileHover="hover"
            whileTap="tap"
            className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${activeCard === 'domains' ? 'ring-2 ring-purple-500' : ''}`}
            onClick={() => setActiveCard('domains')}
          >
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="p-3 text-purple-600 bg-purple-100 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </motion.div>
              <div className="ml-4">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Domain Status</h3>
                <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{domains.length} Active</p>
                <p className="flex items-center mt-1 text-xs text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  1 expiring soon
                </p>
              </div>
            </div>
          </motion.div>

          {/* User List Card */}
          <motion.div 
            // variants={item}
            whileHover="hover"
            whileTap="tap"
            className={`rounded-xl shadow-lg p-4 transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${activeCard === 'userList' ? 'ring-2 ring-emerald-500' : ''}`}
            onClick={() => setActiveCard('userList')}
          >
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="p-2 text-emerald-600 bg-emerald-100 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <div className="ml-3">
                <h3 className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>User List</h3>
                <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{usersList.length}</p>
                <p className="flex items-center mt-1 text-xs text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  {usersList.filter(u => u.status === 'active').length} active
                </p>
              </div>
            </div>
          </motion.div>

          {/* Deleted Users Card */}
          <motion.div 
            // variants={item}
            whileHover="hover"
            whileTap="tap"
            className={`rounded-xl shadow-lg p-6 transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${activeCard === 'deletedUsers' ? 'ring-2 ring-red-500' : ''}`}
            onClick={() => setActiveCard('deletedUsers')}
          >
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="p-3 text-red-600 bg-red-100 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </motion.div>
              <div className="ml-4">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Deleted Users</h3>
                <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>42</p>
                <p className="flex items-center mt-1 text-xs text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100-2H7a1 1 0 100 2h5zm-5-4a1 1 0 100-2h5a1 1 0 100 2H7zm8-4a1 1 0 100-2h1a1 1 0 100 2h-1zM4 3a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V3z" clipRule="evenodd" />
                  </svg>
                  5 this week
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {activeCard === 'domains' ? (
            <motion.div 
              key="domains"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`rounded-xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Domain Details</h2>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500"
                  onClick={() => setActiveCard('users')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Domain</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Status</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Users</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Expiry</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>DNS</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    {domains.map((domain, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{domain.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            domain.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {domain.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{domain.users}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{domain.expiry}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            domain.dns === 'valid' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {domain.dns}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 py-1 rounded-md ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                            >
                              Edit
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 py-1 rounded-md ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                            >
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between mt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                >
                  Add New Domain
                </motion.button>
                <Link href="/admin/domain">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    See More →
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : activeCard === 'userList' ? (
            <motion.div 
              key="userList"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`rounded-xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Details</h2>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500"
                  onClick={() => setActiveCard('users')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Name</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Mobile</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Join Date</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Last Login</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    {usersList.map((user, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.mobile}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.joinDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.lastLogin}</div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between mt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  Add New User
                </motion.button>
                <Link href="/admin/user">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    See More →
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : activeCard === 'deletedUsers' ? (
            <motion.div 
              key="deletedUsers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`rounded-xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Deleted Users</h2>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500"
                  onClick={() => setActiveCard('users')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Name</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Created</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Deleted</th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Last Login</th>
                      <th scope="col" className={`px-13 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    {deletedUsers.map((user, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.createdDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.deletedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.lastLogin}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 py-1 rounded-md ${darkMode ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
                              onClick={() => handleRestoreUser(user.email)}
                            >
                              Restore
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-3 py-1 rounded-md ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                              onClick={() => handlePermanentDelete(user.email)}
                            >
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between mt-4"
              >
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Showing {deletedUsers.length} of 42 deleted users
                  </p>
                </div>
                <div className="flex space-x-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Previous
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <>
              {/* Total Users Graph and Storage Usage */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2"
              >
                {/* Total Users Graph */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total Users Growth</h2>
                    <div className="flex space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                      >
                        Year
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                      >
                        Quarter
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                      >
                        Month
                      </motion.button>
                    </div>
                  </div>
                  <div className="h-64">
                    <Line 
                      data={totalUsersData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: {
                              color: darkMode ? '#fff' : '#111827',
                            }
                          },
                        },
                        scales: {
                          x: {
                            grid: {
                              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                              color: darkMode ? '#9CA3AF' : '#6B7280'
                            }
                          },
                          y: {
                            grid: {
                              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                              color: darkMode ? '#9CA3AF' : '#6B7280'
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                </motion.div>

                {/* Storage Usage */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <h2 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Storage Usage</h2>
                  <div className="flex items-center justify-center h-48">
                    <Doughnut 
                      data={storageData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: darkMode ? '#fff' : '#111827',
                            }
                          },
                        },
                        cutout: '70%',
                      }} 
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Total Usage</h3>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>75% of 1TB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Mailboxes Nearing Quota</h3>
                    <ul className="space-y-3">
                      {['big.files@camelq.in', 'archive@camelq.in', 'backups@camelq.in'].map((email, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <span className={`w-2 h-2 mr-2 rounded-full ${index === 0 ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{email}</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`mr-2 text-xs ${index === 0 ? 'text-red-500' : index === 1 ? 'text-yellow-500' : 'text-yellow-500'}`}>{index === 0 ? '98%' : index === 1 ? '92%' : '90%'}</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div className={`h-1.5 rounded-full ${index === 0 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: index === 0 ? '98%' : index === 1 ? '92%' : '90%' }}></div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>

              {/* Email Traffic Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email Traffic</h2>
                  <div className="flex space-x-2">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Week
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      Month
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      Year
                    </motion.button>
                  </div>
                </div>
                <div className="h-64">
                  <Line 
                    data={emailTrafficData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: darkMode ? '#fff' : '#111827',
                          }
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                          },
                          ticks: {
                            color: darkMode ? '#9CA3AF' : '#6B7280'
                          }
                        },
                        y: {
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                          },
                          ticks: {
                            color: darkMode ? '#9CA3AF' : '#6B7280'
                          }
                        }
                      }
                    }} 
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Top Senders</h3>
                    <ul className="space-y-3">
                      {topSenders.map((sender, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${index < 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                            <span className={`text-sm truncate max-w-[140px] ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{sender.name}</span>
                          </div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sender.count.toLocaleString()}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Top Recipients</h3>
                    <ul className="space-y-3">
                      {topRecipients.map((recipient, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${index < 2 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            <span className={`text-sm truncate max-w-[140px] ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{recipient.name}</span>
                          </div>
                          <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recipient.count.toLocaleString()}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Alerts and Tickets */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3"
              >
                {/* Alerts */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Alerts & Warnings</h2>
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      4 New
                    </motion.span>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {alerts.map((alert, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 transition-colors duration-150 hover:bg-gray-50"
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 p-1 rounded-full ${
                            alert.type === 'suspicious' ? 'bg-purple-100 text-purple-600' : 
                            alert.type === 'quota' ? 'bg-yellow-100 text-yellow-600' : 
                            alert.type === 'failed' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1 ml-3">
                            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alert.message}</p>
                            <p className="mt-1 text-xs text-gray-500">{alert.time}</p>
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-4 text-center border-t border-gray-200">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                      View all alerts
                    </motion.button>
                  </div>
                </motion.div>

                {/* Support Tickets */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Support Tickets</h2>
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      3 Active
                    </motion.span>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {tickets.map((ticket, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 transition-colors duration-150 hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                ticket.priority === 'high' ? 'bg-red-500' : 
                                ticket.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}></span>
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>#{ticket.id} - {ticket.subject}</p>
                            </div>
                            <div className="flex items-center mt-2 text-xs">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                ticket.status === 'open' ? 'bg-red-100 text-red-800' : 
                                ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {ticket.status.replace('-', ' ')}
                              </span>
                              <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {ticket.priority} priority
                              </span>
                            </div>
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="ml-2 text-gray-400 hover:text-gray-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-4 text-center border-t border-gray-200">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                      View all tickets
                    </motion.button>
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <h2 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { 
                        icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
                        text: 'Create Mailbox',
                        color: 'blue'
                      },
                      { 
                        icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                        text: 'Reset Password',
                        color: 'green'
                      },
                      { 
                        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
                        text: 'View Suspicious',
                        color: 'purple'
                      },
                      { 
                        icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
                        text: 'Import CSV',
                        color: 'indigo'
                      }
                    ].map((action, index) => (
                      <motion.button 
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-center justify-center p-4 transition-all duration-200 border border-gray-200 rounded-lg group hover:border-${action.color}-500 hover:bg-${action.color}-50`}
                      >
                        <div className={`p-3 mb-2 text-${action.color}-600 transition-colors duration-200 bg-${action.color}-100 rounded-full group-hover:bg-${action.color}-200 group-hover:text-${action.color}-700`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                          </svg>
                        </div>
                        <span className={`text-sm font-medium text-gray-900 transition-colors duration-200 group-hover:text-${action.color}-600`}>{action.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom Row */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-3"
              >
                {/* Domain Status */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Domain Status</h2>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                      Add New
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    {domains.map((domain, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 transition-colors duration-150 rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{domain.name}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expires: {domain.expiry}</p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            domain.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {domain.status}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            domain.dns === 'valid' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                            DNS {domain.dns}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Activities */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className={`rounded-xl shadow-lg lg:col-span-2 transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activities</h2>
                  </div>
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <tr>
                          <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Action</th>
                          <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Target</th>
                          <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Time</th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y divide-gray-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        {recentActivities.map((activity, index) => (
                          <motion.tr 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.action}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                {activity.user || activity.domain}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{activity.time}</div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                              >
                                View
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 text-center border-t border-gray-200">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                      View all activities
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className={`py-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2023 CQ Mail Services. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((item, index) => (
                <motion.a 
                  key={index}
                  whileHover={{ y: -2 }}
                  href="#"
                  className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}







