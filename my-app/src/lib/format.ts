export function formatPrice(price: number, currency: string = "usd"): string {
  const symbol = currency === "eur" ? "€" : "$";
  
  if (price < 0.01) {
    return `${symbol}${price.toFixed(6)}`;
  }
  if (price < 1) {
    return `${symbol}${price.toFixed(4)}`;
  }
  return `${symbol}${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function formatMarketCap(cap: number, currency: string = "usd"): string {
  const symbol = currency === "eur" ? "€" : "$";
  
  if (cap >= 1e12) {
    return `${symbol}${(cap / 1e12).toFixed(2)}T`;
  }
  if (cap >= 1e9) {
    return `${symbol}${(cap / 1e9).toFixed(2)}B`;
  }
  if (cap >= 1e6) {
    return `${symbol}${(cap / 1e6).toFixed(2)}M`;
  }
  return `${symbol}${cap.toLocaleString("en-US")}`;
}

