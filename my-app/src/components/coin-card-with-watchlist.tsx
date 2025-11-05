"use client";

import { CoinCard } from "./coin-card";
import { useWatchlist } from "@/hooks/use-watchlist";
import type { Coin } from "@/types/coin";

interface CoinCardWithWatchlistProps {
  coin?: Coin;
  variant?: "normal" | "compact";
  currency?: string;
}

export function CoinCardWithWatchlist({
  coin,
  variant,
  currency = "usd",
}: CoinCardWithWatchlistProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlist();

  if (!coin) {
    return <CoinCard coin={coin} variant={variant} currency={currency} />;
  }

  const isWatched = isInWatchlist(coin.id);

  return (
    <div className="relative">
      <CoinCard coin={coin} variant={variant} currency={currency} />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isWatched) {
            removeFromWatchlist(coin.id);
          } else {
            addToWatchlist(coin.id);
          }
        }}
        className="absolute right-2 top-2 z-10 rounded-full p-1.5 text-yellow-400 transition-colors hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
        aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
        aria-pressed={isWatched}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isWatched ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>
    </div>
  );
}

