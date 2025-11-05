"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { CoinCardWithWatchlist } from "./coin-card-with-watchlist";
import type { Coin } from "@/types/coin";

interface CoinSearchProps {
  coins: Coin[];
  onFilterChange?: (filteredCoins: Coin[]) => void;
}

export function CoinSearch({ coins, onFilterChange }: CoinSearchProps) {
  const searchParams = useSearchParams();
  const currency = searchParams.get("vs") || "usd";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) {
      return coins;
    }

    const query = searchQuery.toLowerCase().trim();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
  }, [coins, searchQuery]);

  useMemo(() => {
    onFilterChange?.(filteredCoins);
  }, [filteredCoins, onFilterChange]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mb-6"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or symbol..."
          className="glass h-10 w-full max-w-md rounded-lg px-4 pr-10 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          aria-label="Search cryptocurrencies"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              ×
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredCoins.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full glass rounded-lg p-8 text-center text-white/80"
            >
              No coins found
            </motion.div>
          ) : (
            filteredCoins.map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <CoinCardWithWatchlist coin={coin} currency={currency} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

