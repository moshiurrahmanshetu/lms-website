"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface DashboardTopbarProps {
  onMenuToggle: () => void;
}

const DashboardTopbar = ({ onMenuToggle }: DashboardTopbarProps) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left: Menu Toggle & Breadcrumb */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-foreground font-medium">Overview</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full"></span>
          </Button>

          {/* Help */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">Student</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
