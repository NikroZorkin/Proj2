"use client";

import { useEffect, useState } from "react";
import { CoinCardWithWatchlist } from "@/components/coin-card-with-watchlist";
import { useWatchlist } from "@/hooks/use-watchlist";
import type { Coin } from "@/types/coin";

async function fetchCoinsByIds(ids: string[]): Promise<Coin[]> {
  if (ids.length === 0) {
    return [];
  }

  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const allCoins = await fetch(`${baseUrl}/api/coins`).then((res) =>
      res.json()
    );
    return allCoins.filter((coin: Coin) => ids.includes(coin.id));
  } catch (error) {
    console.error("Error fetching watchlist coins:", error);
    return [];
  }
}

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoins() {
      setLoading(true);
      const fetchedCoins = await fetchCoinsByIds(watchlist);
      setCoins(fetchedCoins);
      setLoading(false);
    }

    loadCoins();
  }, [watchlist]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Watchlist
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CoinCardWithWatchlist key={index} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Watchlist
      </h1>
      {coins.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            Your watchlist is empty. Add coins to your watchlist from the home
            page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coins.map((coin) => (
            <CoinCardWithWatchlist key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </main>
  );
}

