"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  FiGlobe,
  FiCheckCircle,
  FiAlertTriangle,
  FiHome,
  FiShield,
  FiRefreshCw,
  FiSettings,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";

// --- Types ---
type DomainStatus = "Active" | "Inactive";
type SSLStatus = "Active" | "Expired";

interface Domain {
  id: number;
  name: string;
  registered: boolean;
  registrationDate: string;
  expiryDate: string;
  daysToExpiry: number;
  registrar: string;
  status: DomainStatus;
  nameServers: string[];
  configured: boolean;
  traffic: string;
  sslStatus: SSLStatus;
  dnsRecords: number;
  lastUpdated: string;
}

// --- Sample Data ---
const domains: Domain[] = [
  {
    id: 1,
    name: "camelq.in",
    registered: true,
    registrationDate: "2023-01-15",
    expiryDate: "2025-01-15",
    daysToExpiry: 243,
    registrar: "Namecheap",
    status: "Active",
    nameServers: ["ns1.camelq.in", "ns2.camelq.in"],
    configured: true,
    traffic: "1.2K visits/month",
    sslStatus: "Active",
    dnsRecords: 5,
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "camelq.info",
    registered: true,
    registrationDate: "2022-11-20",
    expiryDate: "2024-11-20",
    daysToExpiry: 140,
    registrar: "GoDaddy",
    status: "Active",
    nameServers: ["ns1.camelq.info", "ns2.camelq.info"],
    configured: true,
    traffic: "850 visits/month",
    sslStatus: "Active",
    dnsRecords: 7,
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "cqmail.in",
    registered: true,
    registrationDate: "2023-03-10",
    expiryDate: "2025-03-10",
    daysToExpiry: 288,
    registrar: "Google Domains",
    status: "Active",
    nameServers: ["ns1.cqmail.in", "ns2.cqmail.in"],
    configured: false,
    traffic: "320 visits/month",
    sslStatus: "Expired",
    dnsRecords: 3,
    lastUpdated: "1 week ago",
  },
];

