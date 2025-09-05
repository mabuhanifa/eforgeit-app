"use client";

import Link from "next/link";
import { useState } from "react";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              PostgreSQL Guide
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/docs/fundamentals/introduction-to-postgresql">
              Basics
            </Link>
            <Link href="/docs/advanced/indexing">Advanced</Link>
          </nav>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <span className="sr-only">Open main menu</span>
          {/* Icon for menu */}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {showMobileMenu && (
          <MobileNav closeNav={() => setShowMobileMenu(false)} />
        )}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Theme Toggle will go here */}
        </div>
      </div>
    </header>
  );
}
