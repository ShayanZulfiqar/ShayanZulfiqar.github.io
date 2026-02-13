"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  BarChart3,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Globe,
  Home,
  Eye,
  Target,
  Briefcase,
  Mail,
  Image,
  Newspaper,
  Video,
  Star,
  Award,
} from "lucide-react";

interface SuperAdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const pathname = usePathname();
  const [contentManagementOpen, setContentManagementOpen] = useState(true);
  const [shopContentOpen, setShopContentOpen] = useState(true);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/superadmin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users Management",
      path: "/superadmin/users",
      icon: Users,
    },
    {
      name: "Products",
      path: "/superadmin/shop/product",
      icon: Package,
    },
    {
      name: "Product Category",
      path: "/superadmin/shop/product-category",
      icon: Package,
    },
    {
      name: "Product Sub Category",
      path: "/superadmin/shop/product-subcategory",
      icon: Award,
    },
    {
      name: "Orders",
      path: "/superadmin/orders",
      icon: ShoppingCart,
    },
  ];

  // Content Management Submenu Items
  const contentManagementItems = [
    {
      name: "General Settings",
      path: "/superadmin/content/general-settings",
      icon: Home,
    },
    {
      name: "Hero Section",
      path: "/superadmin/content/hero-section",
      icon: Home,
    },
    {
      name: "About Contact",
      path: "/superadmin/content/about-contact",
      icon: FileText,
    },
    {
      name: "Client Brands",
      path: "/superadmin/content/client-brands",
      icon: Eye,
    },
    {
      name: "Contact Hero",
      path: "/superadmin/content/contact-hero",
      icon: Eye,
    },
    {
      name: "Core Values",
      path: "/superadmin/content/core-values",
      icon: Target,
    },
    {
      name: "Contact Us",
      path: "/superadmin/content/contact-us",
      icon: Briefcase,
    },
    {
      name: "Client Stats",
      path: "/superadmin/content/client-stats",
      icon: Briefcase,
    },
    {
      name: "Future Goals",
      path: "/superadmin/content/future-goals",
      icon: Star,
    },
    {
      name: "Got Questions",
      path: "/superadmin/content/got-questions",
      icon: Award,
    },
    {
      name: "Innovation Roadmap",
      path: "/superadmin/content/innovation-roadmap",
      icon: Image,
    },
    {
      name: "Reviews",
      path: "/superadmin/content/reviews",
      icon: Newspaper,
    },
    {
      name: "Services",
      path: "/superadmin/content/servicespage",
      icon: Newspaper,
    },
    {
      name: "Projects",
      path: "/superadmin/content/projects",
      icon: Video,
    },
    {
      name: "Our journey",
      path: "/superadmin/content/our-journey",
      icon: Video,
    },
    {
      name: "Sustainability Commitment",
      path: "/superadmin/content/sustainability-commitment",
      icon: Mail,
    },
    {
      name: "Testimonials",
      path: "/superadmin/content/testimonials",
      icon: Mail,
    },
    {
      name: "Video Testimonials",
      path: "/superadmin/content/video-testimonials",
      icon: Mail,
    },
    {
      name: "Why Choose Us",
      path: "/superadmin/content/why-choose-us",
      icon: Mail,
    },
    {
      name: "Services Reviews",
      path: "/superadmin/content/services-reviews",
      icon: Mail,
    },
    {
      name: "Newsletter",
      path: "/superadmin/content/newsletter",
      icon: Mail,
    },
    {
      name: "Developer Apply",
      path: "/superadmin/content/developer",
      icon: Mail,
    },
    {
      name: "Join the team",
      path: "/superadmin/content/join-team",
      icon: Mail,
    },
    {
      name: "Become a partner",
      path: "/superadmin/content/partners",
      icon: Mail,
    },
    {
      name: "Become Investor",
      path: "/superadmin/content/investor",
      icon: Mail,
    },


  ];

  const shopContentItems = [
    {
      name: "Shop Hero",
      path: "/superadmin/shop/hero",
      icon: Home,
    },
    {
      name: "Shop Cards",
      path: "/superadmin/shop/cards",
      icon: Image,
    },
    {
      name: "Best Sellers",
      path: "/superadmin/shop/best-sellers",
      icon: Award,
    },
    {
      name: "New Arrivals",
      path: "/superadmin/shop/new-arrivals",
      icon: Star,
    },
    {
      name: "Special Deals",
      path: "/superadmin/shop/special-deals",
      icon: Target,
    },
    {
      name: "Trending Sections",
      path: "/superadmin/shop/trending",
      icon: Newspaper,
    },
    {
      name: "Shop FAQ",
      path: "/superadmin/shop/faq",
      icon: MessageSquare,
    },
  ];

  const bottomMenuItems = [
    {
      name: "Reports",
      path: "/superadmin/reports",
      icon: FileText,
    },
    {
      name: "Analytics",
      path: "/superadmin/analytics",
      icon: BarChart3,
    },
    {
      name: "Messages",
      path: "/superadmin/messages",
      icon: MessageSquare,
    },
    {
      name: "Notifications",
      path: "/superadmin/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      path: "/superadmin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`
        bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100
        h-screen flex flex-col shadow-sm
        transition-all duration-300 ease-in-out
        relative border-r border-gray-200
        ${isCollapsed ? "w-20" : "w-72"}
      `}
    >
      {/* Logo Section */}
      <div
        className={`
        h-20 flex items-center border-b border-gray-200
        bg-white/50
        ${isCollapsed ? "justify-center px-2" : "px-6"}
      `}
      >
        {isCollapsed ? (
          <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 shadow-sm rounded-lg w-10 h-10">
            <span className="font-bold text-white text-lg">S</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 shadow-sm rounded-lg w-10 h-10">
              <span className="font-bold text-white text-lg">S</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg">SuperAdmin</h1>
              <p className="text-gray-500 text-xs">Control Panel</p>
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="group top-24 -right-3 z-50 absolute flex justify-center items-center bg-white shadow-sm hover:shadow-md border border-gray-300 hover:border-indigo-500 rounded-full w-6 h-6 hover:scale-110 transition-all duration-300"
      >
        {isCollapsed ? (
          <ChevronRight className="text-gray-600 group-hover:text-indigo-600" size={14} />
        ) : (
          <ChevronLeft className="text-gray-600 group-hover:text-indigo-600" size={14} />
        )}
      </button>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 overflow-x-hidden overflow-y-auto">
        <ul className="space-y-1 px-3">
          {/* Top Menu Items */}
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`
                    relative flex items-center py-3 rounded-lg
                    transition-all duration-200 group
                    ${isCollapsed ? "justify-center px-2" : "px-4 gap-3"}
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
                    }
                  `}
                  title={isCollapsed ? item.name : ""}
                >
                  <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-600"}`}>
                    <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                  </div>

                  <span
                    className={`
                      whitespace-nowrap font-medium text-sm
                      transition-all duration-300
                      ${isCollapsed
                        ? "w-0 opacity-0 overflow-hidden"
                        : "w-auto opacity-100"
                      }
                    `}
                  >
                    {item.name}
                  </span>

                  {isActive && !isCollapsed && (
                    <div className="right-3 absolute bg-white rounded-full w-1.5 h-1.5 animate-pulse"></div>
                  )}

                  {/* Hover Tooltip for Collapsed State */}
                  {isCollapsed && (
                    <div
                      className="left-full z-50 absolute bg-slate-800 opacity-0 group-hover:opacity-100 shadow-lg ml-4 px-3 py-2 rounded-md font-medium text-white text-sm whitespace-nowrap transition-opacity duration-200 pointer-events-none"
                    >
                      {item.name}
                      <div className="top-1/2 right-full absolute border-4 border-transparent border-r-slate-800 -translate-y-1/2"></div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}

          {/* Content Management Dropdown */}
          <li className="pt-2">
            {!isCollapsed ? (
              <>
                <button
                  onClick={() => setContentManagementOpen(!contentManagementOpen)}
                  className="relative flex items-center gap-3 hover:bg-white/70 px-4 py-3 rounded-lg w-full text-gray-600 hover:text-gray-900 transition-all duration-200"
                >
                  <div className="flex-shrink-0 text-gray-600">
                    <Globe size={20} strokeWidth={1.5} />
                  </div>
                  <span className="flex-1 font-medium text-sm text-left whitespace-nowrap">
                    Content Management
                  </span>
                  {contentManagementOpen ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </button>

                {/* Submenu Items */}
                {contentManagementOpen && (
                  <ul className="space-y-0.5 mt-1 ml-3 border-gray-200 border-l-2">
                    {contentManagementItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            className={`
                              relative flex items-center py-2.5 rounded-r-lg pl-5 pr-3 gap-3
                              transition-all duration-200 group
                              ${isActive
                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-sm -ml-0.5 border-l-2 border-indigo-600"
                                : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
                              }
                            `}
                          >
                            <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-600"}`}>
                              <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                            </div>
                            <span className="text-sm whitespace-nowrap">
                              {item.name}
                            </span>
                            {isActive && (
                              <div className="right-3 absolute bg-white rounded-full w-1 h-1 animate-pulse"></div>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            ) : (
              // Collapsed state - show Content Management icon with tooltip
              <div className="group relative">
                <button
                  className="flex justify-center items-center hover:bg-white/70 px-2 py-3 rounded-lg w-full text-gray-600 hover:text-gray-900 transition-all duration-200"
                  title="Content Management"
                >
                  <Globe size={20} strokeWidth={1.5} />
                </button>
                <div
                  className="left-full z-50 absolute bg-slate-800 opacity-0 group-hover:opacity-100 shadow-lg ml-4 px-3 py-2 rounded-md font-medium text-white text-sm whitespace-nowrap transition-opacity duration-200 pointer-events-none"
                >
                  Content Management
                  <div className="top-1/2 right-full absolute border-4 border-transparent border-r-slate-800 -translate-y-1/2"></div>
                </div>
              </div>
            )}
          </li>

          {/* Shop Content Management Dropdown */}
          <li className="pt-2">
            {!isCollapsed ? (
              <>
                <button
                  onClick={() => setShopContentOpen(!shopContentOpen)}
                  className="relative flex items-center gap-3 hover:bg-white/70 px-4 py-3 rounded-lg w-full text-gray-600 hover:text-gray-900 transition-all duration-200"
                >
                  <div className="flex-shrink-0 text-gray-600">
                    <ShoppingCart size={20} strokeWidth={1.5} />
                  </div>
                  <span className="flex-1 font-medium text-sm text-left whitespace-nowrap">
                    Shop Content
                  </span>
                  {shopContentOpen ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </button>

                {/* Submenu Items */}
                {shopContentOpen && (
                  <ul className="space-y-0.5 mt-1 ml-3 border-gray-200 border-l-2">
                    {shopContentItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            className={`
                              relative flex items-center py-2.5 rounded-r-lg pl-5 pr-3 gap-3
                              transition-all duration-200 group
                              ${isActive
                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-sm -ml-0.5 border-l-2 border-indigo-600"
                                : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
                              }
                            `}
                          >
                            <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-600"}`}>
                              <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                            </div>
                            <span className="text-sm whitespace-nowrap">
                              {item.name}
                            </span>
                            {isActive && (
                              <div className="right-3 absolute bg-white rounded-full w-1 h-1 animate-pulse"></div>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            ) : (
              // Collapsed state - show Shop Content icon with tooltip
              <div className="group relative">
                <button
                  className="flex justify-center items-center hover:bg-white/70 px-2 py-3 rounded-lg w-full text-gray-600 hover:text-gray-900 transition-all duration-200"
                  title="Shop Content"
                >
                  <ShoppingCart size={20} strokeWidth={1.5} />
                </button>
                <div
                  className="left-full z-50 absolute bg-slate-800 opacity-0 group-hover:opacity-100 shadow-lg ml-4 px-3 py-2 rounded-md font-medium text-white text-sm whitespace-nowrap transition-opacity duration-200 pointer-events-none"
                >
                  Shop Content
                  <div className="top-1/2 right-full absolute border-4 border-transparent border-r-slate-800 -translate-y-1/2"></div>
                </div>
              </div>
            )}
          </li>

          {/* Divider */}
          <li className="py-2">
            <div className="border-gray-200 border-t"></div>
          </li>

          {/* Bottom Menu Items */}
          {bottomMenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`
                    relative flex items-center py-3 rounded-lg
                    transition-all duration-200 group
                    ${isCollapsed ? "justify-center px-2" : "px-4 gap-3"}
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
                    }
                  `}
                  title={isCollapsed ? item.name : ""}
                >
                  <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-600"}`}>
                    <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                  </div>

                  <span
                    className={`
                      whitespace-nowrap font-medium text-sm
                      transition-all duration-300
                      ${isCollapsed
                        ? "w-0 opacity-0 overflow-hidden"
                        : "w-auto opacity-100"
                      }
                    `}
                  >
                    {item.name}
                  </span>

                  {isActive && !isCollapsed && (
                    <div className="right-3 absolute bg-white rounded-full w-1.5 h-1.5 animate-pulse"></div>
                  )}

                  {/* Hover Tooltip for Collapsed State */}
                  {isCollapsed && (
                    <div
                      className="left-full z-50 absolute bg-slate-800 opacity-0 group-hover:opacity-100 shadow-lg ml-4 px-3 py-2 rounded-md font-medium text-white text-sm whitespace-nowrap transition-opacity duration-200 pointer-events-none"
                    >
                      {item.name}
                      <div className="top-1/2 right-full absolute border-4 border-transparent border-r-slate-800 -translate-y-1/2"></div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section */}
      <div
        className={`
        border-t border-gray-200 p-4
        bg-white/50
        ${isCollapsed ? "px-2" : ""}
      `}
      >
        <div
          className={`
          flex items-center gap-3
          ${isCollapsed ? "justify-center" : "px-3 py-2"}
          bg-white rounded-lg shadow-sm border border-gray-200
        `}
        >
          <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full w-8 h-8">
            <span className="font-semibold text-white text-sm">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-slate-800 text-sm truncate">Admin</p>
              <p className="text-gray-500 text-xs truncate">admin@hub.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
