"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
        <h2 className="mb-4 text-2xl font-bold text-red-900 dark:text-red-100">
          Something went wrong!
        </h2>
        <p className="mb-6 text-red-700 dark:text-red-300">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          aria-label="Try again"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

