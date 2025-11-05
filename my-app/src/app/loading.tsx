import { CoinCard } from "@/components/coin-card";

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8 page-transition">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-white drop-shadow-lg">
          Top Cryptocurrencies
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CoinCard key={index} />
        ))}
      </div>
    </main>
  );
}

