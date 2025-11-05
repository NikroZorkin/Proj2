import { Suspense } from "react";
import { CoinSearch } from "@/components/coin-search";
import { CoinCard } from "@/components/coin-card";
import type { Coin } from "@/types/coin";

async function getCoins(vsCurrency: string): Promise<Coin[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/coins?vs_currency=${vsCurrency}`, {
      next: { revalidate: 60, tags: ["coins"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch coins");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ vs?: string }>;
}) {
  const params = await searchParams;
  const vsCurrency = params.vs || "usd";
  const coins = await getCoins(vsCurrency);
  const displayedCoins = coins.slice(0, 50);

  return (
    <main className="container mx-auto px-4 py-8 page-transition">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-white drop-shadow-lg">
          Top Cryptocurrencies
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CoinCard key={index} />
            ))}
          </div>
        }
      >
        <CoinSearch coins={displayedCoins} />
      </Suspense>
    </main>
  );
}
