"use client";

import React, { useState } from "react";
import SuperAdminSidebar from "@/elements/SuperAdminSidebar";
import SuperAdminHeader from "@/elements/SuperAdminHeader";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SuperAdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
        lg:hidden fixed inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <SuperAdminSidebar
          isCollapsed={false}
          setIsCollapsed={() => setIsMobileOpen(false)}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SuperAdminHeader toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main
          className={`
          flex-1 overflow-y-auto overflow-x-hidden
          transition-all duration-300
          p-6
        `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