// --- Stats Cards Component ---
const StatsCards: React.FC<{ domains: Domain[] }> = ({ domains }) => {
  const configuredCount = useMemo(() => domains.filter(d => d.configured).length, [domains]);
  const expiringSoonCount = useMemo(() => domains.filter(d => d.daysToExpiry < 90).length, [domains]);
  const sslIssuesCount = useMemo(() => domains.filter(d => d.sslStatus !== "Active").length, [domains]);
  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-md">
              <FiGlobe className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1 w-0 ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Domains
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {domains.length}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-green-100 rounded-md">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 w-0 ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Configured
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {configuredCount}
                </div>
                <div className="flex items-baseline ml-2 text-sm font-semibold text-green-600">
                  {domains.length > 0
                    ? Math.round((configuredCount / domains.length) * 100)
                    : 0}
                  %
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-md">
              <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1 w-0 ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Expiring Soon
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {expiringSoonCount}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-red-100 rounded-md">
              <FiShield className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 w-0 ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">
                SSL Issues
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {sslIssuesCount}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Domain List Component ---
const DomainList: React.FC<{
  domains: Domain[];
  selectedDomain: Domain;
  setSelectedDomain: (d: Domain) => void;
  setActiveTab: (tab: "overview" | "dns" | "security") => void;
  search: string;
}> = ({ domains, selectedDomain, setSelectedDomain, setActiveTab, search }) => {
  const filteredDomains = useMemo(
    () => domains.filter(d => d.name.toLowerCase().includes(search.toLowerCase())),
    [domains, search]
  );
  return (
    <div className="mb-6 overflow-hidden bg-white rounded-lg shadow">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Your Domains
        </h3>
      </div>
      <div className="overflow-y-auto divide-y divide-gray-200 max-h-96">
        {filteredDomains.length === 0 && (
          <div className="px-4 py-4 text-gray-500">No domains found.</div>
        )}
        {filteredDomains.map(domain => (
          <div
            key={domain.id}
            className={`px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedDomain.id === domain.id ? "bg-indigo-50" : ""
            }`}
            onClick={() => {
              setSelectedDomain(domain);
              setActiveTab("overview");
            }}
            aria-label={`Select domain ${domain.name}`}
            tabIndex={0}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-indigo-600 truncate">
                {domain.name}
              </div>
              <div className="flex items-center">
                {domain.configured ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Configured
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Setup Needed
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">{domain.registrar}</div>
              <div
                className={`text-xs font-medium ${
                  domain.daysToExpiry < 90 ? "text-red-600" : "text-gray-500"
                }`}
              >
                {domain.daysToExpiry} days left
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Quick Actions Component ---
const QuickActions: React.FC = () => (
  <div className="overflow-hidden bg-white rounded-lg shadow">
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Quick Actions
      </h3>
    </div>
    <div className="px-4 py-5 space-y-3 sm:p-6">
      <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
        <span>Register New Domain</span>
        <FiPlus className="ml-2" />
      </button>
      <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
        <span>Transfer Domain</span>
        <FiArrowRight className="ml-2" />
      </button>
      <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
        <span>Bulk Update DNS</span>
        <FiSettings className="ml-2" />
      </button>
    </div>
  </div>
);

// --- Main Page Component ---
const DomainPage: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain>(domains[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "dns" | "security">("overview");
  const [isRenewing, setIsRenewing] = useState(false);
  const [search, setSearch] = useState("");

  // Handler for renewing domain
  const handleRenewDomain = useCallback(() => {
    setIsRenewing(true);
    setTimeout(() => {
      setIsRenewing(false);
      setSelectedDomain(prev => {
        const newExpiryDate = new Date(prev.expiryDate);
        newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
        return {
          ...prev,
          expiryDate: newExpiryDate.toISOString().split("T")[0],
          daysToExpiry: prev.daysToExpiry + 365,
        };
      });
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="flex items-center text-3xl font-bold text-gray-900">
            <FiGlobe className="mr-2 text-indigo-600" />
            Domain Manager
          </h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search domains..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              aria-label="Search domains"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <StatsCards domains={domains} />

        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/4">
            <DomainList
              domains={domains}
              selectedDomain={selectedDomain}
              setSelectedDomain={setSelectedDomain}
              setActiveTab={setActiveTab}
              search={search}
            />
            <QuickActions />
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Domain Header */}
            <div className="mb-6 overflow-hidden bg-white rounded-lg shadow">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {selectedDomain.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Registered with {selectedDomain.registrar} &bull; Last updated:{" "}
                      {selectedDomain.lastUpdated}
                    </p>
                  </div>
                  <div className="flex mt-3 space-x-3 sm:mt-0">
                    <button
                      onClick={handleRenewDomain}
                      disabled={isRenewing}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        isRenewing
                          ? "bg-indigo-400"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } transition-colors`}
                      aria-label="Renew domain"
                    >
                      {isRenewing ? (
                        <>
                          <FiRefreshCw className="mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Renew Domain"
                      )}
                    </button>
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                      Manage DNS
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex -mb-px space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "overview"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-label="Overview"
                >
                  <FiHome className="inline mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("dns")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "dns"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-label="DNS Settings"
                >
                  <FiSettings className="inline mr-2" />
                  DNS Settings
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "security"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-label="Security"
                >
                  <FiShield className="inline mr-2" />
                  Security
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="overflow-hidden bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Domain Information */}
                    <div>
                      <h4 className="mb-4 font-medium text-gray-900 text-md">
                        Domain Information
                      </h4>
                      <dl className="space-y-4">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Registrar
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {selectedDomain.registrar}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Registered On
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {selectedDomain.registrationDate}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Expires On
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {selectedDomain.expiryDate}
                            <span
                              className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                                selectedDomain.daysToExpiry < 90
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {selectedDomain.daysToExpiry} days left
                            </span>
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Status
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                selectedDomain.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {selectedDomain.status}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Performance */}
                    <div>
                      <h4 className="mb-4 font-medium text-gray-900 text-md">
                        Performance
                      </h4>
                      <dl className="space-y-4">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Monthly Traffic
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {selectedDomain.traffic}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            SSL Status
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                selectedDomain.sslStatus === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {selectedDomain.sslStatus}
                            </span>
                            {selectedDomain.sslStatus !== "Active" && (
                              <button className="ml-2 text-xs text-indigo-600 hover:text-indigo-800">
                                Fix Now
                              </button>
                            )}
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Name Servers
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="space-y-1">
                              {selectedDomain.nameServers.map((ns, index) => (
                                <li
                                  key={index}
                                  className="px-2 py-1 font-mono text-sm rounded bg-gray-50"
                                >
                                  {ns}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            DNS Records
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {selectedDomain.dnsRecords} records configured
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DNS Tab */}
            {activeTab === "dns" && (
              <div className="overflow-hidden bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h4 className="mb-4 font-medium text-gray-900 text-md">
                    DNS Management
                  </h4>
                  <div className="p-4 mb-6 rounded-md bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Name Servers</h5>
                        <p className="text-sm text-gray-500">
                          Current name servers for this domain
                        </p>
                      </div>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">
                        Change Name Servers
                      </button>
                    </div>
                    <div className="mt-4 space-y-2">
                      {selectedDomain.nameServers.map((ns, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded"
                        >
                          <span className="font-mono text-sm">{ns}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900">DNS Records</h5>
                        <p className="text-sm text-gray-500">
                          Manage your domain&apos;s DNS records
                        </p>
                      </div>
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                        Add Record
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                              Value
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                              TTL
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              A
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              @
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              192.0.2.1
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              3600
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <button className="mr-3 text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              CNAME
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              www
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              {selectedDomain.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              3600
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <button className="mr-3 text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                              MX
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              @
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              mail.{selectedDomain.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              3600
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <button className="mr-3 text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="overflow-hidden bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h4 className="mb-6 font-medium text-gray-900 text-md">
                    Security Settings
                  </h4>
                  <div className="space-y-6">
                    {/* SSL Certificate */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`flex-shrink-0 p-2 rounded-md ${
                              selectedDomain.sslStatus === "Active"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            <FiShield className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">
                              SSL Certificate
                            </h5>
                            <p className="text-sm text-gray-500">
                              {selectedDomain.sslStatus === "Active"
                                ? "Your SSL certificate is active and working properly"
                                : "Your SSL certificate needs attention"}
                            </p>
                          </div>
                        </div>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                          {selectedDomain.sslStatus === "Active"
                            ? "Manage"
                            : "Fix Now"}
                        </button>
                      </div>
                    </div>
                    {/* Domain Lock */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 p-2 text-indigo-600 bg-indigo-100 rounded-md">
                            <FiShield className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">
                              Domain Lock
                            </h5>
                            <p className="text-sm text-gray-500">
                              Prevent unauthorized transfers of your domain
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-3 text-sm text-gray-500">
                            Enabled
                          </span>
                          <button
                            type="button"
                            className="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-indigo-600 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            role="switch"
                            aria-checked="true"
                            aria-label="Toggle Domain Lock"
                            title="Toggle Domain Lock"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-5 bg-white rounded-full shadow pointer-events-none ring-0"
                            ></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* WHOIS Privacy */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 p-2 text-purple-600 bg-purple-100 rounded-md">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">
                              WHOIS Privacy
                            </h5>
                            <p className="text-sm text-gray-500">
                              Protect your personal information in the WHOIS
                              database
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-3 text-sm text-gray-500">
                            Enabled
                          </span>
                          <button
                            type="button"
                            className="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-indigo-600 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            role="switch"
                            aria-checked="true"
                            title="Toggle WHOIS Privacy"
                            aria-label="Toggle WHOIS Privacy"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-5 bg-white rounded-full shadow pointer-events-none ring-0"
                            ></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Two-Factor Authentication */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 p-2 text-yellow-600 bg-yellow-100 rounded-md">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">
                              Two-Factor Authentication
                            </h5>
                            <p className="text-sm text-gray-500">
                              Add an extra layer of security to your domain
                              account
                            </p>
                          </div>
                        </div>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default DomainPage;
