const WATCHLIST_KEY = "crypto-pulse-watchlist";

export function getWatchlist(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export function addToWatchlist(id: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const current = getWatchlist();
    if (!current.includes(id)) {
      const updated = [...current, id];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore errors
  }
}

export function removeFromWatchlist(id: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const current = getWatchlist();
    const updated = current.filter((coinId) => coinId !== id);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  } catch {
    // Ignore errors
  }
}

export function isInWatchlist(id: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return getWatchlist().includes(id);
}

