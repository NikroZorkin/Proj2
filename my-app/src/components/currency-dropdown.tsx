"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CurrencyIcon } from "./currency-icon";

const currencies = [
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
];

export function CurrencyDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = (searchParams.get("vs") || "usd").toLowerCase();
  const currentLabel = currencies.find((c) => c.value === current)?.label || "USD";

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("vs", value);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="glass rounded-(--radius) flex items-center gap-2 px-3 py-2 text-base text-white font-medium transition-all hover:bg-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 min-w-[90px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Выбор валюты"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <CurrencyIcon currency={current} size={20} />
        <span className="whitespace-nowrap">{currentLabel}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 ml-auto"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 min-w-[90px] z-50"
            role="listbox"
          >
            <div className="glass rounded-(--radius) overflow-hidden shadow-lg border border-white/10">
              {currencies.map((currency) => {
                const isSelected = currency.value === current;
                return (
                  <motion.button
                    key={currency.value}
                    type="button"
                    onClick={() => handleSelect(currency.value)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-base text-white transition-colors ${
                      isSelected
                        ? "bg-white/20 font-semibold"
                        : "hover:bg-white/10 font-medium"
                    }`}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <CurrencyIcon currency={currency.value} size={20} />
                    <span className="whitespace-nowrap">{currency.label}</span>
                    {isSelected && (
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 ml-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

