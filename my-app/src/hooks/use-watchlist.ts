"use client";

import { useState, useCallback } from "react";
import {
  getWatchlist,
  addToWatchlist as addToWatchlistStorage,
  removeFromWatchlist as removeFromWatchlistStorage,
  isInWatchlist as isInWatchlistStorage,
} from "@/lib/watchlist";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return getWatchlist();
    }
    return [];
  });

  const addToWatchlist = useCallback((id: string) => {
    addToWatchlistStorage(id);
    setWatchlist(getWatchlist());
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    removeFromWatchlistStorage(id);
    setWatchlist(getWatchlist());
  }, []);

  const isInWatchlist = useCallback((id: string) => {
    return isInWatchlistStorage(id);
  }, []);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
}

