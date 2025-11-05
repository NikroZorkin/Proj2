"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Coin } from "@/types/coin";
import { CoinImage } from "./coin-image";
import { Sparkline } from "./sparkline";
import { Skeleton } from "./ui/skeleton";
import { formatPrice, formatMarketCap } from "@/lib/format";

interface CoinCardProps {
  coin?: Coin;
  variant?: "normal" | "compact";
  currency?: string;
}

export function CoinCard({ coin, variant = "normal", currency = "usd" }: CoinCardProps) {
  if (!coin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-lg p-4"
        role="article"
        aria-label="Loading coin data"
      >
        <div className="flex items-center gap-3">
          <Skeleton width={32} height={32} className="rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton width={100} height={16} />
            <Skeleton width={80} height={14} />
          </div>
        </div>
        {variant === "normal" && (
          <div className="mt-4 space-y-2">
            <Skeleton width={120} height={20} />
            <Skeleton width={100} height={16} />
            <Skeleton width={200} height={40} />
          </div>
        )}
      </motion.div>
    );
  }

  const isPositive = coin.price_change_percentage_24h >= 0;
  const changeColor = isPositive ? "text-[color:var(--up)]" : "text-[color:var(--down)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="glass glass-hover rounded-lg overflow-hidden"
    >
      <Link
        href={`/coin/${coin.id}`}
        className="block p-4"
        role="article"
        aria-label={`${coin.name} (${coin.symbol}) - ${formatPrice(coin.current_price, currency)}`}
      >
      <div className="flex items-center gap-3">
        <CoinImage src={coin.image} alt={coin.name} size={variant === "compact" ? 24 : 32} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-gray-900 dark:text-gray-100">
              {coin.name}
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {coin.symbol.toUpperCase()}
          </p>
        </div>
      </div>

      {variant === "normal" && (
        <div className="mt-4 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatPrice(coin.current_price, currency)}
            </span>
            <span className={`text-sm font-medium ${changeColor}`}>
              {isPositive ? "+" : ""}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatMarketCap(coin.market_cap, currency)}
          </div>
          {coin.sparkline_in_7d?.price && (
            <div className="mt-2">
              <Sparkline prices={coin.sparkline_in_7d.price} />
            </div>
          )}
        </div>
      )}
      </Link>
    </motion.div>
  );
}

