"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ name: string; href: string }>;
}

const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background">
      <div className="container space-y-1 py-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground rounded-md"
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
        <div className="mt-4 space-y-2 px-4">
          <Button variant="outline" size="sm" className="w-full">
            Sign In
          </Button>
          <Button variant="brand" size="sm" className="w-full">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
