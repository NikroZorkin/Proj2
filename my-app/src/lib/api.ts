import type { Coin, CoinDetail } from "@/types/coin";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {};
  if (process.env.COINGECKO_DEMO_KEY) {
    headers["x-cg-demo-api-key"] = process.env.COINGECKO_DEMO_KEY;
  }
  return headers;
}

export async function fetchCoins(): Promise<Coin[]> {
  const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&per_page=50&order=market_cap_desc&sparkline=true`;
  const response = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 60, tags: ["coins"] },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Upstream ${response.status}: ${body.slice(0, 200)}`);
  }

  return response.json();
}

export async function fetchCoinById(id: string): Promise<CoinDetail> {
  const url = `${COINGECKO_BASE_URL}/coins/${id}`;
  const response = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 60, tags: ["coin"] },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Upstream ${response.status}: ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  
  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    image: data.image?.small || data.image?.large || "",
    current_price: data.market_data?.current_price?.usd || 0,
    price_change_percentage_24h:
      data.market_data?.price_change_percentage_24h || 0,
    market_cap: data.market_data?.market_cap?.usd || 0,
    sparkline_in_7d: {
      price: data.market_data?.sparkline_7d?.price || [],
    },
    total_volume: data.market_data?.total_volume?.usd || 0,
    high_24h: data.market_data?.high_24h?.usd || 0,
    low_24h: data.market_data?.low_24h?.usd || 0,
    price_change_percentage_7d:
      data.market_data?.price_change_percentage_7d_in_currency?.usd || 0,
  };
}

