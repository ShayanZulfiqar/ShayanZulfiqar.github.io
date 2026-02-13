"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  Menu,
  Settings,
  User,
  LogOut,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

interface SuperAdminHeaderProps {
  toggleSidebar: () => void;
}

const SuperAdminHeader: React.FC<SuperAdminHeaderProps> = ({
  toggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notifications = [
    { id: 1, message: "New order received", time: "2 min ago", unread: true },
    { id: 2, message: "User registered", time: "5 min ago", unread: true },
    { id: 3, message: "Payment completed", time: "10 min ago", unread: false },
    { id: 4, message: "New review posted", time: "1 hour ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all duration-200"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search anything..."
              className="
                w-64 lg:w-96 pl-10 pr-4 py-2.5
                bg-gray-50 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
                text-gray-700 placeholder-gray-400
              "
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Icon for Mobile */}
          <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
            <Search size={20} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Messages */}
          <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 relative">
            <Mail size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-all duration-200 hover:scale-105 relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3">
                    <h3 className="text-white font-semibold text-sm">
                      Notifications
                    </h3>
                    <p className="text-blue-100 text-xs">
                      You have {unreadCount} unread messages
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`
                          px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
                          ${notification.unread ? "bg-blue-50/50" : ""}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 font-medium">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 bg-gray-50 text-center">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  Super Admin
                </p>
                <p className="text-xs text-gray-500">admin@hub.com</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold">SA</span>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfile(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">SA</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Super Admin</p>
                        <p className="text-blue-100 text-xs">
                          admin@hub.com
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700">
                      <User size={18} />
                      <span className="text-sm font-medium">My Profile</span>
                    </button>
                    <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700">
                      <Settings size={18} />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600">
                      <LogOut size={18} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="
              w-full pl-10 pr-4 py-2.5
              bg-gray-50 border border-gray-200 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
              text-gray-700 placeholder-gray-400
            "
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
    </header>
  );
};

export default SuperAdminHeader;
