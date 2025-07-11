
"use client";

import { useState, useEffect } from "react";
import { Check, Moon, RotateCcw, Search, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [themeColor, setThemeColor] = useState<string>("blue");
  const [darkMode, setDarkMode] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const suggestions = [
    "Dashboard",
    "Users",
    "Settings",
    "Admin Mailbox",
    "Domain Management",
    "Reports",
    "Logs",
  ];

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  interface ColorOption {
    name: string;
    value: string;
    bg: string;
    ring: string;
  }

  const colorOptions: ColorOption[] = [
    { name: "Blue", value: "blue", bg: "bg-blue-600", ring: "ring-blue-400" },
    { name: "Green", value: "green", bg: "bg-green-600", ring: "ring-green-400" },
    { name: "Purple", value: "purple", bg: "bg-purple-600", ring: "ring-purple-400" },
    { name: "Red", value: "red", bg: "bg-red-600", ring: "ring-red-400" },
    { name: "Orange", value: "orange", bg: "bg-orange-500", ring: "ring-orange-400" },
    { name: "Teal", value: "teal", bg: "bg-teal-600", ring: "ring-teal-400" },
    { name: "Dark", value: "dark", bg: "bg-gray-800", ring: "ring-gray-500" },
  ];

  useEffect(() => {
    setHasMounted(true);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) {
      setThemeColor(savedColor);
      document.documentElement.dataset.theme = savedColor;
    } else {
      document.documentElement.dataset.theme = "blue";
    }

    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsSystemDark(systemDark);

    const initialDark = savedTheme === "system" ? systemDark : savedTheme === "dark";
    setDarkMode(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);

    return () => clearInterval(timer);
  }, []);

  const handleThemeChange = (color: string) => {
    if (color === "dark") {
      const newDark = !darkMode;
      setDarkMode(newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newDark);
    } else {
      setThemeColor(color);
      localStorage.setItem("themeColor", color);
      document.documentElement.dataset.theme = color;
    }
  };

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Add any logout logic here (e.g., clearing auth tokens)
      router.push("/");
    }
  };

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSuggestionsVisible(e.target.value.length > 0);
            }}
            onBlur={() => setTimeout(() => setSuggestionsVisible(false), 150)}
            placeholder="Search..."
            className="block w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {suggestionsVisible && filteredSuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-600">
              {filteredSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-100"
                  onMouseDown={() => {
                    setSearchTerm(s);
                    setSuggestionsVisible(false);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Refresh → Colors → Logout → Time */}
        <div className="flex items-center gap-6 ml-6">
          {/* Refresh */}
          <button
            onClick={() => window.location.reload()}
            title="Refresh"
            className="p-2 text-gray-600 rounded-full hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Color Swatches */}
          <div className="flex items-center gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => handleThemeChange(color.value)}
                className={`relative w-7 h-7 rounded-full ${color.bg} border-2 border-white shadow ${
                  (themeColor === color.value && color.value !== "dark") ||
                  (color.value === "dark" && darkMode)
                    ? `${color.ring} ring-2 ring-offset-2`
                    : ""
                } hover:scale-110 transition-transform`}
                title={color.name === "Dark" ? "Toggle Dark Mode" : `Switch to ${color.name}`}
              >
                {((themeColor === color.value && color.value !== "dark") ||
                  (color.value === "dark" && darkMode)) && (
                  <Check className="absolute inset-0 w-4 h-4 m-auto text-white" strokeWidth={3} />
                )}
                {color.value === "dark" && !darkMode && (
                  <Moon className="absolute inset-0 w-4 h-4 m-auto text-white opacity-80" strokeWidth={2} />
                )}
              </button>
            ))}
          </div>

<button
  onClick={handleLogoutClick}
  title="Logout"
  className="flex items-center gap-2 p-2 text-gray-600 transition-transform duration-200 rounded-full hover:bg-red-500 hover:text-white dark:text-white-300 dark:hover:bg-gray-700"
>
   <span className="font-medium transition-transform duration-200 text-md group-hover:scale-120">
    Logout
  </span>
  <LogOut className="h-6 transition-transform duration-200 w-7 group-hover:scale-110" />
 
</button>


          {/* Time */}
          {hasMounted && (
            <div className="hidden md:flex flex-col items-end text-sm text-black dark:text-gray-200 min-w-[140px]">
              <span>{formattedDate}</span>
              <span>{formattedTime}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

