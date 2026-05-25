"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "My Courses", href: "/dashboard/courses", icon: "📚" },
  { label: "Schedule", href: "/dashboard/schedule", icon: "📅" },
  { label: "Progress", href: "/dashboard/progress", icon: "📈" },
  { label: "Certificates", href: "/dashboard/certificates", icon: "🏆" },
  { label: "Messages", href: "/dashboard/messages", icon: "💬", badge: 3 },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
                <span className="text-brand-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">LMS</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onClose()}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-brand text-brand-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-error text-error-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <Link
              href="/dashboard/settings"
              onClick={() => onClose()}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">John Doe</div>
                <div className="text-xs text-muted-foreground truncate">
                  john@example.com
                </div>
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
