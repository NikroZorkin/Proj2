import Link from "next/link";

export function Navigation() {
  return (
    <nav
      className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
            aria-label="Crypto Pulse - Home"
          >
            Crypto Pulse
          </Link>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Home
            </Link>
            <Link
              href="/watchlist"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Watchlist
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

