import Link from "next/link";
import { Sparkline } from "@/components/sparkline";
import { CoinCardWithWatchlist } from "@/components/coin-card-with-watchlist";
import type { CoinDetail } from "@/types/coin";
import { formatPrice, formatMarketCap } from "@/lib/format";

async function getCoin(id: string, vsCurrency: string): Promise<CoinDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/coins/${id}?vs_currency=${vsCurrency}`, {
      next: { revalidate: 60, tags: ["coin"] },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching coin:", error);
    return null;
  }
}

export default async function CoinPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ vs?: string }>;
}) {
  const { id } = await params;
  const params_search = await searchParams;
  const vsCurrency = params_search.vs || "usd";
  const coin = await getCoin(id, vsCurrency);

  if (!coin) {
    return (
      <main className="container mx-auto px-4 py-8 page-transition">
        <div className="glass rounded-lg p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">
            Coin not found
          </h1>
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors underline"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const isPositive24h = coin.price_change_percentage_24h >= 0;
  const isPositive7d = coin.price_change_percentage_7d >= 0;

  return (
    <main className="container mx-auto px-4 py-8 page-transition">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-white/80 hover:text-white transition-colors glass rounded-lg px-4 py-2"
      >
        ← Back to home
      </Link>

      <div className="mb-8">
        <CoinCardWithWatchlist coin={coin} variant="compact" currency={vsCurrency} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-lg p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Price Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80">
                Current Price
              </span>
              <span className="font-semibold text-white">
                {formatPrice(coin.current_price, vsCurrency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">
                24h Change
              </span>
              <span
                className={`font-semibold ${
                  isPositive24h ? "text-[color:var(--up)]" : "text-[color:var(--down)]"
                }`}
              >
                {isPositive24h ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">
                7d Change
              </span>
              <span
                className={`font-semibold ${
                  isPositive7d ? "text-[color:var(--up)]" : "text-[color:var(--down)]"
                }`}
              >
                {isPositive7d ? "+" : ""}
                {coin.price_change_percentage_7d.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Market Data
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80">
                Market Cap
              </span>
              <span className="font-semibold text-white">
                {formatMarketCap(coin.market_cap, vsCurrency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">
                Volume (24h)
              </span>
              <span className="font-semibold text-white">
                {formatMarketCap(coin.total_volume, vsCurrency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">High (24h)</span>
              <span className="font-semibold text-white">
                {formatPrice(coin.high_24h, vsCurrency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80">Low (24h)</span>
              <span className="font-semibold text-white">
                {formatPrice(coin.low_24h, vsCurrency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {coin.sparkline_in_7d?.price && coin.sparkline_in_7d.price.length > 0 && (
        <div className="mt-6 glass rounded-lg p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            7-Day Price Chart
          </h2>
          <div className="flex justify-center">
            <Sparkline prices={coin.sparkline_in_7d.price} width={600} height={120} />
          </div>
        </div>
      )}
    </main>
  );
}

