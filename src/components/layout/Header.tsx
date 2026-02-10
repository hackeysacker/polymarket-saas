"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bot } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-shadow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Polymarket Bot Academy
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className="px-3 py-2 text-sm text-surface-300 hover:text-white rounded-lg hover:bg-surface-800 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 text-sm text-surface-300 hover:text-white rounded-lg hover:bg-surface-800 transition-colors"
            >
              Pricing
            </Link>
            <div className="w-px h-6 bg-surface-700 mx-2" />
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-surface-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-surface-700">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm text-surface-300 hover:text-white rounded-lg hover:bg-surface-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-sm text-surface-300 hover:text-white rounded-lg hover:bg-surface-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="border-t border-surface-700 my-2" />
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
