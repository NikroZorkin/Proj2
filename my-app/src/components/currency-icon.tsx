"use client";

interface CurrencyIconProps {
  currency: string;
  size?: number;
}

export function CurrencyIcon({ currency, size = 20 }: CurrencyIconProps) {
  const currencyLower = currency.toLowerCase();
  
  // Используем символ валюты
  const symbol = currencyLower === "eur" ? "€" : "$";
  
  return (
    <div
      className="relative shrink-0 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <span
        className="text-white font-bold leading-none"
        style={{ fontSize: `${size * 0.6}px` }}
      >
        {symbol}
      </span>
    </div>
  );
}

