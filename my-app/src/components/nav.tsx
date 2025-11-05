"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { CurrencyDropdown } from "./currency-dropdown";

function CurrencyDropdownFallback() {
  return (
    <div className="glass rounded-(--radius) flex items-center gap-2 px-3 py-2 text-base text-white font-medium opacity-50 cursor-not-allowed min-w-[90px]">
      <div className="relative shrink-0 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm w-5 h-5">
        <span className="text-white font-bold leading-none text-xs">$</span>
      </div>
      <span className="whitespace-nowrap">USD</span>
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo size="sm" animated={false} />
        </Link>
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className="text-sm text-white opacity-90 hover:opacity-100 transition-opacity px-2 py-1 rounded-md hover:bg-white/10"
            >
              Главная
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/watchlist"
              aria-current={isActive("/watchlist") ? "page" : undefined}
              className="text-sm text-white opacity-90 hover:opacity-100 transition-opacity px-2 py-1 rounded-md hover:bg-white/10"
            >
              Избранное
            </Link>
          </motion.div>
          <Suspense fallback={<CurrencyDropdownFallback />}>
            <CurrencyDropdown />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}